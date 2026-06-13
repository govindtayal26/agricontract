from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from marketplace import views

urlpatterns = [
   path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('add-crop/', views.add_crop, name='add_crop'),
   path('send-offer/<int:crop_id>/', views.send_offer, name='send_offer'),
path('update-contract/<int:contract_id>/', views.update_contract, name='update_contract'),
path('buyer-dashboard/', views.buyer_dashboard, name='buyer_dashboard'),
    # These two lines fix the NoReverseMatch errors
    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
   path('dashboard/', views.dashboard, name='dashboard'),
   path('register/', views.register_user, name='register'),
   path('api/weather/', views.weather_api_view, name='weather_api'),
   path('disease-detector/', views.disease_detector, name='disease_detector'),
   path('disease-detector/', views.disease_detector),
   path('chat/<int:contract_id>/', views.chat_view, name='chat'),
   path('ai-chatbot/', views.ai_chatbot, name='ai_chatbot'),
 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)