// Site Configuration
const siteData = {
    businessName: 'Joe Unit & Door Co.',
    owner: 'Johannes Nkoana',
    slogan: 'Built-In Excellence  From Floor Plan to Final Door',
    phone: '+27 65 627 5687',
    whatsappPrefill: 'Hello Johannes, I saw your website and would like to discuss a project.',
    email: 'joeunits@gmail.com',
    portfolio: [
        { 
            id: 'kitchen-1',
            title: 'Modern Gloss Kitchen', 
            category: 'kitchen',
            description: 'Contemporary kitchen with high-gloss finish and smart storage solutions',
            images: [
                { src: 'images/KitchenGloss.jpg', caption: 'Full view of the modern gloss kitchen' },
                { src: 'images/KitchenOtherSide.jpg', caption: 'Alternative angle showing the counter space' },
                { src: 'images/Kitchen-unit-Tsh.jpg', caption: 'Close-up of the custom cabinetry' },
                { src: 'images/Tshebelakitchen.jpg', caption: 'Detailed view of the countertops and fixtures' },
                { src: 'images/CornerKitchen.jpg', caption: 'Corner view highlighting space utilization' }
            ]
        },
        { 
            id: 'wardrobe-1',
            title: 'Custom Wardrobe', 
            category: 'wardrobe',
            description: 'Floor-to-ceiling wardrobe with custom interior organization',
            images: [
                { src: 'images/wardrope.JPG', caption: 'Full view of the custom wardrobe' },
                { src: 'images/whitewardrope.JPG', caption: 'Interior organization system' },
                { src: 'images/MustWardrope.jpg', caption: 'Close-up of the sliding mechanism' },
                { src: 'images/Wardrope-himO.jpg', caption: 'Different angle showing the finish' },
                { src: 'images/U_wardrope3.JPG', caption: 'Custom handles and finishing details' }
            ]
        },
        { 
            id: 'doors-1',
            title: 'Ceiling Design', 
            category: 'doors',
            description: 'Custom gypsum ceiling with integrated lighting',
            images: [
                { src: 'images/Ceiling.jpg', caption: 'Main view of the ceiling design' },
                { src: 'images/zinc.JPG', caption: 'Close-up of the cornice work' },
                { src: 'images/Gelman.jpg', caption: 'Integrated lighting details' },
                { src: 'images/DarkBrownWard.jpg', caption: 'Alternative angle showing the pattern' }
            ]
        },
        { 
            id: 'office-1',
            title: 'Office Units', 
            category: 'other',
            description: 'Professional office cabinetry and storage solutions',
            images: [
                { src: 'images/Advocate.jpg', caption: 'Main office cabinetry' },
                { src: 'images/cabinet-1.jpg', caption: 'Storage and filing system' },
                { src: 'images/doors-1.jpg', caption: 'Custom office doors' }
            ]
        },
        { 
            id: 'kitchen-2',
            title: 'Corner Kitchen Design', 
            category: 'kitchen',
            description: 'Space-efficient corner kitchen maximizing every inch',
            images: [
                { src: 'images/CornerKitchen.jpg', caption: 'Full view of the corner kitchen' },
                { src: 'images/KitchenGloss.jpg', caption: 'Close-up of the countertops' },
                { src: 'images/KitchenOtherSide.jpg', caption: 'Storage solutions in the corner' }
            ]
        },
        { 
            id: 'wardrobe-2',
            title: 'White Wardrobe', 
            category: 'wardrobe',
            description: 'Elegant white wardrobe with mirror doors',
            images: [
                { src: 'images/whitewardrope.JPG', caption: 'Front view of the white wardrobe' },
                { src: 'images/wardrope.JPG', caption: 'Mirror door details' },
                { src: 'images/MustWardrope.jpg', caption: 'Interior organization' }
            ]
        }
    ]
};

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Setup contact information
    document.getElementById('contact-phone').textContent = siteData.phone;
    document.getElementById('contact-email').textContent = siteData.email;
    
    // Setup WhatsApp link
    const phoneDigits = siteData.phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(siteData.whatsappPrefill)}`;
    document.getElementById('whatsapp-link').href = whatsappUrl;
    
    // Setup email link
    const emailUrl = `mailto:${siteData.email}?subject=Quote%20Request%20from%20Website`;
    document.getElementById('email-link').href = emailUrl;
    
    // Populate portfolio
    renderPortfolio('all');
    
    // Setup portfolio filtering
    setupPortfolioFiltering();
    
    // Setup contact form
    setupContactForm();
    
    // Setup lightbox
    setupLightbox();
}

// Portfolio Functions
function renderPortfolio(filter) {
    const portfolioContainer = document.getElementById('portfolio-container');
    portfolioContainer.innerHTML = '';
    
    let filteredItems = siteData.portfolio;
    
    if (filter !== 'all') {
        filteredItems = siteData.portfolio.filter(item => item.category === filter);
    }
    
    filteredItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        
        portfolioItem.innerHTML = `
            <img src="${item.images[0].src}" alt="${item.title}" class="portfolio-img">
            <div class="gallery-badge">
                <i class="fas fa-images"></i>
                ${item.images.length} photos
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        portfolioItem.addEventListener('click', () => openLightbox(item));
        portfolioContainer.appendChild(portfolioItem);
    });
}

function setupPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio
            const filter = this.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
}

// Lightbox Functions
let currentGallery = null;
let currentImageIndex = 0;

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Close lightbox when clicking X or outside image
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
}

function openLightbox(gallery) {
    currentGallery = gallery;
    currentImageIndex = 0;
    updateLightbox();
    
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentGallery = null;
}

function showPrevImage() {
    if (!currentGallery) return;
    
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.images.length - 1;
    }
    updateLightbox();
}

function showNextImage() {
    if (!currentGallery) return;
    
    currentImageIndex++;
    if (currentImageIndex >= currentGallery.images.length) {
        currentImageIndex = 0;
    }
    updateLightbox();
}

function updateLightbox() {
    if (!currentGallery) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
    
    // Update main image and caption
    lightboxImg.src = currentGallery.images[currentImageIndex].src;
    lightboxCaption.textContent = currentGallery.images[currentImageIndex].caption;
    
    // Update thumbnails
    thumbnailsContainer.innerHTML = '';
    currentGallery.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.caption;
        thumbnail.className = 'lightbox-thumbnail';
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Contact Form Functions
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name) {
            alert('Please enter your name.');
            return;
        }
        
        if (!message) {
            alert('Please describe your project.');
            return;
        }
        
        // Create email content
        const subject = `Quote Request from ${name}`;
        let body = `Name: ${name}%0D%0A`;
        
        if (phone) body += `Phone: ${phone}%0D%0A`;
        if (email) body += `Email: ${email}%0D%0A`;
        if (service) body += `Service: ${document.getElementById('service').options[document.getElementById('service').selectedIndex].text}%0D%0A`;
        
        body += `%0D%0AProject Details:%0D%0A${encodeURIComponent(message)}`;
        
        // Open email client
        window.location.href = `mailto:${siteData.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Save to localStorage as backup
        saveToLocalStorage(name, phone, email, service, message);
        
        // Reset form
        contactForm.reset();
        
        // Show confirmation
        setTimeout(() => {
            alert('Thank you! Your request has been sent. We will get back to you soon.');
        }, 500);
    });
}

function saveToLocalStorage(name, phone, email, service, message) {
    const leads = JSON.parse(localStorage.getItem('joe_unit_leads') || '[]');
    leads.push({
        name: name,
        phone: phone,
        email: email,
        service: service,
        message: message,
        date: new Date().toISOString()
    });
    localStorage.setItem('joe_unit_leads', JSON.stringify(leads));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});