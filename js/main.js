(function(){
	function setEqualHeight(columns) {
	    var tallestcolumn = 0;

	    columns.each(function() {
	        currentHeight = $(this).height();
	        if(currentHeight > tallestcolumn) {
	            tallestcolumn  = currentHeight;
	            }
	        }
	    );

		columns.height(tallestcolumn);
	}

	var delay = (function(){
		var timer = 0;
		
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	var app = {
		init: function(){

			// Fittxt
			$(document).on('animating.slides', function(a){				
				setTimeout(function(){
					$('.fittext').fitText(0.78, { minFontSize: '40px', maxFontSize: '100px' });
					$('.hugetext').fitText(0.5, { minFontSize: '100px', maxFontSize: '180px' });
					$('.introticker').fitText(2, { minFontSize: '16px', maxFontSize: '50px' });
				}, 100)
			});

			$('.fittext').fitText(0.78, { minFontSize: '40px', maxFontSize: '100px' });
			$('.hugetext').fitText(0.5, { minFontSize: '100px', maxFontSize: '180px' });
			$('.introticker').fitText(2, { minFontSize: '16px', maxFontSize: '50px' });

			// Smooth scroll
			$('a[href^="#"]').bind('click.smoothscroll',function (e) {
				e.preventDefault();

		        var target = this.hash,
		        $target = $(target);

		        $('html, body').stop().animate({
					'scrollTop': $target.offset().top-0
		        }, 900, 'swing', function () {
					window.location.hash = target;
				});
			});

			// Superslides fullscreen slider
			$('#slides').superslides({
				play: 4000,
				animation: 'fade', // [string] slide or fade. This matches animations defined by fx engine.
				animation_speed: 'normal',
				animation_easing: 'linear'

			});

			// Menu settings
			$('#menuToggle, .menu-close').on('click', function(){
				$('#menuToggle').toggleClass('active');
				$('body').toggleClass('body-push-toleft');
				$('#navbar').toggleClass('menu-open');
			});

			// Scrollable menu on small devices
			$(window).bind("load resize", function(){
				if($(window).height() < 400){
					$(".menu").css("overflow-y","scroll");
				}
				else {
					$(".menu").css("overflow-y","hidden");
				}
			});

			// Preload the fullscreen images
			$('.fullscreen-image:not(:first)').each(function(){
				var img = $('<img />'),
					bgSrc = $(this).css('backgroundImage').match(/[^\(]+\.(gif|jpg|jpeg|png)/g);

				if(bgSrc && bgSrc.length){
					img.attr('src', bgSrc[0]);
				}
			});

			// Sudoslider services slider
			$("#services-slider").sudoSlider({
				customLink:'a.servicesLink',
				speed: 400,
				responsive: true,
				prevNext: true,
				prevHtml: '<a href="#" class="services-arrow-prev"><i class="ion-ios7-arrow-left"></i></a>', 
				nextHtml: '<a href="#" class="services-arrow-next"><i class="ion-ios7-arrow-right"></i></a>', 
				useCSS: true,
				continuous: true,
				updateBefore: true
			});

			// Sudoslider testimonial slider
			$("#testimonial-slider").sudoSlider({
				customLink:'a.testimonialLink',
				speed: 400,
				responsive: true,
				prevNext: true, // Set this to false if you only want to show one testimonial
				prevHtml: '<a href="#" class="testimonial-arrow-prev"><i class="ion-ios7-arrow-left"></i></a>', 
				nextHtml: '<a href="#" class="testimonial-arrow-next"><i class="ion-ios7-arrow-right"></i></a>', 
				useCSS: true,
				continuous: true,
				updateBefore: true
			});


			// Sudoslider portfolio slider
			$("#portfolio-slider").sudoSlider({
				customLink:'a.portfolioLink',
				speed: 400,
				numeric: true,
				responsive: true,
				prevNext: true,
				prevHtml: '<a href="#" class="portfolio-arrow-prev"><i class="ion-ios7-arrow-left"></i></a>', 
				nextHtml: '<a href="#" class="portfolio-arrow-next"><i class="ion-ios7-arrow-right"></i></a>', 
				useCSS: true,
				continuous: true,
				updateBefore: true
			});

			// Portfolio Mixitup
			$('#portfolio-grid').mixitup({
				onMixStart: function(a){
					$('#filter-container').addClass('filtered');
				}
			});

			// Magnific popup for images
			$('.popup').magnificPopup({ 
			type: 'image',
			fixedContentPos: false,
			mainClass: 'mfp-with-zoom',
				zoom: {
					enabled: true,
					duration: 300,
					easing: 'ease-in-out', 
					opener: function(openerElement) {
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				}
			});

			// Magnific popup for videos
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});

			// Contact Form
			$('#contact').submit(function(e) {
				e.preventDefault();

				$.ajax({
					url: 'inc/contact.php',
					data: 'name='+ escape($('#contactName').val()) +'&email=' + escape($('#contactEmail').val()) + '&phone=' + escape($('#contactPhone').val()) + '&message='+escape($('#contactMessage').val()),
					dataType: 'json',
					success: function(resp) {
						$('#contactName, #contactEmail, #contactMessage').removeClass('error');

						if(resp.success == 1){
							$('#modalContent').text(resp.message);
							$('#modal, #modalOverlay').fadeIn(500);

							$('#contactName, #contactEmail, #contactMessage, #contactPhone').val('');
						}
						else {
							if(resp.errorCode == 1){
								$('#contactName').addClass('error').focus();
							}
							else if(resp.errorCode == 2){
								$('#contactEmail').addClass('error').focus();
							}
							else if(resp.errorCode == 3){
								$('#contactMessage').addClass('error').focus();
							}	
						}					
					}
				});
			
				return false;
			});

			$('#modal').on('click touchstart', function(e){
				e.stopPropagation();
			});

			$('#modalClose, #modalOverlay').on('click touchstart', function(){
				$('#modal, #modalOverlay').fadeOut(500);
			});
		},
		domReady: function(){},
		windowLoad: function(){
			$('#loader').fadeOut();
			
			$('a.popup').each(function(){
                var t = $(this),
                    img = $('<img />');
                 
                    img.attr('src', t.attr('href'));
            });
		}
	};

	app.init();
	$(function(){
		app.domReady();

		$(window).load(app.windowLoad);
	});

	$(window).resize(function() {
	    delay(function(){
	        $('.same-height').css('height','auto'); //solve for all you browser stretchers out there!
	        setEqualHeight($('.same-height'));
	    }, 500);
	});

})(jQuery)