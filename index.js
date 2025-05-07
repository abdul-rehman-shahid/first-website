// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effects to cart items
document.querySelectorAll('.cart').forEach(cart => {
    cart.addEventListener('mouseenter', () => {
        cart.style.transform = 'scale(1.02)';
        cart.style.transition = 'transform 0.3s ease';
    });
    
    cart.addEventListener('mouseleave', () => {
        cart.style.transform = 'scale(1)';
    });
});

// Add animation to buttons when clicked
document.querySelectorAll('.cart button').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add fade-in animation for cart items
window.addEventListener('load', () => {
    document.querySelectorAll('.cart').forEach((cart, index) => {
        setTimeout(() => {
            cart.style.opacity = '1';
            cart.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add a loading animation for links
document.querySelectorAll('.cart a').forEach(link => {
    link.addEventListener('click', () => {
        const button = link.parentElement;
        button.style.position = 'relative';
        
        // Create loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        button.appendChild(spinner);
        
        // Remove spinner after a short delay
        setTimeout(() => {
            spinner.remove();
        }, 1000);
    });
});

// Add responsive behavior
function checkResponsive() {
    const cartItems = document.querySelectorAll('.cart');
    if (window.innerWidth < 768) {
        cartItems.forEach(cart => {
            cart.style.width = '100%';
            cart.style.margin = '20px 0';
        });
    } else {
        cartItems.forEach(cart => {
            cart.style.width = '30%';
            cart.style.margin = '20px';
        });
    }
}

// Initial check
checkResponsive();

// Check on window resize
window.addEventListener('resize', checkResponsive);
