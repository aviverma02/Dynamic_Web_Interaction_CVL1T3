// Counter variable
let counter = 0;

// Dropdown functionality
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownContent');
    dropdown.classList.toggle('show');
}

function handleNavClick(page) {
    const output = document.getElementById('navOutput');
    output.innerHTML = `<strong>Navigation:</strong> You clicked on "${page}" page`;
    document.getElementById('dropdownContent').classList.remove('show');
}

function navigateToPage(pageName) {
    // Show navigation pages area and hide main container to present a "new page" view
    const navPages = document.getElementById('navPages');
    const mainContainer = document.querySelector('.container');
    if (navPages) navPages.style.display = 'block';
    if (mainContainer) mainContainer.style.display = 'none';

    // Hide all nav pages and activate the selected one
    const pages = document.querySelectorAll('.nav-page');
    pages.forEach(page => page.classList.remove('active-nav-page'));

    const selectedPage = document.getElementById(pageName + 'Page');
    if (selectedPage) {
        selectedPage.classList.add('active-nav-page');
        // ensure top of page is visible
        selectedPage.scrollIntoView({ behavior: 'smooth' });
    }

    // Close dropdown
    const dropdown = document.getElementById('dropdownContent');
    if (dropdown) dropdown.classList.remove('show');
}

// Close the nav-pages view and return to the main container
function closeNavPages() {
    const navPages = document.getElementById('navPages');
    const mainContainer = document.querySelector('.container');
    if (navPages) navPages.style.display = 'none';
    if (mainContainer) mainContainer.style.display = '';

    // Remove active state from nav pages
    const pages = document.querySelectorAll('.nav-page');
    pages.forEach(page => page.classList.remove('active-nav-page'));

    // Optionally show the home page inside navPages for next open
    const home = document.getElementById('homePage');
    if (home) home.classList.add('active-nav-page');

    // Scroll main content into view
    const content = document.querySelector('.content');
    if (content) content.scrollIntoView({ behavior: 'smooth' });
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Modal functions
function openModal() {
    document.getElementById('modal').classList.add('show');
    goToModalPage(1); // Start from page 1
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function goToModalPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.modal-page');
    pages.forEach(page => page.classList.remove('active-page'));
    
    // Show selected page
    const selectedPage = document.getElementById(`modalPage${pageNumber}`);
    if (selectedPage) {
        selectedPage.classList.add('active-page');
    }
    
    // Update progress dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === pageNumber - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update page counter
    document.getElementById('currentPage').textContent = pageNumber;
}

function handleCTA(action) {
    const messageDiv = document.getElementById('ctaMessage');
    const messages = {
        explore: '🎉 Great! Explore all the interactive features on this page!',
        learn: '📚 Check out the form validation section to learn more JavaScript!',
        practice: '✏️ Try modifying the JavaScript code to create your own modals!'
    };
    
    messageDiv.textContent = messages[action];
    messageDiv.style.display = 'block';
    messageDiv.style.animation = 'slideInContent 0.3s ease-out';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Reset all error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.classList.remove('show'));
    
    // Validate name
    const name = document.getElementById('fullName').value.trim();
    if (name.length < 3) {
        document.getElementById('nameError').classList.add('show');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').classList.add('show');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').classList.add('show');
        isValid = false;
    }
    
    // Validate age
    const age = parseInt(document.getElementById('age').value);
    if (isNaN(age) || age < 18 || age > 100) {
        document.getElementById('ageError').classList.add('show');
        isValid = false;
    }
    
    // Validate country
    const country = document.getElementById('country').value;
    if (country === '') {
        document.getElementById('countryError').classList.add('show');
        isValid = false;
    }
    
    // Process form if valid
    if (isValid) {
        processFormSubmission();
    }
    
    return false;
}

function processFormSubmission() {
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        age: document.getElementById('age').value,
        country: document.getElementById('country').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toLocaleString()
    };
    
    // Save to localStorage
    let submissions = JSON.parse(localStorage.getItem('registrationSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('registrationSubmissions', JSON.stringify(submissions));
    
    // Display success page with data
    displaySuccessPage(formData);
}

function displaySuccessPage(formData) {
    // Populate success page with form data
    document.getElementById('displayName').textContent = formData.fullName;
    document.getElementById('displayEmail').textContent = formData.email;
    document.getElementById('displayPhone').textContent = formData.phone;
    document.getElementById('displayAge').textContent = formData.age + ' years old';
    document.getElementById('displayCountry').textContent = formData.country;
    document.getElementById('displayMessage').textContent = formData.message || '(No message provided)';
    document.getElementById('submissionTime').textContent = 'Submitted on ' + formData.timestamp;
    
    // Hide form and show success page
    document.querySelector('.content').style.display = 'none';
    document.getElementById('successPage').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('registrationForm').reset();
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.classList.remove('show'));
    document.getElementById('successMessage').classList.remove('show');
}

function submitAnother() {
    // Reset form and return to form page
    resetForm();
    document.querySelector('.content').style.display = 'block';
    document.getElementById('successPage').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    // Reset form and return to form page
    resetForm();
    document.querySelector('.content').style.display = 'block';
    document.getElementById('successPage').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Counter functions
function incrementCounter() {
    counter++;
    updateCounterDisplay();
}

function decrementCounter() {
    counter--;
    updateCounterDisplay();
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
}

function incrementByFive() {
    counter += 5;
    updateCounterDisplay();
}

function updateCounterDisplay() {
    const display = document.getElementById('counter');
    display.textContent = counter;
    
    // Add animation effect
    display.style.transform = 'scale(1.2)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 200);
}

// Add real-time validation feedback
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fullName').addEventListener('input', function() {
        if (this.value.trim().length >= 3) {
            document.getElementById('nameError').classList.remove('show');
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            document.getElementById('emailError').classList.remove('show');
        }
    });

    document.getElementById('phone').addEventListener('input', function() {
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(this.value.trim())) {
            document.getElementById('phoneError').classList.remove('show');
        }
    });

    document.getElementById('age').addEventListener('input', function() {
        const age = parseInt(this.value);
        if (!isNaN(age) && age >= 18 && age <= 100) {
            document.getElementById('ageError').classList.remove('show');
        }
    });

    document.getElementById('country').addEventListener('change', function() {
        if (this.value !== '') {
            document.getElementById('countryError').classList.remove('show');
        }
    });
});