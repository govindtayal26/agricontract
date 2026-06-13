import os
import random
import numpy as np

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib import messages

from .models import Crop, Contract, Message
from .forms import CropForm
from .services import get_farmer_weather

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


# ✅ LOAD MODEL (VERY IMPORTANT)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'model/potato_model.h5')

model = load_model(model_path)

classes = ["Early Blight", "Late Blight", "Healthy"]


# ---------------- HOME ----------------
def home(request):
    search_query = request.GET.get('search')
    if search_query:
        crops = Crop.objects.filter(name__icontains=search_query).order_by('-created_at')
    else:
        crops = Crop.objects.all().order_by('-created_at')
    return render(request, 'index.html', {'crops': crops})


# ---------------- SEND OFFER ----------------
@login_required
def send_offer(request, crop_id):
    if request.method == "POST":
        crop = get_object_or_404(Crop, id=crop_id)
        price = request.POST.get("price")

        if crop.farmer == request.user:
            messages.error(request, "You cannot send offer to your own crop.")
            return redirect('home')

        Contract.objects.create(
            farmer=crop.farmer,
            buyer=request.user,
            crop=crop,
            offered_price=price
        )

        messages.success(request, "Offer sent successfully!")

    return redirect('home')


# ---------------- ADD CROP ----------------
@login_required 
def add_crop(request):
    if request.method == "POST":
        form = CropForm(request.POST, request.FILES)
        if form.is_valid():
            crop = form.save(commit=False)
            crop.farmer = request.user 
            crop.save()
            return redirect('home')
    else:
        form = CropForm()
    return render(request, 'add_crop.html', {'form': form})


# ---------------- AI DISEASE DETECTOR ----------------
def disease_detector(request):
    if request.method == 'POST' and request.FILES.get('crop_image'):
        try:
            file = request.FILES['crop_image']

            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            path = fs.path(filename)

            # Image processing
            img = image.load_img(path, target_size=(224,224))
            img_array = image.img_to_array(img)/255.0
            img_array = np.expand_dims(img_array, axis=0)

            # Prediction
            prediction = model.predict(img_array)
            predicted_class = classes[np.argmax(prediction)]
            confidence = str(round(np.max(prediction)*100,2)) + "%"

            # Advice
            if predicted_class == "Early Blight":
                advice = "Use Mancozeb fungicide"
                status = "Warning"
            elif predicted_class == "Late Blight":
                advice = "Use Metalaxyl fungicide"
                status = "Danger"
            else:
                advice = "Crop is healthy"
                status = "Healthy"

            # ✅ OPTIONAL: delete file after use
            os.remove(path)

            return JsonResponse({
                "status": status,
                "disease": predicted_class,
                "confidence": confidence,
                "advice": advice
            })

        except Exception as e:
            return JsonResponse({
                "error": str(e)
            }, status=500)

    return render(request, 'disease_detector.html')


# ---------------- DASHBOARD ----------------
@login_required
def dashboard(request):
    role = request.user.userprofile.role

    if role == "buyer":
        return redirect('buyer_dashboard')

    my_crops = Crop.objects.filter(farmer=request.user)
    contracts = Contract.objects.filter(farmer=request.user)

    return render(request, 'dashboard.html', {
        'my_crops': my_crops,
        'contracts': contracts
    })


# ---------------- REGISTER ----------------
def register_user(request):
    if request.method == 'POST':
        full_name = request.POST.get('name')
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role')

        if User.objects.filter(username=username).exists():
            messages.error(request, "This email is already registered.")
            return redirect('home')

        user = User.objects.create_user(
            username=username,
            email=username,
            password=password
        )

        user.first_name = full_name
        user.save()

        profile = user.userprofile
        profile.role = role
        profile.save()

        login(request, user)
        messages.success(request, f"Welcome {full_name}!")

        return redirect('home')

    return redirect('home')


# ---------------- WEATHER ----------------
def weather_api_view(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    
    if lat and lon:
        data = get_farmer_weather(lat, lon)
        return JsonResponse(data)
    return JsonResponse({"error": "No coordinates provided"}, status=400)


# ---------------- CONTRACT UPDATE ----------------
@login_required
def update_contract(request, contract_id):
    contract = get_object_or_404(Contract, id=contract_id)

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "accept":
            contract.status = "accepted"
        elif action == "reject":
            contract.status = "rejected"

        contract.save()

    return redirect('dashboard')


# ---------------- BUYER DASHBOARD ----------------
@login_required
def buyer_dashboard(request):
    contracts = Contract.objects.filter(buyer=request.user).order_by('-created_at')

    return render(request, 'buyer_dashboard.html', {
        'contracts': contracts
    })


# ---------------- CHAT ----------------
@login_required
def chat_view(request, contract_id):
    contract = Contract.objects.get(id=contract_id)

    if request.user != contract.buyer and request.user != contract.farmer:
        return redirect('dashboard')

    messages = Message.objects.filter(contract=contract).order_by('created_at')

    if request.method == "POST":
        text = request.POST.get("text")

        if text:
            Message.objects.create(
                contract=contract,
                sender=request.user,
                text=text
            )

        return redirect('chat', contract_id=contract.id)

    return render(request, 'chat.html', {
        'contract': contract,
        'messages': messages
    })


from django.http import JsonResponse

from django.http import JsonResponse
from django.shortcuts import render

from django.http import JsonResponse
from django.shortcuts import render

def ai_chatbot(request):
    if request.method == "POST":
        msg = request.POST.get("message").lower()

        # 🔥 PROJECT KNOWLEDGE BASE

        if "project" in msg or "explain" in msg:
            reply = """This project is an integrated system that combines an Assured Marketing Platform for contract farming 
with an AI-based plant disease detection system. It helps farmers in two major areas: crop health monitoring and 
guaranteed market access. The system allows farmers to connect directly with buyers and also detect diseases early 
using machine learning techniques, improving productivity and reducing losses."""

        elif "problem" in msg:
            reply = """Farmers face problems like unstable market prices, middlemen exploitation, delayed payments, 
and crop losses due to diseases. This project solves these by providing a digital platform for direct selling 
and an AI system for early disease detection."""

        elif "algorithm" in msg or "cnn" in msg:
            reply = """We used Convolutional Neural Network (CNN), a deep learning algorithm for image classification. 
CNN automatically extracts features like color, texture, and patterns from potato leaf images and classifies them 
into Healthy, Early Blight, or Late Blight."""

        elif "dataset" in msg:
            reply = """The dataset used is the PlantVillage dataset, which contains labeled images of plant leaves. 
For this project, potato leaf images were used including healthy leaves, early blight, and late blight."""

        elif "preprocessing" in msg:
            reply = """Before training, images were preprocessed using resizing to 224x224 pixels, normalization, 
noise reduction, and data augmentation techniques like rotation and flipping to improve accuracy."""

        elif "training" in msg:
            reply = """The model was trained using supervised learning. The dataset was divided into training, validation, 
and testing sets. CNN learned features from images and classification was done using softmax output layer."""

        elif "accuracy" in msg or "result" in msg:
            reply = """The model achieved an accuracy of approximately 92% to 95% in detecting potato diseases. 
It showed high precision and recall, meaning it correctly identifies most diseased leaves with minimal errors."""

        elif "early blight" in msg:
            reply = """Early blight is a fungal disease characterized by brown spots with concentric rings on leaves. 
It reduces crop quality and can be treated using Mancozeb fungicide."""

        elif "late blight" in msg:
            reply = """Late blight is a severe disease causing dark irregular patches and rapid leaf decay. 
It spreads in high humidity conditions and is treated using Metalaxyl fungicide."""

        elif "platform" in msg or "marketing" in msg:
            reply = """The assured marketing platform allows farmers to directly connect with buyers like retailers 
and food industries. It enables contract farming where farmers get guaranteed prices and secure payments, 
reducing dependency on middlemen."""

        elif "impact" in msg:
            reply = """The system improves agricultural productivity by combining disease detection and market access. 
Farmers get healthy crops and assured income, reducing risk and increasing profit stability."""

        elif "future" in msg:
            reply = """Future improvements include adding more crops, developing a mobile app, integrating IoT sensors, 
and adding predictive analytics for crop demand and disease prediction."""

        elif "methodology" in msg:
            reply = """The methodology includes data collection, preprocessing, CNN model training, and integration 
with a web-based Django platform. The system combines AI-based disease detection with a digital contract farming system."""

        else:
            reply = """I am Smart Agri Jarvis 🤖  
I can deeply explain your project including algorithm, dataset, training, results, platform, and future scope.  
Try asking:  
- Explain project  
- What algorithm you used  
- What is CNN  
- Explain results  
- What is contract farming"""

        return JsonResponse({"reply": reply})

    return render(request, "chatbot.html")