/**
 * Impulse Creative Consulting - Main JavaScript
 * Static version (without WordPress)
 */

(function($) {
    'use strict';
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Form validation and submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var isValid = true;
        var form = $(this);
        
        // Clear previous errors
        form.find('input, textarea').css('border', 'none');
        
        // Check required fields
        form.find('input[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('border', '2px solid #dc2b46');
            }
        });
        
        // Email validation
        var email = form.find('input[type="email"]').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            isValid = false;
            form.find('input[type="email"]').css('border', '2px solid #dc2b46');
        }
        
        if (!isValid) {
            showFormMessage('Пожалуйста, заполните все обязательные поля корректно.', 'error');
            return false;
        }
        
        // Disable submit button
        var submitBtn = form.find('.submit-btn');
        var originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Отправка...');
        
        // Check if using Netlify Forms (has data-netlify attribute)
        if (form.attr('data-netlify') === 'true' && (!form.attr('action') || form.attr('action').includes('YOUR_FORM_ID'))) {
            // Netlify Forms - let form submit normally
            // Netlify will handle it server-side
            return true;
        }
        
        // Check if Formspree is configured
        var formAction = form.attr('action');
        if (!formAction || formAction.includes('YOUR_FORM_ID')) {
            showFormMessage('Пожалуйста, настройте форму обратной связи. См. инструкцию в файле ИНСТРУКЦИЯ-ПУБЛИКАЦИЯ.md', 'error');
            submitBtn.prop('disabled', false).text(originalText);
            return false;
        }
        
        // Submit form via Formspree
        $.ajax({
            url: formAction,
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                showFormMessage('Спасибо! Ваше сообщение отправлено, мы свяжемся с вами в ближайшее время.', 'success');
                form[0].reset();
                submitBtn.prop('disabled', false).text(originalText);
                
                // Scroll to message
                $('html, body').animate({
                    scrollTop: $('#form-message').offset().top - 100
                }, 500);
            },
            error: function(xhr) {
                showFormMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.', 'error');
                submitBtn.prop('disabled', false).text(originalText);
            }
        });
        
        return false;
    });
    
    // Show form message
    function showFormMessage(message, type) {
        var messageDiv = $('#form-message');
        var bgColor = type === 'success' ? '#4caf50' : '#dc2b46';
        messageDiv.css({
            'background-color': bgColor,
            'color': 'white',
            'display': 'block'
        }).text(message);
        
        // Hide message after 5 seconds
        setTimeout(function() {
            messageDiv.fadeOut();
        }, 5000);
    }
    
    // Remove error styling on input
    $('.contact-form input, .contact-form textarea').on('input', function() {
        $(this).css('border', 'none');
    });
    
    // Mobile menu toggle (if needed in future)
    $('.menu-toggle').on('click', function() {
        $('.main-nav').toggleClass('active');
    });
    
})(jQuery);
