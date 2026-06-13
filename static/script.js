// Global Variables
let currentUser = null
let currentLanguage = "en"
let isVideoCallActive = false
const localStream = null
const remoteStream = null
const peerConnection = null

// Language Translations
const translations = {
  en: {
    brand: "AgriContract",
    nav: {
      home: "Home",
      features: "Features",
      how_it_works: "How It Works",
      disease_detector: "Disease Detector",
      market_analytics: "Market Analytics",
      about: "About",
      dashboard: "Dashboard",
      profile: "Profile",
      video_call: "Video Call",
    },
    hero: {
      trusted_by: "Trusted by 10,000+ Farmers",
      title_1: "Assured Contract Farming System",
      title_2: "for Stable Market Access",
      description:
        "Connect farmers directly with buyers through secure contract farming. Guaranteed prices, reliable supply, and transparent transactions for everyone.",
      stats: {
        farmers: "Active Farmers",
        buyers: "Verified Buyers",
        contracts: "Contracts Completed",
      },
      join_farmer: "Join as Farmer",
      join_buyer: "Join as Buyer",
      floating: {
        growth: "Market Growth +25%",
        secure: "100% Secure",
        direct: "Direct Trading",
      },
    },
    features: {
      title: "Why Choose AgriContract?",
      subtitle: "Revolutionizing agriculture through technology and trust",
      secure: {
        title: "Secure Contracts",
        description:
          "Legal binding contracts with guaranteed payments and delivery terms protected by blockchain technology",
      },
      direct: {
        title: "Direct Connection",
        description: "No middlemen - farmers connect directly with buyers for better prices and transparent dealings",
      },
      insights: {
        title: "Market Insights",
        description: "Real-time crop prices and market trends powered by AI to make informed decisions",
      },
      communication: {
        title: "Video Negotiation",
        description: "Built-in video calling and chat for real-time price negotiation and crop inspection",
      },
      disease: {
        title: "Disease Detection",
        description: "AI-powered crop disease detection by simply scanning crop images with your phone",
      },
      mobile: {
        title: "Mobile First",
        description: "Easy-to-use mobile interface designed specifically for farmers with simple controls",
      },
      learn_more: "Learn More",
    },
    auth: {
      login: "Login",
      get_started: "Get Started",
      logout: "Logout",
      welcome_back: "Welcome Back",
      create_account: "Create Your Account",
      email: "Email",
      password: "Password",
      full_name: "Full Name",
      phone: "Phone Number",
      address: "Address",
      role: "I am a",
      confirm_password: "Confirm Password",
      remember_me: "Remember me",
      forgot_password: "Forgot Password?",
      sign_in: "Sign In",
      sign_up: "Create Account",
      no_account: "Don't have an account?",
      have_account: "Already have an account?",
      demo_credentials: "Demo Credentials:",
      farmer: "Farmer",
      buyer: "Buyer",
      select_role: "Select your role",
      farmer_option: "🌾 Farmer - I want to sell my crops",
      buyer_option: "🛒 Buyer - I want to buy crops",
      email_placeholder: "Enter your email",
      password_placeholder: "Enter your password",
      name_placeholder: "Enter your full name",
      phone_placeholder: "Enter your phone number",
      address_placeholder: "Enter your address",
      create_password: "Create a password",
      confirm_password_placeholder: "Confirm your password",
      terms_agreement: "I agree to the Terms of Service and Privacy Policy",
    },
    disease: {
      title: "Crop Disease Detection",
      upload_title: "Upload Crop Image",
      upload_description: "Take a photo or upload an image of your crop for AI-powered disease detection",
      choose_image: "Choose Image",
      results_title: "Detection Results",
    },
    video: {
      title: "Video Negotiation",
      remote_user: "Remote User",
      you: "You",
      chat_placeholder: "Type your message...",
    },
    analytics: {
      title: "Market Analytics",
      all_crops: "All Crops",
      wheat: "Wheat",
      rice: "Rice",
      corn: "Corn",
      all_regions: "All Regions",
      punjab: "Punjab",
      haryana: "Haryana",
      up: "Uttar Pradesh",
      week: "Last Week",
      month: "Last Month",
      quarter: "Last Quarter",
      price_trends: "Price Trends",
      demand_supply: "Demand vs Supply",
      insights: "Market Insights",
      wheat_price_up: "Wheat Prices Rising",
      wheat_insight: "Wheat prices increased by 8% this week due to high demand",
      rice_supply_low: "Rice Supply Low",
      rice_insight: "Rice supply is 15% below average in Punjab region",
    },
  },
  hi: {
    brand: "एग्रीकॉन्ट्रैक्ट",
    nav: {
      home: "होम",
      features: "विशेषताएं",
      how_it_works: "यह कैसे काम करता है",
      disease_detector: "रोग डिटेक्टर",
      market_analytics: "बाजार विश्लेषण",
      about: "हमारे बारे में",
    },
    hero: {
      trusted_by: "10,000+ किसानों का भरोसा",
      title_1: "सुनिश्चित कॉन्ट्रैक्ट फार्मिंग सिस्टम",
      title_2: "स्थिर बाजार पहुंच के लिए",
      description:
        "सुरक्षित कॉन्ट्रैक्ट फार्मिंग के माध्यम से किसानों को सीधे खरीदारों से जोड़ें। गारंटीशुदा कीमतें, विश्वसनीय आपूर्ति, और सभी के लिए पारदर्शी लेनदेन।",
    },
  },
}

// Mock data with enhanced details
const mockCrops = [
  {
    id: 1,
    farmerId: 1,
    name: "Wheat",
    variety: "HD-2967",
    quantity: 500,
    unit: "quintals",
    pricePerUnit: 2200,
    quality: "Grade A",
    harvestDate: "2024-04-15",
    location: "Punjab, India",
    description: "High quality wheat suitable for flour production. Grown using organic methods.",
    status: "available",
    farmerName: "Govind Tayal",
    images: ["/placeholder.svg?height=200&width=300"],
    certifications: ["Organic", "ISO 9001"],
    moistureContent: "12%",
    proteinContent: "11.5%",
    diseaseStatus: "healthy",
  },
  {
    id: 2,
    farmerId: 2,
    name: "Rice",
    variety: "Basmati 1121",
    quantity: 400,
    unit: "quintals",
    pricePerUnit: 4500,
    quality: "Premium",
    harvestDate: "2024-05-25",
    location: "Haryana, India",
    description: "Premium basmati rice for export quality. Long grain with excellent aroma.",
    status: "available",
    farmerName: "Harshit Kumar Pal",
    images: ["/placeholder.svg?height=200&width=300"],
    certifications: ["Export Quality", "FSSAI"],
    moistureContent: "14%",
    grainLength: "6.8mm",
    diseaseStatus: "healthy",
  },
  {
    id: 3,
    farmerId: 1,
    name: "Corn",
    variety: "Sweet Corn",
    quantity: 250,
    unit: "quintals",
    pricePerUnit: 1800,
    quality: "Grade A",
    harvestDate: "2024-04-10",
    location: "Punjab, India",
    description: "Fresh sweet corn for food processing. High sugar content and tender kernels.",
    status: "available",
    farmerName: "Govind Tayal",
    images: ["/placeholder.svg?height=200&width=300"],
    certifications: ["Food Grade", "HACCP"],
    sugarContent: "18%",
    kernelSize: "Large",
    diseaseStatus: "healthy",
  },
  {
    id: 4,
    farmerId: 3,
    name: "Cotton",
    variety: "Bt Cotton",
    quantity: 150,
    unit: "quintals",
    pricePerUnit: 6200,
    quality: "Premium",
    harvestDate: "2024-04-20",
    location: "Rajasthan, India",
    description: "High quality cotton fiber with excellent strength and length.",
    status: "available",
    farmerName: "Jeshika Agrahari",
    images: ["/placeholder.svg?height=200&width=300"],
    certifications: ["Better Cotton", "GOTS"],
    fiberLength: "28mm",
    micronaire: "4.2",
    diseaseStatus: "healthy",
  },
]

const mockContracts = [
  {
    id: 1,
    cropId: 1,
    farmerId: 1,
    buyerId: 2,
    cropName: "Wheat",
    farmerName: "Govind Tayal",
    buyerName: "ABC Food Industries",
    quantity: 200,
    pricePerUnit: 2200,
    totalAmount: 440000,
    advancePayment: 88000,
    deliveryDate: "2024-04-20",
    terms: "Quality inspection required. Payment within 7 days of delivery. Moisture content should not exceed 12%.",
    status: "pending",
    contractDate: "2024-01-15",
    paymentTerms: "50% advance, 50% on delivery",
    qualitySpecs: "Grade A, 12% moisture max",
    deliveryLocation: "ABC Food Industries Warehouse, Delhi",
    negotiationHistory: [
      { date: "2024-01-15", message: "Initial offer sent", type: "system" },
      { date: "2024-01-16", message: "Can we negotiate the price?", type: "farmer" },
      { date: "2024-01-16", message: "Let's discuss via video call", type: "buyer" },
    ],
  },
  {
    id: 2,
    cropId: 2,
    farmerId: 2,
    buyerId: 1,
    cropName: "Rice",
    farmerName: "Harshit Kumar Pal",
    buyerName: "XYZ Exports",
    quantity: 300,
    pricePerUnit: 4500,
    totalAmount: 1350000,
    advancePayment: 270000,
    deliveryDate: "2024-05-30",
    terms: "Export quality basmati rice. Packaging as per export standards. Certificate of origin required.",
    status: "accepted",
    contractDate: "2024-01-20",
    paymentTerms: "20% advance, 80% on delivery",
    qualitySpecs: "Premium grade, 14% moisture max",
    deliveryLocation: "XYZ Exports Facility, Mumbai Port",
    negotiationHistory: [
      { date: "2024-01-20", message: "Contract accepted", type: "system" },
      { date: "2024-01-21", message: "Thank you for the fair deal", type: "farmer" },
    ],
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize Application
function initializeApp() {
  // Show loading screen
  showLoadingScreen()

  // Initialize components
  setTimeout(() => {
    hideLoadingScreen()
    initializeNavigation()
    initializeAnimations()
    initializeCounters()
    initializeForms()
    initializeLanguage()
    checkAuthStatus()
    initializeParticles()
    initializeScrollEffects()
    initializeWeather()
  }, 2000)
}


// New function for Weather Feature
async function initializeWeather() {
    console.log("Weather System: Initializing...");
    const statusElem = document.getElementById("weather-status");

    // Force an immediate fetch for a default location if GPS is slow/blocked
    // This ensures your UI NEVER stays stuck on "Scanning..."
    const useDefault = () => {
        console.log("Weather System: Using fallback location (New Delhi)");
        updateWeatherUI(28.6139, 77.2090); 
    };

    if (navigator.geolocation) {
        // We set a 3-second limit for the GPS to respond
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log("Weather System: GPS found location!");
                updateWeatherUI(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.warn("Weather System: GPS denied or error:", error.message);
                useDefault();
            },
            { timeout: 3000 } 
        );
    } else {
        useDefault();
    }
}

async function updateWeatherUI(lat, lon) {
    try {
        console.log(`Weather System: Fetching data for ${lat}, ${lon}`);
        const response = await fetch(`/api/weather/?lat=${lat}&lon=${lon}`);
        
        if (!response.ok) throw new Error("Backend unreachable");
        
        const data = await response.json();

        if (data.error) {
            console.error("Weather System: Server error:", data.error);
            return;
        }

        // --- Update UI ---
        document.getElementById("weather-status").style.display = "none";
        document.getElementById("weather-data").style.display = "grid"; // Show our new grid
        
        document.getElementById("temp-display").innerText = `${data.temp}°C`;
        document.getElementById("city-display").innerText = data.city;
        document.getElementById("humidity-display").innerText = data.humidity;
        document.getElementById("advice-display").innerText = data.advice;
        
        console.log("Weather System: UI successfully updated!");
    } catch (err) {
        console.error("Weather System: Critical failure:", err);
    }
}
// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.classList.remove("hidden")
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.classList.add("hidden")
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }
}

// Navigation Functions
function initializeNavigation() {
  const navbar = document.getElementById("navbar")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.querySelector(".nav-toggle")

    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove("show")
      navToggle.classList.remove("active")
    }
  })
}

function toggleMobileMenu() {
  const navMenu = document.getElementById("nav-menu")
  const navToggle = document.querySelector(".nav-toggle")

  navMenu.classList.toggle("show")
  navToggle.classList.toggle("active")
}

function toggleUserMenu() {
  const dropdown = document.getElementById("user-dropdown")
  dropdown.classList.toggle("show")
}

// Page Management
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const targetPage = document.getElementById(pageId + "-page")
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Close mobile menu
  const navMenu = document.getElementById("nav-menu")
  const navToggle = document.querySelector(".nav-toggle")
  navMenu.classList.remove("show")
  navToggle.classList.remove("active")
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Animation Functions
function initializeAnimations() {
  // Initialize AOS (Animate On Scroll) alternative
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe all elements with data-aos attributes
  const animatedElements = document.querySelectorAll("[data-aos]")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

function initializeCounters() {
  const counters = document.querySelectorAll("[data-count]")

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          animateCounter(counter, target)
          countObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  )

  counters.forEach((counter) => {
    countObserver.observe(counter)
  })
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const duration = 2000
  const stepTime = duration / 100

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, stepTime)
}

function initializeParticles() {
  // Create floating particles effect
  const heroParticles = document.querySelector(".hero-particles")
  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      createParticle(heroParticles)
    }
  }
}

function createParticle(container) {
  const particle = document.createElement("div")
  particle.style.position = "absolute"
  particle.style.width = Math.random() * 4 + 2 + "px"
  particle.style.height = particle.style.width
  particle.style.background = "rgba(255, 255, 255, 0.1)"
  particle.style.borderRadius = "50%"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.top = Math.random() * 100 + "%"
  particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`
  particle.style.animationDelay = Math.random() * 10 + "s"

  container.appendChild(particle)
}

function initializeScrollEffects() {
  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-background")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Form Functions
function initializeForms() {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
    
    // REMOVED the broken checkPasswordStrength listener here
  }

  // File upload for disease detection
  const cropImageInput = document.getElementById("crop-image-input")
  if (cropImageInput) {
    cropImageInput.addEventListener("change", handleImageUpload)
  }
}

function handleLogin(e) {
  // We DO NOT use e.preventDefault() here because we WANT the form 
  // to submit to your Django login URL.

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Show loading state while the page redirects
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
  submitBtn.disabled = true;

  // Form will now submit to the 'action' defined in your HTML
  return true; 
}

function handleRegister(e) {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    // FIXED: Now checking userData.confirm_password
    if (userData.password !== userData.confirm_password) {
        showToast("Registration failed", "Passwords do not match", "error");
        return; 
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    e.target.submit(); 
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    input.type = "password"
    icon.className = "fas fa-eye"
  }
}

function copyCredentials(email, password) {
  document.getElementById("login-email").value = email
  document.getElementById("login-password").value = password
  showToast("Credentials copied!", "Demo credentials have been filled in", "info")
}

// Authentication Functions
function checkAuthStatus() {
  /**
   * FIX: We no longer check localStorage.
   * Django's {% if user.is_authenticated %} in your HTML 
   * automatically shows/hides the Login or Logout buttons.
   */
  console.log("Django is handling authentication.");

  // If you need the username for your JS "Toasts" or logic:
  const userNameElem = document.getElementById("user-name");
  if (userNameElem) {
    // If the element exists, it means Django logged them in!
    currentUser = {
      name: userNameElem.textContent.trim(),
      avatar: userNameElem.textContent.trim().charAt(0).toUpperCase()
    };
  }
}

function loginUser(userData) {
  /**
   * In a Django app, we don't 'manually' log in via JS.
   * This function should now only be used to update 
   * temporary JS state if needed after a successful 
   * server-side login.
   */
  currentUser = userData;
  
  // We stop using localStorage because it's not secure 
  // and doesn't sync with the Django database.
  console.log("User session managed by Django Cookies.");
  
  // Since you emptied updateUIForLoggedInUser, 
  // this just keeps the app from crashing.
  updateUIForLoggedInUser();
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUIForLoggedOutUser()
  showToast("Logged out", "You have been successfully logged out", "info")
}

function updateUIForLoggedInUser() {
    // We leave this empty! 
    // Django's HTML template tags handle the visibility now.
    console.log("UI updated by Django server-side.");
}

// Modal Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"

    // Focus first input
    const firstInput = modal.querySelector("input, select, textarea")
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100)
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = ""
  }
}

function showLogin() {
  showModal("login-modal")
}

function showRegister(userType = "") {
  showModal("register-modal")

  if (userType) {
    const roleSelect = document.getElementById("register-role")
    if (roleSelect) {
      roleSelect.value = userType
    }
  }
}

function showForgotPassword() {
  closeModal("login-modal")
  showToast("Password Reset", "Password reset functionality will be available soon", "info")
}

// Feature Functions
function showDemo() {
  showToast("Demo Mode", "This is a demo version. Full functionality coming soon!", "info")
}

function showDashboard() {
  if (!currentUser) {
    showLogin()
    return
  }

  showToast("Dashboard", `Welcome to your ${currentUser.type} dashboard!`, "success")
}

function showProfile() {
  if (!currentUser) {
    showLogin()
    return
  }

  showToast("Profile", "Profile management coming soon!", "info")
}

function showCropDiseaseDetector() {
  showModal("disease-detection-modal")
}

function showVideoCall() {
  if (!currentUser) {
    showLogin()
    return
  }

  showModal("video-call-modal")
  initializeVideoCall()
}

function showMarketAnalytics() {
  showModal("market-analytics-modal")
  initializeMarketAnalytics()
}

// Disease Detection Functions
function triggerFileUpload() {
  document.getElementById("crop-image-input").click()
}

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const uploadArea = document.getElementById("upload-area");
    const resultsSection = document.getElementById("detection-results");
    const resultContent = document.getElementById("result-content");

    // 1. Show the beautiful loading state you already have
    uploadArea.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <h3>Analyzing Image...</h3>
        <p>Our AI is examining your crop for diseases</p>
    `;

    // 2. Prepare the data to send to Django
    const formData = new FormData();
    formData.append('crop_image', file);
    
    // Get the CSRF token from the cookie (Standard Django requirement)
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    try {
        // 3. Send to your Django View
        const response = await fetch('/disease-detector/', {
            method: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        });

        const data = await response.json(); // We will make Django return JSON

        // 4. Update the UI with REAL data from Python
        resultContent.innerHTML = `
            <div class="detection-result">
                <div class="result-header">
                    <h4>${data.disease}</h4>
                    <span class="confidence-badge">${data.confidence} Confidence</span>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <strong>Status:</strong> 
                        <span class="severity-${data.status.toLowerCase()}">${data.status}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Recommended Treatment:</strong>
                        <p>${data.advice}</p>
                    </div>
                </div>
            </div>
        `;
        resultsSection.style.display = "block";
        showToast("Analysis Complete", "Real-time AI diagnosis finished", "success");

    } catch (error) {
        console.error("Error:", error);
        showToast("Error", "Could not connect to AI server", "error");
    }

    // Reset upload area icon
    uploadArea.innerHTML = `<i class="fas fa-camera"></i><h3>Upload Another</h3>`;
}

// Video Call Functions
function initializeVideoCall() {
  if (isVideoCallActive) return

  // Simulate video call initialization
  const localVideo = document.getElementById("local-video")
  const remoteVideo = document.getElementById("remote-video")

  // Add demo message
  addChatMessage("system", "Video call initialized. Connecting to remote user...")

  setTimeout(() => {
    addChatMessage("system", "Connected! You can now start your negotiation.")
    isVideoCallActive = true
  }, 2000)
}

function toggleMute() {
  const muteBtn = document.getElementById("mute-btn")
  const icon = muteBtn.querySelector("i")

  if (icon.classList.contains("fa-microphone")) {
    icon.className = "fas fa-microphone-slash"
    muteBtn.style.background = "var(--error-color)"
    addChatMessage("system", "Microphone muted")
  } else {
    icon.className = "fas fa-microphone"
    muteBtn.style.background = "rgba(255, 255, 255, 0.2)"
    addChatMessage("system", "Microphone unmuted")
  }
}

function toggleVideo() {
  const videoBtn = document.getElementById("video-btn")
  const icon = videoBtn.querySelector("i")

  if (icon.classList.contains("fa-video")) {
    icon.className = "fas fa-video-slash"
    videoBtn.style.background = "var(--error-color)"
    addChatMessage("system", "Camera turned off")
  } else {
    icon.className = "fas fa-video"
    videoBtn.style.background = "rgba(255, 255, 255, 0.2)"
    addChatMessage("system", "Camera turned on")
  }
}

function shareScreen() {
  addChatMessage("system", "Screen sharing started")
  showToast("Screen Sharing", "Screen sharing is now active", "info")
}

function endCall() {
  isVideoCallActive = false
  closeModal("video-call-modal")
  showToast("Call Ended", "Video call has been terminated", "info")
}

function sendChatMessage() {
  const chatInput = document.getElementById("chat-input")
  const message = chatInput.value.trim()

  if (!message) return

  addChatMessage("user", message)
  chatInput.value = ""

  // Simulate response
  setTimeout(
    () => {
      const responses = [
        "That sounds reasonable. What about the delivery timeline?",
        "I can offer a better price for bulk orders.",
        "The quality looks good from the video. Let's proceed.",
        "Can we discuss the payment terms?",
        "I'm interested. When can we finalize this deal?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addChatMessage("remote", randomResponse)
    },
    1000 + Math.random() * 2000,
  )
}

function addChatMessage(type, message) {
  const chatMessages = document.getElementById("chat-messages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `chat-message ${type}`

  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  if (type === "system") {
    messageDiv.innerHTML = message
  } else {
    messageDiv.innerHTML = `
      <div class="message-header">
        <strong>${type === "user" ? "You" : "Remote User"}</strong>
        <span class="message-time">${timeString}</span>
      </div>
      <div class="message-content">${message}</div>
    `
  }

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Market Analytics Functions
function initializeMarketAnalytics() {
  // Simulate loading market data
  setTimeout(() => {
    drawPriceChart()
    drawDemandSupplyChart()
  }, 500)
}

function drawPriceChart() {
  const canvas = document.getElementById("price-chart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Sample data
  const data = [2500, 2600, 2550, 2700, 2800, 2750, 2900]
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw chart
  ctx.strokeStyle = "#15803d"
  ctx.lineWidth = 3
  ctx.beginPath()

  const stepX = canvas.width / (data.length - 1)
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  data.forEach((value, index) => {
    const x = index * stepX
    const y = canvas.height - ((value - minValue) / range) * (canvas.height - 40) - 20

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }

    // Draw points
    ctx.fillStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  ctx.stroke()

  // Draw labels
  ctx.fillStyle = "#6b7280"
  ctx.font = "12px Inter"
  ctx.textAlign = "center"

  labels.forEach((label, index) => {
    const x = index * stepX
    ctx.fillText(label, x, canvas.height - 5)
  })
}

function drawDemandSupplyChart() {
  const canvas = document.getElementById("demand-supply-chart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Sample data
  const demandData = [80, 85, 75, 90, 95, 88, 92]
  const supplyData = [70, 75, 80, 85, 80, 85, 88]

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const stepX = canvas.width / (demandData.length - 1)

  // Draw demand line
  ctx.strokeStyle = "#3b82f6"
  ctx.lineWidth = 2
  ctx.beginPath()

  demandData.forEach((value, index) => {
    const x = index * stepX
    const y = canvas.height - (value / 100) * (canvas.height - 40) - 20

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw supply line
  ctx.strokeStyle = "#f59e0b"
  ctx.lineWidth = 2
  ctx.beginPath()

  supplyData.forEach((value, index) => {
    const x = index * stepX
    const y = canvas.height - (value / 100) * (canvas.height - 40) - 20

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()
}

// Language Functions
function initializeLanguage() {
  updateLanguageContent()
}

function toggleLanguageMenu() {
  const menu = document.getElementById("language-menu")
  menu.style.opacity = menu.style.opacity === "1" ? "0" : "1"
  menu.style.visibility = menu.style.visibility === "visible" ? "hidden" : "visible"
}

function changeLanguage(langCode, langName) {
  currentLanguage = langCode
  document.getElementById("current-language").textContent = langName
  updateLanguageContent()
  toggleLanguageMenu()

  showToast("Language Changed", `Language changed to ${langName}`, "success")
}

function updateLanguageContent() {
  const elements = document.querySelectorAll("[data-translate]")

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate")
    const translation = getTranslation(key)

    if (translation) {
      element.textContent = translation
    }
  })

  // Update placeholders
  const placeholderElements = document.querySelectorAll("[data-translate-placeholder]")
  placeholderElements.forEach((element) => {
    const key = element.getAttribute("data-translate-placeholder")
    const translation = getTranslation(key)

    if (translation) {
      element.placeholder = translation
    }
  })
}

function getTranslation(key) {
  const keys = key.split(".")
  let translation = translations[currentLanguage]

  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k]
    } else {
      // Fallback to English
      translation = translations.en
      for (const fallbackKey of keys) {
        if (translation && translation[fallbackKey]) {
          translation = translation[fallbackKey]
        } else {
          return null
        }
      }
      break
    }
  }

  return typeof translation === "string" ? translation : null
}

// Toast Notification Functions
function showToast(title, message, type = "info") {
  const toastContainer = document.getElementById("toast-container")
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  toast.innerHTML = `
    <div class="toast-header">
      <div class="toast-title">
        <i class="${icons[type]}"></i>
        ${title}
      </div>
      <button class="toast-close" onclick="closeToast(this)">×</button>
    </div>
    <div class="toast-message">${message}</div>
  `

  toastContainer.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    closeToast(toast.querySelector(".toast-close"))
  }, 5000)
}

function closeToast(button) {
  const toast = button.closest(".toast")
  toast.style.transform = "translateX(100%)"

  setTimeout(() => {
    toast.remove()
  }, 300)
}

// Additional Feature Functions
function showTrainingModules() {
  showToast("Training Modules", "Comprehensive training modules coming soon!", "info")
}

function showMarketTrends() {
  showToast("Market Trends", "Real-time market trends analysis coming soon!", "info")
}

function showAgriculturalAdvice() {
  showToast("Agricultural Advice", "Expert agricultural advice feature coming soon!", "info")
}

function showPricing() {
  showToast("Pricing", "Pricing information coming soon!", "info")
}

function showSupport() {
  showToast("Support", "Customer support feature coming soon!", "info")
}

function showAPI() {
  showToast("API", "Developer API documentation coming soon!", "info")
}

function showContact() {
  showToast("Contact", "Contact information coming soon!", "info")
}

function showCareers() {
  showToast("Careers", "Career opportunities coming soon!", "info")
}

function showBlog() {
  showToast("Blog", "Blog section coming soon!", "info")
}

function showPrivacy() {
  showToast("Privacy Policy", "Privacy policy coming soon!", "info")
}

function showTerms() {
  showToast("Terms of Service", "Terms of service coming soon!", "info")
}

function showCookies() {
  showToast("Cookie Policy", "Cookie policy coming soon!", "info")
}

// Keyboard Event Handlers
document.addEventListener("keydown", (e) => {
  // Close modals with Escape key
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll(".modal.show")
    openModals.forEach((modal) => {
      modal.classList.remove("show")
    })
    document.body.style.overflow = ""
  }

  // Send chat message with Enter key
  if (e.key === "Enter" && e.target.id === "chat-input") {
    e.preventDefault()
    sendChatMessage()
  }
})

// Window Event Handlers
window.addEventListener("resize", () => {
  // Redraw charts on window resize
  if (document.getElementById("price-chart")) {
    drawPriceChart()
  }
  if (document.getElementById("demand-supply-chart")) {
    drawDemandSupplyChart()
  }
})

// Service Worker Registration (for PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

// Performance Monitoring
window.addEventListener("load", () => {
  // Log performance metrics
  setTimeout(() => {
    const perfData = performance.getEntriesByType("navigation")[0]
    console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
  }, 0)
})

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  showToast("Error", "An unexpected error occurred. Please refresh the page.", "error")
})

// Unhandled Promise Rejection
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
  showToast("Error", "A network error occurred. Please check your connection.", "error")
})

// Online/Offline Status
window.addEventListener("online", () => {
  showToast("Connection Restored", "You are back online!", "success")
})

window.addEventListener("offline", () => {
  showToast("Connection Lost", "You are currently offline. Some features may not work.", "warning")
})

// Prevent right-click context menu (optional)
// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault();
// });

// Prevent text selection (optional)
// document.addEventListener('selectstart', function(e) {
//   e.preventDefault();
// });

// Console welcome message
console.log(`
🌾 Welcome to AgriContract! 🌾
Developed by: Govind Tayal, Harshit Kumar Pal, Jeshika Agrahari, Jatin Prajapat
Institution: Greater Noida Institute of Technology

This is a demo version of the Assured Contract Farming System.
For more information, visit our website or contact our team.
`)
