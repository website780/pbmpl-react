(function($) {
    "use strict";
    $(document).ready(function() {



        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function(e) {
            e.preventDefault();
        });

        $('.s7t-header-menu').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });

        $('.s7t-header-menu').on('click', function(e) {
            e.preventDefault();
            $('.navbar-expand-lg').toggleClass('expand_close');
        });

        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");
            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();
                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }
        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /* -------------------------------------------------------------
            menu show Form
        ------------------------------------------------------------- */
        if ($(window).width() > 991) {
            if ($('.cat-menu').length) {
                $(".cat-menu").on('click', function() {
                    $(".cat-menu-wrap .sidebar-categories").fadeToggle("sidebar-categories-show", "linear");
                    $('.cat-menu').toggleClass('open');
                });
                $('body').on('click', function(event) {
                    if (!$(event.target).closest('.cat-menu').length && !$(event.target).closest('.cat-menu-wrap .sidebar-categories').length) {
                        $(".cat-menu-wrap .sidebar-categories").fadeOut("sidebar-categories-show");
                    }
                    if (!$(event.target).closest('.cat-menu').length && !$(event.target).closest('.cat-menu-wrap .sidebar-categories').length) {
                        $('.cat-menu').removeClass('open');
                    }
                });
            }
        };

        /*---------------------------
            banner V3 slider
        --------------------------*/
        var bannerSlider = jQuery(".banner-v3-slider-area-wrapper");
        if (bannerSlider.length) {
            bannerSlider
                .slick({
                    slidesToShow: 1,
                    autoplay: false,
                    arrows: false,
                    pauseOnFocus: true,
                    pauseOnHover: false,
                    pauseOnDotsHover: true,
                    dots: true,
                    autoplaySpeed: 10000,
                    responsive: [{
                        breakpoint: 769,
                        settings: {
                            dots: false
                        }
                    }]
                })
                .slickAnimation();
        } 
         $(".banner-v3-slider-area-wrapper").on("beforeChange", function(event, slick, currentSlide, nextSlide) {
            var firstNumber = check_number(++nextSlide);
            $(".banner-v3-slider-controls .slider-extra .text .first").text(firstNumber);
            resetProgressbar(
                $(".banner-v3-slider-controls .slider-extra .slider-progress .progress-width")

            );
        });
        $(".banner-v3-slider-area-wrapper").on("afterChange", function(event, slick, currentSlide, nextSlide) {
            startProgressbar(
                $(".banner-v3-slider-controls .slider-extra .slider-progress .progress-width")
            );
        });

        startProgressbar($(".banner-v3-slider-controls .slider-extra .slider-progress .progress-width"));
        //progressbar js
        function startProgressbar(selector) {
            selector.css({
                width: "100%",
                transition: "all 10000ms"
            });
        }
        function resetProgressbar(selector) {
            selector.css({
                width: "0%",
                transition: "all 0ms"
            });
        }
        var bannerv3Slider = $(".banner-v3-slider-area-wrapper").slick("getSlick");
        var bannerv3SliderCount = bannerv3Slider.slideCount;
        $(".banner-v3-slider-controls .slider-extra .text .last").text(check_number(bannerv3SliderCount));
        function check_number(num) {
            var IsInteger = /^[0-9]+$/.test(num);
            return IsInteger ? "0" + num : null;
        };


         /*---------------------------------------------------
            banner consult Slider
        ----------------------------------------------------*/
        $('.banner-silder').slick({
            dots: true,
            autoplay: true,
            infinite: true,
            arrows: true,
            autoplaySpeed: 5000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
        .on('afterChange', function() {
            new WOW().init();
        });

        /*------------------------------------------------
            banner-slider-consultint

        ------------------------------------------------*/
        $('.banner-slider-consultint').slick({
         autoplay: true, 
         arrows:false,        
         dots: false,
         infinite: true,
         slidesToShow: 1,
         fade: true,
         pauseOnHover:false,
         pauseOnDotsHover:false,
         cssEase: 'linear',
        });

         /*----------------------
             Search Popup
         -----------------------*/
         var bodyOvrelay = $('#body-overlay');
         var searchPopup = $('#search-popup');
         var sidebarMenu = $('#sidebar-menu');
         $(document).on('click', '#body-overlay', function(e) {
             e.preventDefault();
             bodyOvrelay.removeClass('active');
             searchPopup.removeClass('active');
             sidebarMenu.removeClass('active');
         });
         $(document).on('click', '#search', function(e) {
             e.preventDefault();
             searchPopup.addClass('active');
             bodyOvrelay.addClass('active');
         });
         // sidebar menu 
         $(document).on('click', '.sidebar-menu-close', function(e) {
             e.preventDefault();
             bodyOvrelay.removeClass('active');
             sidebarMenu.removeClass('active');
         });
         $(document).on('click', '#navigation-button', function(e) {
             e.preventDefault();
             sidebarMenu.addClass('active');
             bodyOvrelay.addClass('active');
         });
         /*------------------
            back to top
        ------------------*/
         $(document).on('click', '.back-to-top', function() {
             $("html,body").animate({
                 scrollTop: 0
             }, 2000);
         });

           /*-----------------
            scroll
    ------------------*/
    $(window).on("scroll", function() {
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }
    });
    $(window).on('load', function() {
        /*-----------------
            preloader
        ------------------*/
        var preloader = $('#preloader'),
        loader = preloader.find('.spinner');
        loader.fadeOut();
        preloader.delay(500).fadeOut('slow');
        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();
        /*--------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function(e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });
          /**-------------------------------
         * - wow js init
         * ---------------------------**/
        new WOW().init();
    });

        /*-------------------------------------------------
            Magnific JS 
    ------------------------------------------------- */
    $('.video-play-btn').magnificPopup({
        type: 'iframe',
        removalDelay: 260,
        mainClass: 'mfp-zoom-in',
    });
    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/ttv0ApD4wtw'

                }
            }
        }
    });
   /* -------------------------------------------------
       testimonial-slider JS 
   ------------------------------------------------- */

   $('.testimonial-main-slider').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       dots: false,
       arrows: true,
       fade: true,
       prevArrow: '<span class="slick-prev"><i class="fa fa-arrow-left"></i></span>',
       nextArrow: '<span class="slick-next"><i class="fa fa-arrow-right"></i></span>',
       asNavFor: '.testimonial-thumb-slider'
   });

   $('.testimonial-thumb-slider').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       asNavFor: '.testimonial-main-slider',
       dots: false,
       fade: true,
   });
       /* -------------------------------------------------
        partner-slider JS 
    ------------------------------------------------- */

    $('.partner-slider').slick({
        dots: false,
        autoplay: true,
        arrows:false,
        speed: 1500, 
        slidesToShow: 4,
        slidesToScroll: 1, 
        infinite: true,    
        responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 980,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }); 

    /*------------------------------------------------
        testimonial-slider-consultint
    ------------------------------------------------*/

    $('.testimonial-slider-consultint').slick({
        dots: true,
        autoplay: false,
        arrows:false,
        infinite: true,
        speed: 300, 
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear',    
        responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }); 
    // <!-- Style 3 -->
    $('.testimonial-slider-consultint-3').slick({
        dots: false,
        autoplay: false,
        arrows:true,
        infinite: true,
        speed: 300, 
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear', 
        prevArrow: "<div class='arrow-prev'><i class='fa fa-angle-left'></i></div>",
        nextArrow: "<div class='arrow-next'><i class='fa fa-angle-right'></i></div>",    
        responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }); 

    /*------------------------------------------------
        Blog Slider Gallery
    ------------------------------------------------*/
    $('.postbox-gallery').slick({
        dots: false,
        autoplay: false,
        arrows:true,
        infinite: true,
        speed: 300, 
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
        prevArrow: "<div class='arrow-prev'><i class='fa fa-angle-left'></i></div>",
        nextArrow: "<div class='arrow-next'><i class='fa fa-angle-right'></i></div>",     
    }); 

      /* ==== CounterUp ==== */  
      if ($('.counter').length) {
        $('.counter').counterUp({
          delay: 10,
          time: 2000
        });
      }

		/*------------------------------------------------
		   calculate
		------------------------------------------------*/

		function calculatorForm(){
			let tipsForm = document.querySelector('#tip-form');

			if( tipsForm ){

				let result = tipsForm.addEventListener('change', (event) => {
					   // Selecting Elements
					const bill = Number(document.querySelector('#totalBill').value);
					const tipOutput = document.querySelector('#tipOutput');
					const tipAmount = document.querySelector('#tipAmount');
					const totalBillWithTip = document.querySelector('#totalBillWithTip');
					const results = document.querySelector('#results');

					// Calculation
					const tipValue = bill * (10 / 100);
					const finalBill = bill + tipValue;

					tipAmount.value = tipValue.toFixed(2);
					totalBillWithTip.value = finalBill.toFixed(2); 
				});

				return result;

			}

		}
		calculatorForm();
		
		
		


    });

}(jQuery));

