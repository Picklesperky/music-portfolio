// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const cartCount = document.querySelectorAll('.cart-count');
const productGrids = document.querySelectorAll('.products-grid');
const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
const mainProductImage = document.getElementById('main-product-image');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const ratingInput = document.querySelectorAll('.rating-input i');
const reviewRatingInput = document.getElementById('review-rating');
const passwordInput = document.getElementById('register-password');
const strengthBar = document.querySelector('.strength-bar');
const strengthValue = document.getElementById('strength-value');
const accountMenuLinks = document.querySelectorAll('.account-menu a');
const accountSections = document.querySelectorAll('.account-section');
const checkoutSteps = document.querySelectorAll('.checkout-steps .step');
const formSections = document.querySelectorAll('.form-section');
const nextStepBtns = document.querySelectorAll('.next-step');
const prevStepBtns = document.querySelectorAll('.prev-step');
const paymentMethodInputs = document.querySelectorAll('input[name="payment_method"]');
const paymentDetails = document.querySelectorAll('.payment-details');

// Sample product data
const products = [
    {
        id: 1,
        name: "Fridge",
        price: 30000.00,
        originalPrice: 45000.00,
        image: "images/fridge.jpg",
        rating: 4.5,
        reviews: 48,
        category: "electronics"
    },
    {
        id: 2,
        name: "HP Elite-book laptop 16GB Ram 845 G8 Ryzen 5",
        price: 28000.00,
        originalPrice: 38000.00,
        image: "images/laptop.jpg",
        rating: 4.2,
        reviews: 62,
        category: "electronics"
    },
    {
        id: 3,
        name: "LG XBoom woofer/shaker",
        price: 52000.00,
        originalPrice: 45000.00,
        image: "images/woofer.jpg",
        rating: 4.0,
        reviews: 49,
        category: "electronics"
    },
    {
        id: 4,
        name: "Samsung 50 Cu700 crystal UHD 4k smart TV",
        price: 49500.00,
        originalPrice: 54999.00,
        image: "images/tv.jpg",
        rating: 3.8,
        reviews: 36,
        category: "electronics"
    },
    {
        id: 5,
        name: "HP Elite desk 800G4 core i5 8th Gen 8GB RAM",
        price: 35999.00,
        originalPrice: 42000.00,
        image: "images/computer.jpg",
        rating: 4.1,
        reviews: 19,
        category: "electronics"
    },
    {
        id: 6,
        name: "Newmatic Microwave & Grill,32L Built in",
        price: 65000.00,
        originalPrice: 79000.00,
        image: "images/microwave.jpg",
        rating: 4.3,
        reviews: 24,
        category: "electronics"
    }
];

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Initialize cart count
function updateCartCount(count) {
    cartCount.forEach(el => {
        el.textContent = count;
    });
}

// Load products into grids
function loadProducts(grid, productsToLoad) {
    grid.innerHTML = '';
    productsToLoad.forEach(product => {
        const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const productEl = document.createElement('div');
        productEl.className = 'product-card';
        productEl.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">KSh ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">KSh ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-stock in-stock">In Stock</div>
                <div class="product-actions">
                    <button class="btn add-to-cart">Add to Cart</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(productEl);
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Load featured products on homepage
if (productGrids.length > 0 && window.location.pathname.includes('index.html')) {
    loadProducts(productGrids[0], products.slice(0, 4));
}

// Load all products on products page
if (productGrids.length > 0 && window.location.pathname.includes('products.html')) {
    loadProducts(productGrids[0], products);
}

// Load related products on product detail page
if (productGrids.length > 0 && window.location.pathname.includes('product-detail.html')) {
    loadProducts(productGrids[0], products.slice(0, 4));
}

// Product image thumbnail click
if (thumbnailImages.length > 0) {
    thumbnailImages.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainProductImage.src = thumb.src.replace('-thumb', '');
        });
    });
}

// Tab functionality
if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Rating input for reviews
if (ratingInput.length > 0) {
    ratingInput.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            
            ratingInput.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
            
            reviewRatingInput.value = rating;
        });
    });
}

// Password strength meter
if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        // Lowercase check
        if (/[a-z]/.test(password)) strength++;
        // Uppercase check
        if (/[A-Z]/.test(password)) strength++;
        // Number check
        if (/[0-9]/.test(password)) strength++;
        // Special char check
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        // Update strength meter
        strengthBar.className = 'strength-bar';
        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthValue.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthValue.textContent = 'Medium';
        } else {
            strengthBar.classList.add('strong');
            strengthValue.textContent = 'Strong';
        }
    });
}

// Account section navigation
if (accountMenuLinks.length > 0) {
    accountMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            accountMenuLinks.forEach(l => l.classList.remove('active'));
            accountSections.forEach(s => s.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Update URL
            history.pushState(null, null, `account.html#${sectionId}`);
        });
    });
    
    // Check for hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.account-menu a[href="#${sectionId}"]`);
        
        if (targetLink) {
            accountMenuLinks.forEach(l => l.classList.remove('active'));
            accountSections.forEach(s => s.classList.remove('active'));
            
            targetLink.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        }
    }
}

// Checkout steps navigation
if (checkoutSteps.length > 0) {
    // Initialize first step
    checkoutSteps[0].classList.add('active');
    formSections[0].classList.add('active');
    
    // Next step buttons
    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.getAttribute('data-next');
            const currentStep = document.querySelector('.step.active');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
            
            // Validate current step before proceeding
            if (validateStep(currentStepNum)) {
                // Update steps
                currentStep.classList.remove('active');
                currentStep.classList.add('completed');
                document.querySelector(`.step[data-step="${currentStepNum + 1}"]`).classList.add('active');
                
                // Update form sections
                document.querySelector('.form-section.active').classList.remove('active');
                document.getElementById(`${nextStep}-section`).classList.add('active');
            }
        });
    });
    
    // Previous step buttons
    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = btn.getAttribute('data-prev');
            const currentStep = document.querySelector('.step.active');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
            
            // Update steps
            currentStep.classList.remove('active');
            document.querySelector(`.step[data-step="${currentStepNum - 1}"]`).classList.add('active');
            
            // Update form sections
            document.querySelector('.form-section.active').classList.remove('active');
            document.getElementById(`${prevStep}-section`).classList.add('active');
        });
    });
}

// Form step validation
function validateStep(stepNum) {
    let isValid = true;
    
    if (stepNum === 1) {
        // Validate shipping information
        const requiredFields = document.querySelectorAll('#shipping-section [required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        // Validate phone number format
        const phoneField = document.getElementById('phone');
        if (phoneField.value.trim() && !/^[0-9]{10,15}$/.test(phoneField.value.trim())) {
            phoneField.style.borderColor = 'var(--danger-color)';
            isValid = false;
        }
    }
    
    return isValid;
}

// Payment method selection
if (paymentMethodInputs.length > 0) {
    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', () => {
            paymentDetails.forEach(detail => detail.style.display = 'none');
            
            const selectedMethod = document.querySelector(`input[name="payment_method"]:checked`).value;
            document.querySelector(`.${selectedMethod}-details`).style.display = 'block';
        });
    });
    
    // Initialize first payment method
    document.querySelector('input[name="payment_method"]').checked = true;
    document.querySelector('.mpesa-details').style.display = 'block';
}

// Simulate payment processing on payment.html
if (window.location.pathname.includes('payment.html')) {
    setTimeout(() => {
        window.location.href = 'order-confirmation.html';
    }, 5000);
}

// Initialize cart count
updateCartCount(0);