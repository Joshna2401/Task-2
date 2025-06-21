document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetErrors();
        
        // Validate form
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Form is valid - in a real app, you would send data to server here
            contactForm.reset();
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        }
    });
    
    // Field validation functions
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const value = nameInput.value.trim();
        
        if (!value) {
            showError(nameInput, nameError, 'Name is required');
            return false;
        }
        
        if (!nameRegex.test(value)) {
            showError(nameInput, nameError, 'Please enter a valid name (2-50 characters, letters only)');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const value = emailInput.value.trim();
        
        if (!value) {
            showError(emailInput, emailError, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const value = phoneInput.value.trim();
        
        // Phone is optional, but if provided, validate it
        if (value && !phoneRegex.test(value)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        const value = messageInput.value.trim();
        
        if (!value) {
            showError(messageInput, messageError, 'Message is required');
            return false;
        }
        
        if (value.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        }
        
        return true;
    }
    
    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
        
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    // Real-time validation for better UX
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('message').addEventListener('blur', validateMessage);
});