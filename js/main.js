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
        var form = $(this);
        var isValid = true;
        
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
        
        // Check if Formspree is configured
        var formAction = form.attr('action');
        var isFormspree = formAction && formAction.includes('formspree.io');
        var isNetlify = form.attr('data-netlify') === 'true';
        
        if (isFormspree) {
            // Submit form via Formspree
            // Add Accept header for JSON response
            var formData = form.serialize();
            
            $.ajax({
                url: formAction,
                method: 'POST',
                data: formData,
                dataType: 'json',
                headers: {
                    'Accept': 'application/json'
                },
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
                    var errorMessage = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.';
                    
                    // Try to parse error message from Formspree
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    }
                    
                    showFormMessage(errorMessage, 'error');
                    submitBtn.prop('disabled', false).text(originalText);
                }
            });
        } else if (isNetlify) {
            // For Netlify Forms
            var netlifyFormData = new FormData(form[0]);
            var encoded = new URLSearchParams(netlifyFormData).toString();
            
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encoded
            }).then(function() {
                showFormMessage('Спасибо! Ваше сообщение отправлено, мы свяжемся с вами в ближайшее время.', 'success');
                form[0].reset();
                submitBtn.prop('disabled', false).text(originalText);
            }).catch(function(error) {
                showFormMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.', 'error');
                submitBtn.prop('disabled', false).text(originalText);
            });
        } else {
            // Form not configured
            showFormMessage('Форма не настроена. Пожалуйста, укажите Formspree endpoint или используйте Netlify.', 'error');
            submitBtn.prop('disabled', false).text(originalText);
        }
        
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
    
    // Hero Slider functionality
    function initHeroSlider() {
        var currentSlide = 0;
        var slides = $('.hero-slider .slider-slide');
        var totalSlides = slides.length;
        var track = $('.hero-slider .slider-track');
        
        if (totalSlides === 0) return;
        
        function updateSlider() {
            // Remove active class from all slides
            slides.removeClass('active');
            
            // Add active class to current slide
            $(slides[currentSlide]).addClass('active');
            
            // Move track
            var translateX = -currentSlide * 100;
            track.css('transform', 'translateX(' + translateX + '%)');
        }
        
        // Initialize first slide
        updateSlider();
        
        // Next slide (hero slider only)
        $('.hero-slider .slider-arrow-next').off('click').on('click', function(e) {
            e.preventDefault();
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        // Previous slide (hero slider only)
        $('.hero-slider .slider-arrow-prev').off('click').on('click', function(e) {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Initialize hero slider when DOM is ready
    $(document).ready(function() {
        initHeroSlider();
        initPortfolioSlider();
    });
    
    // Auto-play slider (optional - uncomment to enable)
    /*
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000); // Change slide every 5 seconds
    */
    
    // Initialize slider
    updateSlider();
    
    // Portfolio Slider functionality
    function initPortfolioSlider() {
        var portfolioCurrentSlide = 0; // Start with slide 1 (рободевочка)
        var portfolioSlides = $('.portfolio-slide');
        var portfolioTotalSlides = portfolioSlides.length;
        var portfolioTrack = $('.portfolio-slider-track');
        var portfolioIndicators = $('.portfolio-indicators');
        
        if (portfolioTotalSlides === 0) return;
        
        function getSlidesPerView() {
            var windowWidth = $(window).width();
            if (windowWidth < 768) {
                return 1;
            } else if (windowWidth < 968) {
                return 2;
            } else if (windowWidth < 1480) {
                return 3;
            }
            return 4;
        }
        
        var slidesPerView = getSlidesPerView();
        
        // Create indicators
        function createPortfolioIndicators() {
            portfolioIndicators.empty();
            var totalPages = 7; // 7 indicators for 7 slides
            var normalizedSlide = ((portfolioCurrentSlide % portfolioTotalSlides) + portfolioTotalSlides) % portfolioTotalSlides;
            var currentIndicator = normalizedSlide;
            for (var i = 0; i < totalPages; i++) {
                var indicator = $('<div class="portfolio-indicator"></div>');
                if (i === currentIndicator) {
                    indicator.addClass('active');
                }
                portfolioIndicators.append(indicator);
            }
        }
        
        // Update portfolio slider with infinite loop
        function updatePortfolioSlider() {
            slidesPerView = getSlidesPerView();
            
            // Normalize currentSlide to always be within 0 to totalSlides-1 (infinite loop)
            var normalizedSlide = ((portfolioCurrentSlide % portfolioTotalSlides) + portfolioTotalSlides) % portfolioTotalSlides;
            
            // Remove active class from all slides
            portfolioSlides.removeClass('active');
            
            // Add active class to current slide (using normalized index)
            $(portfolioSlides[normalizedSlide]).addClass('active');
            
            // Move track using pixel width (includes gaps)
            // Use actual portfolioCurrentSlide for smooth continuous scrolling
            var slideWidth = portfolioSlides.eq(0).outerWidth(true);
            var translateX = -(normalizedSlide * slideWidth);
            portfolioTrack.css('transform', 'translateX(' + translateX + 'px)');
            
            // Update project details (using normalized index to get correct slide data)
            var activeSlide = portfolioSlides.eq(normalizedSlide);
            var projectNum = activeSlide.data('project');
            var projectName = activeSlide.data('name');
            var projectCategory = activeSlide.data('category');
            var projectValue = activeSlide.data('value');
            
            $('#portfolioProjectDetails').html(
                '<div class="project-number">№' + String(projectNum).padStart(2, '0') + '</div>' +
                '<div class="project-name">' + projectName + '</div>' +
                '<div class="project-category">' + projectCategory + '</div>'
            );
            
            // Update indicators - each indicator corresponds to one slide (using normalized index)
            var currentIndicator = normalizedSlide;
            $('.portfolio-indicator').removeClass('active');
            $('.portfolio-indicator').eq(currentIndicator).addClass('active');
        }
        
        // Helper function to get slides per indicator
        function getSlidesPerIndicator() {
            return Math.ceil(portfolioTotalSlides / 7);
        }
        
        // Next portfolio slide (infinite loop - just increment, normalization happens in updatePortfolioSlider)
        $('.portfolio-arrow-next').off('click').on('click', function() {
            portfolioCurrentSlide++;
            updatePortfolioSlider();
        });
        
        // Previous portfolio slide (infinite loop - just decrement, normalization happens in updatePortfolioSlider)
        $('.portfolio-arrow-prev').off('click').on('click', function() {
            portfolioCurrentSlide--;
            updatePortfolioSlider();
        });
        
        // Click on slide to make it active
        portfolioSlides.off('click').on('click', function() {
            portfolioCurrentSlide = $(this).index();
            updatePortfolioSlider();
        });
        
        // Click on indicator (each indicator corresponds to one slide)
        $(document).off('click', '.portfolio-indicator').on('click', '.portfolio-indicator', function() {
            var indicatorIndex = $(this).index();
            portfolioCurrentSlide = indicatorIndex;
            updatePortfolioSlider();
        });
        
        // Initialize portfolio slider
        createPortfolioIndicators();
        updatePortfolioSlider();
        
        // Handle window resize (debounced)
        var resizeTimeout;
        $(window).off('resize.portfolio').on('resize.portfolio', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                createPortfolioIndicators();
                updatePortfolioSlider();
            }, 150);
        });
    }
    
    // Wrap text in parentheses with smaller font
    $(document).ready(function() {
        $('.price-item-name').each(function() {
            var $this = $(this);
            var text = $this.html();
            // Replace text in parentheses with span.small-text
            text = text.replace(/\(([^)]+)\)/g, '<span class="small-text">($1)</span>');
            $this.html(text);
        });
    });
    
})(jQuery);
