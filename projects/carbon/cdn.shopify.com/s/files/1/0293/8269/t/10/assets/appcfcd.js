(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _environment = require('./utils/environment');

var _html = require('./utils/html');

var _globals = require('./utils/globals');

var _globals2 = _interopRequireDefault(_globals);

var _modules = require('./modules');

var modules = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


// Global functions and tools


// Basic modules


var App = function () {
    function App() {
        var _this2 = this;

        _classCallCheck(this, App);

        this.modules = modules;
        this.currentModules = [];

        _environment.$document.on('initModules.App', function (event) {
            _this2.initGlobals(event.firstBlood).deleteModules().initModules();
        });
    }

    /**
     * Destroy all existing modules
     * @return  {Object}  this  Allows chaining
     */


    App.prototype.deleteModules = function deleteModules() {
        // Loop modules
        var i = this.currentModules.length;

        // Destroy all modules
        while (i--) {
            this.currentModules[i].destroy();
            this.currentModules.splice(i);
        }

        return this;
    };

    /**
     * Execute global functions and settings
     * Allows you to initialize global modules only once if you need
     * (ex.: when using Barba.js or SmoothState.js)
     * @return  {Object}  this  Allows chaining
     */


    App.prototype.initGlobals = function initGlobals(firstBlood) {
        (0, _globals2.default)(firstBlood);
        return this;
    };

    /**
     * Find modules and initialize them
     * @return  {Object}  this  Allows chaining
     */


    App.prototype.initModules = function initModules() {
        // Elements with module
        var moduleEls = document.querySelectorAll('[data-module]');

        // Loop through elements
        var i = 0;
        var elsLen = moduleEls.length;

        for (; i < elsLen; i++) {

            // Current element
            var el = moduleEls[i];

            // All data- attributes considered as options
            var options = (0, _html.getNodeData)(el);

            // Add current DOM element and jQuery element
            options.el = el;
            options.$el = $(el);

            // Module does exist at this point
            var attr = options.module;

            // Splitting modules found in the data-attribute
            var moduleIdents = attr.replace(/\s/g, '').split(',');

            // Loop modules
            var j = 0;
            var modulesLen = moduleIdents.length;

            for (; j < modulesLen; j++) {
                var moduleAttr = moduleIdents[j];

                if (typeof this.modules[moduleAttr] === 'function') {
                    var module = new this.modules[moduleAttr](options);
                    this.currentModules.push(module);
                }
            }
        }

        return this;
    };

    return App;
}();

// IIFE for loading the application
// ==========================================================================


(function () {})();

// remap jQuery to $
(function ($) {
  
  	$(document).on('click','.c-slider-overlay-product_item',function(e) {
      if ($(e.target).is('img')) return;
      $('body').toggleClass('has-slider-open');
    });

    function initScript() {

        window.App = new App();
        _environment.$document.trigger({
            type: 'initModules.App',
            firstBlood: true
        });
		
      	$('.c-key-ingredients ul').appendTo($('.js-key-ingrendients').html(''));
        if (is.desktop() && $(window).width() > 1024 || is.ie() && $(window).width() > 1024) {
            _environment.$document.on('SmoothScroll.isReady', function (event) {
                $('.barba-container').addClass('is-loaded');
                _environment.$body.addClass('dom-is-loaded');
            });
        }

        // Script Contact page
        $('.js-toggle-form-feedback').click(function () {
            $('.js-contact-choose').toggleClass('is-hide');

            setTimeout(function () {
                $('.js-contact-choose').hide();
                $('.js-form-feedback').show();
            }, 900);

            setTimeout(function () {
                $('.js-form-feedback').toggleClass('is-hide');
                $(document).trigger('SmoothScroll.rebuild');
            }, 1200);

            return false;
        });

        $('.js-feedback-back').click(function () {
            $('.js-form-feedback').toggleClass('is-hide');

            setTimeout(function () {
                $('.js-form-feedback').hide();
                $('.js-contact-choose').show();
            }, 900);

            setTimeout(function () {
                $('.js-contact-choose').toggleClass('is-hide');
                $(document).trigger('SmoothScroll.rebuild');
            }, 1200);

            return false;
        });

        $('.js-toggle-form-enquiries').click(function () {
            $('.js-contact-choose').toggleClass('is-hide');

            setTimeout(function () {
                $('.js-contact-choose').hide();
                $('.js-form-enquiries').show();
            }, 900);

            setTimeout(function () {
                $('.js-form-enquiries').toggleClass('is-hide');
                $(document).trigger('SmoothScroll.rebuild');
            }, 1200);

            return false;
        });

        $('.js-enquiries-back').click(function () {
            $('.js-form-enquiries').toggleClass('is-hide');

            setTimeout(function () {
                $('.js-form-enquiries').hide();
                $('.js-contact-choose').show();
            }, 900);

            setTimeout(function () {
                $('.js-contact-choose').toggleClass('is-hide');
                $(document).trigger('SmoothScroll.rebuild');
            }, 1200);

            return false;
        });

        $('.js-textarea').on('click', function () {
            $(this).addClass('is-show');
            var $text = $(this).find('.js-write');
            if ($text.text() == '') $text.get(0).focus();
        });

        $('.js-textarea .js-write').on('focus', function () {
            $(this).parent().addClass('is-show');
        });

        $('.js-textarea .js-write').on('keyup', function () {
            $('.js-textarea').prev().val($(this).text());
        });

        $(function () {
            $(".js-type-here").typed({
                strings: ["Type here"],
                typeSpeed: 50,
                loop: true,
                backDelay: 2500
            });
        });

        // End script contact page


        $('.js-toogle-brand:not(.-inited)').click(function () {
            $('.c-brand-list-nav').toggleClass('is-show');
            $(this).toggleClass('is-show');
        }).addClass("-inited");

        // Toggle Share
        $('.js-toogle-share:not(.-inited)').click(function () {
            $('.c-link-share').toggleClass('is-open');
            $(this).toggleClass('is-open');
        }).addClass("-inited");
      
      	// Toggle Slider overlay
        $('.js-overlay-slider:not(.-inited)').click(function(){
          	$('.js-slider-overlay-product').slick('slickGoTo',$(this).parent().index(),true);
            $('body').toggleClass('has-slider-open');
        }).addClass("-inited");
      
      	

        // Toggle Nav
        $('.js-toggle-nav:not(.-inited)').on('click', function () {
            //.c-nav_wrap
            if ($('body').hasClass('has-category-open')) {
                $('body').toggleClass('has-category-open');
            } else if ($('body').hasClass('has-search-open')) {
                $('body').toggleClass('has-search-open');
                $('body').toggleClass('has-nav-open');
            } else {
                $('body').toggleClass('has-nav-open');
            }
          
          	setTimeout(function () {
              $('.c-nav_wrap').animate({ scrollTop: 0 }, 0);
            }, 600);

            if (!$('body').hasClass('has-nav-open')) {
                setTimeout(function () {
                    $('.c-nav_wrap').animate({ scrollTop: 0 }, 0);
                }, 0);
            }
        }).addClass("-inited");

        // Toggle category
        $('.js-toggle-category:not(.-inited)').on('click', function () {
            if ($(this).hasClass('c-button-nav')) {
                $('body').removeClass('has-category-open');
            } else {
                $('body').addClass('has-category-open');
            }

            if ($('.c-button-nav').hasClass('js-toggle-nav')) {
                $('.c-button-nav').removeClass('js-toggle-nav');
                $('.c-button-nav').addClass('js-toggle-category');
            } else {
                $('.c-button-nav').removeClass('js-toggle-category');
                $('.c-button-nav').addClass('js-toggle-nav');
            }
            return false;
        }).addClass("-inited");

        // Toggle Product
        $('.js-toggle-product:not(.-inited)').click(function () {
            if ($(this).hasClass('has-product-open')) {
                $('.c-nav-product-dropdown.is-active').removeClass('is-active').slideToggle();
                $('.has-product-open').removeClass('has-product-open');

                $('body').removeClass('has-dropdown-expand');
            } else {
                $('.c-nav-product-dropdown.is-active').removeClass('is-active').slideToggle();
                $('.has-product-open').removeClass('has-product-open');

                $(this).toggleClass('has-product-open').next().slideToggle();
                $(this).next().toggleClass('is-active');

                $('body').addClass('has-dropdown-expand');
            }
            return false;
        }).addClass("-inited");

        //Toggle sidebar mobile
        $('.js-toogle-sidebar-mobile:not(.-inited)').click(function () {
            $('.c-product-aside').slideToggle(300);
            if ($(this).hasClass('is-open')) {
                $(this).removeClass('is-open');
                $('body').removeClass('has-nav-product-open');
            } else {
                $(this).addClass('is-open');
                $('body').addClass('has-nav-product-open');
            }
            return false;
        }).addClass("-inited");
      
      

        // Accordion
        $('.js-accordion:not(.-inited)').click(function () {
            setTimeout(function () {
                $(document).trigger('SmoothScroll.rebuild');
            }, 400);

            if ($(this).hasClass('is-open')) {
                $(this).removeClass('is-open').next().slideUp(300);
            } else {
                if ($('.js-accordion.is-open').length) {
                    $('.js-accordion.is-open').removeClass('is-open').next().slideUp(300);
                };
                $(this).addClass('is-open').next().slideDown(300);
                var _this = $(this); // scope baby
                setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: $(_this).offset().top - 160
                    }, 500);
                }, 300);
            }
            return false;
        }).addClass("-inited");

        // Script filter
        $('.js-filter:not(.-inited)').click(function () {
            if ($(this).hasClass('is-open')) {
                $(this).removeClass('is-open').next().slideUp(300);
            } else {
                if ($('.js-filter.is-open').length) {
                    $('.js-filter.is-open').removeClass('is-open').next().slideUp(300);
                };
                $(this).addClass('is-open').next().slideDown(300);
            }
            return false;
        }).addClass("-inited");

        // Toggle Search
        $('.js-toggle-search:not(.-inited)').click(function () {
            if ($('body').hasClass('has-nav-open')) {
                $('body').toggleClass('has-nav-open');
                $('body').toggleClass('has-search-open');
            } else {
                $('body').toggleClass('has-search-open');
            }
            setTimeout(function () {
                $(".js-search-input").focus();
            }, 1200);

            return false;
        }).addClass("-inited");

        // Swipebox
        $('.js-photos').swipebox({
            //autoplayVideos: true,
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            initialIndexOnArray: 0, // which image index to init when a array is passed
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            beforeOpen: function beforeOpen() {}, // called before opening
            afterOpen: null, // called after opening
            afterClose: function afterClose() {}, // called after closing
            loopAtEnd: true // true will return to the first image after the last image is reached
        });

        // Move background about page
        var min = -120;
        var max = 120;
        var elToRotate = $('.js-move-bg');

        function getRotatingAngle(p, min, max) {
            var angle = 1 / 100 * (p * max + 100 * min - p * min);
            return angle;
        }

        //Get element width
        var progressWidth = $(window).width();
        var progressHeight = $(window).height();

        $(window).mousemove(function (e) {
            // Get element position
            var parentOffset = $('this').offset();

            // Cursor position X
            var relX = e.clientX;

            // Cursor position Y
            var relY = e.clientY;

            // La souris se trouve à X% au dessus de l'élément
            var currentProgressX = relX / progressWidth * 100;
            currentProgressX = Math.round(currentProgressX);

            // La souris se trouve à Y% au dessus de l'élément
            var currentProgressY = relY / progressHeight * 100;
            currentProgressY = Math.round(currentProgressY);

            // Ce qui donne X degrés de rotation :
            var getAngleX = getRotatingAngle(currentProgressX, min, max);
            var getAngleY = getRotatingAngle(currentProgressY, min, max);

            elToRotate.css("transform", "translateX(" + getAngleX + "px) translateY(" + getAngleY + "px)");
        });

        // End script move background about page


        $(window).resize(function () {
            $(document).trigger('SmoothScroll.rebuild');
        });

        if (is.desktop() && $(window).width() > 1024 || is.ie() && $(window).width() > 1024) {
            $('html').addClass('is-desktop');
            $(document).trigger('SmoothScroll.rebuild');
        } else {
            //$('body').addClass('is-loaded');
          
          	$('.js-scrollto').click(function() {
       			var target = $(this.hash);
       			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       			if (target.length) {
       				$('html, body').animate({
       					scrollTop: target.offset().top - 86
       				}, 1000);
       				return false;
       			}
    	    });

            $('html').addClass('is-mobile');

            $('.c-overlay-changing-page').removeClass('is-active');

            hunt(document.getElementsByClassName('js-parallax'), {
                in: function _in() {
                    this.classList.add('is-inview');
                },
                offset: 0
            });
        };
      
      	if (is.ie()) {
          $('html').addClass('is-all-ie');
        }

        // Script slider
        $('.js-slider').slick({
            infinite: false,
            speed: 900
        });
      
      	$(window).resize(function() {
        	$('.js-slider-overlay-product img').css('max-height',$(window).height()-160);
        });
        $('.js-slider-overlay-product img').css('max-height',$(window).height()-160);

        $('.js-slider-overlay-product').slick({
            infinite: true,
            speed: 500,
          	arrow: true
        });

//         $('.js-slider-product').slick({
//             infinite: false,
//             speed: 900,
//             arrows: false,
//             fade: true,
//             //vertical: true,
//             autoplay: false,
//             autoplaySpeed: 2000,
//             asNavFor: '.js-slider-product-nav'
//         });

//         $('.js-slider-product-nav').slick({
//             slidesToShow: 3,
//             slidesToScroll: 1,
//             asNavFor: '.js-slider-product',
//             dots: false,
//             infinite: true,
//             speed: 900,
//             arrows: false,
//             vertical: true,
//             focusOnSelect: true
//         });

        $('.js-slider-about').slick({
            infinite: true,
            speed: 4000,
            autoplay: true,
            fade: true,
            autoplaySpeed: 600,
            arrow: false,
            cssEase: 'linear'
        });
      
        

        $('.js-slider-about').on('afterChange', function (event, slick, currentSlide) {
            $('.slick-active').addClass('is-changing');
        });

        $('.js-slider-about').on('beforeChange', function (event, slick, currentSlide) {
            $('.slick-active').removeClass('is-changing');
        });

        $('.js-slider-index-letter').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            speed: 900,
            asNavFor: '.js-slider-index'
        });

        $('.js-slider-alphabetical-mobile').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 13,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 7
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 5
                }
            }]
        });

        $('.js-slider-index-letter-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            speed: 900,
            autoplay: true,
            autoplaySpeed: 2000
        });

        $('.js-slider-index').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.js-slider-index-letter',
            dots: false,
            infinite: false,
            speed: 900
        });

        $('.o-scroll-home .scroll-content').on("hasscrolled", function () {
            //console.log($('.o-scroll-home').data('y'));
            if ($(this).data('y') <= -400) {
                // Whatever
                //console.log("Toggle class!");
            }

            if ($('.c-product-list-header .c-filter').hasClass('is-inview')) {
                $('.c-product-aside').addClass('is-not-top');
                console.log('yess');
            } else {
                $('.c-product-aside').removeClass('is-not-top');
            }
        });

        $('.js-article-more').on('click', function () {
            var $al = $('<div id="article-loader" style="display:none" />').appendTo($('body'));
            $al.load('/pages/article-loader', function () {
                var nb = 0;
                var allshown = true;
                $al.find('.o-third').each(function () {
                    if (nb >= 6) {
                        allshown = false;
                        return false;
                    }
                    if ($('#js-blog-parallax #' + $(this).attr('id')).length > 0) return;
                    nb++;
                    $(this).find('.js-parallax:first').attr('data-speed', nb == 2 || nb == 5 ? '0.3' : '1.5').end().appendTo($('#js-blog-parallax .o-grid'));
                });
                $al.remove();
                if (allshown) {
                    $('.js-article-more').hide();
                }
                setTimeout(function () {
                    $(window).resize();
                }, 100);
            });
            return false;
        });

        
        $('.js-sort-items a').on('click', function () {
            Shopify.queryParams.sort_by = $(this).data('sort');
            location.search = $.param(Shopify.queryParams);
            return false;
        });

        $('.js-brands-filter a').each(function () {
            $(this).addClass('c-filter_link').wrapInner('<span />');
        });

        $('.js-add-to-cart').on('click', function () {
            Shopify.addItem($('.js-filter-variant').data('variantid'), $('.js-quantity').val(), function (e) {
                location.href = '/cart';
            });
            return false;
        });

        $('.js-variant-select').on('click', function () {
            var price= jQuery(this).attr('data-price');
            $('.price').text( price );
            $('.js-filter-variant').data('variantid', $(this).data('variantid'));
            $('.js-variant-title').text($(this).text());
            $('.js-filter.is-open').removeClass('is-open').next().slideUp(300);
            return false;
        });

        $('.js-less').on('click', function () {
            var qty = $(this).next().val();
            if (parseInt(qty, 10) > 1) qty--;else qty = 1;
            $(this).next().val(qty);
            return false;
        });
        $('.js-more').on('click', function () {
            var qty = $(this).prev().val();
            if (parseInt(qty, 10)) qty++;else qty = 1;
            $(this).prev().val(qty);
            return false;
        });
      
      	$('.js-select-alphabetical').change(function(){
          //console.log($(this).val());
          $('.js-letter').html($(this).val());
          var letter = $(this).val().toLowerCase()[0];
          var idx = $(this).index();

          $('.js-ingredient-list li.c-index-results_item').hide().removeClass('is-active');
          var t = 70;

          $('.js-ingredient-list li.c-index-results_item').each(function() {

            var txt = $(this).find('span').text();

            if (txt[0].toLowerCase() == letter) {
              t += 70;
              var $that = $(this);
              $that.show();
              setTimeout(function() {
                $that.addClass('is-active');
              },t);
            }
          });
        });

        $('.c-index-alphabtical_item').on('click', function () {
            $('.c-index-alphabtical_item.is-active').removeClass('is-active');
            var $this = $(this);
            var letter = $(this).find('span').text().toString().toLowerCase()[0];
            var idx = $(this).index();
            if (idx > 13) {
                var toMove = idx - 13;
                for (var x = 0; x < toMove; x++) {
                    setTimeout(function () {
                        $('.c-index-alphabtical_item:first').appendTo($('.c-index-alphabtical_item').parent());
                    }, x * 70);
                }
                setTimeout(function () {
                    $this.addClass('is-active');
                }, toMove * 70);
            } else if (idx < 13) {
                var toMove = 13 - idx;
                for (var x = 0; x < toMove; x++) {
                    setTimeout(function () {
                        $('.c-index-alphabtical_item:last').prependTo($('.c-index-alphabtical_item').parent());
                    }, x * 70);
                }
                setTimeout(function () {
                    $this.addClass('is-active');
                }, toMove * 70);
            }
            $('.js-ingredient-list li.c-index-results_item').hide().removeClass('is-active');
            var t = toMove * 70;
          
            $('.js-ingredient-list li.c-index-results_item').each(function () {

                var txt = $(this).find('span').text();

                if (txt[0].toLowerCase() == letter) {
                    t += 70;
                    var $that = $(this);
                    $that.show();
                    setTimeout(function () {
                        $that.addClass('is-active');
                    }, t);
                }
            });
          $(window).resize();
//           	setTimeout(function () {
//               $(window).resize();
//             }, t+1);
        });

        if ($('.js-ingredient-list').length) {
            $('.js-ingredient-list li.c-index-results_item').each(function () {
                var txt = $(this).find('span').text();
                if (txt[0].toLowerCase() != 'a') $(this).hide();else $(this).addClass('is-active');
            });
        }

        $('.contact-form').on('submit', function () {
            //$.post($(this).attr('action').split('#')[0], $(this).serializeArray());
            $('.js-form-enquiries, .js-form-feedback').toggleClass('is-hide');

            setTimeout(function () {
                $('.js-form-enquiries, .js-form-feedback').hide();
                $('.js-mail-sent').show();
            }, 1200);

            setTimeout(function () {
                $('.js-mail-sent').toggleClass('is-hide');
                $(document).trigger('SmoothScroll.rebuild');
            }, 1600);
            //return false;
        });
      
        $('.js-feedback:not(.-inited)').click(function () {
            $('.-general').show();
        }).addClass("-inited");
      
      	$('.js-business:not(.-inited)').click(function () {
            $('.-business').show();
        }).addClass("-inited");

      	 $('.js-enquiries-back:not(.-inited)').click(function () {
            setTimeout(function () {
            	$('.-general').hide();
              	$('.-business').hide();
            }, 1600);
        }).addClass("-inited");

      
        $('.js-search-input').on('keyup', function () {
            $.get('/search.json?q=' + $(this).val() + '&type=product', function (data) {
                $('.js-products-search-results').html('');
                $('.js-search-product-count').text(data.length);
                $.each(data, function () {
					console.log(this);
                    $('<div class="o-third">\
                    <a href="/products/' + this.handle + '" class="c-search-product_link">\
                    <img src="' + this.featured_image + '" alt="">\
                    <div class="c-search-product_text">\
                    <h3><span>' + this.title + '</span></h3>\
                    <p>' + this.vendor + '</p>\
                    </div>\
                    </a>\
                    </div>').appendTo($('.js-products-search-results'));
                });
            });
        });

        $('.js-fb-share').attr('href', $('.js-fb-share').attr('href') + '?u=' + location.href);
        $('.js-twitter-share').attr('href', $('.js-twitter-share').attr('href') + '&url=' + location.href);
        $('.js-mail-share').attr('href', $('.js-mail-share').attr('href') + location.href);

        var url = location.pathname;
        var navShown = false;
        if (url.indexOf('/collections/') != -1) {
            if ($('a.c-select-category_link[href="' + url + '"]').length) {
                $('a.c-select-category_link[href="' + url + '"]').addClass('is-active');
                var nav = url.replace('/collections/', '').replace('-1', '');
                nav = nav.replace('men-s','mens-grooming');
                $('nav.c-nav-product').hide();
                $('nav.c-nav-product[data-nav="' + nav + '"]').show();
                navShown = true;
            }
            if ($('a.c-nav-product_link[href="' + url + '"]').length) {
                $('nav.c-nav-product').hide();
                $('a.c-nav-product_link[href="' + url + '"]').addClass('is-active').closest('.c-nav-product').show();
                var nav = $('a.c-nav-product_link[href="' + url + '"]').closest('.c-nav-product').data('nav');
                $('a.c-select-category_link[href*="' + nav + '"]').addClass('is-active');
                navShown = true;
            }
        }
        if (!navShown) {
            $('nav.c-nav-product').hide();
            $('nav.c-nav-product:first').show();
        }
        $('.js-variant-select:first').click();
    } //initScript()


    var loaded = false;
    var maxLoad = 1200;

    // On load
    // ==========================================================================
    $(window).load(function () {
        loaded = true;
        load();
    });

    // Maximum load
    // ==========================================================================
    setTimeout(function () {
        if (!loaded) {
            load();
        }
    }, maxLoad);

    // Load
    // ==========================================================================
    function load() {
        //$('body').addClass('is-loaded');

        // if (is.mac()) {
        //     $('html').addClass('is-mac');
        // };

        //$('.c-loading').removeClass('is-active');

        //$('body').addClass('dom-is-loaded');
        if (is.desktop() && $(window).width() > 1024 || is.ie() && $(window).width() > 1024) {} else {
            $('body').addClass('dom-is-loaded');
        };
        if (is.windows()) {
            $('html').addClass('is-window');
        }
        setTimeout(function () {
            $('.barba-container').addClass('is-loaded');
        }, 600);
      
        $('body').on('click', '.js-more-products', function (e) {
            var $more = $(this);
            var container = $more.data('container');
            var $pl = $('<div id="product-loader" style="display:none" />').appendTo($('body'));
          	$('.js-products-container .c-scroll-fade-in-block').addClass('is-inview-persist');
          	$('.c-product-aside.-hidden-ipad').addClass('is-persist');
          	
            $pl.load($(this).attr('href') + ' .js-products-container', function () {
                if (container) {
                  	
                    $pl.find('.js-product-item-container').each(function () {
                        $(this).find('.js-parallax').addClass('is-inview-persist').addClass('is-inview').end().appendTo($('.js-product-grid:first'));
                    });
                  
              		setTimeout(function () {
                    	$('.c-product-aside.-hidden-ipad').removeClass('is-persist');
                	}, 1000);
                } else {
                    $.each(['.js-col-1', '.js-col-2', '.js-col-3'], function () {
                        var selector = this;
                        $pl.find(selector + ' .js-product-item').each(function () {
                            $(this).find('.js-parallax').addClass('is-inview-persist').addClass('is-inview').end().appendTo($('#js-product-parallax ' + selector));
                        });
                    });
                }
                // Monkey patch, sometimes the button is still there?!
                $('.js-load-more-container:first .js-more-products').remove();
                
                if ($pl.find('.js-more-products').length) {
                  
                    $pl.find('.js-more-products').appendTo($('.js-load-more-container:first'));
                }
                setTimeout(function () {
                    $(document).trigger('SmoothScroll.rebuild');
                }, 100);
              	$(document).trigger('SmoothScroll.rebuild');
                $pl.remove();
            });
            var id='id'+Math.random().toString().replace('.','');
          	$more.attr('href','#'+id).attr('id',id);
          
          	
            try{
				window.smscrl.scrollTo(e);
            }catch(e2){}
			            
            $more.remove();
            return false;
        });

    }

    var PageTransition = Barba.BaseTransition.extend({
        start: function start() {
            Promise.all([this.newContainerLoading, this.transitionOut()]).then(this.transitionIn.bind(this));
        },

        transitionOut: function transitionOut() {
            $('body').removeClass('has-nav-open');
            $('body').removeClass('has-category-open');
            $('body').removeClass('has-search-open');
          	$('body').removeClass('has-nav-product-open');
            $('body').removeClass('has-dropdown-expand');
            $('.c-loading').addClass('is-active');

            //window.rellax.destroy();
            return $(this.oldContainer).addClass('is-changing-page').delay(1200).promise();
        },

        transitionIn: function transitionIn() {
            $('html,body').animate({ scrollTop: 0 }, 0);
          	$('.c-nav_wrap').animate({scrollTop:0},0);

            var _this = this;
            //var $el = $(this.newContainer).addClass('is-loaded');
            if (is.desktop() && $(window).width() > 1024 || is.ie() && $(window).width() > 1024) {} else {
                $('.c-loading').removeClass('is-active');
                var $el = $(this.newContainer).addClass('is-loaded');
            };
            $('.js-accordion').removeClass('is-open').next().slideUp(300);
            $(this.oldContainer).hide();

          	try{SPR.registerCallbacks() && SPR.initRatingHandler() && SPR.initDomEls() && SPR.loadProducts() && SPR.loadBadges()}catch(e){}
            
            _this.done();
        }
    });

    Barba.Pjax.getTransition = function () {
        return PageTransition;
    };

    Barba.Dispatcher.on('transitionCompleted', function () {
        initScript();
    });

    Barba.Pjax.start();
    Barba.Prefetch.init();

    // $("a[href^='http://" + top.location.host.toString()+"'],a[href^='https://" + top.location.host.toString()+"'], a[href^='/']").on('click',function() {
    //     if ($(this).hasClass('-no-anim')) return;
    // 	var url = $(this).attr('href');
    // 	if (url.match(/\.pdf$/i)) return true;
    // 	$('body').removeClass('is-loaded').addClass('is-changing-page');
    // 	setTimeout(function() {
    // 		location.href=url;
    // 	},1600);
    // 	setTimeout(function() {
    // 		$('body').addClass('is-loaded').removeClass('is-changing-page');
    // 	},2800);
    // 	return false;
    // });

})(window.jQuery || window.$);

},{"./modules":3,"./utils/environment":9,"./utils/globals":10,"./utils/html":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollTo = scrollTo;
/* jshint esnext: true */
var isAnimating = false;

var defaults = {
    easing: 'swing',
    headerOffset: 60,
    speed: 300
};

/**
 * scrollTo is a function that scrolls a container to an element's position within that controller
 * Uses jQuery's $.Deferred to allow using a callback on animation completion
 * @param   {object}  $element  A jQuery node
 * @param   {object}  options
 */
function scrollTo($element, options) {
    var deferred = $.Deferred();

    // Drop everything if this ain't a jQuery object
    if ($element instanceof jQuery && $element.length > 0) {

        // Merging options
        options = $.extend({}, defaults, typeof options !== 'undefined' ? options : {});

        // Prevents accumulation of animations
        if (isAnimating === false) {
            isAnimating = true;

            // Default container that we'll be scrolling
            var $container = $('html, body');
            var elementOffset = 0;

            // Testing container in options for jQuery-ness
            // If we're not using a custom container, we take the top document offset
            // If we are, we use the elements position relative to the container
            if (typeof options.$container !== 'undefined' && options.$container instanceof jQuery && options.$container.length > 0) {
                $container = options.$container;
                elementOffset = $element.position().top;
            } else {
                elementOffset = $element.offset().top;
            }

            $container.animate({
                scrollTop: elementOffset - options.headerOffset
            }, options.speed, options.easing, function () {
                isAnimating = false;
                deferred.resolve();
            });
        }
    }

    return deferred.promise();
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require('./modules/Button');

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Button).default;
  }
});

var _Title = require('./modules/Title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Title).default;
  }
});

var _SmoothScroll = require('./modules/SmoothScroll');

Object.defineProperty(exports, 'SmoothScroll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SmoothScroll).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./modules/Button":5,"./modules/SmoothScroll":6,"./modules/Title":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _environment = require('../utils/environment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


/**
 * Abstract module
 * Gives access to generic jQuery nodes
 */
var _class = function _class(options) {
    _classCallCheck(this, _class);

    this.$document = _environment.$document;
    this.$window = _environment.$window;
    this.$html = _environment.$html;
    this.$body = _environment.$body;
    this.$el = options.$el;
    this.el = options.el;
};

exports.default = _class;

},{"../utils/environment":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
    _inherits(_class, _AbstractModule);

    function _class(options) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

        _this.$el.on('click.Button', function (event) {
            _this.$document.trigger('Title.changeLabel', [$(event.currentTarget).val()]);
        });
        return _this;
    }

    _class.prototype.destroy = function destroy() {
        this.$el.off('.Button');
    };

    return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

var _environment = require('../utils/environment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Locomotive smooth scroll
// ==========================================================================


var _class = function (_AbstractModule) {
    _inherits(_class, _AbstractModule);

    function _class(options) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

        if (is.desktop() && $(window).width() > 1024 || is.ie() && $(window).width() > 1024) {
            _this.scrollbar;
            _this.selector = '.js-parallax';

            _this.build();
        }
        return _this;
    }

    // Set
    // ==========================================================================


    _class.prototype.set = function set() {
        this.windowHeight = this.$window.height();
        this.windowMiddle = this.windowHeight / 2;
        this.scrollbarLimit = this.scrollbar.limit.y + this.windowHeight;
        // Create elements object
        this.addElements();
        // First load
        this.checkElements(true);
    };

    // Build
    // ==========================================================================


    _class.prototype.build = function build() {
        var _this2 = this;
		window.smscrl = _this2;
        setTimeout(function () {
            _this2.scrollbar = _smoothScrollbar2.default.init(_this2.$el[0]);
            _this2.elements = {};
            _this2.set();

            // On scroll
            _this2.scrollbar.addListener(function () {
                return _this2.checkElements();
            });
            // Rebuild event
            _environment.$document.on('SmoothScroll.rebuild', function () {
                return _this2.updateElements();
            });
            // Scrollto button event
            $('.js-scrollto').on('click.SmoothScroll', function (event) {
                return _this2.scrollTo(event);
            });

            // Setup done
            _environment.$document.trigger({
                type: 'SmoothScroll.isReady'
            });
            $('.c-loading').removeClass('is-active');
        }, 1600);
    };

    // Add elements
    // ==========================================================================


    _class.prototype.addElements = function addElements() {
        var _this3 = this;

        this.elements = [];

        $(this.selector).each(function (i, el) {
            var $element = $(el);
            var elementSpeed = $element.data('speed') / 10;
            var elementPosition = $element.data('position');
            var elementTarget = $element.data('target');
            var elementHorizontal = $element.data('horizontal');
            var $target = elementTarget ? $(elementTarget) : $element;
            var elementOffset = $target.offset().top + _this3.scrollbar.scrollTop;

            if (!elementTarget && $element.data('transform')) {
                var transform = $element.data('transform');
                elementOffset -= parseFloat(transform.y);
            }

            var elementLimit = elementOffset + $target.outerHeight();
            var elementMiddle = (elementLimit - elementOffset) / 2 + elementOffset;
            var elementPersist = $element.data('persist');
            var elementFixed = $element.data('fixed');

            _this3.elements[i] = {
                $element: $element,
                offset: elementOffset,
                limit: elementLimit,
                middle: elementMiddle,
                speed: elementSpeed,
                position: elementPosition,
                horizontal: elementHorizontal,
                persist: elementPersist,
                fixed: elementFixed
            };
        });
    };

    /**
    * Set the scroll bar limit
    */


    _class.prototype.setScrollbarLimit = function setScrollbarLimit() {
        this.scrollbarLimit = this.scrollbar.limit.y + this.windowHeight;
    };

    // Update elements
    // ==========================================================================
    // updateElements() {
    //     this.scrollbar.update();
    //     this.set();
    //     $document.trigger('SmoothScroll.update');
    // }


    /**
     * Update elements and recalculate all the positions on the page
     */


    _class.prototype.updateElements = function updateElements() {

        this.scrollbar.update();
        this.windowHeight = $(window).height();
        this.windowMiddle = this.windowHeight / 2;
        this.setScrollbarLimit();
        this.addElements();
    };

    // Check elements
    // ==========================================================================


    _class.prototype.checkElements = function checkElements(first) {
        var scrollbarTop = this.scrollbar.scrollTop;
        var scrollbarLimit = this.scrollbarLimit;
        var scrollbarBottom = scrollbarTop + this.windowHeight;
        var scrollbarMiddle = scrollbarTop + this.windowMiddle;

        for (var i in this.elements) {
            var transformDistance = void 0;
            var scrollBottom = scrollbarBottom;
            var $element = this.elements[i].$element;
            var elementOffset = this.elements[i].offset;
            var elementLimit = this.elements[i].limit;
            var elementMiddle = this.elements[i].middle;
            var elementSpeed = this.elements[i].speed;
            var elementPosition = this.elements[i].position;
            var elementHorizontal = this.elements[i].horizontal;
            var elementPersist = this.elements[i].persist;
            var elementFixed = this.elements[i].fixed;

            if (elementPosition === 'top') {
                scrollBottom = scrollbarTop;
            }

            if (elementFixed) {
                $element.css('transform', 'translateY(' + scrollbarTop + 'px)');
                console.log(scrollbarTop);
            }

            // Define if the element is inview
            var inview = scrollBottom >= elementOffset && scrollbarTop <= elementLimit;

            // Add class if inview, remove if not
            if (inview) {
                $element.addClass('is-inview');
            } else {
                if (!elementPersist) {
                    $element.removeClass('is-inview');
                }
            }

            if (first && !inview && elementSpeed) {
                // Different calculation if first call and the item is not in view
                if (elementPosition !== 'top') {
                    // transformDistance = ((elementOffset - this.windowMiddle)  - elementMiddle) * -elementSpeed;
                }
            }

            // If element is in view
            if (inview && elementSpeed) {
                switch (elementPosition) {
                    case 'top':
                        transformDistance = (scrollbarTop - elementOffset) * -elementSpeed;
                        break;

                    case 'bottom':
                        transformDistance = (scrollbarLimit - scrollBottom) * elementSpeed;
                        break;

                    default:
                        transformDistance = (scrollbarMiddle - elementMiddle) * -elementSpeed;
                        break;
                }
            }

            if (transformDistance) {
                // Transform horizontal OR vertical, default vertical
                elementHorizontal !== undefined ? this.transform($element, transformDistance + 'px') : this.transform($element, 0, transformDistance + 'px');
            }
        }
    };

    // Transform element
    // ==========================================================================
    /**
     * [transform description]
     * @param  {[type]} $element Jquery element.
     * @param  {mixed}  x        Translate value
     * @param  {mixed}  y        Translate value
     * @param  {mixed}  z        Translate value
     * @return {void}
     */


    _class.prototype.transform = function transform($element, x, y, z) {
        // Defaults
        x = x || 0;
        y = y || 0;
        z = z || 0;

        // Translate
        $element.css({
            '-webkit-transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')',
            '-ms-transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')',
            'transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')'
        }).data('transform', {
            x: x,
            y: y,
            z: z
        }); // Remember

        $element.find(this.selector).each(function (i, e) {
            var $this = $(e);
            if (!$this.data('transform')) {
                $this.data('transform', {
                    x: x,
                    y: y,
                    z: z
                });
            }
        });
    };

    // Scroll to
    // ==========================================================================


    _class.prototype.scrollTo = function scrollTo(event) {
        if (!$.isNumeric(event)) {
            event.preventDefault();

            var $target = $($(event.currentTarget).attr('href'));
            var targetOffset = $target.offset().top + this.scrollbar.scrollTop;
        } else {
            targetOffset = event;
        }

        this.scrollbar.scrollTo(0, targetOffset, 900);
    };

    // Destroy
    // ==========================================================================


    _class.prototype.destroy = function destroy() {
        this.$el.off('.SmoothScroll');
        this.elements = {};
    };

    return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"../utils/environment":9,"./AbstractModule":4,"smooth-scrollbar":14}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visibility = require('../utils/visibility');

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
    _inherits(_class, _AbstractModule);

    function _class(options) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

        _this.$label = _this.$el.find('.js-label');

        _this.$document.on('Title.changeLabel', function (event, value) {
            _this.changeLabel(value);
            _this.destroy();
        });

        _this.hiddenCallbackIdent = (0, _visibility.visibilityApi)({
            action: 'addCallback',
            state: 'hidden',
            callback: _this.logHidden
        });

        _this.visibleCallbackIdent = (0, _visibility.visibilityApi)({
            action: 'addCallback',
            state: 'visible',
            callback: _this.logVisible
        });
        return _this;
    }

    _class.prototype.logHidden = function logHidden() {
        console.log('Title is hidden');
    };

    _class.prototype.logVisible = function logVisible() {
        console.log('Title is visible');
    };

    _class.prototype.changeLabel = function changeLabel(value) {
        this.$label.text(value);
    };

    _class.prototype.destroy = function destroy() {
        this.$document.off('Title.changeLabel');

        (0, _visibility.visibilityApi)({
            action: 'removeCallback',
            state: 'hidden',
            ident: this.hiddenCallbackIdent
        });

        (0, _visibility.visibilityApi)({
            action: 'removeCallback',
            state: 'visible',
            ident: this.visibleCallbackIdent
        });

        this.$el.off('.Title');
    };

    return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"../utils/visibility":13,"./AbstractModule":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addToArray = addToArray;
exports.arrayContains = arrayContains;
exports.arrayContentsMatch = arrayContentsMatch;
exports.ensureArray = ensureArray;
exports.lastItem = lastItem;
exports.removeFromArray = removeFromArray;
exports.toArray = toArray;
exports.findByKeyValue = findByKeyValue;

var _is = require('./is');

function addToArray(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    }
}

function arrayContains(array, value) {
    for (var i = 0, c = array.length; i < c; i++) {
        if (array[i] == value) {
            return true;
        }
    }

    return false;
}

function arrayContentsMatch(a, b) {
    var i;

    if (!(0, _is.isArray)(a) || !(0, _is.isArray)(b)) {
        return false;
    }

    if (a.length !== b.length) {
        return false;
    }

    i = a.length;
    while (i--) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

function ensureArray(x) {
    if (typeof x === 'string') {
        return [x];
    }

    if (x === undefined) {
        return [];
    }

    return x;
}

function lastItem(array) {
    return array[array.length - 1];
}

function removeFromArray(array, member) {
    if (!array) {
        return;
    }

    var index = array.indexOf(member);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function toArray(arrayLike) {
    var array = [],
        i = arrayLike.length;
    while (i--) {
        array[i] = arrayLike[i];
    }

    return array;
}

function findByKeyValue(array, key, value) {
    return array.filter(function (obj) {
        return obj[key] === value;
    });
}

},{"./is":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $document = $(document);
var $window = $(window);
var $html = $(document.documentElement);
var $body = $(document.body);

exports.$document = $document;
exports.$window = $window;
exports.$html = $html;
exports.$body = $body;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    svg4everybody();
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.escapeHtml = escapeHtml;
exports.unescapeHtml = unescapeHtml;
exports.getNodeData = getNodeData;
/**
 * @see  https://github.com/ractivejs/ractive/blob/dev/src/utils/html.js
 */
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Prepare HTML content that contains mustache characters for use with Ractive
 * @param  {string} str
 * @return {string}
 */
function unescapeHtml(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/**
 * Get element data attributes
 * @param   {DOMElement}  node
 * @return  {Array}       data
 */
function getNodeData(node) {
    // All attributes
    var attributes = node.attributes;

    // Regex Pattern
    var pattern = /^data\-(.+)$/;

    // Output
    var data = {};

    for (var i in attributes) {
        if (!attributes[i]) {
            continue;
        }

        // Attributes name (ex: data-module)
        var name = attributes[i].name;

        // This happens.
        if (!name) {
            continue;
        }

        var match = name.match(pattern);
        if (!match) {
            continue;
        }

        // If this throws an error, you have some
        // serious problems in your HTML.
        data[match[1]] = node.getAttribute(name);
    }

    return data;
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isEqual = isEqual;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isFunction = isFunction;
var toString = Object.prototype.toString,
    arrayLikePattern = /^\[object (?:Array|FileList)\]$/;

// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
function isArray(thing) {
    return toString.call(thing) === '[object Array]';
}

function isArrayLike(obj) {
    return arrayLikePattern.test(toString.call(obj));
}

function isEqual(a, b) {
    if (a === null && b === null) {
        return true;
    }

    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
        return false;
    }

    return a === b;
}

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumeric(thing) {
    return !isNaN(parseFloat(thing)) && isFinite(thing);
}

function isObject(thing) {
    return thing && toString.call(thing) === '[object Object]';
}

function isFunction(thing) {
    var getType = {};
    return thing && getType.toString.call(thing) === '[object Function]';
}

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.visibilityApi = undefined;

var _is = require('./is');

var _array = require('./array');

var _environment = require('./environment');

var CALLBACKS = {
    hidden: [],
    visible: []
}; /* jshint esnext: true */


var ACTIONS = ['addCallback', 'removeCallback'];

var STATES = ['visible', 'hidden'];

var PREFIX = 'v-';

var UUID = 0;

// Main event
_environment.$document.on('visibilitychange', function (event) {
    if (document.hidden) {
        onDocumentChange('hidden');
    } else {
        onDocumentChange('visible');
    }
});

/**
 * Add a callback
 * @param {string}   state
 * @param {function} callback
 * @return {string}  ident
 */
function addCallback(state, options) {
    var callback = options.callback || '';

    if (!(0, _is.isFunction)(callback)) {
        console.warn('Callback is not a function');
        return false;
    }

    var ident = PREFIX + UUID++;

    CALLBACKS[state].push({
        ident: ident,
        callback: callback
    });

    return ident;
}

/**
 * Remove a callback
 * @param  {string}   state  Visible or hidden
 * @param  {string}   ident  Unique identifier
 * @return {boolean}         If operation was a success
 */
function removeCallback(state, options) {
    var ident = options.ident || '';

    if (typeof ident === 'undefined' || ident === '') {
        console.warn('Need ident to remove callback');
        return false;
    }

    var index = (0, _array.findByKeyValue)(CALLBACKS[state], 'ident', ident)[0];

    // console.log(ident)
    // console.log(CALLBACKS[state])

    if (typeof index !== 'undefined') {
        (0, _array.removeFromArray)(CALLBACKS[state], index);
        return true;
    } else {
        console.warn('Callback could not be found');
        return false;
    }
}

/**
 * When document state changes, trigger callbacks
 * @param  {string}  state  Visible or hidden
 */
function onDocumentChange(state) {
    var callbackArray = CALLBACKS[state];
    var i = 0;
    var len = callbackArray.length;

    for (; i < len; i++) {
        callbackArray[i].callback();
    }
}

/**
 * Public facing API for adding and removing callbacks
 * @param   {object}           options  Options
 * @return  {boolean|integer}           Unique identifier for the callback or boolean indicating success or failure
 */
function visibilityApi(options) {
    var action = options.action || '';
    var state = options.state || '';
    var ret = void 0;

    // Type and value checking
    if (!(0, _array.arrayContains)(ACTIONS, action)) {
        console.warn('Action does not exist');
        return false;
    }
    if (!(0, _array.arrayContains)(STATES, state)) {
        console.warn('State does not exist');
        return false;
    }

    // @todo Magic call function pls
    if (action === 'addCallback') {
        ret = addCallback(state, options);
    } else if (action === 'removeCallback') {
        ret = removeCallback(state, options);
    }

    return ret;
}

exports.visibilityApi = visibilityApi;

},{"./array":8,"./environment":9,"./is":12}],14:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Scrollbar=e():t.Scrollbar=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,u["default"])(t)}var i=n(2),u=r(i),a=n(55),c=r(a),l=n(62),f=r(l);Object.defineProperty(e,"__esModule",{value:!0});var s="function"==typeof f["default"]&&"symbol"==typeof c["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof f["default"]&&t.constructor===f["default"]?"symbol":typeof t},d=n(78),h=n(89);n(129),n(145),n(158),n(173),n(187),e["default"]=d.SmoothScrollbar,d.SmoothScrollbar.version="7.2.8",d.SmoothScrollbar.init=function(t,e){if(!t||1!==t.nodeType)throw new TypeError("expect element to be DOM Element, but got "+("undefined"==typeof t?"undefined":s(t)));if(h.sbList.has(t))return h.sbList.get(t);t.setAttribute("data-scrollbar","");var n=[].concat(o(t.childNodes)),r=document.createElement("div");r.innerHTML='\n        <article class="scroll-content"></article>\n        <aside class="scrollbar-track scrollbar-track-x">\n            <div class="scrollbar-thumb scrollbar-thumb-x"></div>\n        </aside>\n        <aside class="scrollbar-track scrollbar-track-y">\n            <div class="scrollbar-thumb scrollbar-thumb-y"></div>\n        </aside>\n        <canvas class="overscroll-glow"></canvas>\n    ';var i=r.querySelector(".scroll-content");return[].concat(o(r.childNodes)).forEach(function(e){return t.appendChild(e)}),n.forEach(function(t){return i.appendChild(t)}),new d.SmoothScrollbar(t,e)},d.SmoothScrollbar.initAll=function(t){return[].concat(o(document.querySelectorAll(h.selectors))).map(function(e){return d.SmoothScrollbar.init(e,t)})},d.SmoothScrollbar.has=function(t){return h.sbList.has(t)},d.SmoothScrollbar.get=function(t){return h.sbList.get(t)},d.SmoothScrollbar.getAll=function(){return[].concat(o(h.sbList.values()))},d.SmoothScrollbar.destroy=function(t,e){return d.SmoothScrollbar.has(t)&&d.SmoothScrollbar.get(t).destroy(e)},d.SmoothScrollbar.destroyAll=function(t){h.sbList.forEach(function(e){e.destroy(t)})},t.exports=e["default"]},function(t,e,n){t.exports={"default":n(3),__esModule:!0}},function(t,e,n){n(4),n(48),t.exports=n(12).Array.from},function(t,e,n){"use strict";var r=n(5)(!0);n(8)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(6),o=n(7);t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),c=r(n),l=a.length;return c<0||c>=l?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===l||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(9),o=n(10),i=n(25),u=n(15),a=n(26),c=n(27),l=n(28),f=n(44),s=n(46),d=n(45)("iterator"),h=!([].keys&&"next"in[].keys()),v="@@iterator",_="keys",p="values",y=function(){return this};t.exports=function(t,e,n,b,g,m,x){l(n,e,b);var S,E,M,O=function(t){if(!h&&t in j)return j[t];switch(t){case _:return function(){return new n(this,t)};case p:return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",P=g==p,k=!1,j=t.prototype,T=j[d]||j[v]||g&&j[g],A=T||O(g),R=g?P?O("entries"):A:void 0,L="Array"==e?j.entries||T:T;if(L&&(M=s(L.call(new t)),M!==Object.prototype&&(f(M,w,!0),r||a(M,d)||u(M,d,y))),P&&T&&T.name!==p&&(k=!0,A=function(){return T.call(this)}),r&&!x||!h&&!k&&j[d]||u(j,d,A),c[e]=A,c[w]=y,g)if(S={values:P?A:O(p),keys:m?A:O(_),entries:R},x)for(E in S)E in j||i(j,E,S[E]);else o(o.P+o.F*(h||k),e,S);return S}},function(t,e){t.exports=!0},function(t,e,n){var r=n(11),o=n(12),i=n(13),u=n(15),a="prototype",c=function(t,e,n){var l,f,s,d=t&c.F,h=t&c.G,v=t&c.S,_=t&c.P,p=t&c.B,y=t&c.W,b=h?o:o[e]||(o[e]={}),g=b[a],m=h?r:v?r[e]:(r[e]||{})[a];h&&(n=e);for(l in n)f=!d&&m&&void 0!==m[l],f&&l in b||(s=f?m[l]:n[l],b[l]=h&&"function"!=typeof m[l]?n[l]:p&&f?i(s,r):y&&m[l]==s?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[a]=t[a],e}(s):_&&"function"==typeof s?i(Function.call,s):s,_&&((b.virtual||(b.virtual={}))[l]=s,t&c.R&&g&&!g[l]&&u(g,l,s)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(14);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(16),o=n(24);t.exports=n(20)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(17),o=n(19),i=n(23),u=Object.defineProperty;e.f=n(20)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(18);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(20)&&!n(21)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(21)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(18),o=n(11).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(18);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){t.exports=n(15)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(29),o=n(24),i=n(44),u={};n(15)(u,n(45)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(17),o=n(30),i=n(42),u=n(39)("IE_PROTO"),a=function(){},c="prototype",l=function(){var t,e=n(22)("iframe"),r=i.length,o="<",u=">";for(e.style.display="none",n(43).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+u+"document.F=Object"+o+"/script"+u),t.close(),l=t.F;r--;)delete l[c][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[c]=r(t),n=new a,a[c]=null,n[u]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(16),o=n(17),i=n(31);t.exports=n(20)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,c=0;a>c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(32),o=n(42);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(26),o=n(33),i=n(36)(!1),u=n(39)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,l=[];for(n in a)n!=u&&r(a,n)&&l.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){var r=n(34),o=n(7);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(35);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(33),o=n(37),i=n(38);t.exports=function(t){return function(e,n,u){var a,c=r(e),l=o(c.length),f=i(u,l);if(t&&n!=n){for(;l>f;)if(a=c[f++],a!=a)return!0}else for(;l>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(6),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(6),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(40)("keys"),o=n(41);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(11),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){t.exports=n(11).document&&document.documentElement},function(t,e,n){var r=n(16).f,o=n(26),i=n(45)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(40)("wks"),o=n(41),i=n(11).Symbol,u="function"==typeof i,a=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};a.store=r},function(t,e,n){var r=n(26),o=n(47),i=n(39)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(7);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(13),o=n(10),i=n(47),u=n(49),a=n(50),c=n(37),l=n(51),f=n(52);o(o.S+o.F*!n(54)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,s,d=i(t),h="function"==typeof this?this:Array,v=arguments.length,_=v>1?arguments[1]:void 0,p=void 0!==_,y=0,b=f(d);if(p&&(_=r(_,v>2?arguments[2]:void 0,2)),void 0==b||h==Array&&a(b))for(e=c(d.length),n=new h(e);e>y;y++)l(n,y,p?_(d[y],y):d[y]);else for(s=b.call(d),n=new h;!(o=s.next()).done;y++)l(n,y,p?u(s,_,[o.value,y],!0):o.value);return n.length=y,n}})},function(t,e,n){var r=n(17);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var u=t["return"];throw void 0!==u&&r(u.call(t)),i}}},function(t,e,n){var r=n(27),o=n(45)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){"use strict";var r=n(16),o=n(24);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(53),o=n(45)("iterator"),i=n(27);t.exports=n(12).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r=n(35),o=n(45)("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){var r=n(45)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(u){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(a){}return n}},function(t,e,n){t.exports={"default":n(56),__esModule:!0}},function(t,e,n){n(4),n(57),t.exports=n(61).f("iterator")},function(t,e,n){n(58);for(var r=n(11),o=n(15),i=n(27),u=n(45)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var l=a[c],f=r[l],s=f&&f.prototype;s&&!s[u]&&o(s,u,l),i[l]=i.Array}},function(t,e,n){"use strict";var r=n(59),o=n(60),i=n(27),u=n(33);t.exports=n(8)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){e.f=n(45)},function(t,e,n){t.exports={"default":n(63),__esModule:!0}},function(t,e,n){n(64),n(75),n(76),n(77),t.exports=n(12).Symbol},function(t,e,n){"use strict";var r=n(11),o=n(26),i=n(20),u=n(10),a=n(25),c=n(65).KEY,l=n(21),f=n(40),s=n(44),d=n(41),h=n(45),v=n(61),_=n(66),p=n(67),y=n(68),b=n(71),g=n(17),m=n(33),x=n(23),S=n(24),E=n(29),M=n(72),O=n(74),w=n(16),P=n(31),k=O.f,j=w.f,T=M.f,A=r.Symbol,R=r.JSON,L=R&&R.stringify,I="prototype",D=h("_hidden"),C=h("toPrimitive"),N={}.propertyIsEnumerable,F=f("symbol-registry"),H=f("symbols"),z=f("op-symbols"),B=Object[I],G="function"==typeof A,V=r.QObject,W=!V||!V[I]||!V[I].findChild,U=i&&l(function(){return 7!=E(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(B,e);r&&delete B[e],j(t,e,n),r&&t!==B&&j(B,e,r)}:j,X=function(t){var e=H[t]=E(A[I]);return e._k=t,e},q=G&&"symbol"==typeof A.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof A},K=function(t,e,n){return t===B&&K(z,e,n),g(t),e=x(e,!0),g(n),o(H,e)?(n.enumerable?(o(t,D)&&t[D][e]&&(t[D][e]=!1),n=E(n,{enumerable:S(0,!1)})):(o(t,D)||j(t,D,S(1,{})),t[D][e]=!0),U(t,e,n)):j(t,e,n)},J=function(t,e){g(t);for(var n,r=y(e=m(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?E(t):J(E(t),e)},Q=function(t){var e=N.call(this,t=x(t,!0));return!(this===B&&o(H,t)&&!o(z,t))&&(!(e||!o(this,t)||!o(H,t)||o(this,D)&&this[D][t])||e)},Z=function(t,e){if(t=m(t),e=x(e,!0),t!==B||!o(H,e)||o(z,e)){var n=k(t,e);return!n||!o(H,e)||o(t,D)&&t[D][e]||(n.enumerable=!0),n}},$=function(t){for(var e,n=T(m(t)),r=[],i=0;n.length>i;)o(H,e=n[i++])||e==D||e==c||r.push(e);return r},tt=function(t){for(var e,n=t===B,r=T(n?z:m(t)),i=[],u=0;r.length>u;)!o(H,e=r[u++])||n&&!o(B,e)||i.push(H[e]);return i};G||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===B&&e.call(z,n),o(this,D)&&o(this[D],t)&&(this[D][t]=!1),U(this,t,S(1,n))};return i&&W&&U(B,t,{configurable:!0,set:e}),X(t)},a(A[I],"toString",function(){return this._k}),O.f=Z,w.f=K,n(73).f=M.f=$,n(70).f=Q,n(69).f=tt,i&&!n(9)&&a(B,"propertyIsEnumerable",Q,!0),v.f=function(t){return X(h(t))}),u(u.G+u.W+u.F*!G,{Symbol:A});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)h(et[nt++]);for(var et=P(h.store),nt=0;et.length>nt;)_(et[nt++]);u(u.S+u.F*!G,"Symbol",{"for":function(t){return o(F,t+="")?F[t]:F[t]=A(t)},keyFor:function(t){if(q(t))return p(F,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){W=!0},useSimple:function(){W=!1}}),u(u.S+u.F*!G,"Object",{create:Y,defineProperty:K,defineProperties:J,getOwnPropertyDescriptor:Z,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),R&&u(u.S+u.F*(!G||l(function(){var t=A();return"[null]"!=L([t])||"{}"!=L({a:t})||"{}"!=L(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!q(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!q(e))return e}),r[1]=e,L.apply(R,r)}}}),A[I][C]||n(15)(A[I],C,A[I].valueOf),s(A,"Symbol"),s(Math,"Math",!0),s(r.JSON,"JSON",!0)},function(t,e,n){var r=n(41)("meta"),o=n(18),i=n(26),u=n(16).f,a=0,c=Object.isExtensible||function(){return!0},l=!n(21)(function(){return c(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},s=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!c(t))return"F";if(!e)return"E";f(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!c(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return l&&v.NEED&&c(t)&&!i(t,r)&&f(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:s,getWeak:d,onFreeze:h}},function(t,e,n){var r=n(11),o=n(12),i=n(9),u=n(61),a=n(16).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(31),o=n(33);t.exports=function(t,e){for(var n,i=o(t),u=r(i),a=u.length,c=0;a>c;)if(i[n=u[c++]]===e)return n}},function(t,e,n){var r=n(31),o=n(69),i=n(70);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,a=n(t),c=i.f,l=0;a.length>l;)c.call(t,u=a[l++])&&e.push(u);return e}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(35);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(33),o=n(73).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(e){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?a(t):o(r(t))}},function(t,e,n){var r=n(32),o=n(42).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(70),o=n(24),i=n(33),u=n(23),a=n(26),c=n(19),l=Object.getOwnPropertyDescriptor;e.f=n(20)?l:function(t,e){if(t=i(t),e=u(e,!0),c)try{return l(t,e)}catch(n){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e){},function(t,e,n){n(66)("asyncIterator")},function(t,e,n){n(66)("observable")},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(79),u=r(i),a=n(82),c=r(a),l=n(86),f=r(l);Object.defineProperty(e,"__esModule",{value:!0}),e.SmoothScrollbar=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,f["default"])(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),d=n(89),h=n(112);e.SmoothScrollbar=function(){function t(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o(this,t),e.setAttribute("tabindex","1"),e.scrollTop=e.scrollLeft=0;var i=(0,h.findChild)(e,"scroll-content"),a=(0,h.findChild)(e,"overscroll-glow"),l=(0,h.findChild)(e,"scrollbar-track-x"),f=(0,h.findChild)(e,"scrollbar-track-y");if((0,h.setStyle)(e,{overflow:"hidden",outline:"none"}),(0,h.setStyle)(a,{display:"none","pointer-events":"none"}),this.__readonly("targets",(0,c["default"])({container:e,content:i,canvas:{elem:a,context:a.getContext("2d")},xAxis:(0,c["default"])({track:l,thumb:(0,h.findChild)(l,"scrollbar-thumb-x")}),yAxis:(0,c["default"])({track:f,thumb:(0,h.findChild)(f,"scrollbar-thumb-y")})})).__readonly("offset",{x:0,y:0}).__readonly("thumbOffset",{x:0,y:0}).__readonly("limit",{x:1/0,y:1/0}).__readonly("movement",{x:0,y:0}).__readonly("movementLocked",{x:!1,y:!1}).__readonly("overscrollRendered",{x:0,y:0}).__readonly("overscrollBack",!1).__readonly("thumbSize",{x:0,y:0,realX:0,realY:0}).__readonly("bounding",{top:0,right:0,bottom:0,left:0}).__readonly("children",[]).__readonly("parents",[]).__readonly("size",this.getSize()).__readonly("isNestedScrollbar",!1),(0,u["default"])(this,{__hideTrackThrottle:{value:(0,h.debounce)(this.hideTrack.bind(this),1e3,!1)},__updateThrottle:{value:(0,h.debounce)(this.update.bind(this))},__touchRecord:{value:new h.TouchRecord},__listeners:{value:[]},__handlers:{value:[]},__children:{value:[]},__timerID:{value:{}}}),this.__initOptions(r),this.__initScrollbar(),d.sbList.set(e,this),"function"==typeof d.GLOBAL_ENV.MutationObserver){var s=new d.GLOBAL_ENV.MutationObserver(function(){n.update(!0)});s.observe(i,{childList:!0}),Object.defineProperty(this,"__observer",{value:s})}}return s(t,[{key:"MAX_OVERSCROLL",get:function(){var t=this.options,e=this.size;switch(t.overscrollEffect){case"bounce":var n=Math.floor(Math.sqrt(Math.pow(e.container.width,2)+Math.pow(e.container.height,2))),r=this.__isMovementLocked()?2:10;return d.GLOBAL_ENV.TOUCH_SUPPORTED?(0,h.pickInRange)(n/r,100,1e3):(0,h.pickInRange)(n/10,25,50);case"glow":return 150;default:return 0}}},{key:"scrollTop",get:function(){return this.offset.y}},{key:"scrollLeft",get:function(){return this.offset.x}}]),t}()},function(t,e,n){t.exports={"default":n(80),__esModule:!0}},function(t,e,n){n(81);var r=n(12).Object;t.exports=function(t,e){return r.defineProperties(t,e)}},function(t,e,n){var r=n(10);r(r.S+r.F*!n(20),"Object",{defineProperties:n(30)})},function(t,e,n){t.exports={"default":n(83),__esModule:!0}},function(t,e,n){n(84),t.exports=n(12).Object.freeze},function(t,e,n){var r=n(18),o=n(65).onFreeze;n(85)("freeze",function(t){return function(e){return t&&r(e)?t(o(e)):e}})},function(t,e,n){var r=n(10),o=n(12),i=n(21);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){t.exports={"default":n(87),__esModule:!0}},function(t,e,n){n(88);var r=n(12).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(10);r(r.S+r.F*!n(20),"Object",{defineProperty:n(16).f})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(93);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){t.exports={"default":n(91),__esModule:!0}},function(t,e,n){n(92),t.exports=n(12).Object.keys},function(t,e,n){var r=n(47),o=n(31);n(85)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(94);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(95);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(111);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=function(t){var e={},n={};return(0,a["default"])(t).forEach(function(r){(0,i["default"])(e,r,{get:function(){if(!n.hasOwnProperty(r)){var e=t[r];n[r]=e()}return n[r]}})}),e},l={MutationObserver:function(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver},TOUCH_SUPPORTED:function(){return"ontouchstart"in document},EASING_MULTIPLIER:function(){return navigator.userAgent.match(/Android/)?.5:.25},WHEEL_EVENT:function(){return"onwheel"in window?"wheel":"mousewheel"}};e.GLOBAL_ENV=c(l)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(96),i=r(o);Object.defineProperty(e,"__esModule",{value:!0});var u=new i["default"],a=u.set.bind(u),c=u["delete"].bind(u);u.update=function(){u.forEach(function(t){t.__updateTree()})},u["delete"]=function(){var t=c.apply(void 0,arguments);return u.update(),t},u.set=function(){var t=a.apply(void 0,arguments);return u.update(),t},e.sbList=u},function(t,e,n){t.exports={"default":n(97),__esModule:!0}},function(t,e,n){n(75),n(4),n(57),n(98),n(108),t.exports=n(12).Map},function(t,e,n){"use strict";var r=n(99);t.exports=n(104)("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},function(t,e,n){"use strict";var r=n(16).f,o=n(29),i=n(100),u=n(13),a=n(101),c=n(7),l=n(102),f=n(8),s=n(60),d=n(103),h=n(20),v=n(65).fastKey,_=h?"_s":"size",p=function(t,e){var n,r=v(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var s=t(function(t,r){a(t,s,e,"_i"),t._i=o(null),t._f=void 0,t._l=void 0,t[_]=0,void 0!=r&&l(r,n,t[f],t)});return i(s.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[_]=0},"delete":function(t){var e=this,n=p(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[_]--}return!!n},forEach:function(t){a(this,s,"forEach");for(var e,n=u(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!p(this,t)}}),h&&r(s.prototype,"size",{get:function(){return c(this[_])}}),s},def:function(t,e,n){var r,o,i=p(t,e);return i?i.v=n:(t._l=i={i:o=v(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[_]++,"F"!==o&&(t._i[o]=i)),t},getEntry:p,setStrong:function(t,e,n){f(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?s(0,n.k):"values"==e?s(0,n.v):s(0,[n.k,n.v]):(t._t=void 0,s(1))},n?"entries":"values",!n,!0),d(e)}}},function(t,e,n){var r=n(15);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(13),o=n(49),i=n(50),u=n(17),a=n(37),c=n(52),l={},f={},e=t.exports=function(t,e,n,s,d){var h,v,_,p,y=d?function(){return t}:c(t),b=r(n,s,e?2:1),g=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(i(y)){for(h=a(t.length);h>g;g++)if(p=e?b(u(v=t[g])[0],v[1]):b(t[g]),p===l||p===f)return p}else for(_=y.call(t);!(v=_.next()).done;)if(p=o(_,b,v.value,e),p===l||p===f)return p};e.BREAK=l,e.RETURN=f},function(t,e,n){"use strict";var r=n(11),o=n(12),i=n(16),u=n(20),a=n(45)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];u&&e&&!e[a]&&i.f(e,a,{configurable:!0,get:function(){return this}})}},function(t,e,n){"use strict";var r=n(11),o=n(10),i=n(65),u=n(21),a=n(15),c=n(100),l=n(102),f=n(101),s=n(18),d=n(44),h=n(16).f,v=n(105)(0),_=n(20);t.exports=function(t,e,n,p,y,b){var g=r[t],m=g,x=y?"set":"add",S=m&&m.prototype,E={};return _&&"function"==typeof m&&(b||S.forEach&&!u(function(){(new m).entries().next()}))?(m=e(function(e,n){f(e,m,t,"_c"),e._c=new g,void 0!=n&&l(n,y,e[x],e)}),v("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var e="add"==t||"set"==t;t in S&&(!b||"clear"!=t)&&a(m.prototype,t,function(n,r){if(f(this,m,t),!e&&b&&!s(n))return"get"==t&&void 0;var o=this._c[t](0===n?0:n,r);return e?this:o})}),"size"in S&&h(m.prototype,"size",{get:function(){return this._c.size}})):(m=p.getConstructor(e,t,y,x),c(m.prototype,n),i.NEED=!0),d(m,t),E[t]=m,o(o.G+o.W+o.F,E),b||p.setStrong(m,t,y),m}},function(t,e,n){var r=n(13),o=n(34),i=n(47),u=n(37),a=n(106);t.exports=function(t,e){var n=1==t,c=2==t,l=3==t,f=4==t,s=6==t,d=5==t||s,h=e||a;return function(e,a,v){for(var _,p,y=i(e),b=o(y),g=r(a,v,3),m=u(b.length),x=0,S=n?h(e,m):c?h(e,0):void 0;m>x;x++)if((d||x in b)&&(_=b[x],p=g(_,x,y),t))if(n)S[x]=p;else if(p)switch(t){case 3:return!0;case 5:return _;case 6:return x;case 2:S.push(_)}else if(f)return!1;return s?-1:l||f?f:S}}},function(t,e,n){var r=n(107);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){var r=n(18),o=n(71),i=n(45)("species");t.exports=function(t){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&(e=e[i],null===e&&(e=void 0))),void 0===e?Array:e}},function(t,e,n){var r=n(10);r(r.P+r.R,"Map",{toJSON:n(109)("Map")})},function(t,e,n){var r=n(53),o=n(110);t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+"#toJSON isn't generic");return o(this)}}},function(t,e,n){var r=n(102);t.exports=function(t,e){var n=[];return r(t,!1,n.push,n,e),n}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.selectors="scrollbar, [scrollbar], [data-scrollbar]"},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(113);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(114);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(115);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(116);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(117);(0,a["default"])(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(118);(0,a["default"])(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(119);(0,a["default"])(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(120);(0,a["default"])(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(121);(0,a["default"])(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(122);(0,a["default"])(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(123);(0,a["default"])(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return y[t]}})});var b=n(124);(0,a["default"])(b).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return b[t]}})})},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.buildCurve=function(t,e){var n=[];if(e<=0)return n;for(var r=Math.round(e/1e3*60),o=-t/Math.pow(r,2),i=-2*o*r,u=0;u<r;u++)n.push(o*Math.pow(u,2)+i*u);return n}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=100;e.debounce=function(t){var e=arguments.length<=1||void 0===arguments[1]?n:arguments[1],r=arguments.length<=2||void 0===arguments[2]||arguments[2];if("function"==typeof t){var o=void 0;return function(){for(var n=arguments.length,i=Array(n),u=0;u<n;u++)i[u]=arguments[u];!o&&r&&setTimeout(function(){return t.apply(void 0,i)}),clearTimeout(o),o=setTimeout(function(){o=void 0,t.apply(void 0,i)},e)}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];
return n}return(0,u["default"])(t)}var i=n(2),u=r(i);Object.defineProperty(e,"__esModule",{value:!0});e.findChild=function(t,e){var n=t.children,r=null;return n&&[].concat(o(n)).some(function(t){if(t.className.match(e))return r=t,!0}),r}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={STANDARD:1,OTHERS:-3},r=[1,28,500],o=function(t){return r[t]||r[0]};e.getDelta=function(t){if("deltaX"in t){var e=o(t.deltaMode);return{x:t.deltaX/n.STANDARD*e,y:t.deltaY/n.STANDARD*e}}return"wheelDeltaX"in t?{x:t.wheelDeltaX/n.OTHERS,y:t.wheelDeltaY/n.OTHERS}:{x:0,y:t.wheelDelta/n.OTHERS}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.getPointerData=function(t){return t.touches?t.touches[t.touches.length-1]:t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getPosition=void 0;var r=n(118);e.getPosition=function(t){var e=(0,r.getPointerData)(t);return{x:e.clientX,y:e.clientY}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTouchID=void 0;var r=n(118);e.getTouchID=function(t){var e=(0,r.getPointerData)(t);return e.identifier}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.isOneOf=function(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return e.some(function(e){return t===e})}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.pickInRange=function(t){var e=arguments.length<=1||void 0===arguments[1]?-(1/0):arguments[1],n=arguments.length<=2||void 0===arguments[2]?1/0:arguments[2];return Math.max(e,Math.min(t,n))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(90),i=r(o);Object.defineProperty(e,"__esModule",{value:!0});var u=["webkit","moz","ms","o"],a=new RegExp("^-(?!(?:"+u.join("|")+")-)"),c=function(t){var e={};return(0,i["default"])(t).forEach(function(n){if(!a.test(n))return void(e[n]=t[n]);var r=t[n];n=n.replace(/^-/,""),e[n]=r,u.forEach(function(t){e["-"+t+"-"+n]=r})}),e};e.setStyle=function(t,e){e=c(e),(0,i["default"])(e).forEach(function(n){var r=n.replace(/^-/,"").replace(/-([a-z])/g,function(t,e){return e.toUpperCase()});t.style[r]=e[n]})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a["default"])(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=n(2),a=r(u),c=n(86),l=r(c),f=n(125),s=r(f);Object.defineProperty(e,"__esModule",{value:!0}),e.TouchRecord=void 0;var d=s["default"]||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,l["default"])(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),v=n(119),_=function(){function t(e){i(this,t),this.updateTime=Date.now(),this.delta={x:0,y:0},this.velocity={x:0,y:0},this.lastPosition=(0,v.getPosition)(e)}return h(t,[{key:"update",value:function(t){var e=this.velocity,n=this.updateTime,r=this.lastPosition,o=Date.now(),i=(0,v.getPosition)(t),u={x:-(i.x-r.x),y:-(i.y-r.y)},a=o-n||16,c=u.x/a*1e3,l=u.y/a*1e3;e.x=.8*c+.2*e.x,e.y=.8*l+.2*e.y,this.delta=u,this.updateTime=o,this.lastPosition=i}}]),t}();e.TouchRecord=function(){function t(){i(this,t),this.touchList={},this.lastTouch=null,this.activeTouchID=void 0}return h(t,[{key:"__add",value:function(t){if(this.__has(t))return null;var e=new _(t);return this.touchList[t.identifier]=e,e}},{key:"__renew",value:function(t){if(!this.__has(t))return null;var e=this.touchList[t.identifier];return e.update(t),e}},{key:"__delete",value:function(t){return delete this.touchList[t.identifier]}},{key:"__has",value:function(t){return this.touchList.hasOwnProperty(t.identifier)}},{key:"__setActiveID",value:function(t){this.activeTouchID=t[t.length-1].identifier,this.lastTouch=this.touchList[this.activeTouchID]}},{key:"__getActiveTracker",value:function(){var t=this.touchList,e=this.activeTouchID;return t[e]}},{key:"isActive",value:function(){return void 0!==this.activeTouchID}},{key:"getDelta",value:function(){var t=this.__getActiveTracker();return t?d({},t.delta):this.__primitiveValue}},{key:"getVelocity",value:function(){var t=this.__getActiveTracker();return t?d({},t.velocity):this.__primitiveValue}},{key:"getLastPosition",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.__getActiveTracker()||this.lastTouch,n=e?e.lastPosition:this.__primitiveValue;return t?n.hasOwnProperty(t)?n[t]:0:d({},n)}},{key:"updatedRecently",value:function(){var t=this.__getActiveTracker();return t&&Date.now()-t.updateTime<30}},{key:"track",value:function(t){var e=this,n=t.targetTouches;return[].concat(o(n)).forEach(function(t){e.__add(t)}),this.touchList}},{key:"update",value:function(t){var e=this,n=t.touches,r=t.changedTouches;return[].concat(o(n)).forEach(function(t){e.__renew(t)}),this.__setActiveID(r),this.touchList}},{key:"release",value:function(t){var e=this;return this.activeTouchID=void 0,[].concat(o(t.changedTouches)).forEach(function(t){e.__delete(t)}),this.touchList}},{key:"__primitiveValue",get:function(){return{x:0,y:0}}}]),t}()},function(t,e,n){t.exports={"default":n(126),__esModule:!0}},function(t,e,n){n(127),t.exports=n(12).Object.assign},function(t,e,n){var r=n(10);r(r.S+r.F,"Object",{assign:n(128)})},function(t,e,n){"use strict";var r=n(31),o=n(69),i=n(70),u=n(47),a=n(34),c=Object.assign;t.exports=!c||n(21)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=r})?function(t,e){for(var n=u(t),c=arguments.length,l=1,f=o.f,s=i.f;c>l;)for(var d,h=a(arguments[l++]),v=f?r(h).concat(f(h)):r(h),_=v.length,p=0;_>p;)s.call(h,d=v[p++])&&(n[d]=h[d]);return n}:c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(130);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(131);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(132);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(133);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(134);(0,a["default"])(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(135);(0,a["default"])(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(136);(0,a["default"])(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(137);(0,a["default"])(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(138);(0,a["default"])(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(139);(0,a["default"])(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(140);(0,a["default"])(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return y[t]}})});var b=n(141);(0,a["default"])(b).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return b[t]}})});var g=n(142);(0,a["default"])(g).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return g[t]}})});var m=n(143);(0,a["default"])(m).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return m[t]}})});var x=n(144);(0,a["default"])(x).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return x[t]}})})},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.clearMovement=r.SmoothScrollbar.prototype.stop=function(){this.movement.x=this.movement.y=0,cancelAnimationFrame(this.__timerID.scrollTo)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,u["default"])(t)}var i=n(2),u=r(i),a=n(78),c=n(112),l=n(89);a.SmoothScrollbar.prototype.destroy=function(t){var e=this.__listeners,n=this.__handlers,r=this.__observer,i=this.targets,u=i.container,a=i.content;n.forEach(function(t){var e=t.evt,n=t.elem,r=t.fn;n.removeEventListener(e,r)}),n.length=e.length=0,this.stop(),cancelAnimationFrame(this.__timerID.render),r&&r.disconnect(),l.sbList["delete"](u),t||this.scrollTo(0,0,300,function(){if(u.parentNode){(0,c.setStyle)(u,{overflow:""}),u.scrollTop=u.scrollLeft=0;var t=[].concat(o(a.childNodes));u.innerHTML="",t.forEach(function(t){return u.appendChild(t)})}})}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.getContentElem=function(){return this.targets.content}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.getSize=function(){var t=this.targets.container,e=this.targets.content;return{container:{width:t.clientWidth,height:t.clientHeight},content:{width:e.offsetWidth-e.clientWidth+e.scrollWidth,height:e.offsetHeight-e.clientHeight+e.scrollHeight}}}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.infiniteScroll=function(t){var e=arguments.length<=1||void 0===arguments[1]?50:arguments[1];if("function"==typeof t){var n={x:0,y:0},r=!1;this.addListener(function(o){var i=o.offset,u=o.limit;u.y-i.y<=e&&i.y>n.y&&!r&&(r=!0,setTimeout(function(){return t(o)})),u.y-i.y>e&&(r=!1),n=i})}}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.isVisible=function(t){var e=this.bounding,n=t.getBoundingClientRect(),r=Math.max(e.top,n.top),o=Math.max(e.left,n.left),i=Math.min(e.right,n.right),u=Math.min(e.bottom,n.bottom);return r<u&&o<i}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.addListener=function(t){"function"==typeof t&&this.__listeners.push(t)},r.SmoothScrollbar.prototype.removeListener=function(t){"function"==typeof t&&this.__listeners.some(function(e,n,r){return e===t&&r.splice(n,1)})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e,n){return e in t?(0,l["default"])(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){return!!e.length&&e.some(function(e){return t.match(e)})}function u(){var t=arguments.length<=0||void 0===arguments[0]?s.REGIESTER:arguments[0],e=d[t];return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];this.__handlers.forEach(function(n){var o=n.elem,u=n.evt,a=n.fn,c=n.hasRegistered;c&&t===s.REGIESTER||!c&&t===s.UNREGIESTER||i(u,r)&&(o[e](u,a),n.hasRegistered=!c)})}}var a,c=n(86),l=r(c),f=n(78),s={REGIESTER:0,UNREGIESTER:1},d=(a={},o(a,s.REGIESTER,"addEventListener"),o(a,s.UNREGIESTER,"removeEventListener"),a);f.SmoothScrollbar.prototype.registerEvents=u(s.REGIESTER),f.SmoothScrollbar.prototype.unregisterEvents=u(s.UNREGIESTER)},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.scrollIntoView=function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=e.onlyScrollIfNeeded,r=void 0!==n&&n,o=e.offsetTop,i=void 0===o?0:o,u=e.offsetLeft,a=void 0===u?0:u,c=this.targets,l=this.bounding;if(t&&c.container.contains(t)){var f=t.getBoundingClientRect();r&&this.isVisible(t)||this.__setMovement(f.left-l.left-a,f.top-l.top-i)}}},function(t,e,n){"use strict";var r=n(112),o=n(78);o.SmoothScrollbar.prototype.scrollTo=function(){var t=arguments.length<=0||void 0===arguments[0]?this.offset.x:arguments[0],e=arguments.length<=1||void 0===arguments[1]?this.offset.y:arguments[1],n=this,o=arguments.length<=2||void 0===arguments[2]?0:arguments[2],i=arguments.length<=3||void 0===arguments[3]?null:arguments[3],u=this.options,a=this.offset,c=this.limit,l=this.__timerID;cancelAnimationFrame(l.scrollTo),i="function"==typeof i?i:function(){},u.renderByPixels&&(t=Math.round(t),e=Math.round(e));var f=a.x,s=a.y,d=(0,r.pickInRange)(t,0,c.x)-f,h=(0,r.pickInRange)(e,0,c.y)-s,v=(0,r.buildCurve)(d,o),_=(0,r.buildCurve)(h,o),p=v.length,y=0,b=function g(){return y===p?(n.setPosition(t,e),requestAnimationFrame(function(){i(n)})):(n.setPosition(f+v[y],s+_[y]),y++,void(l.scrollTo=requestAnimationFrame(g)))};b()}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(90),i=r(o),u=n(78);u.SmoothScrollbar.prototype.setOptions=function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];(0,i["default"])(e).forEach(function(n){t.options.hasOwnProperty(n)&&void 0!==e[n]&&(t.options[n]=e[n])})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(125),i=r(o),u=i["default"]||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=n(112),c=n(78);c.SmoothScrollbar.prototype.setPosition=function(){var t=arguments.length<=0||void 0===arguments[0]?this.offset.x:arguments[0],e=arguments.length<=1||void 0===arguments[1]?this.offset.y:arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2];this.__hideTrackThrottle();var r={},o=this.options,i=this.offset,c=this.limit,l=this.targets,f=this.__listeners;o.renderByPixels&&(t=Math.round(t),e=Math.round(e)),Math.abs(t-i.x)>1&&this.showTrack("x"),Math.abs(e-i.y)>1&&this.showTrack("y"),t=(0,a.pickInRange)(t,0,c.x),e=(0,a.pickInRange)(e,0,c.y),t===i.x&&e===i.y||(r.direction={x:t===i.x?"none":t>i.x?"right":"left",y:e===i.y?"none":e>i.y?"down":"up"},this.__readonly("offset",{x:t,y:e}),r.limit=u({},c),r.offset=u({},this.offset),this.__setThumbPosition(),(0,a.setStyle)(l.content,{"-transform":"translate3d("+-t+"px, "+-e+"px, 0)"}),n||f.forEach(function(t){o.syncCallbacks?t(r):requestAnimationFrame(function(){t(r)})}))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e,n){return e in t?(0,c["default"])(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(){var t=arguments.length<=0||void 0===arguments[0]?f.SHOW:arguments[0],e=d[t];return function(){var n=arguments.length<=0||void 0===arguments[0]?"both":arguments[0],r=this.options,o=this.movement,i=this.targets,u=i.container,a=i.xAxis,c=i.yAxis;o.x||o.y?u.classList.add(s.CONTAINER):u.classList.remove(s.CONTAINER),r.alwaysShowTracks&&t===f.HIDE||(n=n.toLowerCase(),"both"===n&&(a.track.classList[e](s.TRACK),c.track.classList[e](s.TRACK)),"x"===n&&a.track.classList[e](s.TRACK),"y"===n&&c.track.classList[e](s.TRACK))}}var u,a=n(86),c=r(a),l=n(78),f={SHOW:0,HIDE:1},s={TRACK:"show",CONTAINER:"scrolling"},d=(u={},o(u,f.SHOW,"add"),o(u,f.HIDE,"remove"),u);l.SmoothScrollbar.prototype.showTrack=i(f.SHOW),l.SmoothScrollbar.prototype.hideTrack=i(f.HIDE)},function(t,e,n){"use strict";function r(){if("glow"===this.options.overscrollEffect){var t=this.targets,e=this.size,n=t.canvas,r=n.elem,o=n.context,i=window.devicePixelRatio||1,u=e.container.width*i,a=e.container.height*i;u===r.width&&a===r.height||(r.width=u,r.height=a,o.scale(i,i))}}function o(){var t=this.size,e=this.thumbSize,n=this.targets,r=n.xAxis,o=n.yAxis;(0,u.setStyle)(r.track,{display:t.content.width<=t.container.width?"none":"block"}),(0,u.setStyle)(o.track,{display:t.content.height<=t.container.height?"none":"block"}),(0,u.setStyle)(r.thumb,{width:e.x+"px"}),(0,u.setStyle)(o.thumb,{height:e.y+"px"})}function i(){var t=this.options;this.__updateBounding();var e=this.getSize(),n={x:Math.max(e.content.width-e.container.width,0),y:Math.max(e.content.height-e.container.height,0)},i={realX:e.container.width/e.content.width*e.container.width,realY:e.container.height/e.content.height*e.container.height};i.x=Math.max(i.realX,t.thumbMinSize),i.y=Math.max(i.realY,t.thumbMinSize),this.__readonly("size",e).__readonly("limit",n).__readonly("thumbSize",i),o.call(this),r.call(this),this.setPosition(),this.__setThumbPosition()}var u=n(112),a=n(78);a.SmoothScrollbar.prototype.update=function(t){t?requestAnimationFrame(i.bind(this)):i.call(this)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(146);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(147);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(148);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(149);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(154);(0,a["default"])(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(155);(0,a["default"])(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(156);(0,a["default"])(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(157);(0,a["default"])(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return v[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a["default"])(t)}function i(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0],e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],r=this.limit,i=this.options,u=this.movement;this.__updateThrottle(),i.renderByPixels&&(t=Math.round(t),e=Math.round(e));var a=u.x+t,l=u.y+e;0===r.x&&(a=0),0===r.y&&(l=0);var f=this.__getDeltaLimit(n);u.x=c.pickInRange.apply(void 0,[a].concat(o(f.x))),u.y=c.pickInRange.apply(void 0,[l].concat(o(f.y)))}var u=n(2),a=r(u),c=n(112),l=n(78);Object.defineProperty(l.SmoothScrollbar.prototype,"__addMovement",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=this.movement,n=this.movementLocked;a.forEach(function(r){n[r]=e[r]&&t.__willOverscroll(r,e[r])})}function o(){var t=this.movementLocked;a.forEach(function(e){t[e]=!1})}function i(){var t=this.movementLocked;return t.x||t.y}var u=n(78),a=["x","y"];Object.defineProperty(u.SmoothScrollbar.prototype,"__autoLockMovement",{value:r,writable:!0,configurable:!0}),Object.defineProperty(u.SmoothScrollbar.prototype,"__unlockMovement",{value:o,writable:!0,configurable:!0}),Object.defineProperty(u.SmoothScrollbar.prototype,"__isMovementLocked",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];if(t){var e=this.options,n=this.movement,r=this.overscrollRendered,o=this.MAX_OVERSCROLL,i=n[t]=(0,h.pickInRange)(n[t],-o,o),u=e.overscrollDamping,a=r[t]+(i-r[t])*u;e.renderByPixels&&(a|=0),!this.__isMovementLocked()&&Math.abs(a-r[t])<.1&&(a-=i/Math.abs(i||1)),Math.abs(a)<Math.abs(r[t])&&this.__readonly("overscrollBack",!0),(a*r[t]<0||Math.abs(a)<=1)&&(a=0,this.__readonly("overscrollBack",!1)),r[t]=a}}function i(t){var e=this.__touchRecord,n=this.overscrollRendered;return n.x!==t.x||n.y!==t.y||!(!d.GLOBAL_ENV.TOUCH_SUPPORTED||!e.updatedRecently())}function u(){var t=this,e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];if(e.length&&this.options.overscrollEffect){var n=this.options,r=this.overscrollRendered,u=l({},r);if(e.forEach(function(e){return o.call(t,e)}),i.call(this,u))switch(n.overscrollEffect){case"bounce":return s.overscrollBounce.call(this,r.x,r.y);case"glow":return s.overscrollGlow.call(this,r.x,r.y);default:return}}}var a=n(125),c=r(a),l=c["default"]||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},f=n(78),s=n(150),d=n(89),h=n(112);Object.defineProperty(f.SmoothScrollbar.prototype,"__renderOverscroll",{value:u,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(151);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(152);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(153);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})})},function(t,e,n){"use strict";function r(t,e){var n=this.size,r=this.offset,i=this.targets,u=this.thumbOffset,a=i.xAxis,c=i.yAxis,l=i.content;if((0,o.setStyle)(l,{"-transform":"translate3d("+-(r.x+t)+"px, "+-(r.y+e)+"px, 0)"}),t){var f=n.container.width/(n.container.width+Math.abs(t));(0,o.setStyle)(a.thumb,{"-transform":"translate3d("+u.x+"px, 0, 0) scale3d("+f+", 1, 1)","-transform-origin":t<0?"left":"right"})}if(e){var s=n.container.height/(n.container.height+Math.abs(e));(0,o.setStyle)(c.thumb,{"-transform":"translate3d(0, "+u.y+"px, 0) scale3d(1, "+s+", 1)","-transform-origin":e<0?"top":"bottom"})}}Object.defineProperty(e,"__esModule",{value:!0}),e.overscrollBounce=r;var o=n(112)},function(t,e,n){"use strict";function r(t,e){var n=this.size,r=this.targets,a=this.options,c=r.canvas,l=c.elem,f=c.context;return t||e?((0,u.setStyle)(l,{display:"block"}),f.clearRect(0,0,n.content.width,n.container.height),f.fillStyle=a.overscrollEffectColor,o.call(this,t),void i.call(this,e)):(0,u.setStyle)(l,{display:"none"})}function o(t){var e=this.size,n=this.targets,r=this.__touchRecord,o=this.MAX_OVERSCROLL,i=e.container,l=i.width,f=i.height,s=n.canvas.context;s.save(),t>0&&s.transform(-1,0,0,1,l,0);var d=(0,u.pickInRange)(Math.abs(t)/o,0,a),h=(0,u.pickInRange)(d,0,c)*l,v=Math.abs(t),_=r.getLastPosition("y")||f/2;s.globalAlpha=d,s.beginPath(),s.moveTo(0,-h),s.quadraticCurveTo(v,_,0,f+h),s.fill(),s.closePath(),s.restore()}function i(t){var e=this.size,n=this.targets,r=this.__touchRecord,o=this.MAX_OVERSCROLL,i=e.container,l=i.width,f=i.height,s=n.canvas.context;s.save(),t>0&&s.transform(1,0,0,-1,0,f);var d=(0,u.pickInRange)(Math.abs(t)/o,0,a),h=(0,u.pickInRange)(d,0,c)*l,v=r.getLastPosition("x")||l/2,_=Math.abs(t);s.globalAlpha=d,s.beginPath(),s.moveTo(-h,0),s.quadraticCurveTo(v,_,l+h,0),s.fill(),s.closePath(),s.restore()}Object.defineProperty(e,"__esModule",{value:!0}),e.overscrollGlow=r;var u=n(112),a=.75,c=.25},function(t,e,n){"use strict";function r(t){var e=this.options,n=this.offset,r=this.movement,o=this.__touchRecord,i=e.damping,u=e.renderByPixels,a=e.overscrollDamping,c=n[t],l=r[t],f=i;if(this.__willOverscroll(t,l)?f=a:o.isActive()&&(f=.5),Math.abs(l)<1){var s=c+l;return{movement:0,position:l>0?Math.ceil(s):Math.floor(s)}}var d=l*(1-f);return u&&(d|=0),{movement:d,position:c+l-d}}function o(){var t=this.options,e=this.offset,n=this.limit,i=this.movement,a=this.overscrollRendered,c=this.__timerID;if(i.x||i.y||a.x||a.y){var l=r.call(this,"x"),f=r.call(this,"y"),s=[];if(t.overscrollEffect){var d=(0,u.pickInRange)(l.position,0,n.x),h=(0,u.pickInRange)(f.position,0,n.y);(a.x||d===e.x&&i.x)&&s.push("x"),(a.y||h===e.y&&i.y)&&s.push("y")}this.movementLocked.x||(i.x=l.movement),this.movementLocked.y||(i.y=f.movement),this.setPosition(l.position,f.position),this.__renderOverscroll(s)}c.render=requestAnimationFrame(o.bind(this))}var i=n(78),u=n(112);Object.defineProperty(i.SmoothScrollbar.prototype,"__render",{value:o,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a["default"])(t)}function i(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0],e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],r=this.options,i=this.movement;this.__updateThrottle();var u=this.__getDeltaLimit(n);r.renderByPixels&&(t=Math.round(t),e=Math.round(e)),i.x=c.pickInRange.apply(void 0,[t].concat(o(u.x))),i.y=c.pickInRange.apply(void 0,[e].concat(o(u.y)))}var u=n(2),a=r(u),c=n(112),l=n(78);Object.defineProperty(l.SmoothScrollbar.prototype,"__setMovement",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0],e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=this.options,r=this.offset,o=this.limit;if(!n.continuousScrolling)return!1;var u=(0,i.pickInRange)(t+r.x,0,o.x),a=(0,i.pickInRange)(e+r.y,0,o.y),c=!0;return c&=u===r.x,c&=a===r.y,c&=u===o.x||0===u||a===o.y||0===a}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__shouldPropagateMovement",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=arguments.length<=1||void 0===arguments[1]?0:arguments[1];if(!t)return!1;var n=this.offset,r=this.limit,o=n[t];return(0,i.pickInRange)(e+o,0,r[t])===o&&(0===o||o===r[t])}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__willOverscroll",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(159);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(160);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(161);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(168);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(169);(0,a["default"])(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(170);(0,a["default"])(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(171);(0,a["default"])(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(172);(0,a["default"])(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return v[t]}})})},function(t,e,n){"use strict";function r(){var t=this,e=this.targets,n=e.container,r=e.content,o=!1,u=void 0,a=void 0;Object.defineProperty(this,"__isDrag",{get:function(){return o},enumerable:!1});var c=function l(e){var n=e.x,r=e.y;if(n||r){var o=t.options.speed;t.__setMovement(n*o,r*o),u=requestAnimationFrame(function(){l({x:n,y:r})})}};this.__addEvent(n,"dragstart",function(e){t.__eventFromChildScrollbar(e)||(o=!0,a=e.target.clientHeight,(0,i.setStyle)(r,{"pointer-events":"auto"}),cancelAnimationFrame(u),t.__updateBounding())}),this.__addEvent(document,"dragover mousemove touchmove",function(e){if(o&&!t.__eventFromChildScrollbar(e)){cancelAnimationFrame(u),e.preventDefault();var n=t.__getPointerTrend(e,a);c(n)}}),this.__addEvent(document,"dragend mouseup touchend blur",function(){cancelAnimationFrame(u),o=!1})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__dragHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(){var t=this,e=this.targets,n=function(e){var n=t.size,r=t.offset,o=t.limit,i=t.movement;switch(e){case s.SPACE:return[0,200];case s.PAGE_UP:return[0,-n.container.height+40];case s.PAGE_DOWN:return[0,n.container.height-40];case s.END:return[0,Math.abs(i.y)+o.y-r.y];case s.HOME:return[0,-Math.abs(i.y)-r.y];case s.LEFT:return[-40,0];case s.UP:return[0,-40];case s.RIGHT:return[40,0];case s.DOWN:return[0,40];default:return null}},r=e.container,o=!1;this.__addEvent(r,"focus",function(){o=!0}),this.__addEvent(r,"blur",function(){o=!1}),this.__addEvent(r,"keydown",function(e){if(o){var i=t.options,u=t.parents,a=t.movementLocked,c=n(e.keyCode||e.which);if(c){var f=l(c,2),s=f[0],d=f[1];if(t.__shouldPropagateMovement(s,d))return r.blur(),u.length&&u[0].focus(),t.__updateThrottle();e.preventDefault(),t.__unlockMovement(),s&&t.__willOverscroll("x",s)&&(a.x=!0),d&&t.__willOverscroll("y",d)&&(a.y=!0);var h=i.speed;t.__addMovement(s*h,d*h)}}}),this.__addEvent(r,"keyup",function(){t.__unlockMovement()})}var i=n(162),u=r(i),a=n(165),c=r(a),l=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=(0,c["default"])(t);!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(l){o=!0,i=l}finally{try{!r&&a["return"]&&a["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,u["default"])(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=n(78),s={SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40};Object.defineProperty(f.SmoothScrollbar.prototype,"__keyboardHandler",{value:o,writable:!0,configurable:!0})},function(t,e,n){t.exports={"default":n(163),__esModule:!0}},function(t,e,n){n(57),n(4),t.exports=n(164)},function(t,e,n){var r=n(53),o=n(45)("iterator"),i=n(27);t.exports=n(12).isIterable=function(t){var e=Object(t);return void 0!==e[o]||"@@iterator"in e||i.hasOwnProperty(r(e))}},function(t,e,n){t.exports={"default":n(166),__esModule:!0}},function(t,e,n){n(57),n(4),t.exports=n(167)},function(t,e,n){var r=n(17),o=n(52);t.exports=n(12).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){"use strict";function r(){var t=this,e=this.targets,n=e.container,r=e.xAxis,o=e.yAxis,u=function(e,n){var r=t.size,o=t.thumbSize;
if("x"===e){var i=r.container.width-(o.x-o.realX);return n/i*r.content.width}if("y"===e){var u=r.container.height-(o.y-o.realY);return n/u*r.content.height}return 0},a=function(t){return(0,i.isOneOf)(t,[r.track,r.thumb])?"x":(0,i.isOneOf)(t,[o.track,o.thumb])?"y":void 0},c=void 0,l=void 0,f=void 0,s=void 0,d=void 0;this.__addEvent(n,"click",function(e){if(!l&&(0,i.isOneOf)(e.target,[r.track,o.track])){var n=e.target,c=a(n),f=n.getBoundingClientRect(),s=(0,i.getPosition)(e),d=t.offset,h=t.thumbSize;if("x"===c){var v=s.x-f.left-h.x/2;t.__setMovement(u(c,v)-d.x,0)}else{var _=s.y-f.top-h.y/2;t.__setMovement(0,u(c,_)-d.y)}}}),this.__addEvent(n,"mousedown",function(e){if((0,i.isOneOf)(e.target,[r.thumb,o.thumb])){c=!0;var n=(0,i.getPosition)(e),u=e.target.getBoundingClientRect();s=a(e.target),f={x:n.x-u.left,y:n.y-u.top},d=t.targets.container.getBoundingClientRect()}}),this.__addEvent(window,"mousemove",function(e){if(c){e.preventDefault(),l=!0;var n=t.offset,r=(0,i.getPosition)(e);if("x"===s){var o=r.x-f.x-d.left;t.setPosition(u(s,o),n.y)}if("y"===s){var a=r.y-f.y-d.top;t.setPosition(n.x,u(s,a))}}}),this.__addEvent(window,"mouseup blur",function(){c=l=!1})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__mouseHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){this.__addEvent(window,"resize",this.__updateThrottle)}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__resizeHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=!1,n=void 0,r=this.targets,o=r.container,u=r.content,a=function l(e){var r=e.x,o=e.y;if(r||o){var i=t.options.speed;t.__setMovement(r*i,o*i),n=requestAnimationFrame(function(){l({x:r,y:o})})}},c=function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];(0,i.setStyle)(o,{"-user-select":t})};this.__addEvent(window,"mousemove",function(r){if(e){cancelAnimationFrame(n);var o=t.__getPointerTrend(r);a(o)}}),this.__addEvent(u,"selectstart",function(r){return t.__eventFromChildScrollbar(r)?c("none"):(cancelAnimationFrame(n),t.__updateBounding(),void(e=!0))}),this.__addEvent(window,"mouseup blur",function(){cancelAnimationFrame(n),c(),e=!1}),this.__addEvent(o,"scroll",function(t){t.preventDefault(),o.scrollTop=o.scrollLeft=0})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__selectHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=this.targets,n=this.movementLocked,r=this.__touchRecord,o=e.container;this.__addEvent(o,"touchstart",function(e){if(!t.__isDrag){var n=t.__timerID,o=t.movement;cancelAnimationFrame(n.scrollTo),t.__willOverscroll("x")||(o.x=0),t.__willOverscroll("y")||(o.y=0),r.track(e),t.__autoLockMovement()}}),this.__addEvent(o,"touchmove",function(e){if(!(t.__isDrag||a&&a!==t)){r.update(e);var n=r.getDelta(),o=n.x,i=n.y;if(t.__shouldPropagateMovement(o,i))return t.__updateThrottle();var u=t.movement,c=t.MAX_OVERSCROLL,l=t.options;if(u.x&&t.__willOverscroll("x",o)){var f=2;"bounce"===l.overscrollEffect&&(f+=Math.abs(10*u.x/c)),Math.abs(u.x)>=c?o=0:o/=f}if(u.y&&t.__willOverscroll("y",i)){var s=2;"bounce"===l.overscrollEffect&&(s+=Math.abs(10*u.y/c)),Math.abs(u.y)>=c?i=0:i/=s}t.__autoLockMovement(),e.preventDefault(),t.__addMovement(o,i,!0),a=t}}),this.__addEvent(o,"touchcancel touchend",function(e){if(!t.__isDrag){var o=t.options.speed,c=r.getVelocity(),l=c.x,f=c.y;l=n.x?0:Math.min(l*i.GLOBAL_ENV.EASING_MULTIPLIER,1e3),f=n.y?0:Math.min(f*i.GLOBAL_ENV.EASING_MULTIPLIER,1e3),t.__addMovement(Math.abs(l)>u?l*o:0,Math.abs(f)>u?f*o:0,!0),t.__unlockMovement(),r.release(e),a=null}})}var o=n(78),i=n(89),u=100,a=null;Object.defineProperty(o.SmoothScrollbar.prototype,"__touchHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=this.targets.container,n=!1,r=(0,i.debounce)(function(){n=!1},30,!1);this.__addEvent(e,u.GLOBAL_ENV.WHEEL_EVENT,function(e){var o=t.options,u=(0,i.getDelta)(e),a=u.x,c=u.y;return a*=o.speed,c*=o.speed,t.__shouldPropagateMovement(a,c)?t.__updateThrottle():(e.preventDefault(),r(),t.overscrollBack&&(n=!0),n&&(t.__willOverscroll("x",a)&&(a=0),t.__willOverscroll("y",c)&&(c=0)),void t.__addMovement(a,c,!0))})}var o=n(78),i=n(112),u=n(89);Object.defineProperty(o.SmoothScrollbar.prototype,"__wheelHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(174);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(175);(0,a["default"])(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(176);(0,a["default"])(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(177);(0,a["default"])(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(178);(0,a["default"])(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(179);(0,a["default"])(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(182);(0,a["default"])(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(183);(0,a["default"])(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(184);(0,a["default"])(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(185);(0,a["default"])(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(186);(0,a["default"])(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i["default"])(e,t,{enumerable:!0,get:function(){return y[t]}})})},function(t,e,n){"use strict";function r(t,e,n){var r=this;if(!t||"function"!=typeof t.addEventListener)throw new TypeError("expect elem to be a DOM element, but got "+t);var o=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];!t.type.match(/drag/)&&t.defaultPrevented||n.apply(void 0,[t].concat(r))};e.split(/\s+/g).forEach(function(e){r.__handlers.push({evt:e,elem:t,fn:o,hasRegistered:!0}),t.addEventListener(e,o)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__addEvent",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.target;return this.children.some(function(t){return t.contains(e)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__eventFromChildScrollbar",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=this.options,n=this.offset,r=this.limit;return t&&(e.continuousScrolling||e.overscrollEffect)?{x:[-(1/0),1/0],y:[-(1/0),1/0]}:{x:[-n.x,r.x-n.x],y:[-n.y,r.y-n.y]}}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__getDeltaLimit",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){var e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=this.bounding,r=n.top,o=n.right,u=n.bottom,a=n.left,c=(0,i.getPosition)(t),l=c.x,f=c.y,s={x:0,y:0};return 0===l&&0===f?s:(l>o-e?s.x=l-o+e:l<a+e&&(s.x=l-a-e),f>u-e?s.y=f-u+e:f<r+e&&(s.y=f-r-e),s)}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__getPointerTrend",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,h["default"])(t)}function i(t){var e=this,n={speed:1,damping:.1,thumbMinSize:20,syncCallbacks:!1,renderByPixels:!0,alwaysShowTracks:!1,continuousScrolling:"auto",overscrollEffect:!1,overscrollEffectColor:"#87ceeb",overscrollDamping:.2},r={damping:[0,1],speed:[0,1/0],thumbMinSize:[0,1/0],overscrollEffect:[!1,"bounce","glow"],overscrollDamping:[0,1]},i=function(){var t=arguments.length<=0||void 0===arguments[0]?"auto":arguments[0];if(n.overscrollEffect!==!1)return!1;switch(t){case"auto":return e.isNestedScrollbar;default:return!!t}},u={set ignoreEvents(t){console.warn("`options.ignoreEvents` parameter is deprecated, use `instance#unregisterEvents()` method instead. https://github.com/idiotWu/smooth-scrollbar/wiki/Instance-Methods#instanceunregisterevents-regex--regex-regex--")},set friction(t){console.warn("`options.friction="+t+"` is deprecated, use `options.damping="+t/100+"` instead."),this.damping=t/100},get syncCallbacks(){return n.syncCallbacks},set syncCallbacks(t){n.syncCallbacks=!!t},get renderByPixels(){return n.renderByPixels},set renderByPixels(t){n.renderByPixels=!!t},get alwaysShowTracks(){return n.alwaysShowTracks},set alwaysShowTracks(t){t=!!t,n.alwaysShowTracks=t;var r=e.targets.container;t?(e.showTrack(),r.classList.add("sticky")):(e.hideTrack(),r.classList.remove("sticky"))},get continuousScrolling(){return i(n.continuousScrolling)},set continuousScrolling(t){"auto"===t?n.continuousScrolling=t:n.continuousScrolling=!!t},get overscrollEffect(){return n.overscrollEffect},set overscrollEffect(t){t&&!~r.overscrollEffect.indexOf(t)&&(console.warn("`overscrollEffect` should be one of "+(0,s["default"])(r.overscrollEffect)+", but got "+(0,s["default"])(t)+". It will be set to `false` now."),t=!1),n.overscrollEffect=t},get overscrollEffectColor(){return n.overscrollEffectColor},set overscrollEffectColor(t){n.overscrollEffectColor=t}};(0,l["default"])(n).filter(function(t){return!u.hasOwnProperty(t)}).forEach(function(t){(0,a["default"])(u,t,{enumerable:!0,get:function(){return n[t]},set:function(e){if(isNaN(parseFloat(e)))throw new TypeError("expect `options."+t+"` to be a number, but got "+("undefined"==typeof e?"undefined":b(e)));n[t]=g.pickInRange.apply(void 0,[e].concat(o(r[t])))}})}),this.__readonly("options",u),this.setOptions(t)}var u=n(86),a=r(u),c=n(90),l=r(c),f=n(180),s=r(f),d=n(2),h=r(d),v=n(55),_=r(v),p=n(62),y=r(p),b="function"==typeof y["default"]&&"symbol"==typeof _["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof y["default"]&&t.constructor===y["default"]?"symbol":typeof t},g=n(112),m=n(78);Object.defineProperty(m.SmoothScrollbar.prototype,"__initOptions",{value:i,writable:!0,configurable:!0})},function(t,e,n){t.exports={"default":n(181),__esModule:!0}},function(t,e,n){var r=n(12),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){"use strict";function r(){this.update(),this.__keyboardHandler(),this.__resizeHandler(),this.__selectHandler(),this.__mouseHandler(),this.__touchHandler(),this.__wheelHandler(),this.__dragHandler(),this.__render()}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__initScrollbar",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){return(0,u["default"])(this,t,{value:e,enumerable:!0,configurable:!0})}var i=n(86),u=r(i),a=n(78);Object.defineProperty(a.SmoothScrollbar.prototype,"__readonly",{value:o,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this.targets,e=this.size,n=this.offset,r=this.thumbOffset,i=this.thumbSize;r.x=n.x/e.content.width*(e.container.width-(i.x-i.realX)),r.y=n.y/e.content.height*(e.container.height-(i.y-i.realY)),(0,o.setStyle)(t.xAxis.thumb,{"-transform":"translate3d("+r.x+"px, 0, 0)"}),(0,o.setStyle)(t.yAxis.thumb,{"-transform":"translate3d(0, "+r.y+"px, 0)"})}var o=n(112),i=n(78);Object.defineProperty(i.SmoothScrollbar.prototype,"__setThumbPosition",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this.targets.container,e=t.getBoundingClientRect(),n=e.top,r=e.right,o=e.bottom,i=e.left,u=window,a=u.innerHeight,c=u.innerWidth;this.__readonly("bounding",{top:Math.max(n,0),right:Math.min(r,c),bottom:Math.min(o,a),left:Math.max(i,0)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__updateBounding",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a["default"])(t)}function i(){var t=this.targets,e=t.container,n=t.content;this.__readonly("children",[].concat(o(n.querySelectorAll(l.selectors)))),this.__readonly("isNestedScrollbar",!1);for(var r=[],i=e;i=i.parentElement;)l.sbList.has(i)&&(this.__readonly("isNestedScrollbar",!0),r.push(i));this.__readonly("parents",r)}var u=n(2),a=r(u),c=n(78),l=n(89);Object.defineProperty(c.SmoothScrollbar.prototype,"__updateTree",{value:i,writable:!0,configurable:!0})},function(t,e){}])});
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9BcHAuanMiLCJhc3NldHMvc2NyaXB0cy9nbG9iYWwvc2Nyb2xsVG8uanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGVzLmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlcy9BYnN0cmFjdE1vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL21vZHVsZXMvQnV0dG9uLmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlcy9TbW9vdGhTY3JvbGwuanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGVzL1RpdGxlLmpzIiwiYXNzZXRzL3NjcmlwdHMvdXRpbHMvYXJyYXkuanMiLCJhc3NldHMvc2NyaXB0cy91dGlscy9lbnZpcm9ubWVudC5qcyIsImFzc2V0cy9zY3JpcHRzL3V0aWxzL2dsb2JhbHMuanMiLCJhc3NldHMvc2NyaXB0cy91dGlscy9odG1sLmpzIiwiYXNzZXRzL3NjcmlwdHMvdXRpbHMvaXMuanMiLCJhc3NldHMvc2NyaXB0cy91dGlscy92aXNpYmlsaXR5LmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aC1zY3JvbGxiYXIvZGlzdC9zbW9vdGgtc2Nyb2xsYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7QUFDQTs7QUFHQTs7OztBQUdBOztJQUFZLE87Ozs7OzswSkFSWjs7O0FBSUE7OztBQUdBOzs7SUFHTSxHO0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFDVixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLEVBQXRCOztBQUVBLCtCQUFVLEVBQVYsQ0FBYSxpQkFBYixFQUFnQyxVQUFDLEtBQUQsRUFBVztBQUN2QyxtQkFBSyxXQUFMLENBQWlCLE1BQU0sVUFBdkIsRUFDSyxhQURMLEdBRUssV0FGTDtBQUdILFNBSkQ7QUFLSDs7QUFFRDs7Ozs7O2tCQUlBLGEsNEJBQWdCO0FBQ1o7QUFDQSxZQUFJLElBQUks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Y2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCB7ICRkb2N1bWVudCwgJGJvZHkgfSBmcm9tICcuL3V0aWxzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IGdldE5vZGVEYXRhIH0gZnJvbSAnLi91dGlscy9odG1sJztcblxuLy8gR2xvYmFsIGZ1bmN0aW9ucyBhbmQgdG9vbHNcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vdXRpbHMvZ2xvYmFscyc7XG5cbi8vIEJhc2ljIG1vZHVsZXNcbmltcG9ydCAqIGFzIG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcblxuY2xhc3MgQXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcbiAgICAgICAgdGhpcy5jdXJyZW50TW9kdWxlcyA9IFtdO1xuXG4gICAgICAgICRkb2N1bWVudC5vbignaW5pdE1vZHVsZXMuQXBwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRHbG9iYWxzKGV2ZW50LmZpcnN0Qmxvb2QpXG4gICAgICAgICAgICAgICAgLmRlbGV0ZU1vZHVsZXMoKVxuICAgICAgICAgICAgICAgIC5pbml0TW9kdWxlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGFsbCBleGlzdGluZyBtb2R1bGVzXG4gICAgICogQHJldHVybiAge09iamVjdH0gIHRoaXMgIEFsbG93cyBjaGFpbmluZ1xuICAgICAqL1xuICAgIGRlbGV0ZU1vZHVsZXMoKSB7XG4gICAgICAgIC8vIExvb3AgbW9kdWxlc1xuICAgICAgICB2YXIgaSA9IHRoaXMuY3VycmVudE1vZHVsZXMubGVuZ3RoO1xuXG4gICAgICAgIC8vIERlc3Ryb3kgYWxsIG1vZHVsZXNcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9kdWxlc1tpXS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVzLnNwbGljZShpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgZ2xvYmFsIGZ1bmN0aW9ucyBhbmQgc2V0dGluZ3NcbiAgICAgKiBBbGxvd3MgeW91IHRvIGluaXRpYWxpemUgZ2xvYmFsIG1vZHVsZXMgb25seSBvbmNlIGlmIHlvdSBuZWVkXG4gICAgICogKGV4Ljogd2hlbiB1c2luZyBCYXJiYS5qcyBvciBTbW9vdGhTdGF0ZS5qcylcbiAgICAgKiBAcmV0dXJuICB7T2JqZWN0fSAgdGhpcyAgQWxsb3dzIGNoYWluaW5nXG4gICAgICovXG4gICAgaW5pdEdsb2JhbHMoZmlyc3RCbG9vZCkge1xuICAgICAgICBnbG9iYWxzKGZpcnN0Qmxvb2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIG1vZHVsZXMgYW5kIGluaXRpYWxpemUgdGhlbVxuICAgICAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcbiAgICAgKi9cbiAgICBpbml0TW9kdWxlcygpIHtcbiAgICAgICAgLy8gRWxlbWVudHMgd2l0aCBtb2R1bGVcbiAgICAgICAgdmFyIG1vZHVsZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZHVsZV0nKTtcblxuICAgICAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudHNcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgZWxzTGVuID0gbW9kdWxlRWxzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKDsgaSA8IGVsc0xlbjsgaSsrKSB7XG5cbiAgICAgICAgICAgIC8vIEN1cnJlbnQgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGVsID0gbW9kdWxlRWxzW2ldO1xuXG4gICAgICAgICAgICAvLyBBbGwgZGF0YS0gYXR0cmlidXRlcyBjb25zaWRlcmVkIGFzIG9wdGlvbnNcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gZ2V0Tm9kZURhdGEoZWwpO1xuXG4gICAgICAgICAgICAvLyBBZGQgY3VycmVudCBET00gZWxlbWVudCBhbmQgalF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIG9wdGlvbnMuZWwgPSBlbDtcbiAgICAgICAgICAgIG9wdGlvbnMuJGVsID0gJChlbCk7XG5cbiAgICAgICAgICAgIC8vIE1vZHVsZSBkb2VzIGV4aXN0IGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgIGxldCBhdHRyID0gb3B0aW9ucy5tb2R1bGU7XG5cbiAgICAgICAgICAgIC8vIFNwbGl0dGluZyBtb2R1bGVzIGZvdW5kIGluIHRoZSBkYXRhLWF0dHJpYnV0ZVxuICAgICAgICAgICAgbGV0IG1vZHVsZUlkZW50cyA9IGF0dHIucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgICAgICAvLyBMb29wIG1vZHVsZXNcbiAgICAgICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgICAgIGxldCBtb2R1bGVzTGVuID0gbW9kdWxlSWRlbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yICg7IGogPCBtb2R1bGVzTGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kdWxlQXR0ciA9IG1vZHVsZUlkZW50c1tqXTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2R1bGVzW21vZHVsZUF0dHJdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb2R1bGUgPSBuZXcgdGhpcy5tb2R1bGVzW21vZHVsZUF0dHJdKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVzLnB1c2gobW9kdWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbi8vIElJRkUgZm9yIGxvYWRpbmcgdGhlIGFwcGxpY2F0aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKGZ1bmN0aW9uKCkge1xuXG5cbn0pKCk7XG5cblxuXG4vLyByZW1hcCBqUXVlcnkgdG8gJFxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICBmdW5jdGlvbiBpbml0U2NyaXB0ICgpIHtcblxuICAgICAgICB3aW5kb3cuQXBwID0gbmV3IEFwcCgpO1xuICAgICAgICAkZG9jdW1lbnQudHJpZ2dlcih7XG4gICAgICAgICAgICB0eXBlOiAnaW5pdE1vZHVsZXMuQXBwJyxcbiAgICAgICAgICAgIGZpcnN0Qmxvb2Q6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKChpcy5kZXNrdG9wKCkpICYmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpIHx8IChpcy5pZSgpKSAgJiYgKCQod2luZG93KS53aWR0aCgpID4gMTAyNCkpIHtcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignU21vb3RoU2Nyb2xsLmlzUmVhZHknLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuYmFyYmEtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xuICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKCdkb20taXMtbG9hZGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjcmlwdCBDb250YWN0IHBhZ2VcbiAgICAgICAgJCgnLmpzLXRvZ2dsZS1mb3JtLWZlZWRiYWNrJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5qcy1jb250YWN0LWNob29zZScpLnRvZ2dsZUNsYXNzKCdpcy1oaWRlJyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcuanMtY29udGFjdC1jaG9vc2UnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tZmVlZGJhY2snKS5zaG93KCk7XG4gICAgICAgICAgICB9LDkwMCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS1mZWVkYmFjaycpLnRvZ2dsZUNsYXNzKCdpcy1oaWRlJyk7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignU21vb3RoU2Nyb2xsLnJlYnVpbGQnKTtcbiAgICAgICAgICAgIH0sMTIwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLWZlZWRiYWNrLWJhY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tZmVlZGJhY2snKS50b2dnbGVDbGFzcygnaXMtaGlkZScpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbnRhY3QtY2hvb3NlJykuc2hvdygpO1xuICAgICAgICAgICAgfSw5MDApO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbnRhY3QtY2hvb3NlJykudG9nZ2xlQ2xhc3MoJ2lzLWhpZGUnKTtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdTbW9vdGhTY3JvbGwucmVidWlsZCcpO1xuICAgICAgICAgICAgfSwxMjAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtdG9nZ2xlLWZvcm0tZW5xdWlyaWVzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5qcy1jb250YWN0LWNob29zZScpLnRvZ2dsZUNsYXNzKCdpcy1oaWRlJyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcuanMtY29udGFjdC1jaG9vc2UnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tZW5xdWlyaWVzJykuc2hvdygpO1xuICAgICAgICAgICAgfSw5MDApO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tZW5xdWlyaWVzJykudG9nZ2xlQ2xhc3MoJ2lzLWhpZGUnKTtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdTbW9vdGhTY3JvbGwucmVidWlsZCcpO1xuICAgICAgICAgICAgfSwxMjAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtZW5xdWlyaWVzLWJhY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tZW5xdWlyaWVzJykudG9nZ2xlQ2xhc3MoJ2lzLWhpZGUnKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLWVucXVpcmllcycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKCcuanMtY29udGFjdC1jaG9vc2UnKS5zaG93KCk7XG4gICAgICAgICAgICB9LDkwMCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcuanMtY29udGFjdC1jaG9vc2UnKS50b2dnbGVDbGFzcygnaXMtaGlkZScpO1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5yZWJ1aWxkJyk7XG4gICAgICAgICAgICB9LDEyMDApO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy10ZXh0YXJlYScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgICAgIHZhciAkdGV4dCA9ICQodGhpcykuZmluZCgnLmpzLXdyaXRlJylcbiAgICAgICAgICAgIGlmICgkdGV4dC50ZXh0KCkgPT0gJycpICR0ZXh0LmdldCgwKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgIFx0JCgnLmpzLXRleHRhcmVhIC5qcy13cml0ZScpLm9uKCdmb2N1cycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXRleHRhcmVhIC5qcy13cml0ZScpLm9uKCdrZXl1cCcsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcuanMtdGV4dGFyZWEnKS5wcmV2KCkudmFsKCQodGhpcykudGV4dCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIi5qcy10eXBlLWhlcmVcIikudHlwZWQoe1xuICAgICAgICAgICAgICAgIHN0cmluZ3M6IFtcIlR5cGUgaGVyZVwiXSxcbiAgICAgICAgICAgICAgICB0eXBlU3BlZWQ6IDUwLFxuICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgIGJhY2tEZWxheTogMjUwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFbmQgc2NyaXB0IGNvbnRhY3QgcGFnZVxuXG5cblxuXG5cbiAgICAgICAgJCgnLmpzLXRvb2dsZS1icmFuZDpub3QoLi1pbml0ZWQpJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5jLWJyYW5kLWxpc3QtbmF2JykudG9nZ2xlQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgfSkuYWRkQ2xhc3MoXCItaW5pdGVkXCIpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBTaGFyZVxuICAgICAgICAkKCcuanMtdG9vZ2xlLXNoYXJlOm5vdCguLWluaXRlZCknKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmMtbGluay1zaGFyZScpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIH0pLmFkZENsYXNzKFwiLWluaXRlZFwiKTtcblxuICAgICAgICAvLyBUb2dnbGUgTmF2XG4gICAgICAgICQoJy5qcy10b2dnbGUtbmF2Om5vdCguLWluaXRlZCknKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLy5jLW5hdl93cmFwXG4gICAgICAgICAgICBpZigkKCdib2R5JykuaGFzQ2xhc3MoJ2hhcy1jYXRlZ29yeS1vcGVuJykpe1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGFzLWNhdGVnb3J5LW9wZW4nKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKCQoJ2JvZHknKS5oYXNDbGFzcygnaGFzLXNlYXJjaC1vcGVuJykpe1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGFzLXNlYXJjaC1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoYXMtbmF2LW9wZW4nKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGFzLW5hdi1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCEkKCdib2R5JykuaGFzQ2xhc3MoJ2hhcy1uYXYtb3BlbicpKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jLW5hdl93cmFwJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOjB9LDApO1xuICAgICAgICAgICAgICAgIH0sMCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KS5hZGRDbGFzcyhcIi1pbml0ZWRcIik7XG5cbiAgICAgICAgLy8gVG9nZ2xlIGNhdGVnb3J5XG4gICAgICAgICQoJy5qcy10b2dnbGUtY2F0ZWdvcnk6bm90KC4taW5pdGVkKScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2MtYnV0dG9uLW5hdicpKXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hhcy1jYXRlZ29yeS1vcGVuJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hhcy1jYXRlZ29yeS1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCQoJy5jLWJ1dHRvbi1uYXYnKS5oYXNDbGFzcygnanMtdG9nZ2xlLW5hdicpKXtcbiAgICAgICAgICAgICAgICAkKCcuYy1idXR0b24tbmF2JykucmVtb3ZlQ2xhc3MoJ2pzLXRvZ2dsZS1uYXYnKTtcbiAgICAgICAgICAgICAgICAkKCcuYy1idXR0b24tbmF2JykuYWRkQ2xhc3MoJ2pzLXRvZ2dsZS1jYXRlZ29yeScpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgIFx0XHQkKCcuYy1idXR0b24tbmF2JykucmVtb3ZlQ2xhc3MoJ2pzLXRvZ2dsZS1jYXRlZ29yeScpO1xuICAgICAgICBcdFx0JCgnLmMtYnV0dG9uLW5hdicpLmFkZENsYXNzKCdqcy10b2dnbGUtbmF2Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgXHR9KS5hZGRDbGFzcyhcIi1pbml0ZWRcIik7XG5cbiAgICAgICAgLy8gVG9nZ2xlIFByb2R1Y3RcbiAgICAgICAgJCgnLmpzLXRvZ2dsZS1wcm9kdWN0Om5vdCguLWluaXRlZCknKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaGFzLXByb2R1Y3Qtb3BlbicpKXtcbiAgICAgICAgICAgICAgICAkKCcuYy1uYXYtcHJvZHVjdC1kcm9wZG93bi5pcy1hY3RpdmUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgICAgICAgICAkKCcuaGFzLXByb2R1Y3Qtb3BlbicpLnJlbW92ZUNsYXNzKCdoYXMtcHJvZHVjdC1vcGVuJyk7XG5cbiAgICBcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hhcy1kcm9wZG93bi1leHBhbmQnKTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJCgnLmMtbmF2LXByb2R1Y3QtZHJvcGRvd24uaXMtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgJCgnLmhhcy1wcm9kdWN0LW9wZW4nKS5yZW1vdmVDbGFzcygnaGFzLXByb2R1Y3Qtb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGFzLXByb2R1Y3Qtb3BlbicpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgIFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLWRyb3Bkb3duLWV4cGFuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIFx0fSkuYWRkQ2xhc3MoXCItaW5pdGVkXCIpO1xuXG4gICAgICAgIC8vVG9nZ2xlIHNpZGViYXIgbW9iaWxlXG4gICAgICAgICQoJy5qcy10b29nbGUtc2lkZWJhci1tb2JpbGU6bm90KC4taW5pdGVkKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmMtcHJvZHVjdC1hc2lkZScpLnNsaWRlVG9nZ2xlKDMwMCk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW5hdi1wcm9kdWN0LW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLW5hdi1wcm9kdWN0LW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkuYWRkQ2xhc3MoXCItaW5pdGVkXCIpO1xuXG4gICAgICAgIC8vIEFjY29yZGlvblxuICAgIFx0JCgnLmpzLWFjY29yZGlvbjpub3QoLi1pbml0ZWQpJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignU21vb3RoU2Nyb2xsLnJlYnVpbGQnKTtcbiAgICAgICAgICAgIH0sNDAwKTtcblxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5uZXh0KCkuc2xpZGVVcCgzMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICBcdFx0XHRpZigkKCcuanMtYWNjb3JkaW9uLmlzLW9wZW4nKS5sZW5ndGgpe1xuICAgIFx0XHRcdCAgICQoJy5qcy1hY2NvcmRpb24uaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykubmV4dCgpLnNsaWRlVXAoMzAwKTtcbiAgICBcdFx0XHR9O1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5uZXh0KCkuc2xpZGVEb3duKDMwMCk7XG4gICAgXHRcdFx0dmFyIF90aGlzID0gJCh0aGlzKTsgLy8gc2NvcGUgYmFieVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBcdCAgICAgICAgICAgICAgICBzY3JvbGxUb3A6JChfdGhpcykub2Zmc2V0KCkudG9wIC0gMTYwXG4gICAgXHQgICAgICAgICAgICB9LCA1MDApO1xuICAgIFx0XHRcdH0sMzAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkuYWRkQ2xhc3MoXCItaW5pdGVkXCIpO1xuXG4gICAgICAgIC8vIFNjcmlwdCBmaWx0ZXJcbiAgICAgICAgJCgnLmpzLWZpbHRlcjpub3QoLi1pbml0ZWQpJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLm5leHQoKS5zbGlkZVVwKDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgIFx0XHRcdGlmKCQoJy5qcy1maWx0ZXIuaXMtb3BlbicpLmxlbmd0aCl7XG4gICAgXHRcdFx0ICAgJCgnLmpzLWZpbHRlci5pcy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5uZXh0KCkuc2xpZGVVcCgzMDApO1xuICAgIFx0XHRcdH07XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpLm5leHQoKS5zbGlkZURvd24oMzAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkuYWRkQ2xhc3MoXCItaW5pdGVkXCIpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBTZWFyY2hcbiAgICAgICAgJCgnLmpzLXRvZ2dsZS1zZWFyY2g6bm90KC4taW5pdGVkKScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdoYXMtbmF2LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGFzLW5hdi1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoYXMtc2VhcmNoLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoYXMtc2VhcmNoLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChcIi5qcy1zZWFyY2gtaW5wdXRcIikuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sMTIwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBcdH0pLmFkZENsYXNzKFwiLWluaXRlZFwiKTtcblxuXG4gICAgICAgIC8vIFN3aXBlYm94XG4gICAgICAgICQoICcuanMtcGhvdG9zJyApLnN3aXBlYm94KCB7XG4gICAgICAgICAgICAvL2F1dG9wbGF5VmlkZW9zOiB0cnVlLFxuICAgICAgICAgICAgdXNlQ1NTIDogdHJ1ZSwgLy8gZmFsc2Ugd2lsbCBmb3JjZSB0aGUgdXNlIG9mIGpRdWVyeSBmb3IgYW5pbWF0aW9uc1xuICAgICAgICAgICAgdXNlU1ZHIDogdHJ1ZSwgLy8gZmFsc2UgdG8gZm9yY2UgdGhlIHVzZSBvZiBwbmcgZm9yIGJ1dHRvbnNcbiAgICAgICAgICAgIGluaXRpYWxJbmRleE9uQXJyYXkgOiAwLCAvLyB3aGljaCBpbWFnZSBpbmRleCB0byBpbml0IHdoZW4gYSBhcnJheSBpcyBwYXNzZWRcbiAgICAgICAgICAgIGhpZGVDbG9zZUJ1dHRvbk9uTW9iaWxlIDogZmFsc2UsIC8vIHRydWUgd2lsbCBoaWRlIHRoZSBjbG9zZSBidXR0b24gb24gbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIGhpZGVCYXJzRGVsYXkgOiAzMDAwLCAvLyBkZWxheSBiZWZvcmUgaGlkaW5nIGJhcnMgb24gZGVza3RvcFxuICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7fSwgLy8gY2FsbGVkIGJlZm9yZSBvcGVuaW5nXG4gICAgICAgICAgICBhZnRlck9wZW46IG51bGwsIC8vIGNhbGxlZCBhZnRlciBvcGVuaW5nXG4gICAgICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHt9LCAvLyBjYWxsZWQgYWZ0ZXIgY2xvc2luZ1xuICAgICAgICAgICAgbG9vcEF0RW5kOiB0cnVlIC8vIHRydWUgd2lsbCByZXR1cm4gdG8gdGhlIGZpcnN0IGltYWdlIGFmdGVyIHRoZSBsYXN0IGltYWdlIGlzIHJlYWNoZWRcbiAgICAgICAgfSApO1xuXG5cbiAgICAgICAgLy8gTW92ZSBiYWNrZ3JvdW5kIGFib3V0IHBhZ2VcbiAgICAgICAgdmFyIG1pbiA9IC0xMjA7XG4gICAgXHR2YXIgbWF4ID0gMTIwO1xuICAgIFx0dmFyIGVsVG9Sb3RhdGUgPSAkKCcuanMtbW92ZS1iZycpO1xuXG4gICAgXHRmdW5jdGlvbiBnZXRSb3RhdGluZ0FuZ2xlKHAsIG1pbiwgbWF4KXtcbiAgICBcdFx0dmFyIGFuZ2xlID0gKDEvMTAwKSooKHAqbWF4KSArICgxMDAqbWluKSAtIChwKm1pbikpO1xuICAgIFx0XHRyZXR1cm4gYW5nbGU7XG4gICAgXHR9XG5cbiAgICBcdC8vR2V0IGVsZW1lbnQgd2lkdGhcbiAgICBcdHZhciBwcm9ncmVzc1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgXHR2YXIgcHJvZ3Jlc3NIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICBcdCQod2luZG93KS5tb3VzZW1vdmUoZnVuY3Rpb24oZSl7XG4gICAgXHRcdC8vIEdldCBlbGVtZW50IHBvc2l0aW9uXG4gICAgXHRcdHZhciBwYXJlbnRPZmZzZXQgPSAkKCd0aGlzJykub2Zmc2V0KCk7XG5cbiAgICBcdFx0Ly8gQ3Vyc29yIHBvc2l0aW9uIFhcbiAgICBcdFx0dmFyIHJlbFggPSBlLmNsaWVudFg7XG5cbiAgICBcdFx0Ly8gQ3Vyc29yIHBvc2l0aW9uIFlcbiAgICBcdFx0dmFyIHJlbFkgPSBlLmNsaWVudFk7XG5cbiAgICBcdFx0Ly8gTGEgc291cmlzIHNlIHRyb3V2ZSDDoCBYJSBhdSBkZXNzdXMgZGUgbCfDqWzDqW1lbnRcbiAgICBcdFx0dmFyIGN1cnJlbnRQcm9ncmVzc1ggPSByZWxYIC8gcHJvZ3Jlc3NXaWR0aCAqIDEwMDtcbiAgICBcdFx0XHRjdXJyZW50UHJvZ3Jlc3NYID0gTWF0aC5yb3VuZChjdXJyZW50UHJvZ3Jlc3NYKTtcblxuICAgIFx0XHQvLyBMYSBzb3VyaXMgc2UgdHJvdXZlIMOgIFklIGF1IGRlc3N1cyBkZSBsJ8OpbMOpbWVudFxuICAgIFx0XHR2YXIgY3VycmVudFByb2dyZXNzWSA9IHJlbFkgLyBwcm9ncmVzc0hlaWdodCAqIDEwMDtcbiAgICBcdFx0XHRjdXJyZW50UHJvZ3Jlc3NZID0gTWF0aC5yb3VuZChjdXJyZW50UHJvZ3Jlc3NZKTtcblxuICAgIFx0XHQvLyBDZSBxdWkgZG9ubmUgWCBkZWdyw6lzIGRlIHJvdGF0aW9uIDpcbiAgICBcdFx0dmFyIGdldEFuZ2xlWCA9IGdldFJvdGF0aW5nQW5nbGUoY3VycmVudFByb2dyZXNzWCwgbWluLCBtYXgpO1xuICAgIFx0XHR2YXIgZ2V0QW5nbGVZID0gZ2V0Um90YXRpbmdBbmdsZShjdXJyZW50UHJvZ3Jlc3NZLCBtaW4sIG1heCk7XG5cbiAgICBcdFx0ZWxUb1JvdGF0ZS5jc3MoXCJ0cmFuc2Zvcm1cIixcInRyYW5zbGF0ZVgoXCIrZ2V0QW5nbGVYK1wicHgpIHRyYW5zbGF0ZVkoXCIrZ2V0QW5nbGVZK1wicHgpXCIpO1xuICAgIFx0fSk7XG5cbiAgICAgICAgLy8gRW5kIHNjcmlwdCBtb3ZlIGJhY2tncm91bmQgYWJvdXQgcGFnZVxuXG5cbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5yZWJ1aWxkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgoaXMuZGVza3RvcCgpKSAmJiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB8fCAoaXMuaWUoKSkgICYmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpKSB7XG4gICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWRlc2t0b3AnKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5yZWJ1aWxkJyk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyQoJ2JvZHknKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbW9iaWxlJyk7XG5cbiAgICAgICAgICAgICQoJy5jLW92ZXJsYXktY2hhbmdpbmctcGFnZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAgICAgaHVudChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1wYXJhbGxheCcpLCB7XG4gICAgICAgICAgICAgICAgaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2lzLWludmlldycpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIFNjcmlwdCBzbGlkZXJcbiAgICAgICAgJCgnLmpzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHNwZWVkOiA5MDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNsaWRlci1wcm9kdWN0Jykuc2xpY2soe1xuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgc3BlZWQ6IDkwMCxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgLy92ZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBhc05hdkZvcjogJy5qcy1zbGlkZXItcHJvZHVjdC1uYXYnLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2xpZGVyLXByb2R1Y3QtbmF2Jykuc2xpY2soe1xuICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICBhc05hdkZvcjogJy5qcy1zbGlkZXItcHJvZHVjdCcsXG4gICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgc3BlZWQ6IDkwMCxcbiAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zbGlkZXItYWJvdXQnKS5zbGljayh7XG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNwZWVkOiA0MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNjAwLFxuICAgICAgICAgICAgYXJyb3c6IGZhbHNlLFxuICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNsaWRlci1hYm91dCcpLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlKXtcbiAgICAgICAgICAgICQoJy5zbGljay1hY3RpdmUnKS5hZGRDbGFzcygnaXMtY2hhbmdpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNsaWRlci1hYm91dCcpLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbihldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSl7XG4gICAgICAgICAgICAkKCcuc2xpY2stYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2lzLWNoYW5naW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zbGlkZXItaW5kZXgtbGV0dGVyJykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgc3BlZWQ6IDkwMCxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLXNsaWRlci1pbmRleCdcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKCcuanMtc2xpZGVyLWFscGhhYmV0aWNhbC1tb2JpbGUnKS5zbGljayh7XG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzYwcHgnLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxMyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA3XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKCcuanMtc2xpZGVyLWluZGV4LWxldHRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICBzcGVlZDogOTAwLFxuICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2xpZGVyLWluZGV4Jykuc2xpY2soe1xuICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICBhc05hdkZvcjogJy5qcy1zbGlkZXItaW5kZXgtbGV0dGVyJyxcbiAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgc3BlZWQ6IDkwMCxcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKCcuby1zY3JvbGwtaG9tZSAuc2Nyb2xsLWNvbnRlbnQnKS5vbihcImhhc3Njcm9sbGVkXCIsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCQoJy5vLXNjcm9sbC1ob21lJykuZGF0YSgneScpKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ3knKSA8PSAtNDAwKSB7XG4gICAgICAgICAgICAgICAgLy8gV2hhdGV2ZXJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9nZ2xlIGNsYXNzIVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5jLXByb2R1Y3QtbGlzdC1oZWFkZXIgLmMtZmlsdGVyJykuaGFzQ2xhc3MoJ2lzLWludmlldycpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmMtcHJvZHVjdC1hc2lkZScpLmFkZENsYXNzKCdpcy1ub3QtdG9wJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3llc3MnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoJy5jLXByb2R1Y3QtYXNpZGUnKS5yZW1vdmVDbGFzcygnaXMtbm90LXRvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cblxuICAgICAgICAkKCcuanMtYXJ0aWNsZS1tb3JlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkYWwgPSAkKCc8ZGl2IGlkPVwiYXJ0aWNsZS1sb2FkZXJcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiIC8+JykuYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICAgICAgICAgICRhbC5sb2FkKCcvcGFnZXMvYXJ0aWNsZS1sb2FkZXInLGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBuYiA9IDA7XG4gICAgICAgICAgICAgIHZhciBhbGxzaG93biA9IHRydWU7XG4gICAgICAgICAgICAgICRhbC5maW5kKCcuby10aGlyZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5iID49IDYpIHtcbiAgICAgICAgICAgICAgICAgIFx0YWxsc2hvd24gPSBmYWxzZTtcbiAgICAgICAgXHRcdFx0cmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJCgnI2pzLWJsb2ctcGFyYWxsYXggIycrJCh0aGlzKS5hdHRyKCdpZCcpKS5sZW5ndGggPiAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbmIrKztcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy1wYXJhbGxheDpmaXJzdCcpLmF0dHIoJ2RhdGEtc3BlZWQnLChuYj09Mnx8bmI9PTUgPyAnMC4zJyA6ICcxLjUnKSkuZW5kKCkuYXBwZW5kVG8oJCgnI2pzLWJsb2ctcGFyYWxsYXggLm8tZ3JpZCcpKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICRhbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgaWYgKGFsbHNob3duKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWFydGljbGUtbW9yZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoKTtcbiAgICAgICAgICAgICAgfSwxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCcuanMtbW9yZS1wcm9kdWN0cycsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJG1vcmUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICRtb3JlLmRhdGEoJ2NvbnRhaW5lcicpO1xuICAgICAgICAgICAgdmFyICRwbCA9ICQoJzxkaXYgaWQ9XCJwcm9kdWN0LWxvYWRlclwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgLz4nKS5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgICAgICAgICAgJHBsLmxvYWQoJCh0aGlzKS5hdHRyKCdocmVmJykrJyAuanMtcHJvZHVjdHMtY29udGFpbmVyJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICRwbC5maW5kKCcuanMtcHJvZHVjdC1pdGVtLWNvbnRhaW5lcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmFwcGVuZFRvKCQoJy5qcy1wcm9kdWN0LWdyaWQ6Zmlyc3QnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKFsnLmpzLWNvbC0xJywnLmpzLWNvbC0yJywnLmpzLWNvbC0zJ10sZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgJHBsLmZpbmQoc2VsZWN0b3IrJyAuanMtcHJvZHVjdC1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hcHBlbmRUbygkKCcjanMtcHJvZHVjdC1wYXJhbGxheCAnK3NlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoJHBsLmZpbmQoJy5qcy1tb3JlLXByb2R1Y3RzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHBsLmZpbmQoJy5qcy1tb3JlLXByb2R1Y3RzJykuYXBwZW5kVG8oJCgnLmpzLWxvYWQtbW9yZS1jb250YWluZXI6Zmlyc3QnKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKCk7XG4gICAgICAgICAgICAgIH0sMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJG1vcmUucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuanMtc29ydC1pdGVtcyBhJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFNob3BpZnkucXVlcnlQYXJhbXMuc29ydF9ieSA9ICQodGhpcykuZGF0YSgnc29ydCcpO1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoID0gJC5wYXJhbShTaG9waWZ5LnF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJy5qcy1icmFuZHMtZmlsdGVyIGEnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYy1maWx0ZXJfbGluaycpLndyYXBJbm5lcignPHNwYW4gLz4nKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJy5qcy1hZGQtdG8tY2FydCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBTaG9waWZ5LmFkZEl0ZW0oJCgnLmpzLWZpbHRlci12YXJpYW50JykuZGF0YSgndmFyaWFudGlkJyksJCgnLmpzLXF1YW50aXR5JykudmFsKCksZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBcdGxvY2F0aW9uLmhyZWYgPSAnL2NhcnQnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuanMtdmFyaWFudC1zZWxlY3QnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFx0JCgnLmpzLWZpbHRlci12YXJpYW50JykuZGF0YSgndmFyaWFudGlkJywkKHRoaXMpLmRhdGEoJ3ZhcmlhbnRpZCcpKTtcbiAgICAgICAgICAgICQoJy5qcy12YXJpYW50LXRpdGxlJykudGV4dCgkKHRoaXMpLnRleHQoKSk7XG4gICAgICAgICAgICAkKCcuanMtZmlsdGVyLmlzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLm5leHQoKS5zbGlkZVVwKDMwMCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuanMtbGVzcycpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcXR5ID0gJCh0aGlzKS5uZXh0KCkudmFsKCk7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQocXR5LDEwKSA+IDEpIHF0eS0tO1xuICAgICAgICAgICAgZWxzZSBxdHkgPSAxO1xuICAgICAgICAgICAgJCh0aGlzKS5uZXh0KCkudmFsKHF0eSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJCgnLmpzLW1vcmUnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHF0eSA9ICQodGhpcykucHJldigpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHF0eSwxMCkpIHF0eSsrO1xuICAgICAgICAgICAgZWxzZSBxdHkgPSAxO1xuICAgICAgICAgICAgJCh0aGlzKS5wcmV2KCkudmFsKHF0eSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuYy1pbmRleC1hbHBoYWJ0aWNhbF9pdGVtJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy5jLWluZGV4LWFscGhhYnRpY2FsX2l0ZW0uaXMtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBsZXR0ZXIgPSAkKHRoaXMpLmZpbmQoJ3NwYW4nKS50ZXh0KCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpWzBdO1xuICAgICAgICAgICAgdmFyIGlkeCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgICAgIGlmIChpZHggPiAxMykge1xuICAgICAgICAgICAgICB2YXIgdG9Nb3ZlID0gaWR4IC0gMTM7XG4gICAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8dG9Nb3ZlO3grKykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAkKCcuYy1pbmRleC1hbHBoYWJ0aWNhbF9pdGVtOmZpcnN0JykuYXBwZW5kVG8oJCgnLmMtaW5kZXgtYWxwaGFidGljYWxfaXRlbScpLnBhcmVudCgpKTtcbiAgICAgICAgICAgICAgICB9LHgqNzApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICB9LHRvTW92ZSo3MCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeCA8IDEzKSB7XG4gICAgICAgICAgICAgIHZhciB0b01vdmUgPSAxMyAtIGlkeDtcbiAgICAgICAgICAgICAgZm9yKHZhciB4PTA7eDx0b01vdmU7eCsrKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICQoJy5jLWluZGV4LWFscGhhYnRpY2FsX2l0ZW06bGFzdCcpLnByZXBlbmRUbygkKCcuYy1pbmRleC1hbHBoYWJ0aWNhbF9pdGVtJykucGFyZW50KCkpO1xuICAgICAgICAgICAgICAgIH0seCo3MCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH0sdG9Nb3ZlKjcwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJy5qcy1pbmdyZWRpZW50LWxpc3QgbGkuYy1pbmRleC1yZXN1bHRzX2l0ZW0nKS5oaWRlKCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHQgPSB0b01vdmUqNzA7XG4gICAgICAgICAgICAkKCcuanMtaW5ncmVkaWVudC1saXN0IGxpLmMtaW5kZXgtcmVzdWx0c19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICB2YXIgdHh0ID0gJCh0aGlzKS5maW5kKCdzcGFuJykudGV4dCgpO1xuXG4gICAgICAgICAgICAgIGlmICh0eHRbMF0udG9Mb3dlckNhc2UoKSA9PSBsZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICB0ICs9IDcwO1xuICAgICAgICAgICAgICAgIHZhciAkdGhhdCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgJHRoYXQuc2hvdygpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAkdGhhdC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSx0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICgkKCcuanMtaW5ncmVkaWVudC1saXN0JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcuanMtaW5ncmVkaWVudC1saXN0IGxpLmMtaW5kZXgtcmVzdWx0c19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHR4dCA9ICQodGhpcykuZmluZCgnc3BhbicpLnRleHQoKTtcbiAgICAgICAgICAgICAgaWYgKHR4dFswXS50b0xvd2VyQ2FzZSgpICE9ICdhJykgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICAgIGVsc2UgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkKCcuY29udGFjdC1mb3JtJykub24oJ3N1Ym1pdCcsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkLnBvc3QoJCh0aGlzKS5hdHRyKCdhY3Rpb24nKS5zcGxpdCgnIycpWzBdLCQodGhpcykuc2VyaWFsaXplQXJyYXkoKSk7XG4gICAgICAgICAgICAkKCcuanMtZm9ybS1lbnF1aXJpZXMsIC5qcy1mb3JtLWZlZWRiYWNrJykudG9nZ2xlQ2xhc3MoJ2lzLWhpZGUnKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKCcuanMtZm9ybS1lbnF1aXJpZXMsIC5qcy1mb3JtLWZlZWRiYWNrJykuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuanMtbWFpbC1zZW50Jykuc2hvdygpO1xuICAgICAgICAgICAgfSwxMjAwKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKCcuanMtbWFpbC1zZW50JykudG9nZ2xlQ2xhc3MoJ2lzLWhpZGUnKTtcbiAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignU21vb3RoU2Nyb2xsLnJlYnVpbGQnKTtcbiAgICAgICAgICAgIH0sMTYwMCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuanMtc2VhcmNoLWlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQuZ2V0KCcvc2VhcmNoLmpzb24/cT0nKyQodGhpcykudmFsKCkrJyZ0eXBlPXByb2R1Y3QnLGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgJCgnLmpzLXByb2R1Y3RzLXNlYXJjaC1yZXN1bHRzJykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICQoJy5qcy1zZWFyY2gtcHJvZHVjdC1jb3VudCcpLnRleHQoZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAkLmVhY2goZGF0YSxmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJvLWhhbGZcIj5cXFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2R1Y3RzLycrdGhpcy5oYW5kbGUrJ1wiIGNsYXNzPVwiYy1zZWFyY2gtcHJvZHVjdF9saW5rXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCInK3RoaXMuZmVhdHVyZWRfaW1hZ2UrJ1wiIGFsdD1cIlwiPlxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjLXNlYXJjaC1wcm9kdWN0X3RleHRcIj5cXFxuICAgICAgICAgICAgICAgICAgICA8aDM+PHNwYW4+Jyt0aGlzLnRpdGxlKyc8L3NwYW4+PC9oMz5cXFxuICAgICAgICAgICAgICAgICAgICA8cD4nK3RoaXMudmVuZG9yKyc8L3A+XFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PicpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJy5qcy1wcm9kdWN0cy1zZWFyY2gtcmVzdWx0cycpKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJy5qcy1mYi1zaGFyZScpLmF0dHIoJ2hyZWYnLCQoJy5qcy1mYi1zaGFyZScpLmF0dHIoJ2hyZWYnKSsnP3U9Jytsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAkKCcuanMtdHdpdHRlci1zaGFyZScpLmF0dHIoJ2hyZWYnLCQoJy5qcy10d2l0dGVyLXNoYXJlJykuYXR0cignaHJlZicpKycmdXJsPScrbG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgJCgnLmpzLW1haWwtc2hhcmUnKS5hdHRyKCdocmVmJywkKCcuanMtbWFpbC1zaGFyZScpLmF0dHIoJ2hyZWYnKStsb2NhdGlvbi5ocmVmKTtcblxuICAgICAgICAgIHZhciB1cmwgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICB2YXIgbmF2U2hvd24gPSBmYWxzZTtcbiAgICAgICAgICBpZiAodXJsLmluZGV4T2YoJy9jb2xsZWN0aW9ucy8nKSAhPSAtMSkge1xuICAgICAgICAgICAgaWYgKCQoJ2EuYy1zZWxlY3QtY2F0ZWdvcnlfbGlua1tocmVmPVwiJyt1cmwrJ1wiXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAkKCdhLmMtc2VsZWN0LWNhdGVnb3J5X2xpbmtbaHJlZj1cIicrdXJsKydcIl0nKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgIHZhciBuYXYgPSB1cmwucmVwbGFjZSgnL2NvbGxlY3Rpb25zLycsJycpLnJlcGxhY2UoJy0xJywnJyk7XG4gICAgICAgICAgICAgICQoJ25hdi5jLW5hdi1wcm9kdWN0JykuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCduYXYuYy1uYXYtcHJvZHVjdFtkYXRhLW5hdj1cIicrbmF2KydcIl0nKS5zaG93KCk7XG4gICAgICAgICAgICAgIG5hdlNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKCdhLmMtbmF2LXByb2R1Y3RfbGlua1tocmVmPVwiJyt1cmwrJ1wiXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgJCgnbmF2LmMtbmF2LXByb2R1Y3QnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAkKCdhLmMtbmF2LXByb2R1Y3RfbGlua1tocmVmPVwiJyt1cmwrJ1wiXScpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5jbG9zZXN0KCcuYy1uYXYtcHJvZHVjdCcpLnNob3coKTtcbiAgICAgICAgICAgICAgIHZhciBuYXYgPSAkKCdhLmMtbmF2LXByb2R1Y3RfbGlua1tocmVmPVwiJyt1cmwrJ1wiXScpLmNsb3Nlc3QoJy5jLW5hdi1wcm9kdWN0JykuZGF0YSgnbmF2Jyk7XG4gICAgICAgICAgICAgICAkKCdhLmMtc2VsZWN0LWNhdGVnb3J5X2xpbmtbaHJlZio9XCInK25hdisnXCJdJykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgbmF2U2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW5hdlNob3duKSB7XG4gICAgICAgICAgICAkKCduYXYuYy1uYXYtcHJvZHVjdCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJ25hdi5jLW5hdi1wcm9kdWN0OmZpcnN0Jykuc2hvdygpO1xuICAgICAgICAgIH1cblxuICAgIH0gLy9pbml0U2NyaXB0KClcblxuXG5cbiAgICB2YXIgbG9hZGVkID0gZmFsc2U7XG4gICAgdmFyIG1heExvYWQgPSAxMjAwO1xuXG4gICAgLy8gT24gbG9hZFxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgIGxvYWQoKTtcbiAgICB9KTtcblxuICAgIC8vIE1heGltdW0gbG9hZFxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIWxvYWRlZCkge1xuICAgICAgICAgICAgbG9hZCgpO1xuICAgICAgICB9XG4gICAgfSwgbWF4TG9hZCk7XG5cbiAgICAvLyBMb2FkXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBsb2FkKCkge1xuICAgICAgICAvLyQoJ2JvZHknKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XG5cbiAgICAgICAgLy8gaWYgKGlzLm1hYygpKSB7XG4gICAgICAgIC8vICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLW1hYycpO1xuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vJCgnLmMtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAvLyQoJ2JvZHknKS5hZGRDbGFzcygnZG9tLWlzLWxvYWRlZCcpO1xuICAgICAgICBpZiAoKGlzLmRlc2t0b3AoKSkgJiYgKCQod2luZG93KS53aWR0aCgpID4gMTAyNCkgfHwgKGlzLmllKCkpICAmJiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSkge1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnZG9tLWlzLWxvYWRlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaXMud2luZG93cygpKXtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtd2luZG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmJhcmJhLWNvbnRhaW5lcicpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcbiAgICAgICAgfSw2MDApO1xuXHR9XG5cbiAgICB2YXIgUGFnZVRyYW5zaXRpb24gPSBCYXJiYS5CYXNlVHJhbnNpdGlvbi5leHRlbmQoe1xuICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBQcm9taXNlXG4gICAgICAgICAgICAgICAgLmFsbChbdGhpcy5uZXdDb250YWluZXJMb2FkaW5nLCB0aGlzLnRyYW5zaXRpb25PdXQoKV0pXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy50cmFuc2l0aW9uSW4uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zaXRpb25PdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoYXMtbmF2LW9wZW4nKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLWNhdGVnb3J5LW9wZW4nKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLXNlYXJjaC1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuYy1sb2FkaW5nJykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAvL3dpbmRvdy5yZWxsYXguZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5vbGRDb250YWluZXIpLmFkZENsYXNzKCdpcy1jaGFuZ2luZy1wYWdlJykuZGVsYXkoMTIwMCkucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zaXRpb25JbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sMCk7XG5cblxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIC8vdmFyICRlbCA9ICQodGhpcy5uZXdDb250YWluZXIpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcbiAgICAgICAgICAgIGlmICgoaXMuZGVza3RvcCgpKSAmJiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB8fCAoaXMuaWUoKSkgICYmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpKSB7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcuYy1sb2FkaW5nJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHZhciAkZWwgPSAkKHRoaXMubmV3Q29udGFpbmVyKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJCgnLmpzLWFjY29yZGlvbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykubmV4dCgpLnNsaWRlVXAoMzAwKTtcbiAgICAgICAgICAgICQodGhpcy5vbGRDb250YWluZXIpLmhpZGUoKTtcblxuICAgICAgICAgICAgX3RoaXMuZG9uZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIEJhcmJhLlBqYXguZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFnZVRyYW5zaXRpb247XG4gICAgfTtcblxuICAgIEJhcmJhLkRpc3BhdGNoZXIub24oJ3RyYW5zaXRpb25Db21wbGV0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaW5pdFNjcmlwdCgpO1xuICAgIH0pO1xuXG4gICAgQmFyYmEuUGpheC5zdGFydCgpO1xuICAgIEJhcmJhLlByZWZldGNoLmluaXQoKTtcblxuXHRcdC8vICQoXCJhW2hyZWZePSdodHRwOi8vXCIgKyB0b3AubG9jYXRpb24uaG9zdC50b1N0cmluZygpK1wiJ10sYVtocmVmXj0naHR0cHM6Ly9cIiArIHRvcC5sb2NhdGlvbi5ob3N0LnRvU3RyaW5nKCkrXCInXSwgYVtocmVmXj0nLyddXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnLW5vLWFuaW0nKSkgcmV0dXJuO1xuXHRcdC8vIFx0dmFyIHVybCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdC8vIFx0aWYgKHVybC5tYXRjaCgvXFwucGRmJC9pKSkgcmV0dXJuIHRydWU7XG5cdFx0Ly8gXHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRlZCcpLmFkZENsYXNzKCdpcy1jaGFuZ2luZy1wYWdlJyk7XG5cdFx0Ly8gXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdC8vIFx0XHRsb2NhdGlvbi5ocmVmPXVybDtcblx0XHQvLyBcdH0sMTYwMCk7XG5cdFx0Ly8gXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdC8vIFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpLnJlbW92ZUNsYXNzKCdpcy1jaGFuZ2luZy1wYWdlJyk7XG5cdFx0Ly8gXHR9LDI4MDApO1xuXHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xuXHRcdC8vIH0pO1xuXG5cblxuXG59KHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LiQpKTtcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbnZhciBpc0FuaW1hdGluZyA9IGZhbHNlO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgZWFzaW5nOiAnc3dpbmcnLFxuICAgIGhlYWRlck9mZnNldDogNjAsXG4gICAgc3BlZWQ6IDMwMFxufTtcblxuLyoqXG4gKiBzY3JvbGxUbyBpcyBhIGZ1bmN0aW9uIHRoYXQgc2Nyb2xscyBhIGNvbnRhaW5lciB0byBhbiBlbGVtZW50J3MgcG9zaXRpb24gd2l0aGluIHRoYXQgY29udHJvbGxlclxuICogVXNlcyBqUXVlcnkncyAkLkRlZmVycmVkIHRvIGFsbG93IHVzaW5nIGEgY2FsbGJhY2sgb24gYW5pbWF0aW9uIGNvbXBsZXRpb25cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAkZWxlbWVudCAgQSBqUXVlcnkgbm9kZVxuICogQHBhcmFtICAge29iamVjdH0gIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbFRvKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgLy8gRHJvcCBldmVyeXRoaW5nIGlmIHRoaXMgYWluJ3QgYSBqUXVlcnkgb2JqZWN0XG4gICAgaWYgKCRlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ICYmICRlbGVtZW50Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAvLyBNZXJnaW5nIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgKHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMgOiB7fSkpO1xuXG4gICAgICAgIC8vIFByZXZlbnRzIGFjY3VtdWxhdGlvbiBvZiBhbmltYXRpb25zXG4gICAgICAgIGlmIChpc0FuaW1hdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlzQW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gRGVmYXVsdCBjb250YWluZXIgdGhhdCB3ZSdsbCBiZSBzY3JvbGxpbmdcbiAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICAvLyBUZXN0aW5nIGNvbnRhaW5lciBpbiBvcHRpb25zIGZvciBqUXVlcnktbmVzc1xuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHVzaW5nIGEgY3VzdG9tIGNvbnRhaW5lciwgd2UgdGFrZSB0aGUgdG9wIGRvY3VtZW50IG9mZnNldFxuICAgICAgICAgICAgLy8gSWYgd2UgYXJlLCB3ZSB1c2UgdGhlIGVsZW1lbnRzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy4kY29udGFpbmVyICE9PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLiRjb250YWluZXIgaW5zdGFuY2VvZiBqUXVlcnkgJiYgb3B0aW9ucy4kY29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyID0gb3B0aW9ucy4kY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPZmZzZXQgPSAkZWxlbWVudC5wb3NpdGlvbigpLnRvcFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2Zmc2V0ID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRjb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBlbGVtZW50T2Zmc2V0IC0gb3B0aW9ucy5oZWFkZXJPZmZzZXRcbiAgICAgICAgICAgIH0sIG9wdGlvbnMuc3BlZWQsIG9wdGlvbnMuZWFzaW5nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmV4cG9ydCB7ZGVmYXVsdCBhcyBCdXR0b259IGZyb20gJy4vbW9kdWxlcy9CdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFRpdGxlfSBmcm9tICcuL21vZHVsZXMvVGl0bGUnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNtb290aFNjcm9sbH0gZnJvbSAnLi9tb2R1bGVzL1Ntb290aFNjcm9sbCc7XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgeyAkZG9jdW1lbnQsICR3aW5kb3csICRodG1sLCAkYm9keSB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuLyoqXG4gKiBBYnN0cmFjdCBtb2R1bGVcbiAqIEdpdmVzIGFjY2VzcyB0byBnZW5lcmljIGpRdWVyeSBub2Rlc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgdGhpcy4kaHRtbCA9ICRodG1sO1xuICAgICAgICB0aGlzLiRib2R5ID0gJGJvZHk7XG4gICAgICAgIHRoaXMuJGVsID0gb3B0aW9ucy4kZWw7XG4gICAgICAgIHRoaXMuZWwgPSBvcHRpb25zLmVsO1xuICAgIH1cbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLiRlbC5vbignY2xpY2suQnV0dG9uJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRkb2N1bWVudC50cmlnZ2VyKCdUaXRsZS5jaGFuZ2VMYWJlbCcsIFskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJGVsLm9mZignLkJ1dHRvbicpO1xuICAgIH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2NvbW90aXZlIHNtb290aCBzY3JvbGxcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSc7XG5pbXBvcnQgU2Nyb2xsYmFyIGZyb20gJ3Ntb290aC1zY3JvbGxiYXInO1xuaW1wb3J0IHsgJGRvY3VtZW50LCAkd2luZG93ICB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmICgoaXMuZGVza3RvcCgpKSAmJiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB8fCAoaXMuaWUoKSkgICYmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnLmpzLXBhcmFsbGF4JztcblxuICAgICAgICAgICAgdGhpcy5idWlsZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0XG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzZXQoKSB7XG4gICAgICAgIHRoaXMud2luZG93SGVpZ2h0ID0gdGhpcy4kd2luZG93LmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpbmRvd01pZGRsZSA9IHRoaXMud2luZG93SGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJMaW1pdCA9IHRoaXMuc2Nyb2xsYmFyLmxpbWl0LnkgKyB0aGlzLndpbmRvd0hlaWdodDtcbiAgICAgICAgLy8gQ3JlYXRlIGVsZW1lbnRzIG9iamVjdFxuICAgICAgICB0aGlzLmFkZEVsZW1lbnRzKCk7XG4gICAgICAgIC8vIEZpcnN0IGxvYWRcbiAgICAgICAgdGhpcy5jaGVja0VsZW1lbnRzKHRydWUpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGJhciA9IFNjcm9sbGJhci5pbml0KHRoaXMuJGVsWzBdKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc2V0KCk7XG5cbiAgICAgICAgICAgIC8vIE9uIHNjcm9sbFxuICAgICAgICAgICAgdGhpcy5zY3JvbGxiYXIuYWRkTGlzdGVuZXIoKCkgPT4gdGhpcy5jaGVja0VsZW1lbnRzKCkpO1xuICAgICAgICAgICAgLy8gUmVidWlsZCBldmVudFxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdTbW9vdGhTY3JvbGwucmVidWlsZCcsICgpID0+IHRoaXMudXBkYXRlRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAvLyBTY3JvbGx0byBidXR0b24gZXZlbnRcbiAgICAgICAgICAgICQoJy5qcy1zY3JvbGx0bycpLm9uKCdjbGljay5TbW9vdGhTY3JvbGwnLCAoZXZlbnQpID0+IHRoaXMuc2Nyb2xsVG8oZXZlbnQpKTtcblxuICAgICAgICAgICAgLy8gU2V0dXAgZG9uZVxuICAgICAgICAgICAgJGRvY3VtZW50LnRyaWdnZXIoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdTbW9vdGhTY3JvbGwuaXNSZWFkeSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLmMtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGVsZW1lbnRzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBhZGRFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGxldCAkZWxlbWVudCA9ICQoZWwpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRTcGVlZCA9ICRlbGVtZW50LmRhdGEoJ3NwZWVkJykgLyAxMDtcbiAgICAgICAgICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSAkZWxlbWVudC5kYXRhKCdwb3NpdGlvbicpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRUYXJnZXQgPSAkZWxlbWVudC5kYXRhKCd0YXJnZXQnKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50SG9yaXpvbnRhbCA9ICRlbGVtZW50LmRhdGEoJ2hvcml6b250YWwnKTtcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gKGVsZW1lbnRUYXJnZXQpID8gJChlbGVtZW50VGFyZ2V0KSA6ICRlbGVtZW50O1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRPZmZzZXQgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCArIHRoaXMuc2Nyb2xsYmFyLnNjcm9sbFRvcDtcblxuXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnRUYXJnZXQgJiYgJGVsZW1lbnQuZGF0YSgndHJhbnNmb3JtJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gJGVsZW1lbnQuZGF0YSgndHJhbnNmb3JtJyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9mZnNldCAtPSBwYXJzZUZsb2F0KHRyYW5zZm9ybS55KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVsZW1lbnRMaW1pdCA9IGVsZW1lbnRPZmZzZXQgKyAkdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudE1pZGRsZSA9ICgoZWxlbWVudExpbWl0IC0gZWxlbWVudE9mZnNldCkgLyAyKSArIGVsZW1lbnRPZmZzZXQ7XG4gICAgICAgICAgICBsZXQgZWxlbWVudFBlcnNpc3QgPSAkZWxlbWVudC5kYXRhKCdwZXJzaXN0Jyk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudEZpeGVkID0gJGVsZW1lbnQuZGF0YSgnZml4ZWQnKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50c1tpXSA9IHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudDogJGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBlbGVtZW50T2Zmc2V0LFxuICAgICAgICAgICAgICAgIGxpbWl0OiBlbGVtZW50TGltaXQsXG4gICAgICAgICAgICAgICAgbWlkZGxlOiBlbGVtZW50TWlkZGxlLFxuICAgICAgICAgICAgICAgIHNwZWVkOiBlbGVtZW50U3BlZWQsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGVsZW1lbnRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsOiBlbGVtZW50SG9yaXpvbnRhbCxcbiAgICAgICAgICAgICAgICBwZXJzaXN0OiBlbGVtZW50UGVyc2lzdCxcbiAgICAgICAgICAgICAgICBmaXhlZDogZWxlbWVudEZpeGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBTZXQgdGhlIHNjcm9sbCBiYXIgbGltaXRcbiAgICAqL1xuICAgIHNldFNjcm9sbGJhckxpbWl0KCkge1xuICAgICAgICB0aGlzLnNjcm9sbGJhckxpbWl0ID0gdGhpcy5zY3JvbGxiYXIubGltaXQueSArIHRoaXMud2luZG93SGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBlbGVtZW50c1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gdXBkYXRlRWxlbWVudHMoKSB7XG4gICAgLy8gICAgIHRoaXMuc2Nyb2xsYmFyLnVwZGF0ZSgpO1xuICAgIC8vICAgICB0aGlzLnNldCgpO1xuICAgIC8vICAgICAkZG9jdW1lbnQudHJpZ2dlcignU21vb3RoU2Nyb2xsLnVwZGF0ZScpO1xuICAgIC8vIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGVsZW1lbnRzIGFuZCByZWNhbGN1bGF0ZSBhbGwgdGhlIHBvc2l0aW9ucyBvbiB0aGUgcGFnZVxuICAgICAqL1xuICAgIHVwZGF0ZUVsZW1lbnRzKClcbiAgICB7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxiYXIudXBkYXRlKCk7XG4gICAgICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpbmRvd01pZGRsZSA9IHRoaXMud2luZG93SGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxiYXJMaW1pdCgpO1xuICAgICAgICB0aGlzLmFkZEVsZW1lbnRzKCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZWxlbWVudHNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGNoZWNrRWxlbWVudHMoZmlyc3QpIHtcbiAgICAgICAgbGV0IHNjcm9sbGJhclRvcCA9IHRoaXMuc2Nyb2xsYmFyLnNjcm9sbFRvcDtcbiAgICAgICAgbGV0IHNjcm9sbGJhckxpbWl0ID0gdGhpcy5zY3JvbGxiYXJMaW1pdDtcbiAgICAgICAgbGV0IHNjcm9sbGJhckJvdHRvbSA9IHNjcm9sbGJhclRvcCArIHRoaXMud2luZG93SGVpZ2h0O1xuICAgICAgICBsZXQgc2Nyb2xsYmFyTWlkZGxlID0gc2Nyb2xsYmFyVG9wICsgdGhpcy53aW5kb3dNaWRkbGU7XG5cbiAgICAgICAgZm9yKGxldCBpIGluIHRoaXMuZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1EaXN0YW5jZTtcbiAgICAgICAgICAgIGxldCBzY3JvbGxCb3R0b20gPSBzY3JvbGxiYXJCb3R0b207XG4gICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzW2ldLiRlbGVtZW50O1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRPZmZzZXQgPSB0aGlzLmVsZW1lbnRzW2ldLm9mZnNldDtcbiAgICAgICAgICAgIGxldCBlbGVtZW50TGltaXQgPSB0aGlzLmVsZW1lbnRzW2ldLmxpbWl0O1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRNaWRkbGUgPSB0aGlzLmVsZW1lbnRzW2ldLm1pZGRsZTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50U3BlZWQgPSB0aGlzLmVsZW1lbnRzW2ldLnNwZWVkO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZWxlbWVudHNbaV0ucG9zaXRpb247XG4gICAgICAgICAgICBsZXQgZWxlbWVudEhvcml6b250YWwgPSB0aGlzLmVsZW1lbnRzW2ldLmhvcml6b250YWw7XG4gICAgICAgICAgICBsZXQgZWxlbWVudFBlcnNpc3QgPSB0aGlzLmVsZW1lbnRzW2ldLnBlcnNpc3Q7XG4gICAgICAgICAgICBsZXQgZWxlbWVudEZpeGVkID0gdGhpcy5lbGVtZW50c1tpXS5maXhlZDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRQb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxCb3R0b20gPSBzY3JvbGxiYXJUb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGVsZW1lbnRGaXhlZCl7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKCcrc2Nyb2xsYmFyVG9wKydweCknKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY3JvbGxiYXJUb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZWZpbmUgaWYgdGhlIGVsZW1lbnQgaXMgaW52aWV3XG4gICAgICAgICAgICBsZXQgaW52aWV3ID0gKHNjcm9sbEJvdHRvbSA+PSBlbGVtZW50T2Zmc2V0ICYmIHNjcm9sbGJhclRvcCA8PSBlbGVtZW50TGltaXQpO1xuXG4gICAgICAgICAgICAvLyBBZGQgY2xhc3MgaWYgaW52aWV3LCByZW1vdmUgaWYgbm90XG4gICAgICAgICAgICBpZiAoaW52aWV3KSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWludmlldycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZighZWxlbWVudFBlcnNpc3Qpe1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtaW52aWV3Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChmaXJzdCAmJiAhaW52aWV3ICYmIGVsZW1lbnRTcGVlZCkge1xuICAgICAgICAgICAgICAgIC8vIERpZmZlcmVudCBjYWxjdWxhdGlvbiBpZiBmaXJzdCBjYWxsIGFuZCB0aGUgaXRlbSBpcyBub3QgaW4gdmlld1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50UG9zaXRpb24gIT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybURpc3RhbmNlID0gKChlbGVtZW50T2Zmc2V0IC0gdGhpcy53aW5kb3dNaWRkbGUpICAtIGVsZW1lbnRNaWRkbGUpICogLWVsZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIGVsZW1lbnQgaXMgaW4gdmlld1xuICAgICAgICAgICAgaWYgKGludmlldyAmJiBlbGVtZW50U3BlZWQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVsZW1lbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSAoc2Nyb2xsYmFyVG9wIC0gZWxlbWVudE9mZnNldCkgKiAtZWxlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSAoc2Nyb2xsYmFyTGltaXQgLSBzY3JvbGxCb3R0b20pICogZWxlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSAoc2Nyb2xsYmFyTWlkZGxlIC0gZWxlbWVudE1pZGRsZSkgKiAtZWxlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIFRyYW5zZm9ybSBob3Jpem9udGFsIE9SIHZlcnRpY2FsLCBkZWZhdWx0IHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgKGVsZW1lbnRIb3Jpem9udGFsICE9PSB1bmRlZmluZWQpID8gdGhpcy50cmFuc2Zvcm0oJGVsZW1lbnQsIHRyYW5zZm9ybURpc3RhbmNlKydweCcpIDogdGhpcy50cmFuc2Zvcm0oJGVsZW1lbnQsIDAsIHRyYW5zZm9ybURpc3RhbmNlKydweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGVsZW1lbnRcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIFt0cmFuc2Zvcm0gZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSAkZWxlbWVudCBKcXVlcnkgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gIHggICAgICAgIFRyYW5zbGF0ZSB2YWx1ZVxuICAgICAqIEBwYXJhbSAge21peGVkfSAgeSAgICAgICAgVHJhbnNsYXRlIHZhbHVlXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICB6ICAgICAgICBUcmFuc2xhdGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgICB0cmFuc2Zvcm0oJGVsZW1lbnQsIHgsIHksIHopIHtcbiAgICAgICAgIC8vIERlZmF1bHRzXG4gICAgICAgICB4ID0geCB8fCAwO1xuICAgICAgICAgeSA9IHkgfHwgMDtcbiAgICAgICAgIHogPSB6IHx8IDA7XG5cbiAgICAgICAgIC8vIFRyYW5zbGF0ZVxuICAgICAgICAgJGVsZW1lbnQuY3NzKHtcbiAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJysgeCArJywgJysgeSArJywgJysgeiArJyknLFxuICAgICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcrIHggKycsICcrIHkgKycsICcrIHogKycpJyxcbiAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcrIHggKycsICcrIHkgKycsICcrIHogKycpJ1xuICAgICAgICAgfSkuZGF0YSgndHJhbnNmb3JtJyx7XG4gICAgICAgICAgICAgeCA6IHgsXG4gICAgICAgICAgICAgeSA6IHksXG4gICAgICAgICAgICAgeiA6IHpcbiAgICAgICAgIH0pOyAvLyBSZW1lbWJlclxuXG4gICAgICAgICAkZWxlbWVudC5maW5kKHRoaXMuc2VsZWN0b3IpLmVhY2goKGksIGUpID0+IHtcbiAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKGUpO1xuICAgICAgICAgICAgIGlmICghJHRoaXMuZGF0YSgndHJhbnNmb3JtJykpIHtcbiAgICAgICAgICAgICAgICAgJHRoaXMuZGF0YSgndHJhbnNmb3JtJywge1xuICAgICAgICAgICAgICAgICAgICAgeCA6IHgsXG4gICAgICAgICAgICAgICAgICAgICB5IDogeSxcbiAgICAgICAgICAgICAgICAgICAgIHogOiB6XG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuXG4gICAgLy8gU2Nyb2xsIHRvXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzY3JvbGxUbyhldmVudCkge1xuICAgICAgICBpZighJC5pc051bWVyaWMoZXZlbnQpKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gJCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKSk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0T2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKS50b3AgKyB0aGlzLnNjcm9sbGJhci5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRhcmdldE9mZnNldCA9IGV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxiYXIuc2Nyb2xsVG8oMCwgdGFyZ2V0T2Zmc2V0LCA5MDApO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3lcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJGVsLm9mZignLlNtb290aFNjcm9sbCcpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG4gICAgfVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IHsgdmlzaWJpbGl0eUFwaSB9IGZyb20gJy4uL3V0aWxzL3Zpc2liaWxpdHknO1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuJGxhYmVsID0gdGhpcy4kZWwuZmluZCgnLmpzLWxhYmVsJyk7XG5cbiAgICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ1RpdGxlLmNoYW5nZUxhYmVsJywgKGV2ZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VMYWJlbCh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5DYWxsYmFja0lkZW50ID0gdmlzaWJpbGl0eUFwaSh7XG4gICAgICAgICAgICBhY3Rpb246ICdhZGRDYWxsYmFjaycsXG4gICAgICAgICAgICBzdGF0ZTogJ2hpZGRlbicsXG4gICAgICAgICAgICBjYWxsYmFjazogdGhpcy5sb2dIaWRkZW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlQ2FsbGJhY2tJZGVudCA9IHZpc2liaWxpdHlBcGkoe1xuICAgICAgICAgICAgYWN0aW9uOiAnYWRkQ2FsbGJhY2snLFxuICAgICAgICAgICAgc3RhdGU6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLmxvZ1Zpc2libGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9nSGlkZGVuKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnVGl0bGUgaXMgaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgbG9nVmlzaWJsZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1RpdGxlIGlzIHZpc2libGUnKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMYWJlbCh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRsYWJlbC50ZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRkb2N1bWVudC5vZmYoJ1RpdGxlLmNoYW5nZUxhYmVsJyk7XG5cbiAgICAgICAgdmlzaWJpbGl0eUFwaSh7XG4gICAgICAgICAgICBhY3Rpb246ICdyZW1vdmVDYWxsYmFjaycsXG4gICAgICAgICAgICBzdGF0ZTogJ2hpZGRlbicsXG4gICAgICAgICAgICBpZGVudDogdGhpcy5oaWRkZW5DYWxsYmFja0lkZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpc2liaWxpdHlBcGkoe1xuICAgICAgICAgICAgYWN0aW9uOiAncmVtb3ZlQ2FsbGJhY2snLFxuICAgICAgICAgICAgc3RhdGU6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgIGlkZW50OiB0aGlzLnZpc2libGVDYWxsYmFja0lkZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGVsLm9mZignLlRpdGxlJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vaXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9BcnJheSAoIGFycmF5LCB2YWx1ZSApIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKCB2YWx1ZSApO1xuXG4gICAgaWYgKCBpbmRleCA9PT0gLTEgKSB7XG4gICAgICAgIGFycmF5LnB1c2goIHZhbHVlICk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlDb250YWlucyAoIGFycmF5LCB2YWx1ZSApIHtcbiAgICBmb3IgKCBsZXQgaSA9IDAsIGMgPSBhcnJheS5sZW5ndGg7IGkgPCBjOyBpKysgKSB7XG4gICAgICAgIGlmICggYXJyYXlbaV0gPT0gdmFsdWUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5Q29udGVudHNNYXRjaCAoIGEsIGIgKSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoICFpc0FycmF5KCBhICkgfHwgIWlzQXJyYXkoIGIgKSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICggYS5sZW5ndGggIT09IGIubGVuZ3RoICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaSA9IGEubGVuZ3RoO1xuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoIGFbaV0gIT09IGJbaV0gKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5ICggeCApIHtcbiAgICBpZiAoIHR5cGVvZiB4ID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgcmV0dXJuIFsgeCBdO1xuICAgIH1cblxuICAgIGlmICggeCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0SXRlbSAoIGFycmF5ICkge1xuICAgIHJldHVybiBhcnJheVsgYXJyYXkubGVuZ3RoIC0gMSBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5ICggYXJyYXksIG1lbWJlciApIHtcbiAgICBpZiAoICFhcnJheSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZiggbWVtYmVyICk7XG5cbiAgICBpZiAoIGluZGV4ICE9PSAtMSApIHtcbiAgICAgICAgYXJyYXkuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkgKCBhcnJheUxpa2UgKSB7XG4gICAgdmFyIGFycmF5ID0gW10sIGkgPSBhcnJheUxpa2UubGVuZ3RoO1xuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBhcnJheVtpXSA9IGFycmF5TGlrZVtpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlLZXlWYWx1ZSggYXJyYXksIGtleSwgdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbiggb2JqICkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV0gPT09IHZhbHVlO1xuICAgIH0pO1xufVxuIiwiY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGh0bWwgPSAkKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5jb25zdCAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSk7XG5cbmV4cG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH07XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIHN2ZzRldmVyeWJvZHkoKTtcbn1cbiIsIi8qKlxuICogQHNlZSAgaHR0cHM6Ly9naXRodWIuY29tL3JhY3RpdmVqcy9yYWN0aXZlL2Jsb2IvZGV2L3NyYy91dGlscy9odG1sLmpzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xufVxuXG4vKipcbiAqIFByZXBhcmUgSFRNTCBjb250ZW50IHRoYXQgY29udGFpbnMgbXVzdGFjaGUgY2hhcmFjdGVycyBmb3IgdXNlIHdpdGggUmFjdGl2ZVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuZXNjYXBlSHRtbChzdHIpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JylcbiAgICAgICAgLnJlcGxhY2UoLyZndDsvZywgJz4nKVxuICAgICAgICAucmVwbGFjZSgvJmFtcDsvZywgJyYnKTtcbn1cblxuLyoqXG4gKiBHZXQgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHtET01FbGVtZW50fSAgbm9kZVxuICogQHJldHVybiAge0FycmF5fSAgICAgICBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlRGF0YShub2RlKSB7XG4gICAgLy8gQWxsIGF0dHJpYnV0ZXNcbiAgICB2YXIgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcblxuICAgIC8vIFJlZ2V4IFBhdHRlcm5cbiAgICB2YXIgcGF0dGVybiA9IC9eZGF0YVxcLSguKykkLztcblxuICAgIC8vIE91dHB1dFxuICAgIHZhciBkYXRhID0ge307XG5cbiAgICBmb3IgKGxldCBpIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2ldKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF0dHJpYnV0ZXMgbmFtZSAoZXg6IGRhdGEtbW9kdWxlKVxuICAgICAgICBsZXQgbmFtZSA9IGF0dHJpYnV0ZXNbaV0ubmFtZTtcblxuICAgICAgICAvLyBUaGlzIGhhcHBlbnMuXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF0Y2ggPSBuYW1lLm1hdGNoKHBhdHRlcm4pO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoaXMgdGhyb3dzIGFuIGVycm9yLCB5b3UgaGF2ZSBzb21lXG4gICAgICAgIC8vIHNlcmlvdXMgcHJvYmxlbXMgaW4geW91ciBIVE1MLlxuICAgICAgICBkYXRhW21hdGNoWzFdXSA9IG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xufVxuIiwidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBhcnJheUxpa2VQYXR0ZXJuID0gL15cXFtvYmplY3QgKD86QXJyYXl8RmlsZUxpc3QpXFxdJC87XG5cbi8vIHRoYW5rcywgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vaW5zdGFuY2VvZi1jb25zaWRlcmVkLWhhcm1mdWwtb3ItaG93LXRvLXdyaXRlLWEtcm9idXN0LWlzYXJyYXkvXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAoIHRoaW5nICkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKCB0aGluZyApID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheUxpa2UgKCBvYmogKSB7XG4gICAgcmV0dXJuIGFycmF5TGlrZVBhdHRlcm4udGVzdCggdG9TdHJpbmcuY2FsbCggb2JqICkgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWwgKCBhLCBiICkge1xuICAgIGlmICggYSA9PT0gbnVsbCAmJiBiID09PSBudWxsICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIHR5cGVvZiBhID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYiA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODA4Mi92YWxpZGF0ZS1udW1iZXJzLWluLWphdmFzY3JpcHQtaXNudW1lcmljXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1lcmljICggdGhpbmcgKSB7XG4gICAgcmV0dXJuICFpc05hTiggcGFyc2VGbG9hdCggdGhpbmcgKSApICYmIGlzRmluaXRlKCB0aGluZyApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QgKCB0aGluZyApIHtcbiAgICByZXR1cm4gKCB0aGluZyAmJiB0b1N0cmluZy5jYWxsKCB0aGluZyApID09PSAnW29iamVjdCBPYmplY3RdJyApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbiggdGhpbmcgKSB7XG4gICAgdmFyIGdldFR5cGUgPSB7fTtcbiAgICByZXR1cm4gdGhpbmcgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzJztcbmltcG9ydCB7IGFycmF5Q29udGFpbnMsIGZpbmRCeUtleVZhbHVlLCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cbmNvbnN0IENBTExCQUNLUyA9IHtcbiAgICBoaWRkZW46IFtdLFxuICAgIHZpc2libGU6IFtdXG59O1xuXG5jb25zdCBBQ1RJT05TID0gW1xuICAgICdhZGRDYWxsYmFjaycsXG4gICAgJ3JlbW92ZUNhbGxiYWNrJ1xuXTtcblxuY29uc3QgU1RBVEVTID0gW1xuICAgICd2aXNpYmxlJyxcbiAgICAnaGlkZGVuJ1xuXTtcblxuY29uc3QgUFJFRklYID0gJ3YtJztcblxubGV0IFVVSUQgPSAwO1xuXG4vLyBNYWluIGV2ZW50XG4kZG9jdW1lbnQub24oJ3Zpc2liaWxpdHljaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgb25Eb2N1bWVudENoYW5nZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb25Eb2N1bWVudENoYW5nZSgndmlzaWJsZScpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEFkZCBhIGNhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gICBzdGF0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ30gIGlkZW50XG4gKi9cbmZ1bmN0aW9uIGFkZENhbGxiYWNrIChzdGF0ZSwgb3B0aW9ucykge1xuICAgIGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2sgfHwgJyc7XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBpZGVudCA9IFBSRUZJWCArIFVVSUQrKztcblxuICAgIENBTExCQUNLU1tzdGF0ZV0ucHVzaCh7XG4gICAgICAgIGlkZW50OiBpZGVudCxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaWRlbnQ7XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgY2FsbGJhY2tcbiAqIEBwYXJhbSAge3N0cmluZ30gICBzdGF0ZSAgVmlzaWJsZSBvciBoaWRkZW5cbiAqIEBwYXJhbSAge3N0cmluZ30gICBpZGVudCAgVW5pcXVlIGlkZW50aWZpZXJcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgSWYgb3BlcmF0aW9uIHdhcyBhIHN1Y2Nlc3NcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQ2FsbGJhY2sgKHN0YXRlLCBvcHRpb25zKSB7XG4gICAgbGV0IGlkZW50ID0gb3B0aW9ucy5pZGVudCB8fCAnJztcblxuICAgIGlmICh0eXBlb2YoaWRlbnQpID09PSAndW5kZWZpbmVkJyB8fCBpZGVudCA9PT0gJycpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdOZWVkIGlkZW50IHRvIHJlbW92ZSBjYWxsYmFjaycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gZmluZEJ5S2V5VmFsdWUoQ0FMTEJBQ0tTW3N0YXRlXSwgJ2lkZW50JywgaWRlbnQpWzBdO1xuXG4gICAgLy8gY29uc29sZS5sb2coaWRlbnQpXG4gICAgLy8gY29uc29sZS5sb2coQ0FMTEJBQ0tTW3N0YXRlXSlcblxuICAgIGlmICh0eXBlb2YoaW5kZXgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZW1vdmVGcm9tQXJyYXkoQ0FMTEJBQ0tTW3N0YXRlXSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NhbGxiYWNrIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIFdoZW4gZG9jdW1lbnQgc3RhdGUgY2hhbmdlcywgdHJpZ2dlciBjYWxsYmFja3NcbiAqIEBwYXJhbSAge3N0cmluZ30gIHN0YXRlICBWaXNpYmxlIG9yIGhpZGRlblxuICovXG5mdW5jdGlvbiBvbkRvY3VtZW50Q2hhbmdlIChzdGF0ZSkge1xuICAgIGxldCBjYWxsYmFja0FycmF5ID0gQ0FMTEJBQ0tTW3N0YXRlXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbiA9IGNhbGxiYWNrQXJyYXkubGVuZ3RoO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYWxsYmFja0FycmF5W2ldLmNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFB1YmxpYyBmYWNpbmcgQVBJIGZvciBhZGRpbmcgYW5kIHJlbW92aW5nIGNhbGxiYWNrc1xuICogQHBhcmFtICAge29iamVjdH0gICAgICAgICAgIG9wdGlvbnMgIE9wdGlvbnNcbiAqIEByZXR1cm4gIHtib29sZWFufGludGVnZXJ9ICAgICAgICAgICBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNhbGxiYWNrIG9yIGJvb2xlYW4gaW5kaWNhdGluZyBzdWNjZXNzIG9yIGZhaWx1cmVcbiAqL1xuZnVuY3Rpb24gdmlzaWJpbGl0eUFwaSAob3B0aW9ucykge1xuICAgIGxldCBhY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCAnJztcbiAgICBsZXQgc3RhdGUgPSBvcHRpb25zLnN0YXRlIHx8ICcnO1xuICAgIGxldCByZXQ7XG5cbiAgICAvLyBUeXBlIGFuZCB2YWx1ZSBjaGVja2luZ1xuICAgIGlmICghYXJyYXlDb250YWlucyhBQ1RJT05TLCBhY3Rpb24pKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWN0aW9uIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFhcnJheUNvbnRhaW5zKFNUQVRFUywgc3RhdGUpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU3RhdGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEB0b2RvIE1hZ2ljIGNhbGwgZnVuY3Rpb24gcGxzXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhbGxiYWNrJykge1xuICAgICAgICByZXQgPSBhZGRDYWxsYmFjayhzdGF0ZSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdyZW1vdmVDYWxsYmFjaycpIHtcbiAgICAgICAgcmV0ID0gcmVtb3ZlQ2FsbGJhY2soc3RhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCB7IHZpc2liaWxpdHlBcGkgfTtcbiIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuU2Nyb2xsYmFyPWUoKTp0LlNjcm9sbGJhcj1lKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsZSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLnA9XCJcIixlKDApfShbZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDEpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLHVbXCJkZWZhdWx0XCJdKSh0KX12YXIgaT1uKDIpLHU9cihpKSxhPW4oNTUpLGM9cihhKSxsPW4oNjIpLGY9cihsKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBmW1wiZGVmYXVsdFwiXSYmXCJzeW1ib2xcIj09dHlwZW9mIGNbXCJkZWZhdWx0XCJdP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGZbXCJkZWZhdWx0XCJdJiZ0LmNvbnN0cnVjdG9yPT09ZltcImRlZmF1bHRcIl0/XCJzeW1ib2xcIjp0eXBlb2YgdH0sZD1uKDc4KSxoPW4oODkpO24oMTI5KSxuKDE0NSksbigxNTgpLG4oMTczKSxuKDE4NyksZVtcImRlZmF1bHRcIl09ZC5TbW9vdGhTY3JvbGxiYXIsZC5TbW9vdGhTY3JvbGxiYXIudmVyc2lvbj1cIjcuMi44XCIsZC5TbW9vdGhTY3JvbGxiYXIuaW5pdD1mdW5jdGlvbih0LGUpe2lmKCF0fHwxIT09dC5ub2RlVHlwZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0IGVsZW1lbnQgdG8gYmUgRE9NIEVsZW1lbnQsIGJ1dCBnb3QgXCIrKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6cyh0KSkpO2lmKGguc2JMaXN0Lmhhcyh0KSlyZXR1cm4gaC5zYkxpc3QuZ2V0KHQpO3Quc2V0QXR0cmlidXRlKFwiZGF0YS1zY3JvbGxiYXJcIixcIlwiKTt2YXIgbj1bXS5jb25jYXQobyh0LmNoaWxkTm9kZXMpKSxyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ci5pbm5lckhUTUw9J1xcbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJzY3JvbGwtY29udGVudFwiPjwvYXJ0aWNsZT5cXG4gICAgICAgIDxhc2lkZSBjbGFzcz1cInNjcm9sbGJhci10cmFjayBzY3JvbGxiYXItdHJhY2steFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGxiYXItdGh1bWIgc2Nyb2xsYmFyLXRodW1iLXhcIj48L2Rpdj5cXG4gICAgICAgIDwvYXNpZGU+XFxuICAgICAgICA8YXNpZGUgY2xhc3M9XCJzY3JvbGxiYXItdHJhY2sgc2Nyb2xsYmFyLXRyYWNrLXlcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsYmFyLXRodW1iIHNjcm9sbGJhci10aHVtYi15XCI+PC9kaXY+XFxuICAgICAgICA8L2FzaWRlPlxcbiAgICAgICAgPGNhbnZhcyBjbGFzcz1cIm92ZXJzY3JvbGwtZ2xvd1wiPjwvY2FudmFzPlxcbiAgICAnO3ZhciBpPXIucXVlcnlTZWxlY3RvcihcIi5zY3JvbGwtY29udGVudFwiKTtyZXR1cm5bXS5jb25jYXQobyhyLmNoaWxkTm9kZXMpKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiB0LmFwcGVuZENoaWxkKGUpfSksbi5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBpLmFwcGVuZENoaWxkKHQpfSksbmV3IGQuU21vb3RoU2Nyb2xsYmFyKHQsZSl9LGQuU21vb3RoU2Nyb2xsYmFyLmluaXRBbGw9ZnVuY3Rpb24odCl7cmV0dXJuW10uY29uY2F0KG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChoLnNlbGVjdG9ycykpKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGQuU21vb3RoU2Nyb2xsYmFyLmluaXQoZSx0KX0pfSxkLlNtb290aFNjcm9sbGJhci5oYXM9ZnVuY3Rpb24odCl7cmV0dXJuIGguc2JMaXN0Lmhhcyh0KX0sZC5TbW9vdGhTY3JvbGxiYXIuZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiBoLnNiTGlzdC5nZXQodCl9LGQuU21vb3RoU2Nyb2xsYmFyLmdldEFsbD1mdW5jdGlvbigpe3JldHVybltdLmNvbmNhdChvKGguc2JMaXN0LnZhbHVlcygpKSl9LGQuU21vb3RoU2Nyb2xsYmFyLmRlc3Ryb3k9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZC5TbW9vdGhTY3JvbGxiYXIuaGFzKHQpJiZkLlNtb290aFNjcm9sbGJhci5nZXQodCkuZGVzdHJveShlKX0sZC5TbW9vdGhTY3JvbGxiYXIuZGVzdHJveUFsbD1mdW5jdGlvbih0KXtoLnNiTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuZGVzdHJveSh0KX0pfSx0LmV4cG9ydHM9ZVtcImRlZmF1bHRcIl19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oMyksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDQpLG4oNDgpLHQuZXhwb3J0cz1uKDEyKS5BcnJheS5mcm9tfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1KSghMCk7big4KShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYpLG89big3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbil7dmFyIGksdSxhPVN0cmluZyhvKGUpKSxjPXIobiksbD1hLmxlbmd0aDtyZXR1cm4gYzwwfHxjPj1sP3Q/XCJcIjp2b2lkIDA6KGk9YS5jaGFyQ29kZUF0KGMpLGk8NTUyOTZ8fGk+NTYzMTl8fGMrMT09PWx8fCh1PWEuY2hhckNvZGVBdChjKzEpKTw1NjMyMHx8dT41NzM0Mz90P2EuY2hhckF0KGMpOmk6dD9hLnNsaWNlKGMsYysyKTooaS01NTI5Njw8MTApKyh1LTU2MzIwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLmNlaWwscj1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP3I6bikodCl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oOSksbz1uKDEwKSxpPW4oMjUpLHU9bigxNSksYT1uKDI2KSxjPW4oMjcpLGw9bigyOCksZj1uKDQ0KSxzPW4oNDYpLGQ9big0NSkoXCJpdGVyYXRvclwiKSxoPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksdj1cIkBAaXRlcmF0b3JcIixfPVwia2V5c1wiLHA9XCJ2YWx1ZXNcIix5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixiLGcsbSx4KXtsKG4sZSxiKTt2YXIgUyxFLE0sTz1mdW5jdGlvbih0KXtpZighaCYmdCBpbiBqKXJldHVybiBqW3RdO3N3aXRjaCh0KXtjYXNlIF86cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9O2Nhc2UgcDpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fSx3PWUrXCIgSXRlcmF0b3JcIixQPWc9PXAsaz0hMSxqPXQucHJvdG90eXBlLFQ9altkXXx8alt2XXx8ZyYmaltnXSxBPVR8fE8oZyksUj1nP1A/TyhcImVudHJpZXNcIik6QTp2b2lkIDAsTD1cIkFycmF5XCI9PWU/ai5lbnRyaWVzfHxUOlQ7aWYoTCYmKE09cyhMLmNhbGwobmV3IHQpKSxNIT09T2JqZWN0LnByb3RvdHlwZSYmKGYoTSx3LCEwKSxyfHxhKE0sZCl8fHUoTSxkLHkpKSksUCYmVCYmVC5uYW1lIT09cCYmKGs9ITAsQT1mdW5jdGlvbigpe3JldHVybiBULmNhbGwodGhpcyl9KSxyJiYheHx8IWgmJiFrJiZqW2RdfHx1KGosZCxBKSxjW2VdPUEsY1t3XT15LGcpaWYoUz17dmFsdWVzOlA/QTpPKHApLGtleXM6bT9BOk8oXyksZW50cmllczpSfSx4KWZvcihFIGluIFMpRSBpbiBqfHxpKGosRSxTW0VdKTtlbHNlIG8oby5QK28uRiooaHx8ayksZSxTKTtyZXR1cm4gU319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPSEwfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSksbz1uKDEyKSxpPW4oMTMpLHU9bigxNSksYT1cInByb3RvdHlwZVwiLGM9ZnVuY3Rpb24odCxlLG4pe3ZhciBsLGYscyxkPXQmYy5GLGg9dCZjLkcsdj10JmMuUyxfPXQmYy5QLHA9dCZjLkIseT10JmMuVyxiPWg/bzpvW2VdfHwob1tlXT17fSksZz1iW2FdLG09aD9yOnY/cltlXToocltlXXx8e30pW2FdO2gmJihuPWUpO2ZvcihsIGluIG4pZj0hZCYmbSYmdm9pZCAwIT09bVtsXSxmJiZsIGluIGJ8fChzPWY/bVtsXTpuW2xdLGJbbF09aCYmXCJmdW5jdGlvblwiIT10eXBlb2YgbVtsXT9uW2xdOnAmJmY/aShzLHIpOnkmJm1bbF09PXM/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGVbYV09dFthXSxlfShzKTpfJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBzP2koRnVuY3Rpb24uY2FsbCxzKTpzLF8mJigoYi52aXJ0dWFsfHwoYi52aXJ0dWFsPXt9KSlbbF09cyx0JmMuUiYmZyYmIWdbbF0mJnUoZyxsLHMpKSl9O2MuRj0xLGMuRz0yLGMuUz00LGMuUD04LGMuQj0xNixjLlc9MzIsYy5VPTY0LGMuUj0xMjgsdC5leHBvcnRzPWN9LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPXt2ZXJzaW9uOlwiMi40LjBcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1uKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTQpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixvKXtyZXR1cm4gdC5jYWxsKGUsbixyLG8pfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNiksbz1uKDI0KTt0LmV4cG9ydHM9bigyMCk/ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmYodCxlLG8oMSxuKSl9OmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdFtlXT1uLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDE5KSxpPW4oMjMpLHU9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIwKT9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksZT1pKGUsITApLHIobiksbyl0cnl7cmV0dXJuIHUodCxlLG4pfWNhdGNoKGEpe31pZihcImdldFwiaW4gbnx8XCJzZXRcImluIG4pdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO3JldHVyblwidmFsdWVcImluIG4mJih0W2VdPW4udmFsdWUpLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/bnVsbCE9PXQ6XCJmdW5jdGlvblwiPT10eXBlb2YgdH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMjApJiYhbigyMSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMjIpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMjEpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2goZSl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTgpLG89bigxMSkuZG9jdW1lbnQsaT1yKG8pJiZyKG8uY3JlYXRlRWxlbWVudCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpP28uY3JlYXRlRWxlbWVudCh0KTp7fX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE4KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixvO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue2VudW1lcmFibGU6ISgxJnQpLGNvbmZpZ3VyYWJsZTohKDImdCksd3JpdGFibGU6ISg0JnQpLHZhbHVlOmV9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDE1KX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjkpLG89bigyNCksaT1uKDQ0KSx1PXt9O24oMTUpKHUsbig0NSkoXCJpdGVyYXRvclwiKSxmdW5jdGlvbigpe3JldHVybiB0aGlzfSksdC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0LnByb3RvdHlwZT1yKHUse25leHQ6bygxLG4pfSksaSh0LGUrXCIgSXRlcmF0b3JcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDMwKSxpPW4oNDIpLHU9bigzOSkoXCJJRV9QUk9UT1wiKSxhPWZ1bmN0aW9uKCl7fSxjPVwicHJvdG90eXBlXCIsbD1mdW5jdGlvbigpe3ZhciB0LGU9bigyMikoXCJpZnJhbWVcIikscj1pLmxlbmd0aCxvPVwiPFwiLHU9XCI+XCI7Zm9yKGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixuKDQzKS5hcHBlbmRDaGlsZChlKSxlLnNyYz1cImphdmFzY3JpcHQ6XCIsdD1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQsdC5vcGVuKCksdC53cml0ZShvK1wic2NyaXB0XCIrdStcImRvY3VtZW50LkY9T2JqZWN0XCIrbytcIi9zY3JpcHRcIit1KSx0LmNsb3NlKCksbD10LkY7ci0tOylkZWxldGUgbFtjXVtpW3JdXTtyZXR1cm4gbCgpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KGFbY109cih0KSxuPW5ldyBhLGFbY109bnVsbCxuW3VdPXQpOm49bCgpLHZvaWQgMD09PWU/bjpvKG4sZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNiksbz1uKDE3KSxpPW4oMzEpO3QuZXhwb3J0cz1uKDIwKT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbih0LGUpe28odCk7Zm9yKHZhciBuLHU9aShlKSxhPXUubGVuZ3RoLGM9MDthPmM7KXIuZih0LG49dVtjKytdLGVbbl0pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzIpLG89big0Mik7dC5leHBvcnRzPU9iamVjdC5rZXlzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LG8pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjYpLG89bigzMyksaT1uKDM2KSghMSksdT1uKDM5KShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLGE9byh0KSxjPTAsbD1bXTtmb3IobiBpbiBhKW4hPXUmJnIoYSxuKSYmbC5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+YzspcihhLG49ZVtjKytdKSYmKH5pKGwsbil8fGwucHVzaChuKSk7cmV0dXJuIGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzNCksbz1uKDcpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihvKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM1KTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMyksbz1uKDM3KSxpPW4oMzgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLHUpe3ZhciBhLGM9cihlKSxsPW8oYy5sZW5ndGgpLGY9aSh1LGwpO2lmKHQmJm4hPW4pe2Zvcig7bD5mOylpZihhPWNbZisrXSxhIT1hKXJldHVybiEwfWVsc2UgZm9yKDtsPmY7ZisrKWlmKCh0fHxmIGluIGMpJiZjW2ZdPT09bilyZXR1cm4gdHx8Znx8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNiksbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9vKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYpLG89TWF0aC5tYXgsaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9vKHQrZSwwKTppKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0MCkoXCJrZXlzXCIpLG89big0MSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1vKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKSxvPVwiX19jb3JlLWpzX3NoYXJlZF9fXCIsaT1yW29dfHwocltvXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPVwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oMTEpLmRvY3VtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnR9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KS5mLG89bigyNiksaT1uKDQ1KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIW8odD1uP3Q6dC5wcm90b3R5cGUsaSkmJnIodCxpLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDApKFwid2tzXCIpLG89big0MSksaT1uKDExKS5TeW1ib2wsdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpLGE9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT11JiZpW3RdfHwodT9pOm8pKFwiU3ltYm9sLlwiK3QpKX07YS5zdG9yZT1yfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNiksbz1uKDQ3KSxpPW4oMzkpKFwiSUVfUFJPVE9cIiksdT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PW8odCkscih0LGkpP3RbaV06XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD91Om51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdChyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEzKSxvPW4oMTApLGk9big0NyksdT1uKDQ5KSxhPW4oNTApLGM9bigzNyksbD1uKDUxKSxmPW4oNTIpO28oby5TK28uRiohbig1NCkoZnVuY3Rpb24odCl7QXJyYXkuZnJvbSh0KX0pLFwiQXJyYXlcIix7ZnJvbTpmdW5jdGlvbih0KXt2YXIgZSxuLG8scyxkPWkodCksaD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzP3RoaXM6QXJyYXksdj1hcmd1bWVudHMubGVuZ3RoLF89dj4xP2FyZ3VtZW50c1sxXTp2b2lkIDAscD12b2lkIDAhPT1fLHk9MCxiPWYoZCk7aWYocCYmKF89cihfLHY+Mj9hcmd1bWVudHNbMl06dm9pZCAwLDIpKSx2b2lkIDA9PWJ8fGg9PUFycmF5JiZhKGIpKWZvcihlPWMoZC5sZW5ndGgpLG49bmV3IGgoZSk7ZT55O3krKylsKG4seSxwP18oZFt5XSx5KTpkW3ldKTtlbHNlIGZvcihzPWIuY2FsbChkKSxuPW5ldyBoOyEobz1zLm5leHQoKSkuZG9uZTt5KyspbChuLHkscD91KHMsXyxbby52YWx1ZSx5XSwhMCk6by52YWx1ZSk7cmV0dXJuIG4ubGVuZ3RoPXksbn19KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTcpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixvKXt0cnl7cmV0dXJuIG8/ZShyKG4pWzBdLG5bMV0pOmUobil9Y2F0Y2goaSl7dmFyIHU9dFtcInJldHVyblwiXTt0aHJvdyB2b2lkIDAhPT11JiZyKHUuY2FsbCh0KSksaX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNyksbz1uKDQ1KShcIml0ZXJhdG9yXCIpLGk9QXJyYXkucHJvdG90eXBlO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwIT09dCYmKHIuQXJyYXk9PT10fHxpW29dPT09dCl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxNiksbz1uKDI0KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2UgaW4gdD9yLmYodCxlLG8oMCxuKSk6dFtlXT1ufX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTMpLG89big0NSkoXCJpdGVyYXRvclwiKSxpPW4oMjcpO3QuZXhwb3J0cz1uKDEyKS5nZXRJdGVyYXRvck1ldGhvZD1mdW5jdGlvbih0KXtpZih2b2lkIDAhPXQpcmV0dXJuIHRbb118fHRbXCJAQGl0ZXJhdG9yXCJdfHxpW3IodCldfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzUpLG89big0NSkoXCJ0b1N0cmluZ1RhZ1wiKSxpPVwiQXJndW1lbnRzXCI9PXIoZnVuY3Rpb24oKXtyZXR1cm4gYXJndW1lbnRzfSgpKSx1PWZ1bmN0aW9uKHQsZSl7dHJ5e3JldHVybiB0W2VdfWNhdGNoKG4pe319O3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZSxuLGE7cmV0dXJuIHZvaWQgMD09PXQ/XCJVbmRlZmluZWRcIjpudWxsPT09dD9cIk51bGxcIjpcInN0cmluZ1wiPT10eXBlb2Yobj11KGU9T2JqZWN0KHQpLG8pKT9uOmk/cihlKTpcIk9iamVjdFwiPT0oYT1yKGUpKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5jYWxsZWU/XCJBcmd1bWVudHNcIjphfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDUpKFwiaXRlcmF0b3JcIiksbz0hMTt0cnl7dmFyIGk9WzddW3JdKCk7aVtcInJldHVyblwiXT1mdW5jdGlvbigpe289ITB9LEFycmF5LmZyb20oaSxmdW5jdGlvbigpe3Rocm93IDJ9KX1jYXRjaCh1KXt9dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoIWUmJiFvKXJldHVybiExO3ZhciBuPSExO3RyeXt2YXIgaT1bN10sdT1pW3JdKCk7dS5uZXh0PWZ1bmN0aW9uKCl7cmV0dXJue2RvbmU6bj0hMH19LGlbcl09ZnVuY3Rpb24oKXtyZXR1cm4gdX0sdChpKX1jYXRjaChhKXt9cmV0dXJuIG59fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDU2KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNCksbig1NyksdC5leHBvcnRzPW4oNjEpLmYoXCJpdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe24oNTgpO2Zvcih2YXIgcj1uKDExKSxvPW4oMTUpLGk9bigyNyksdT1uKDQ1KShcInRvU3RyaW5nVGFnXCIpLGE9W1wiTm9kZUxpc3RcIixcIkRPTVRva2VuTGlzdFwiLFwiTWVkaWFMaXN0XCIsXCJTdHlsZVNoZWV0TGlzdFwiLFwiQ1NTUnVsZUxpc3RcIl0sYz0wO2M8NTtjKyspe3ZhciBsPWFbY10sZj1yW2xdLHM9ZiYmZi5wcm90b3R5cGU7cyYmIXNbdV0mJm8ocyx1LGwpLGlbbF09aS5BcnJheX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDU5KSxvPW4oNjApLGk9bigyNyksdT1uKDMzKTt0LmV4cG9ydHM9big4KShBcnJheSxcIkFycmF5XCIsZnVuY3Rpb24odCxlKXt0aGlzLl90PXUodCksdGhpcy5faT0wLHRoaXMuX2s9ZX0sZnVuY3Rpb24oKXt2YXIgdD10aGlzLl90LGU9dGhpcy5fayxuPXRoaXMuX2krKztyZXR1cm4hdHx8bj49dC5sZW5ndGg/KHRoaXMuX3Q9dm9pZCAwLG8oMSkpOlwia2V5c1wiPT1lP28oMCxuKTpcInZhbHVlc1wiPT1lP28oMCx0W25dKTpvKDAsW24sdFtuXV0pfSxcInZhbHVlc1wiKSxpLkFyZ3VtZW50cz1pLkFycmF5LHIoXCJrZXlzXCIpLHIoXCJ2YWx1ZXNcIikscihcImVudHJpZXNcIil9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKCl7fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57dmFsdWU6ZSxkb25lOiEhdH19fSxmdW5jdGlvbih0LGUsbil7ZS5mPW4oNDUpfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDYzKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNjQpLG4oNzUpLG4oNzYpLG4oNzcpLHQuZXhwb3J0cz1uKDEyKS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDExKSxvPW4oMjYpLGk9bigyMCksdT1uKDEwKSxhPW4oMjUpLGM9big2NSkuS0VZLGw9bigyMSksZj1uKDQwKSxzPW4oNDQpLGQ9big0MSksaD1uKDQ1KSx2PW4oNjEpLF89big2NikscD1uKDY3KSx5PW4oNjgpLGI9big3MSksZz1uKDE3KSxtPW4oMzMpLHg9bigyMyksUz1uKDI0KSxFPW4oMjkpLE09big3MiksTz1uKDc0KSx3PW4oMTYpLFA9bigzMSksaz1PLmYsaj13LmYsVD1NLmYsQT1yLlN5bWJvbCxSPXIuSlNPTixMPVImJlIuc3RyaW5naWZ5LEk9XCJwcm90b3R5cGVcIixEPWgoXCJfaGlkZGVuXCIpLEM9aChcInRvUHJpbWl0aXZlXCIpLE49e30ucHJvcGVydHlJc0VudW1lcmFibGUsRj1mKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLEg9ZihcInN5bWJvbHNcIiksej1mKFwib3Atc3ltYm9sc1wiKSxCPU9iamVjdFtJXSxHPVwiZnVuY3Rpb25cIj09dHlwZW9mIEEsVj1yLlFPYmplY3QsVz0hVnx8IVZbSV18fCFWW0ldLmZpbmRDaGlsZCxVPWkmJmwoZnVuY3Rpb24oKXtyZXR1cm4gNyE9RShqKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaih0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1rKEIsZSk7ciYmZGVsZXRlIEJbZV0saih0LGUsbiksciYmdCE9PUImJmooQixlLHIpfTpqLFg9ZnVuY3Rpb24odCl7dmFyIGU9SFt0XT1FKEFbSV0pO3JldHVybiBlLl9rPXQsZX0scT1HJiZcInN5bWJvbFwiPT10eXBlb2YgQS5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBBfSxLPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PUImJksoeixlLG4pLGcodCksZT14KGUsITApLGcobiksbyhILGUpPyhuLmVudW1lcmFibGU/KG8odCxEKSYmdFtEXVtlXSYmKHRbRF1bZV09ITEpLG49RShuLHtlbnVtZXJhYmxlOlMoMCwhMSl9KSk6KG8odCxEKXx8aih0LEQsUygxLHt9KSksdFtEXVtlXT0hMCksVSh0LGUsbikpOmoodCxlLG4pfSxKPWZ1bmN0aW9uKHQsZSl7Zyh0KTtmb3IodmFyIG4scj15KGU9bShlKSksbz0wLGk9ci5sZW5ndGg7aT5vOylLKHQsbj1yW28rK10sZVtuXSk7cmV0dXJuIHR9LFk9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT9FKHQpOkooRSh0KSxlKX0sUT1mdW5jdGlvbih0KXt2YXIgZT1OLmNhbGwodGhpcyx0PXgodCwhMCkpO3JldHVybiEodGhpcz09PUImJm8oSCx0KSYmIW8oeix0KSkmJighKGV8fCFvKHRoaXMsdCl8fCFvKEgsdCl8fG8odGhpcyxEKSYmdGhpc1tEXVt0XSl8fGUpfSxaPWZ1bmN0aW9uKHQsZSl7aWYodD1tKHQpLGU9eChlLCEwKSx0IT09Qnx8IW8oSCxlKXx8byh6LGUpKXt2YXIgbj1rKHQsZSk7cmV0dXJuIW58fCFvKEgsZSl8fG8odCxEKSYmdFtEXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LCQ9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49VChtKHQpKSxyPVtdLGk9MDtuLmxlbmd0aD5pOylvKEgsZT1uW2krK10pfHxlPT1EfHxlPT1jfHxyLnB1c2goZSk7cmV0dXJuIHJ9LHR0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1CLHI9VChuP3o6bSh0KSksaT1bXSx1PTA7ci5sZW5ndGg+dTspIW8oSCxlPXJbdSsrXSl8fG4mJiFvKEIsZSl8fGkucHVzaChIW2VdKTtyZXR1cm4gaX07R3x8KEE9ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgQSl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PWQoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PUImJmUuY2FsbCh6LG4pLG8odGhpcyxEKSYmbyh0aGlzW0RdLHQpJiYodGhpc1tEXVt0XT0hMSksVSh0aGlzLHQsUygxLG4pKX07cmV0dXJuIGkmJlcmJlUoQix0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxYKHQpfSxhKEFbSV0sXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxPLmY9Wix3LmY9SyxuKDczKS5mPU0uZj0kLG4oNzApLmY9USxuKDY5KS5mPXR0LGkmJiFuKDkpJiZhKEIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFEsITApLHYuZj1mdW5jdGlvbih0KXtyZXR1cm4gWChoKHQpKX0pLHUodS5HK3UuVyt1LkYqIUcse1N5bWJvbDpBfSk7Zm9yKHZhciBldD1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLG50PTA7ZXQubGVuZ3RoPm50OyloKGV0W250KytdKTtmb3IodmFyIGV0PVAoaC5zdG9yZSksbnQ9MDtldC5sZW5ndGg+bnQ7KV8oZXRbbnQrK10pO3UodS5TK3UuRiohRyxcIlN5bWJvbFwiLHtcImZvclwiOmZ1bmN0aW9uKHQpe3JldHVybiBvKEYsdCs9XCJcIik/Rlt0XTpGW3RdPUEodCl9LGtleUZvcjpmdW5jdGlvbih0KXtpZihxKHQpKXJldHVybiBwKEYsdCk7dGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgc3ltYm9sIVwiKX0sdXNlU2V0dGVyOmZ1bmN0aW9uKCl7Vz0hMH0sdXNlU2ltcGxlOmZ1bmN0aW9uKCl7Vz0hMX19KSx1KHUuUyt1LkYqIUcsXCJPYmplY3RcIix7Y3JlYXRlOlksZGVmaW5lUHJvcGVydHk6SyxkZWZpbmVQcm9wZXJ0aWVzOkosZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOlosZ2V0T3duUHJvcGVydHlOYW1lczokLGdldE93blByb3BlcnR5U3ltYm9sczp0dH0pLFImJnUodS5TK3UuRiooIUd8fGwoZnVuY3Rpb24oKXt2YXIgdD1BKCk7cmV0dXJuXCJbbnVsbF1cIiE9TChbdF0pfHxcInt9XCIhPUwoe2E6dH0pfHxcInt9XCIhPUwoT2JqZWN0KHQpKX0pKSxcIkpTT05cIix7c3RyaW5naWZ5OmZ1bmN0aW9uKHQpe2lmKHZvaWQgMCE9PXQmJiFxKHQpKXtmb3IodmFyIGUsbixyPVt0XSxvPTE7YXJndW1lbnRzLmxlbmd0aD5vOylyLnB1c2goYXJndW1lbnRzW28rK10pO3JldHVybiBlPXJbMV0sXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksIW4mJmIoZSl8fChlPWZ1bmN0aW9uKHQsZSl7aWYobiYmKGU9bi5jYWxsKHRoaXMsdCxlKSksIXEoZSkpcmV0dXJuIGV9KSxyWzFdPWUsTC5hcHBseShSLHIpfX19KSxBW0ldW0NdfHxuKDE1KShBW0ldLEMsQVtJXS52YWx1ZU9mKSxzKEEsXCJTeW1ib2xcIikscyhNYXRoLFwiTWF0aFwiLCEwKSxzKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQxKShcIm1ldGFcIiksbz1uKDE4KSxpPW4oMjYpLHU9bigxNikuZixhPTAsYz1PYmplY3QuaXNFeHRlbnNpYmxlfHxmdW5jdGlvbigpe3JldHVybiEwfSxsPSFuKDIxKShmdW5jdGlvbigpe3JldHVybiBjKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpfSksZj1mdW5jdGlvbih0KXt1KHQscix7dmFsdWU6e2k6XCJPXCIrICsrYSx3Ont9fX0pfSxzPWZ1bmN0aW9uKHQsZSl7aWYoIW8odCkpcmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHQ/dDooXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCJTXCI6XCJQXCIpK3Q7aWYoIWkodCxyKSl7aWYoIWModCkpcmV0dXJuXCJGXCI7aWYoIWUpcmV0dXJuXCJFXCI7Zih0KX1yZXR1cm4gdFtyXS5pfSxkPWZ1bmN0aW9uKHQsZSl7aWYoIWkodCxyKSl7aWYoIWModCkpcmV0dXJuITA7aWYoIWUpcmV0dXJuITE7Zih0KX1yZXR1cm4gdFtyXS53fSxoPWZ1bmN0aW9uKHQpe3JldHVybiBsJiZ2Lk5FRUQmJmModCkmJiFpKHQscikmJmYodCksdH0sdj10LmV4cG9ydHM9e0tFWTpyLE5FRUQ6ITEsZmFzdEtleTpzLGdldFdlYWs6ZCxvbkZyZWV6ZTpofX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTEpLG89bigxMiksaT1uKDkpLHU9big2MSksYT1uKDE2KS5mO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1vLlN5bWJvbHx8KG8uU3ltYm9sPWk/e306ci5TeW1ib2x8fHt9KTtcIl9cIj09dC5jaGFyQXQoMCl8fHQgaW4gZXx8YShlLHQse3ZhbHVlOnUuZih0KX0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzEpLG89bigzMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuLGk9byh0KSx1PXIoaSksYT11Lmxlbmd0aCxjPTA7YT5jOylpZihpW249dVtjKytdXT09PWUpcmV0dXJuIG59fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMSksbz1uKDY5KSxpPW4oNzApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1yKHQpLG49by5mO2lmKG4pZm9yKHZhciB1LGE9bih0KSxjPWkuZixsPTA7YS5sZW5ndGg+bDspYy5jYWxsKHQsdT1hW2wrK10pJiZlLnB1c2godSk7cmV0dXJuIGV9fSxmdW5jdGlvbih0LGUpe2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzfSxmdW5jdGlvbih0LGUpe2UuZj17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzUpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PXIodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMyksbz1uKDczKS5mLGk9e30udG9TdHJpbmcsdT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzP09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdyk6W10sYT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIG8odCl9Y2F0Y2goZSl7cmV0dXJuIHUuc2xpY2UoKX19O3QuZXhwb3J0cy5mPWZ1bmN0aW9uKHQpe3JldHVybiB1JiZcIltvYmplY3QgV2luZG93XVwiPT1pLmNhbGwodCk/YSh0KTpvKHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzIpLG89big0MikuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LG8pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNzApLG89bigyNCksaT1uKDMzKSx1PW4oMjMpLGE9bigyNiksYz1uKDE5KSxsPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oMjApP2w6ZnVuY3Rpb24odCxlKXtpZih0PWkodCksZT11KGUsITApLGMpdHJ5e3JldHVybiBsKHQsZSl9Y2F0Y2gobil7fWlmKGEodCxlKSlyZXR1cm4gbyghci5mLmNhbGwodCxlKSx0W2VdKX19LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7big2NikoXCJhc3luY0l0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7big2NikoXCJvYnNlcnZhYmxlXCIpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfXZhciBpPW4oNzkpLHU9cihpKSxhPW4oODIpLGM9cihhKSxsPW4oODYpLGY9cihsKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLlNtb290aFNjcm9sbGJhcj12b2lkIDA7dmFyIHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLCgwLGZbXCJkZWZhdWx0XCJdKSh0LHIua2V5LHIpfX1yZXR1cm4gZnVuY3Rpb24oZSxuLHIpe3JldHVybiBuJiZ0KGUucHJvdG90eXBlLG4pLHImJnQoZSxyKSxlfX0oKSxkPW4oODkpLGg9bigxMTIpO2UuU21vb3RoU2Nyb2xsYmFyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlKXt2YXIgbj10aGlzLHI9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtvKHRoaXMsdCksZS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLFwiMVwiKSxlLnNjcm9sbFRvcD1lLnNjcm9sbExlZnQ9MDt2YXIgaT0oMCxoLmZpbmRDaGlsZCkoZSxcInNjcm9sbC1jb250ZW50XCIpLGE9KDAsaC5maW5kQ2hpbGQpKGUsXCJvdmVyc2Nyb2xsLWdsb3dcIiksbD0oMCxoLmZpbmRDaGlsZCkoZSxcInNjcm9sbGJhci10cmFjay14XCIpLGY9KDAsaC5maW5kQ2hpbGQpKGUsXCJzY3JvbGxiYXItdHJhY2steVwiKTtpZigoMCxoLnNldFN0eWxlKShlLHtvdmVyZmxvdzpcImhpZGRlblwiLG91dGxpbmU6XCJub25lXCJ9KSwoMCxoLnNldFN0eWxlKShhLHtkaXNwbGF5Olwibm9uZVwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIn0pLHRoaXMuX19yZWFkb25seShcInRhcmdldHNcIiwoMCxjW1wiZGVmYXVsdFwiXSkoe2NvbnRhaW5lcjplLGNvbnRlbnQ6aSxjYW52YXM6e2VsZW06YSxjb250ZXh0OmEuZ2V0Q29udGV4dChcIjJkXCIpfSx4QXhpczooMCxjW1wiZGVmYXVsdFwiXSkoe3RyYWNrOmwsdGh1bWI6KDAsaC5maW5kQ2hpbGQpKGwsXCJzY3JvbGxiYXItdGh1bWIteFwiKX0pLHlBeGlzOigwLGNbXCJkZWZhdWx0XCJdKSh7dHJhY2s6Zix0aHVtYjooMCxoLmZpbmRDaGlsZCkoZixcInNjcm9sbGJhci10aHVtYi15XCIpfSl9KSkuX19yZWFkb25seShcIm9mZnNldFwiLHt4OjAseTowfSkuX19yZWFkb25seShcInRodW1iT2Zmc2V0XCIse3g6MCx5OjB9KS5fX3JlYWRvbmx5KFwibGltaXRcIix7eDoxLzAseToxLzB9KS5fX3JlYWRvbmx5KFwibW92ZW1lbnRcIix7eDowLHk6MH0pLl9fcmVhZG9ubHkoXCJtb3ZlbWVudExvY2tlZFwiLHt4OiExLHk6ITF9KS5fX3JlYWRvbmx5KFwib3ZlcnNjcm9sbFJlbmRlcmVkXCIse3g6MCx5OjB9KS5fX3JlYWRvbmx5KFwib3ZlcnNjcm9sbEJhY2tcIiwhMSkuX19yZWFkb25seShcInRodW1iU2l6ZVwiLHt4OjAseTowLHJlYWxYOjAscmVhbFk6MH0pLl9fcmVhZG9ubHkoXCJib3VuZGluZ1wiLHt0b3A6MCxyaWdodDowLGJvdHRvbTowLGxlZnQ6MH0pLl9fcmVhZG9ubHkoXCJjaGlsZHJlblwiLFtdKS5fX3JlYWRvbmx5KFwicGFyZW50c1wiLFtdKS5fX3JlYWRvbmx5KFwic2l6ZVwiLHRoaXMuZ2V0U2l6ZSgpKS5fX3JlYWRvbmx5KFwiaXNOZXN0ZWRTY3JvbGxiYXJcIiwhMSksKDAsdVtcImRlZmF1bHRcIl0pKHRoaXMse19faGlkZVRyYWNrVGhyb3R0bGU6e3ZhbHVlOigwLGguZGVib3VuY2UpKHRoaXMuaGlkZVRyYWNrLmJpbmQodGhpcyksMWUzLCExKX0sX191cGRhdGVUaHJvdHRsZTp7dmFsdWU6KDAsaC5kZWJvdW5jZSkodGhpcy51cGRhdGUuYmluZCh0aGlzKSl9LF9fdG91Y2hSZWNvcmQ6e3ZhbHVlOm5ldyBoLlRvdWNoUmVjb3JkfSxfX2xpc3RlbmVyczp7dmFsdWU6W119LF9faGFuZGxlcnM6e3ZhbHVlOltdfSxfX2NoaWxkcmVuOnt2YWx1ZTpbXX0sX190aW1lcklEOnt2YWx1ZTp7fX19KSx0aGlzLl9faW5pdE9wdGlvbnMociksdGhpcy5fX2luaXRTY3JvbGxiYXIoKSxkLnNiTGlzdC5zZXQoZSx0aGlzKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkLkdMT0JBTF9FTlYuTXV0YXRpb25PYnNlcnZlcil7dmFyIHM9bmV3IGQuR0xPQkFMX0VOVi5NdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCl7bi51cGRhdGUoITApfSk7cy5vYnNlcnZlKGkse2NoaWxkTGlzdDohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiX19vYnNlcnZlclwiLHt2YWx1ZTpzfSl9fXJldHVybiBzKHQsW3trZXk6XCJNQVhfT1ZFUlNDUk9MTFwiLGdldDpmdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0aW9ucyxlPXRoaXMuc2l6ZTtzd2l0Y2godC5vdmVyc2Nyb2xsRWZmZWN0KXtjYXNlXCJib3VuY2VcIjp2YXIgbj1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLnBvdyhlLmNvbnRhaW5lci53aWR0aCwyKStNYXRoLnBvdyhlLmNvbnRhaW5lci5oZWlnaHQsMikpKSxyPXRoaXMuX19pc01vdmVtZW50TG9ja2VkKCk/MjoxMDtyZXR1cm4gZC5HTE9CQUxfRU5WLlRPVUNIX1NVUFBPUlRFRD8oMCxoLnBpY2tJblJhbmdlKShuL3IsMTAwLDFlMyk6KDAsaC5waWNrSW5SYW5nZSkobi8xMCwyNSw1MCk7Y2FzZVwiZ2xvd1wiOnJldHVybiAxNTA7ZGVmYXVsdDpyZXR1cm4gMH19fSx7a2V5Olwic2Nyb2xsVG9wXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub2Zmc2V0Lnl9fSx7a2V5Olwic2Nyb2xsTGVmdFwiLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLm9mZnNldC54fX1dKSx0fSgpfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDgwKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oODEpO3ZhciByPW4oMTIpLk9iamVjdDt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gci5kZWZpbmVQcm9wZXJ0aWVzKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMCk7cihyLlMrci5GKiFuKDIwKSxcIk9iamVjdFwiLHtkZWZpbmVQcm9wZXJ0aWVzOm4oMzApfSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oODMpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big4NCksdC5leHBvcnRzPW4oMTIpLk9iamVjdC5mcmVlemV9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE4KSxvPW4oNjUpLm9uRnJlZXplO24oODUpKFwiZnJlZXplXCIsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0JiZyKGUpP3QobyhlKSk6ZX19KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApLG89bigxMiksaT1uKDIxKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj0oby5PYmplY3R8fHt9KVt0XXx8T2JqZWN0W3RdLHU9e307dVt0XT1lKG4pLHIoci5TK3IuRippKGZ1bmN0aW9uKCl7bigxKX0pLFwiT2JqZWN0XCIsdSl9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDg3KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oODgpO3ZhciByPW4oMTIpLk9iamVjdDt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmRlZmluZVByb3BlcnR5KHQsZSxuKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwKTtyKHIuUytyLkYqIW4oMjApLFwiT2JqZWN0XCIse2RlZmluZVByb3BlcnR5Om4oMTYpLmZ9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9big5Myk7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big5MSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDkyKSx0LmV4cG9ydHM9bigxMikuT2JqZWN0LmtleXN9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ3KSxvPW4oMzEpO24oODUpKFwia2V5c1wiLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBvKHIodCkpfX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDk0KTsoMCxhW1wiZGVmYXVsdFwiXSkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pO3ZhciBsPW4oOTUpOygwLGFbXCJkZWZhdWx0XCJdKShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBsW3RdfX0pfSk7dmFyIGY9bigxMTEpOygwLGFbXCJkZWZhdWx0XCJdKShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBmW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPWZ1bmN0aW9uKHQpe3ZhciBlPXt9LG49e307cmV0dXJuKDAsYVtcImRlZmF1bHRcIl0pKHQpLmZvckVhY2goZnVuY3Rpb24ocil7KDAsaVtcImRlZmF1bHRcIl0pKGUscix7Z2V0OmZ1bmN0aW9uKCl7aWYoIW4uaGFzT3duUHJvcGVydHkocikpe3ZhciBlPXRbcl07bltyXT1lKCl9cmV0dXJuIG5bcl19fSl9KSxlfSxsPXtNdXRhdGlvbk9ic2VydmVyOmZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyfHx3aW5kb3cuV2ViS2l0TXV0YXRpb25PYnNlcnZlcnx8d2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXJ9LFRPVUNIX1NVUFBPUlRFRDpmdW5jdGlvbigpe3JldHVyblwib250b3VjaHN0YXJ0XCJpbiBkb2N1bWVudH0sRUFTSU5HX01VTFRJUExJRVI6ZnVuY3Rpb24oKXtyZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC8pPy41Oi4yNX0sV0hFRUxfRVZFTlQ6ZnVuY3Rpb24oKXtyZXR1cm5cIm9ud2hlZWxcImluIHdpbmRvdz9cIndoZWVsXCI6XCJtb3VzZXdoZWVsXCJ9fTtlLkdMT0JBTF9FTlY9YyhsKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDk2KSxpPXIobyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHU9bmV3IGlbXCJkZWZhdWx0XCJdLGE9dS5zZXQuYmluZCh1KSxjPXVbXCJkZWxldGVcIl0uYmluZCh1KTt1LnVwZGF0ZT1mdW5jdGlvbigpe3UuZm9yRWFjaChmdW5jdGlvbih0KXt0Ll9fdXBkYXRlVHJlZSgpfSl9LHVbXCJkZWxldGVcIl09ZnVuY3Rpb24oKXt2YXIgdD1jLmFwcGx5KHZvaWQgMCxhcmd1bWVudHMpO3JldHVybiB1LnVwZGF0ZSgpLHR9LHUuc2V0PWZ1bmN0aW9uKCl7dmFyIHQ9YS5hcHBseSh2b2lkIDAsYXJndW1lbnRzKTtyZXR1cm4gdS51cGRhdGUoKSx0fSxlLnNiTGlzdD11fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDk3KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNzUpLG4oNCksbig1Nyksbig5OCksbigxMDgpLHQuZXhwb3J0cz1uKDEyKS5NYXB9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDk5KTt0LmV4cG9ydHM9bigxMDQpKFwiTWFwXCIsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQodGhpcyxhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCl9fSx7Z2V0OmZ1bmN0aW9uKHQpe3ZhciBlPXIuZ2V0RW50cnkodGhpcyx0KTtyZXR1cm4gZSYmZS52fSxzZXQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gci5kZWYodGhpcywwPT09dD8wOnQsZSl9fSxyLCEwKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMTYpLmYsbz1uKDI5KSxpPW4oMTAwKSx1PW4oMTMpLGE9bigxMDEpLGM9big3KSxsPW4oMTAyKSxmPW4oOCkscz1uKDYwKSxkPW4oMTAzKSxoPW4oMjApLHY9big2NSkuZmFzdEtleSxfPWg/XCJfc1wiOlwic2l6ZVwiLHA9ZnVuY3Rpb24odCxlKXt2YXIgbixyPXYoZSk7aWYoXCJGXCIhPT1yKXJldHVybiB0Ll9pW3JdO2ZvcihuPXQuX2Y7bjtuPW4ubilpZihuLms9PWUpcmV0dXJuIG59O3QuZXhwb3J0cz17Z2V0Q29uc3RydWN0b3I6ZnVuY3Rpb24odCxlLG4sZil7dmFyIHM9dChmdW5jdGlvbih0LHIpe2EodCxzLGUsXCJfaVwiKSx0Ll9pPW8obnVsbCksdC5fZj12b2lkIDAsdC5fbD12b2lkIDAsdFtfXT0wLHZvaWQgMCE9ciYmbChyLG4sdFtmXSx0KX0pO3JldHVybiBpKHMucHJvdG90eXBlLHtjbGVhcjpmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLGU9dC5faSxuPXQuX2Y7bjtuPW4ubiluLnI9ITAsbi5wJiYobi5wPW4ucC5uPXZvaWQgMCksZGVsZXRlIGVbbi5pXTt0Ll9mPXQuX2w9dm9pZCAwLHRbX109MH0sXCJkZWxldGVcIjpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49cChlLHQpO2lmKG4pe3ZhciByPW4ubixvPW4ucDtkZWxldGUgZS5faVtuLmldLG4ucj0hMCxvJiYoby5uPXIpLHImJihyLnA9byksZS5fZj09biYmKGUuX2Y9ciksZS5fbD09biYmKGUuX2w9byksZVtfXS0tfXJldHVybiEhbn0sZm9yRWFjaDpmdW5jdGlvbih0KXthKHRoaXMscyxcImZvckVhY2hcIik7Zm9yKHZhciBlLG49dSh0LGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwLDMpO2U9ZT9lLm46dGhpcy5fZjspZm9yKG4oZS52LGUuayx0aGlzKTtlJiZlLnI7KWU9ZS5wfSxoYXM6ZnVuY3Rpb24odCl7cmV0dXJuISFwKHRoaXMsdCl9fSksaCYmcihzLnByb3RvdHlwZSxcInNpemVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGModGhpc1tfXSl9fSksc30sZGVmOmZ1bmN0aW9uKHQsZSxuKXt2YXIgcixvLGk9cCh0LGUpO3JldHVybiBpP2kudj1uOih0Ll9sPWk9e2k6bz12KGUsITApLGs6ZSx2Om4scDpyPXQuX2wsbjp2b2lkIDAscjohMX0sdC5fZnx8KHQuX2Y9aSksciYmKHIubj1pKSx0W19dKyssXCJGXCIhPT1vJiYodC5faVtvXT1pKSksdH0sZ2V0RW50cnk6cCxzZXRTdHJvbmc6ZnVuY3Rpb24odCxlLG4pe2YodCxlLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD10LHRoaXMuX2s9ZSx0aGlzLl9sPXZvaWQgMH0sZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcyxlPXQuX2ssbj10Ll9sO24mJm4ucjspbj1uLnA7cmV0dXJuIHQuX3QmJih0Ll9sPW49bj9uLm46dC5fdC5fZik/XCJrZXlzXCI9PWU/cygwLG4uayk6XCJ2YWx1ZXNcIj09ZT9zKDAsbi52KTpzKDAsW24uayxuLnZdKToodC5fdD12b2lkIDAscygxKSl9LG4/XCJlbnRyaWVzXCI6XCJ2YWx1ZXNcIiwhbiwhMCksZChlKX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtmb3IodmFyIG8gaW4gZSluJiZ0W29dP3Rbb109ZVtvXTpyKHQsbyxlW29dKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHIpe2lmKCEodCBpbnN0YW5jZW9mIGUpfHx2b2lkIDAhPT1yJiZyIGluIHQpdGhyb3cgVHlwZUVycm9yKG4rXCI6IGluY29ycmVjdCBpbnZvY2F0aW9uIVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEzKSxvPW4oNDkpLGk9big1MCksdT1uKDE3KSxhPW4oMzcpLGM9big1MiksbD17fSxmPXt9LGU9dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHMsZCl7dmFyIGgsdixfLHAseT1kP2Z1bmN0aW9uKCl7cmV0dXJuIHR9OmModCksYj1yKG4scyxlPzI6MSksZz0wO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHkpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGl0ZXJhYmxlIVwiKTtpZihpKHkpKXtmb3IoaD1hKHQubGVuZ3RoKTtoPmc7ZysrKWlmKHA9ZT9iKHUodj10W2ddKVswXSx2WzFdKTpiKHRbZ10pLHA9PT1sfHxwPT09ZilyZXR1cm4gcH1lbHNlIGZvcihfPXkuY2FsbCh0KTshKHY9Xy5uZXh0KCkpLmRvbmU7KWlmKHA9byhfLGIsdi52YWx1ZSxlKSxwPT09bHx8cD09PWYpcmV0dXJuIHB9O2UuQlJFQUs9bCxlLlJFVFVSTj1mfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMSksbz1uKDEyKSxpPW4oMTYpLHU9bigyMCksYT1uKDQ1KShcInNwZWNpZXNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPVwiZnVuY3Rpb25cIj09dHlwZW9mIG9bdF0/b1t0XTpyW3RdO3UmJmUmJiFlW2FdJiZpLmYoZSxhLHtjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9fSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMSksbz1uKDEwKSxpPW4oNjUpLHU9bigyMSksYT1uKDE1KSxjPW4oMTAwKSxsPW4oMTAyKSxmPW4oMTAxKSxzPW4oMTgpLGQ9big0NCksaD1uKDE2KS5mLHY9bigxMDUpKDApLF89bigyMCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHAseSxiKXt2YXIgZz1yW3RdLG09Zyx4PXk/XCJzZXRcIjpcImFkZFwiLFM9bSYmbS5wcm90b3R5cGUsRT17fTtyZXR1cm4gXyYmXCJmdW5jdGlvblwiPT10eXBlb2YgbSYmKGJ8fFMuZm9yRWFjaCYmIXUoZnVuY3Rpb24oKXsobmV3IG0pLmVudHJpZXMoKS5uZXh0KCl9KSk/KG09ZShmdW5jdGlvbihlLG4pe2YoZSxtLHQsXCJfY1wiKSxlLl9jPW5ldyBnLHZvaWQgMCE9biYmbChuLHksZVt4XSxlKX0pLHYoXCJhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcyx0b0pTT05cIi5zcGxpdChcIixcIiksZnVuY3Rpb24odCl7dmFyIGU9XCJhZGRcIj09dHx8XCJzZXRcIj09dDt0IGluIFMmJighYnx8XCJjbGVhclwiIT10KSYmYShtLnByb3RvdHlwZSx0LGZ1bmN0aW9uKG4scil7aWYoZih0aGlzLG0sdCksIWUmJmImJiFzKG4pKXJldHVyblwiZ2V0XCI9PXQmJnZvaWQgMDt2YXIgbz10aGlzLl9jW3RdKDA9PT1uPzA6bixyKTtyZXR1cm4gZT90aGlzOm99KX0pLFwic2l6ZVwiaW4gUyYmaChtLnByb3RvdHlwZSxcInNpemVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2Muc2l6ZX19KSk6KG09cC5nZXRDb25zdHJ1Y3RvcihlLHQseSx4KSxjKG0ucHJvdG90eXBlLG4pLGkuTkVFRD0hMCksZChtLHQpLEVbdF09bSxvKG8uRytvLlcrby5GLEUpLGJ8fHAuc2V0U3Ryb25nKG0sdCx5KSxtfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTMpLG89bigzNCksaT1uKDQ3KSx1PW4oMzcpLGE9bigxMDYpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuPTE9PXQsYz0yPT10LGw9Mz09dCxmPTQ9PXQscz02PT10LGQ9NT09dHx8cyxoPWV8fGE7cmV0dXJuIGZ1bmN0aW9uKGUsYSx2KXtmb3IodmFyIF8scCx5PWkoZSksYj1vKHkpLGc9cihhLHYsMyksbT11KGIubGVuZ3RoKSx4PTAsUz1uP2goZSxtKTpjP2goZSwwKTp2b2lkIDA7bT54O3grKylpZigoZHx8eCBpbiBiKSYmKF89Ylt4XSxwPWcoXyx4LHkpLHQpKWlmKG4pU1t4XT1wO2Vsc2UgaWYocClzd2l0Y2godCl7Y2FzZSAzOnJldHVybiEwO2Nhc2UgNTpyZXR1cm4gXztjYXNlIDY6cmV0dXJuIHg7Y2FzZSAyOlMucHVzaChfKX1lbHNlIGlmKGYpcmV0dXJuITE7cmV0dXJuIHM/LTE6bHx8Zj9mOlN9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTA3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3KHIodCkpKGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTgpLG89big3MSksaT1uKDQ1KShcInNwZWNpZXNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBvKHQpJiYoZT10LmNvbnN0cnVjdG9yLFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fGUhPT1BcnJheSYmIW8oZS5wcm90b3R5cGUpfHwoZT12b2lkIDApLHIoZSkmJihlPWVbaV0sbnVsbD09PWUmJihlPXZvaWQgMCkpKSx2b2lkIDA9PT1lP0FycmF5OmV9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMCk7cihyLlArci5SLFwiTWFwXCIse3RvSlNPTjpuKDEwOSkoXCJNYXBcIil9KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTMpLG89bigxMTApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oKXtpZihyKHRoaXMpIT10KXRocm93IFR5cGVFcnJvcih0K1wiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO3JldHVybiBvKHRoaXMpfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwMik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG49W107cmV0dXJuIHIodCwhMSxuLnB1c2gsbixlKSxufX0sZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtlLnNlbGVjdG9ycz1cInNjcm9sbGJhciwgW3Njcm9sbGJhcl0sIFtkYXRhLXNjcm9sbGJhcl1cIn0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxMTMpOygwLGFbXCJkZWZhdWx0XCJdKShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTE0KTsoMCxhW1wiZGVmYXVsdFwiXSkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pO3ZhciBsPW4oMTE1KTsoMCxhW1wiZGVmYXVsdFwiXSkobCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbFt0XX19KX0pO3ZhciBmPW4oMTE2KTsoMCxhW1wiZGVmYXVsdFwiXSkoZikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZlt0XX19KX0pO3ZhciBzPW4oMTE3KTsoMCxhW1wiZGVmYXVsdFwiXSkocykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gc1t0XX19KX0pO3ZhciBkPW4oMTE4KTsoMCxhW1wiZGVmYXVsdFwiXSkoZCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZFt0XX19KX0pO3ZhciBoPW4oMTE5KTsoMCxhW1wiZGVmYXVsdFwiXSkoaCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaFt0XX19KX0pO3ZhciB2PW4oMTIwKTsoMCxhW1wiZGVmYXVsdFwiXSkodikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdlt0XX19KX0pO3ZhciBfPW4oMTIxKTsoMCxhW1wiZGVmYXVsdFwiXSkoXykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gX1t0XX19KX0pO3ZhciBwPW4oMTIyKTsoMCxhW1wiZGVmYXVsdFwiXSkocCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gcFt0XX19KX0pO3ZhciB5PW4oMTIzKTsoMCxhW1wiZGVmYXVsdFwiXSkoeSkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4geVt0XX19KX0pO3ZhciBiPW4oMTI0KTsoMCxhW1wiZGVmYXVsdFwiXSkoYikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYlt0XX19KX0pfSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2UuYnVpbGRDdXJ2ZT1mdW5jdGlvbih0LGUpe3ZhciBuPVtdO2lmKGU8PTApcmV0dXJuIG47Zm9yKHZhciByPU1hdGgucm91bmQoZS8xZTMqNjApLG89LXQvTWF0aC5wb3cociwyKSxpPS0yKm8qcix1PTA7dTxyO3UrKyluLnB1c2gobypNYXRoLnBvdyh1LDIpK2kqdSk7cmV0dXJuIG59fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBuPTEwMDtlLmRlYm91bmNlPWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT9uOmFyZ3VtZW50c1sxXSxyPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXXx8YXJndW1lbnRzWzJdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpe3ZhciBvPXZvaWQgMDtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49YXJndW1lbnRzLmxlbmd0aCxpPUFycmF5KG4pLHU9MDt1PG47dSsrKWlbdV09YXJndW1lbnRzW3VdOyFvJiZyJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodm9pZCAwLGkpfSksY2xlYXJUaW1lb3V0KG8pLG89c2V0VGltZW91dChmdW5jdGlvbigpe289dm9pZCAwLHQuYXBwbHkodm9pZCAwLGkpfSxlKX19fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX1mdW5jdGlvbiBvKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49QXJyYXkodC5sZW5ndGgpO2U8dC5sZW5ndGg7ZSsrKW5bZV09dFtlXTtcbnJldHVybiBufXJldHVybigwLHVbXCJkZWZhdWx0XCJdKSh0KX12YXIgaT1uKDIpLHU9cihpKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtlLmZpbmRDaGlsZD1mdW5jdGlvbih0LGUpe3ZhciBuPXQuY2hpbGRyZW4scj1udWxsO3JldHVybiBuJiZbXS5jb25jYXQobyhuKSkuc29tZShmdW5jdGlvbih0KXtpZih0LmNsYXNzTmFtZS5tYXRjaChlKSlyZXR1cm4gcj10LCEwfSkscn19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG49e1NUQU5EQVJEOjEsT1RIRVJTOi0zfSxyPVsxLDI4LDUwMF0sbz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8clswXX07ZS5nZXREZWx0YT1mdW5jdGlvbih0KXtpZihcImRlbHRhWFwiaW4gdCl7dmFyIGU9byh0LmRlbHRhTW9kZSk7cmV0dXJue3g6dC5kZWx0YVgvbi5TVEFOREFSRCplLHk6dC5kZWx0YVkvbi5TVEFOREFSRCplfX1yZXR1cm5cIndoZWVsRGVsdGFYXCJpbiB0P3t4OnQud2hlZWxEZWx0YVgvbi5PVEhFUlMseTp0LndoZWVsRGVsdGFZL24uT1RIRVJTfTp7eDowLHk6dC53aGVlbERlbHRhL24uT1RIRVJTfX19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7ZS5nZXRQb2ludGVyRGF0YT1mdW5jdGlvbih0KXtyZXR1cm4gdC50b3VjaGVzP3QudG91Y2hlc1t0LnRvdWNoZXMubGVuZ3RoLTFdOnR9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5nZXRQb3NpdGlvbj12b2lkIDA7dmFyIHI9bigxMTgpO2UuZ2V0UG9zaXRpb249ZnVuY3Rpb24odCl7dmFyIGU9KDAsci5nZXRQb2ludGVyRGF0YSkodCk7cmV0dXJue3g6ZS5jbGllbnRYLHk6ZS5jbGllbnRZfX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLmdldFRvdWNoSUQ9dm9pZCAwO3ZhciByPW4oMTE4KTtlLmdldFRvdWNoSUQ9ZnVuY3Rpb24odCl7dmFyIGU9KDAsci5nZXRQb2ludGVyRGF0YSkodCk7cmV0dXJuIGUuaWRlbnRpZmllcn19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7ZS5pc09uZU9mPWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT9bXTphcmd1bWVudHNbMV07cmV0dXJuIGUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gdD09PWV9KX19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7ZS5waWNrSW5SYW5nZT1mdW5jdGlvbih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/LSgxLzApOmFyZ3VtZW50c1sxXSxuPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT8xLzA6YXJndW1lbnRzWzJdO3JldHVybiBNYXRoLm1heChlLE1hdGgubWluKHQsbikpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDkwKSxpPXIobyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHU9W1wid2Via2l0XCIsXCJtb3pcIixcIm1zXCIsXCJvXCJdLGE9bmV3IFJlZ0V4cChcIl4tKD8hKD86XCIrdS5qb2luKFwifFwiKStcIiktKVwiKSxjPWZ1bmN0aW9uKHQpe3ZhciBlPXt9O3JldHVybigwLGlbXCJkZWZhdWx0XCJdKSh0KS5mb3JFYWNoKGZ1bmN0aW9uKG4pe2lmKCFhLnRlc3QobikpcmV0dXJuIHZvaWQoZVtuXT10W25dKTt2YXIgcj10W25dO249bi5yZXBsYWNlKC9eLS8sXCJcIiksZVtuXT1yLHUuZm9yRWFjaChmdW5jdGlvbih0KXtlW1wiLVwiK3QrXCItXCIrbl09cn0pfSksZX07ZS5zZXRTdHlsZT1mdW5jdGlvbih0LGUpe2U9YyhlKSwoMCxpW1wiZGVmYXVsdFwiXSkoZSkuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgcj1uLnJlcGxhY2UoL14tLyxcIlwiKS5yZXBsYWNlKC8tKFthLXpdKS9nLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGUudG9VcHBlckNhc2UoKX0pO3Quc3R5bGVbcl09ZVtuXX0pfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX1mdW5jdGlvbiBvKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49QXJyYXkodC5sZW5ndGgpO2U8dC5sZW5ndGg7ZSsrKW5bZV09dFtlXTtyZXR1cm4gbn1yZXR1cm4oMCxhW1wiZGVmYXVsdFwiXSkodCl9ZnVuY3Rpb24gaSh0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIHU9bigyKSxhPXIodSksYz1uKDg2KSxsPXIoYyksZj1uKDEyNSkscz1yKGYpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUuVG91Y2hSZWNvcmQ9dm9pZCAwO3ZhciBkPXNbXCJkZWZhdWx0XCJdfHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciByIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4scikmJih0W3JdPW5bcl0pfXJldHVybiB0fSxoPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSwoMCxsW1wiZGVmYXVsdFwiXSkodCxyLmtleSxyKX19cmV0dXJuIGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gbiYmdChlLnByb3RvdHlwZSxuKSxyJiZ0KGUsciksZX19KCksdj1uKDExOSksXz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoZSl7aSh0aGlzLHQpLHRoaXMudXBkYXRlVGltZT1EYXRlLm5vdygpLHRoaXMuZGVsdGE9e3g6MCx5OjB9LHRoaXMudmVsb2NpdHk9e3g6MCx5OjB9LHRoaXMubGFzdFBvc2l0aW9uPSgwLHYuZ2V0UG9zaXRpb24pKGUpfXJldHVybiBoKHQsW3trZXk6XCJ1cGRhdGVcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLnZlbG9jaXR5LG49dGhpcy51cGRhdGVUaW1lLHI9dGhpcy5sYXN0UG9zaXRpb24sbz1EYXRlLm5vdygpLGk9KDAsdi5nZXRQb3NpdGlvbikodCksdT17eDotKGkueC1yLngpLHk6LShpLnktci55KX0sYT1vLW58fDE2LGM9dS54L2EqMWUzLGw9dS55L2EqMWUzO2UueD0uOCpjKy4yKmUueCxlLnk9LjgqbCsuMiplLnksdGhpcy5kZWx0YT11LHRoaXMudXBkYXRlVGltZT1vLHRoaXMubGFzdFBvc2l0aW9uPWl9fV0pLHR9KCk7ZS5Ub3VjaFJlY29yZD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtpKHRoaXMsdCksdGhpcy50b3VjaExpc3Q9e30sdGhpcy5sYXN0VG91Y2g9bnVsbCx0aGlzLmFjdGl2ZVRvdWNoSUQ9dm9pZCAwfXJldHVybiBoKHQsW3trZXk6XCJfX2FkZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe2lmKHRoaXMuX19oYXModCkpcmV0dXJuIG51bGw7dmFyIGU9bmV3IF8odCk7cmV0dXJuIHRoaXMudG91Y2hMaXN0W3QuaWRlbnRpZmllcl09ZSxlfX0se2tleTpcIl9fcmVuZXdcIix2YWx1ZTpmdW5jdGlvbih0KXtpZighdGhpcy5fX2hhcyh0KSlyZXR1cm4gbnVsbDt2YXIgZT10aGlzLnRvdWNoTGlzdFt0LmlkZW50aWZpZXJdO3JldHVybiBlLnVwZGF0ZSh0KSxlfX0se2tleTpcIl9fZGVsZXRlXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIGRlbGV0ZSB0aGlzLnRvdWNoTGlzdFt0LmlkZW50aWZpZXJdfX0se2tleTpcIl9faGFzXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMudG91Y2hMaXN0Lmhhc093blByb3BlcnR5KHQuaWRlbnRpZmllcil9fSx7a2V5OlwiX19zZXRBY3RpdmVJRFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuYWN0aXZlVG91Y2hJRD10W3QubGVuZ3RoLTFdLmlkZW50aWZpZXIsdGhpcy5sYXN0VG91Y2g9dGhpcy50b3VjaExpc3RbdGhpcy5hY3RpdmVUb3VjaElEXX19LHtrZXk6XCJfX2dldEFjdGl2ZVRyYWNrZXJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMudG91Y2hMaXN0LGU9dGhpcy5hY3RpdmVUb3VjaElEO3JldHVybiB0W2VdfX0se2tleTpcImlzQWN0aXZlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5hY3RpdmVUb3VjaElEfX0se2tleTpcImdldERlbHRhXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9fZ2V0QWN0aXZlVHJhY2tlcigpO3JldHVybiB0P2Qoe30sdC5kZWx0YSk6dGhpcy5fX3ByaW1pdGl2ZVZhbHVlfX0se2tleTpcImdldFZlbG9jaXR5XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9fZ2V0QWN0aXZlVHJhY2tlcigpO3JldHVybiB0P2Qoe30sdC52ZWxvY2l0eSk6dGhpcy5fX3ByaW1pdGl2ZVZhbHVlfX0se2tleTpcImdldExhc3RQb3NpdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP1wiXCI6YXJndW1lbnRzWzBdLGU9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKXx8dGhpcy5sYXN0VG91Y2gsbj1lP2UubGFzdFBvc2l0aW9uOnRoaXMuX19wcmltaXRpdmVWYWx1ZTtyZXR1cm4gdD9uLmhhc093blByb3BlcnR5KHQpP25bdF06MDpkKHt9LG4pfX0se2tleTpcInVwZGF0ZWRSZWNlbnRseVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKTtyZXR1cm4gdCYmRGF0ZS5ub3coKS10LnVwZGF0ZVRpbWU8MzB9fSx7a2V5OlwidHJhY2tcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dC50YXJnZXRUb3VjaGVzO3JldHVybltdLmNvbmNhdChvKG4pKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UuX19hZGQodCl9KSx0aGlzLnRvdWNoTGlzdH19LHtrZXk6XCJ1cGRhdGVcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dC50b3VjaGVzLHI9dC5jaGFuZ2VkVG91Y2hlcztyZXR1cm5bXS5jb25jYXQobyhuKSkuZm9yRWFjaChmdW5jdGlvbih0KXtlLl9fcmVuZXcodCl9KSx0aGlzLl9fc2V0QWN0aXZlSUQociksdGhpcy50b3VjaExpc3R9fSx7a2V5OlwicmVsZWFzZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7cmV0dXJuIHRoaXMuYWN0aXZlVG91Y2hJRD12b2lkIDAsW10uY29uY2F0KG8odC5jaGFuZ2VkVG91Y2hlcykpLmZvckVhY2goZnVuY3Rpb24odCl7ZS5fX2RlbGV0ZSh0KX0pLHRoaXMudG91Y2hMaXN0fX0se2tleTpcIl9fcHJpbWl0aXZlVmFsdWVcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm57eDowLHk6MH19fV0pLHR9KCl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oMTI2KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oMTI3KSx0LmV4cG9ydHM9bigxMikuT2JqZWN0LmFzc2lnbn0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApO3Ioci5TK3IuRixcIk9iamVjdFwiLHthc3NpZ246bigxMjgpfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDMxKSxvPW4oNjkpLGk9big3MCksdT1uKDQ3KSxhPW4oMzQpLGM9T2JqZWN0LmFzc2lnbjt0LmV4cG9ydHM9IWN8fG4oMjEpKGZ1bmN0aW9uKCl7dmFyIHQ9e30sZT17fSxuPVN5bWJvbCgpLHI9XCJhYmNkZWZnaGlqa2xtbm9wcXJzdFwiO3JldHVybiB0W25dPTcsci5zcGxpdChcIlwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2VbdF09dH0pLDchPWMoe30sdClbbl18fE9iamVjdC5rZXlzKGMoe30sZSkpLmpvaW4oXCJcIikhPXJ9KT9mdW5jdGlvbih0LGUpe2Zvcih2YXIgbj11KHQpLGM9YXJndW1lbnRzLmxlbmd0aCxsPTEsZj1vLmYscz1pLmY7Yz5sOylmb3IodmFyIGQsaD1hKGFyZ3VtZW50c1tsKytdKSx2PWY/cihoKS5jb25jYXQoZihoKSk6cihoKSxfPXYubGVuZ3RoLHA9MDtfPnA7KXMuY2FsbChoLGQ9dltwKytdKSYmKG5bZF09aFtkXSk7cmV0dXJuIG59OmN9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTMwKTsoMCxhW1wiZGVmYXVsdFwiXSkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDEzMSk7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KTt2YXIgbD1uKDEzMik7KDAsYVtcImRlZmF1bHRcIl0pKGwpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGxbdF19fSl9KTt2YXIgZj1uKDEzMyk7KDAsYVtcImRlZmF1bHRcIl0pKGYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGZbdF19fSl9KTt2YXIgcz1uKDEzNCk7KDAsYVtcImRlZmF1bHRcIl0pKHMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHNbdF19fSl9KTt2YXIgZD1uKDEzNSk7KDAsYVtcImRlZmF1bHRcIl0pKGQpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRbdF19fSl9KTt2YXIgaD1uKDEzNik7KDAsYVtcImRlZmF1bHRcIl0pKGgpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGhbdF19fSl9KTt2YXIgdj1uKDEzNyk7KDAsYVtcImRlZmF1bHRcIl0pKHYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZbdF19fSl9KTt2YXIgXz1uKDEzOCk7KDAsYVtcImRlZmF1bHRcIl0pKF8pLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF9bdF19fSl9KTt2YXIgcD1uKDEzOSk7KDAsYVtcImRlZmF1bHRcIl0pKHApLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHBbdF19fSl9KTt2YXIgeT1uKDE0MCk7KDAsYVtcImRlZmF1bHRcIl0pKHkpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHlbdF19fSl9KTt2YXIgYj1uKDE0MSk7KDAsYVtcImRlZmF1bHRcIl0pKGIpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGJbdF19fSl9KTt2YXIgZz1uKDE0Mik7KDAsYVtcImRlZmF1bHRcIl0pKGcpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGdbdF19fSl9KTt2YXIgbT1uKDE0Myk7KDAsYVtcImRlZmF1bHRcIl0pKG0pLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG1bdF19fSl9KTt2YXIgeD1uKDE0NCk7KDAsYVtcImRlZmF1bHRcIl0pKHgpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHhbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzgpO3IuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5jbGVhck1vdmVtZW50PXIuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5tb3ZlbWVudC54PXRoaXMubW92ZW1lbnQueT0wLGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX190aW1lcklELnNjcm9sbFRvKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19ZnVuY3Rpb24gbyh0KXtpZihBcnJheS5pc0FycmF5KHQpKXtmb3IodmFyIGU9MCxuPUFycmF5KHQubGVuZ3RoKTtlPHQubGVuZ3RoO2UrKyluW2VdPXRbZV07cmV0dXJuIG59cmV0dXJuKDAsdVtcImRlZmF1bHRcIl0pKHQpfXZhciBpPW4oMiksdT1yKGkpLGE9big3OCksYz1uKDExMiksbD1uKDg5KTthLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9fbGlzdGVuZXJzLG49dGhpcy5fX2hhbmRsZXJzLHI9dGhpcy5fX29ic2VydmVyLGk9dGhpcy50YXJnZXRzLHU9aS5jb250YWluZXIsYT1pLmNvbnRlbnQ7bi5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlPXQuZXZ0LG49dC5lbGVtLHI9dC5mbjtuLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxyKX0pLG4ubGVuZ3RoPWUubGVuZ3RoPTAsdGhpcy5zdG9wKCksY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3RpbWVySUQucmVuZGVyKSxyJiZyLmRpc2Nvbm5lY3QoKSxsLnNiTGlzdFtcImRlbGV0ZVwiXSh1KSx0fHx0aGlzLnNjcm9sbFRvKDAsMCwzMDAsZnVuY3Rpb24oKXtpZih1LnBhcmVudE5vZGUpeygwLGMuc2V0U3R5bGUpKHUse292ZXJmbG93OlwiXCJ9KSx1LnNjcm9sbFRvcD11LnNjcm9sbExlZnQ9MDt2YXIgdD1bXS5jb25jYXQobyhhLmNoaWxkTm9kZXMpKTt1LmlubmVySFRNTD1cIlwiLHQuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gdS5hcHBlbmRDaGlsZCh0KX0pfX0pfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzgpO3IuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5nZXRDb250ZW50RWxlbT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRhcmdldHMuY29udGVudH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDc4KTtyLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUuZ2V0U2l6ZT1mdW5jdGlvbigpe3ZhciB0PXRoaXMudGFyZ2V0cy5jb250YWluZXIsZT10aGlzLnRhcmdldHMuY29udGVudDtyZXR1cm57Y29udGFpbmVyOnt3aWR0aDp0LmNsaWVudFdpZHRoLGhlaWdodDp0LmNsaWVudEhlaWdodH0sY29udGVudDp7d2lkdGg6ZS5vZmZzZXRXaWR0aC1lLmNsaWVudFdpZHRoK2Uuc2Nyb2xsV2lkdGgsaGVpZ2h0OmUub2Zmc2V0SGVpZ2h0LWUuY2xpZW50SGVpZ2h0K2Uuc2Nyb2xsSGVpZ2h0fX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmluZmluaXRlU2Nyb2xsPWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT81MDphcmd1bWVudHNbMV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl7dmFyIG49e3g6MCx5OjB9LHI9ITE7dGhpcy5hZGRMaXN0ZW5lcihmdW5jdGlvbihvKXt2YXIgaT1vLm9mZnNldCx1PW8ubGltaXQ7dS55LWkueTw9ZSYmaS55Pm4ueSYmIXImJihyPSEwLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gdChvKX0pKSx1LnktaS55PmUmJihyPSExKSxuPWl9KX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmlzVmlzaWJsZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmJvdW5kaW5nLG49dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxyPU1hdGgubWF4KGUudG9wLG4udG9wKSxvPU1hdGgubWF4KGUubGVmdCxuLmxlZnQpLGk9TWF0aC5taW4oZS5yaWdodCxuLnJpZ2h0KSx1PU1hdGgubWluKGUuYm90dG9tLG4uYm90dG9tKTtyZXR1cm4gcjx1JiZvPGl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnRoaXMuX19saXN0ZW5lcnMucHVzaCh0KX0sci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnRoaXMuX19saXN0ZW5lcnMuc29tZShmdW5jdGlvbihlLG4scil7cmV0dXJuIGU9PT10JiZyLnNwbGljZShuLDEpfSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCxlLG4pe3JldHVybiBlIGluIHQ/KDAsbFtcImRlZmF1bHRcIl0pKHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fWZ1bmN0aW9uIGkodCxlKXtyZXR1cm4hIWUubGVuZ3RoJiZlLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIHQubWF0Y2goZSl9KX1mdW5jdGlvbiB1KCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3MuUkVHSUVTVEVSOmFyZ3VtZW50c1swXSxlPWRbdF07cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWFyZ3VtZW50cy5sZW5ndGgscj1BcnJheShuKSxvPTA7bzxuO28rKylyW29dPWFyZ3VtZW50c1tvXTt0aGlzLl9faGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgbz1uLmVsZW0sdT1uLmV2dCxhPW4uZm4sYz1uLmhhc1JlZ2lzdGVyZWQ7YyYmdD09PXMuUkVHSUVTVEVSfHwhYyYmdD09PXMuVU5SRUdJRVNURVJ8fGkodSxyKSYmKG9bZV0odSxhKSxuLmhhc1JlZ2lzdGVyZWQ9IWMpfSl9fXZhciBhLGM9big4NiksbD1yKGMpLGY9big3OCkscz17UkVHSUVTVEVSOjAsVU5SRUdJRVNURVI6MX0sZD0oYT17fSxvKGEscy5SRUdJRVNURVIsXCJhZGRFdmVudExpc3RlbmVyXCIpLG8oYSxzLlVOUkVHSUVTVEVSLFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiKSxhKTtmLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUucmVnaXN0ZXJFdmVudHM9dShzLlJFR0lFU1RFUiksZi5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnVucmVnaXN0ZXJFdmVudHM9dShzLlVOUkVHSUVTVEVSKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzgpO3IuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zY3JvbGxJbnRvVmlldz1mdW5jdGlvbih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLG49ZS5vbmx5U2Nyb2xsSWZOZWVkZWQscj12b2lkIDAhPT1uJiZuLG89ZS5vZmZzZXRUb3AsaT12b2lkIDA9PT1vPzA6byx1PWUub2Zmc2V0TGVmdCxhPXZvaWQgMD09PXU/MDp1LGM9dGhpcy50YXJnZXRzLGw9dGhpcy5ib3VuZGluZztpZih0JiZjLmNvbnRhaW5lci5jb250YWlucyh0KSl7dmFyIGY9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyJiZ0aGlzLmlzVmlzaWJsZSh0KXx8dGhpcy5fX3NldE1vdmVtZW50KGYubGVmdC1sLmxlZnQtYSxmLnRvcC1sLnRvcC1pKX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMTIpLG89big3OCk7by5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnNjcm9sbFRvPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3RoaXMub2Zmc2V0Lng6YXJndW1lbnRzWzBdLGU9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3RoaXMub2Zmc2V0Lnk6YXJndW1lbnRzWzFdLG49dGhpcyxvPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT8wOmFyZ3VtZW50c1syXSxpPWFyZ3VtZW50cy5sZW5ndGg8PTN8fHZvaWQgMD09PWFyZ3VtZW50c1szXT9udWxsOmFyZ3VtZW50c1szXSx1PXRoaXMub3B0aW9ucyxhPXRoaXMub2Zmc2V0LGM9dGhpcy5saW1pdCxsPXRoaXMuX190aW1lcklEO2NhbmNlbEFuaW1hdGlvbkZyYW1lKGwuc2Nyb2xsVG8pLGk9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pOmZ1bmN0aW9uKCl7fSx1LnJlbmRlckJ5UGl4ZWxzJiYodD1NYXRoLnJvdW5kKHQpLGU9TWF0aC5yb3VuZChlKSk7dmFyIGY9YS54LHM9YS55LGQ9KDAsci5waWNrSW5SYW5nZSkodCwwLGMueCktZixoPSgwLHIucGlja0luUmFuZ2UpKGUsMCxjLnkpLXMsdj0oMCxyLmJ1aWxkQ3VydmUpKGQsbyksXz0oMCxyLmJ1aWxkQ3VydmUpKGgsbykscD12Lmxlbmd0aCx5PTAsYj1mdW5jdGlvbiBnKCl7cmV0dXJuIHk9PT1wPyhuLnNldFBvc2l0aW9uKHQsZSkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aShuKX0pKToobi5zZXRQb3NpdGlvbihmK3ZbeV0scytfW3ldKSx5Kyssdm9pZChsLnNjcm9sbFRvPXJlcXVlc3RBbmltYXRpb25GcmFtZShnKSkpfTtiKCl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oOTApLGk9cihvKSx1PW4oNzgpO3UuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF07KDAsaVtcImRlZmF1bHRcIl0pKGUpLmZvckVhY2goZnVuY3Rpb24obil7dC5vcHRpb25zLmhhc093blByb3BlcnR5KG4pJiZ2b2lkIDAhPT1lW25dJiYodC5vcHRpb25zW25dPWVbbl0pfSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oMTI1KSxpPXIobyksdT1pW1wiZGVmYXVsdFwiXXx8ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTE7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl7dmFyIG49YXJndW1lbnRzW2VdO2Zvcih2YXIgciBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLHIpJiYodFtyXT1uW3JdKX1yZXR1cm4gdH0sYT1uKDExMiksYz1uKDc4KTtjLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUuc2V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/dGhpcy5vZmZzZXQueDphcmd1bWVudHNbMF0sZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/dGhpcy5vZmZzZXQueTphcmd1bWVudHNbMV0sbj0hKGFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXSkmJmFyZ3VtZW50c1syXTt0aGlzLl9faGlkZVRyYWNrVGhyb3R0bGUoKTt2YXIgcj17fSxvPXRoaXMub3B0aW9ucyxpPXRoaXMub2Zmc2V0LGM9dGhpcy5saW1pdCxsPXRoaXMudGFyZ2V0cyxmPXRoaXMuX19saXN0ZW5lcnM7by5yZW5kZXJCeVBpeGVscyYmKHQ9TWF0aC5yb3VuZCh0KSxlPU1hdGgucm91bmQoZSkpLE1hdGguYWJzKHQtaS54KT4xJiZ0aGlzLnNob3dUcmFjayhcInhcIiksTWF0aC5hYnMoZS1pLnkpPjEmJnRoaXMuc2hvd1RyYWNrKFwieVwiKSx0PSgwLGEucGlja0luUmFuZ2UpKHQsMCxjLngpLGU9KDAsYS5waWNrSW5SYW5nZSkoZSwwLGMueSksdD09PWkueCYmZT09PWkueXx8KHIuZGlyZWN0aW9uPXt4OnQ9PT1pLng/XCJub25lXCI6dD5pLng/XCJyaWdodFwiOlwibGVmdFwiLHk6ZT09PWkueT9cIm5vbmVcIjplPmkueT9cImRvd25cIjpcInVwXCJ9LHRoaXMuX19yZWFkb25seShcIm9mZnNldFwiLHt4OnQseTplfSksci5saW1pdD11KHt9LGMpLHIub2Zmc2V0PXUoe30sdGhpcy5vZmZzZXQpLHRoaXMuX19zZXRUaHVtYlBvc2l0aW9uKCksKDAsYS5zZXRTdHlsZSkobC5jb250ZW50LHtcIi10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZTNkKFwiKy10K1wicHgsIFwiKy1lK1wicHgsIDApXCJ9KSxufHxmLmZvckVhY2goZnVuY3Rpb24odCl7by5zeW5jQ2FsbGJhY2tzP3Qocik6cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7dChyKX0pfSkpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX1mdW5jdGlvbiBvKHQsZSxuKXtyZXR1cm4gZSBpbiB0PygwLGNbXCJkZWZhdWx0XCJdKSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH1mdW5jdGlvbiBpKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP2YuU0hPVzphcmd1bWVudHNbMF0sZT1kW3RdO3JldHVybiBmdW5jdGlvbigpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9cImJvdGhcIjphcmd1bWVudHNbMF0scj10aGlzLm9wdGlvbnMsbz10aGlzLm1vdmVtZW50LGk9dGhpcy50YXJnZXRzLHU9aS5jb250YWluZXIsYT1pLnhBeGlzLGM9aS55QXhpcztvLnh8fG8ueT91LmNsYXNzTGlzdC5hZGQocy5DT05UQUlORVIpOnUuY2xhc3NMaXN0LnJlbW92ZShzLkNPTlRBSU5FUiksci5hbHdheXNTaG93VHJhY2tzJiZ0PT09Zi5ISURFfHwobj1uLnRvTG93ZXJDYXNlKCksXCJib3RoXCI9PT1uJiYoYS50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSyksYy50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSykpLFwieFwiPT09biYmYS50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSyksXCJ5XCI9PT1uJiZjLnRyYWNrLmNsYXNzTGlzdFtlXShzLlRSQUNLKSl9fXZhciB1LGE9big4NiksYz1yKGEpLGw9big3OCksZj17U0hPVzowLEhJREU6MX0scz17VFJBQ0s6XCJzaG93XCIsQ09OVEFJTkVSOlwic2Nyb2xsaW5nXCJ9LGQ9KHU9e30sbyh1LGYuU0hPVyxcImFkZFwiKSxvKHUsZi5ISURFLFwicmVtb3ZlXCIpLHUpO2wuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zaG93VHJhY2s9aShmLlNIT1cpLGwuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5oaWRlVHJhY2s9aShmLkhJREUpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe2lmKFwiZ2xvd1wiPT09dGhpcy5vcHRpb25zLm92ZXJzY3JvbGxFZmZlY3Qpe3ZhciB0PXRoaXMudGFyZ2V0cyxlPXRoaXMuc2l6ZSxuPXQuY2FudmFzLHI9bi5lbGVtLG89bi5jb250ZXh0LGk9d2luZG93LmRldmljZVBpeGVsUmF0aW98fDEsdT1lLmNvbnRhaW5lci53aWR0aCppLGE9ZS5jb250YWluZXIuaGVpZ2h0Kmk7dT09PXIud2lkdGgmJmE9PT1yLmhlaWdodHx8KHIud2lkdGg9dSxyLmhlaWdodD1hLG8uc2NhbGUoaSxpKSl9fWZ1bmN0aW9uIG8oKXt2YXIgdD10aGlzLnNpemUsZT10aGlzLnRodW1iU2l6ZSxuPXRoaXMudGFyZ2V0cyxyPW4ueEF4aXMsbz1uLnlBeGlzOygwLHUuc2V0U3R5bGUpKHIudHJhY2sse2Rpc3BsYXk6dC5jb250ZW50LndpZHRoPD10LmNvbnRhaW5lci53aWR0aD9cIm5vbmVcIjpcImJsb2NrXCJ9KSwoMCx1LnNldFN0eWxlKShvLnRyYWNrLHtkaXNwbGF5OnQuY29udGVudC5oZWlnaHQ8PXQuY29udGFpbmVyLmhlaWdodD9cIm5vbmVcIjpcImJsb2NrXCJ9KSwoMCx1LnNldFN0eWxlKShyLnRodW1iLHt3aWR0aDplLngrXCJweFwifSksKDAsdS5zZXRTdHlsZSkoby50aHVtYix7aGVpZ2h0OmUueStcInB4XCJ9KX1mdW5jdGlvbiBpKCl7dmFyIHQ9dGhpcy5vcHRpb25zO3RoaXMuX191cGRhdGVCb3VuZGluZygpO3ZhciBlPXRoaXMuZ2V0U2l6ZSgpLG49e3g6TWF0aC5tYXgoZS5jb250ZW50LndpZHRoLWUuY29udGFpbmVyLndpZHRoLDApLHk6TWF0aC5tYXgoZS5jb250ZW50LmhlaWdodC1lLmNvbnRhaW5lci5oZWlnaHQsMCl9LGk9e3JlYWxYOmUuY29udGFpbmVyLndpZHRoL2UuY29udGVudC53aWR0aCplLmNvbnRhaW5lci53aWR0aCxyZWFsWTplLmNvbnRhaW5lci5oZWlnaHQvZS5jb250ZW50LmhlaWdodCplLmNvbnRhaW5lci5oZWlnaHR9O2kueD1NYXRoLm1heChpLnJlYWxYLHQudGh1bWJNaW5TaXplKSxpLnk9TWF0aC5tYXgoaS5yZWFsWSx0LnRodW1iTWluU2l6ZSksdGhpcy5fX3JlYWRvbmx5KFwic2l6ZVwiLGUpLl9fcmVhZG9ubHkoXCJsaW1pdFwiLG4pLl9fcmVhZG9ubHkoXCJ0aHVtYlNpemVcIixpKSxvLmNhbGwodGhpcyksci5jYWxsKHRoaXMpLHRoaXMuc2V0UG9zaXRpb24oKSx0aGlzLl9fc2V0VGh1bWJQb3NpdGlvbigpfXZhciB1PW4oMTEyKSxhPW4oNzgpO2EuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24odCl7dD9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaS5iaW5kKHRoaXMpKTppLmNhbGwodGhpcyl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE0Nik7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNDcpOygwLGFbXCJkZWZhdWx0XCJdKShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSk7dmFyIGw9bigxNDgpOygwLGFbXCJkZWZhdWx0XCJdKShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBsW3RdfX0pfSk7dmFyIGY9bigxNDkpOygwLGFbXCJkZWZhdWx0XCJdKShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBmW3RdfX0pfSk7dmFyIHM9bigxNTQpOygwLGFbXCJkZWZhdWx0XCJdKShzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzW3RdfX0pfSk7dmFyIGQ9bigxNTUpOygwLGFbXCJkZWZhdWx0XCJdKShkKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBkW3RdfX0pfSk7dmFyIGg9bigxNTYpOygwLGFbXCJkZWZhdWx0XCJdKShoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBoW3RdfX0pfSk7dmFyIHY9bigxNTcpOygwLGFbXCJkZWZhdWx0XCJdKSh2KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB2W3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19ZnVuY3Rpb24gbyh0KXtpZihBcnJheS5pc0FycmF5KHQpKXtmb3IodmFyIGU9MCxuPUFycmF5KHQubGVuZ3RoKTtlPHQubGVuZ3RoO2UrKyluW2VdPXRbZV07cmV0dXJuIG59cmV0dXJuKDAsYVtcImRlZmF1bHRcIl0pKHQpfWZ1bmN0aW9uIGkoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/MDphcmd1bWVudHNbMF0sZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/MDphcmd1bWVudHNbMV0sbj0hKGFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXSkmJmFyZ3VtZW50c1syXSxyPXRoaXMubGltaXQsaT10aGlzLm9wdGlvbnMsdT10aGlzLm1vdmVtZW50O3RoaXMuX191cGRhdGVUaHJvdHRsZSgpLGkucmVuZGVyQnlQaXhlbHMmJih0PU1hdGgucm91bmQodCksZT1NYXRoLnJvdW5kKGUpKTt2YXIgYT11LngrdCxsPXUueStlOzA9PT1yLngmJihhPTApLDA9PT1yLnkmJihsPTApO3ZhciBmPXRoaXMuX19nZXREZWx0YUxpbWl0KG4pO3UueD1jLnBpY2tJblJhbmdlLmFwcGx5KHZvaWQgMCxbYV0uY29uY2F0KG8oZi54KSkpLHUueT1jLnBpY2tJblJhbmdlLmFwcGx5KHZvaWQgMCxbbF0uY29uY2F0KG8oZi55KSkpfXZhciB1PW4oMiksYT1yKHUpLGM9bigxMTIpLGw9big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGwuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fYWRkTW92ZW1lbnRcIix7dmFsdWU6aSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9dGhpcy5tb3ZlbWVudCxuPXRoaXMubW92ZW1lbnRMb2NrZWQ7YS5mb3JFYWNoKGZ1bmN0aW9uKHIpe25bcl09ZVtyXSYmdC5fX3dpbGxPdmVyc2Nyb2xsKHIsZVtyXSl9KX1mdW5jdGlvbiBvKCl7dmFyIHQ9dGhpcy5tb3ZlbWVudExvY2tlZDthLmZvckVhY2goZnVuY3Rpb24oZSl7dFtlXT0hMX0pfWZ1bmN0aW9uIGkoKXt2YXIgdD10aGlzLm1vdmVtZW50TG9ja2VkO3JldHVybiB0Lnh8fHQueX12YXIgdT1uKDc4KSxhPVtcInhcIixcInlcIl07T2JqZWN0LmRlZmluZVByb3BlcnR5KHUuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fYXV0b0xvY2tNb3ZlbWVudFwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh1LlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3VubG9ja01vdmVtZW50XCIse3ZhbHVlOm8sd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHUuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9faXNNb3ZlbWVudExvY2tlZFwiLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJcIjphcmd1bWVudHNbMF07aWYodCl7dmFyIGU9dGhpcy5vcHRpb25zLG49dGhpcy5tb3ZlbWVudCxyPXRoaXMub3ZlcnNjcm9sbFJlbmRlcmVkLG89dGhpcy5NQVhfT1ZFUlNDUk9MTCxpPW5bdF09KDAsaC5waWNrSW5SYW5nZSkoblt0XSwtbyxvKSx1PWUub3ZlcnNjcm9sbERhbXBpbmcsYT1yW3RdKyhpLXJbdF0pKnU7ZS5yZW5kZXJCeVBpeGVscyYmKGF8PTApLCF0aGlzLl9faXNNb3ZlbWVudExvY2tlZCgpJiZNYXRoLmFicyhhLXJbdF0pPC4xJiYoYS09aS9NYXRoLmFicyhpfHwxKSksTWF0aC5hYnMoYSk8TWF0aC5hYnMoclt0XSkmJnRoaXMuX19yZWFkb25seShcIm92ZXJzY3JvbGxCYWNrXCIsITApLChhKnJbdF08MHx8TWF0aC5hYnMoYSk8PTEpJiYoYT0wLHRoaXMuX19yZWFkb25seShcIm92ZXJzY3JvbGxCYWNrXCIsITEpKSxyW3RdPWF9fWZ1bmN0aW9uIGkodCl7dmFyIGU9dGhpcy5fX3RvdWNoUmVjb3JkLG49dGhpcy5vdmVyc2Nyb2xsUmVuZGVyZWQ7cmV0dXJuIG4ueCE9PXQueHx8bi55IT09dC55fHwhKCFkLkdMT0JBTF9FTlYuVE9VQ0hfU1VQUE9SVEVEfHwhZS51cGRhdGVkUmVjZW50bHkoKSl9ZnVuY3Rpb24gdSgpe3ZhciB0PXRoaXMsZT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/W106YXJndW1lbnRzWzBdO2lmKGUubGVuZ3RoJiZ0aGlzLm9wdGlvbnMub3ZlcnNjcm9sbEVmZmVjdCl7dmFyIG49dGhpcy5vcHRpb25zLHI9dGhpcy5vdmVyc2Nyb2xsUmVuZGVyZWQsdT1sKHt9LHIpO2lmKGUuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gby5jYWxsKHQsZSl9KSxpLmNhbGwodGhpcyx1KSlzd2l0Y2gobi5vdmVyc2Nyb2xsRWZmZWN0KXtjYXNlXCJib3VuY2VcIjpyZXR1cm4gcy5vdmVyc2Nyb2xsQm91bmNlLmNhbGwodGhpcyxyLngsci55KTtjYXNlXCJnbG93XCI6cmV0dXJuIHMub3ZlcnNjcm9sbEdsb3cuY2FsbCh0aGlzLHIueCxyLnkpO2RlZmF1bHQ6cmV0dXJufX19dmFyIGE9bigxMjUpLGM9cihhKSxsPWNbXCJkZWZhdWx0XCJdfHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciByIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4scikmJih0W3JdPW5bcl0pfXJldHVybiB0fSxmPW4oNzgpLHM9bigxNTApLGQ9big4OSksaD1uKDExMik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGYuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fcmVuZGVyT3ZlcnNjcm9sbFwiLHt2YWx1ZTp1LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE1MSk7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNTIpOygwLGFbXCJkZWZhdWx0XCJdKShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSk7dmFyIGw9bigxNTMpOygwLGFbXCJkZWZhdWx0XCJdKShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBsW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSl7dmFyIG49dGhpcy5zaXplLHI9dGhpcy5vZmZzZXQsaT10aGlzLnRhcmdldHMsdT10aGlzLnRodW1iT2Zmc2V0LGE9aS54QXhpcyxjPWkueUF4aXMsbD1pLmNvbnRlbnQ7aWYoKDAsby5zZXRTdHlsZSkobCx7XCItdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUzZChcIistKHIueCt0KStcInB4LCBcIistKHIueStlKStcInB4LCAwKVwifSksdCl7dmFyIGY9bi5jb250YWluZXIud2lkdGgvKG4uY29udGFpbmVyLndpZHRoK01hdGguYWJzKHQpKTsoMCxvLnNldFN0eWxlKShhLnRodW1iLHtcIi10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZTNkKFwiK3UueCtcInB4LCAwLCAwKSBzY2FsZTNkKFwiK2YrXCIsIDEsIDEpXCIsXCItdHJhbnNmb3JtLW9yaWdpblwiOnQ8MD9cImxlZnRcIjpcInJpZ2h0XCJ9KX1pZihlKXt2YXIgcz1uLmNvbnRhaW5lci5oZWlnaHQvKG4uY29udGFpbmVyLmhlaWdodCtNYXRoLmFicyhlKSk7KDAsby5zZXRTdHlsZSkoYy50aHVtYix7XCItdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUzZCgwLCBcIit1LnkrXCJweCwgMCkgc2NhbGUzZCgxLCBcIitzK1wiLCAxKVwiLFwiLXRyYW5zZm9ybS1vcmlnaW5cIjplPDA/XCJ0b3BcIjpcImJvdHRvbVwifSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUub3ZlcnNjcm9sbEJvdW5jZT1yO3ZhciBvPW4oMTEyKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCxlKXt2YXIgbj10aGlzLnNpemUscj10aGlzLnRhcmdldHMsYT10aGlzLm9wdGlvbnMsYz1yLmNhbnZhcyxsPWMuZWxlbSxmPWMuY29udGV4dDtyZXR1cm4gdHx8ZT8oKDAsdS5zZXRTdHlsZSkobCx7ZGlzcGxheTpcImJsb2NrXCJ9KSxmLmNsZWFyUmVjdCgwLDAsbi5jb250ZW50LndpZHRoLG4uY29udGFpbmVyLmhlaWdodCksZi5maWxsU3R5bGU9YS5vdmVyc2Nyb2xsRWZmZWN0Q29sb3Isby5jYWxsKHRoaXMsdCksdm9pZCBpLmNhbGwodGhpcyxlKSk6KDAsdS5zZXRTdHlsZSkobCx7ZGlzcGxheTpcIm5vbmVcIn0pfWZ1bmN0aW9uIG8odCl7dmFyIGU9dGhpcy5zaXplLG49dGhpcy50YXJnZXRzLHI9dGhpcy5fX3RvdWNoUmVjb3JkLG89dGhpcy5NQVhfT1ZFUlNDUk9MTCxpPWUuY29udGFpbmVyLGw9aS53aWR0aCxmPWkuaGVpZ2h0LHM9bi5jYW52YXMuY29udGV4dDtzLnNhdmUoKSx0PjAmJnMudHJhbnNmb3JtKC0xLDAsMCwxLGwsMCk7dmFyIGQ9KDAsdS5waWNrSW5SYW5nZSkoTWF0aC5hYnModCkvbywwLGEpLGg9KDAsdS5waWNrSW5SYW5nZSkoZCwwLGMpKmwsdj1NYXRoLmFicyh0KSxfPXIuZ2V0TGFzdFBvc2l0aW9uKFwieVwiKXx8Zi8yO3MuZ2xvYmFsQWxwaGE9ZCxzLmJlZ2luUGF0aCgpLHMubW92ZVRvKDAsLWgpLHMucXVhZHJhdGljQ3VydmVUbyh2LF8sMCxmK2gpLHMuZmlsbCgpLHMuY2xvc2VQYXRoKCkscy5yZXN0b3JlKCl9ZnVuY3Rpb24gaSh0KXt2YXIgZT10aGlzLnNpemUsbj10aGlzLnRhcmdldHMscj10aGlzLl9fdG91Y2hSZWNvcmQsbz10aGlzLk1BWF9PVkVSU0NST0xMLGk9ZS5jb250YWluZXIsbD1pLndpZHRoLGY9aS5oZWlnaHQscz1uLmNhbnZhcy5jb250ZXh0O3Muc2F2ZSgpLHQ+MCYmcy50cmFuc2Zvcm0oMSwwLDAsLTEsMCxmKTt2YXIgZD0oMCx1LnBpY2tJblJhbmdlKShNYXRoLmFicyh0KS9vLDAsYSksaD0oMCx1LnBpY2tJblJhbmdlKShkLDAsYykqbCx2PXIuZ2V0TGFzdFBvc2l0aW9uKFwieFwiKXx8bC8yLF89TWF0aC5hYnModCk7cy5nbG9iYWxBbHBoYT1kLHMuYmVnaW5QYXRoKCkscy5tb3ZlVG8oLWgsMCkscy5xdWFkcmF0aWNDdXJ2ZVRvKHYsXyxsK2gsMCkscy5maWxsKCkscy5jbG9zZVBhdGgoKSxzLnJlc3RvcmUoKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLm92ZXJzY3JvbGxHbG93PXI7dmFyIHU9bigxMTIpLGE9Ljc1LGM9LjI1fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXt2YXIgZT10aGlzLm9wdGlvbnMsbj10aGlzLm9mZnNldCxyPXRoaXMubW92ZW1lbnQsbz10aGlzLl9fdG91Y2hSZWNvcmQsaT1lLmRhbXBpbmcsdT1lLnJlbmRlckJ5UGl4ZWxzLGE9ZS5vdmVyc2Nyb2xsRGFtcGluZyxjPW5bdF0sbD1yW3RdLGY9aTtpZih0aGlzLl9fd2lsbE92ZXJzY3JvbGwodCxsKT9mPWE6by5pc0FjdGl2ZSgpJiYoZj0uNSksTWF0aC5hYnMobCk8MSl7dmFyIHM9YytsO3JldHVybnttb3ZlbWVudDowLHBvc2l0aW9uOmw+MD9NYXRoLmNlaWwocyk6TWF0aC5mbG9vcihzKX19dmFyIGQ9bCooMS1mKTtyZXR1cm4gdSYmKGR8PTApLHttb3ZlbWVudDpkLHBvc2l0aW9uOmMrbC1kfX1mdW5jdGlvbiBvKCl7dmFyIHQ9dGhpcy5vcHRpb25zLGU9dGhpcy5vZmZzZXQsbj10aGlzLmxpbWl0LGk9dGhpcy5tb3ZlbWVudCxhPXRoaXMub3ZlcnNjcm9sbFJlbmRlcmVkLGM9dGhpcy5fX3RpbWVySUQ7aWYoaS54fHxpLnl8fGEueHx8YS55KXt2YXIgbD1yLmNhbGwodGhpcyxcInhcIiksZj1yLmNhbGwodGhpcyxcInlcIikscz1bXTtpZih0Lm92ZXJzY3JvbGxFZmZlY3Qpe3ZhciBkPSgwLHUucGlja0luUmFuZ2UpKGwucG9zaXRpb24sMCxuLngpLGg9KDAsdS5waWNrSW5SYW5nZSkoZi5wb3NpdGlvbiwwLG4ueSk7KGEueHx8ZD09PWUueCYmaS54KSYmcy5wdXNoKFwieFwiKSwoYS55fHxoPT09ZS55JiZpLnkpJiZzLnB1c2goXCJ5XCIpfXRoaXMubW92ZW1lbnRMb2NrZWQueHx8KGkueD1sLm1vdmVtZW50KSx0aGlzLm1vdmVtZW50TG9ja2VkLnl8fChpLnk9Zi5tb3ZlbWVudCksdGhpcy5zZXRQb3NpdGlvbihsLnBvc2l0aW9uLGYucG9zaXRpb24pLHRoaXMuX19yZW5kZXJPdmVyc2Nyb2xsKHMpfWMucmVuZGVyPXJlcXVlc3RBbmltYXRpb25GcmFtZShvLmJpbmQodGhpcykpfXZhciBpPW4oNzgpLHU9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShpLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3JlbmRlclwiLHt2YWx1ZTpvLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGFbXCJkZWZhdWx0XCJdKSh0KX1mdW5jdGlvbiBpKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPzA6YXJndW1lbnRzWzBdLGU9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdPzA6YXJndW1lbnRzWzFdLG49IShhcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0pJiZhcmd1bWVudHNbMl0scj10aGlzLm9wdGlvbnMsaT10aGlzLm1vdmVtZW50O3RoaXMuX191cGRhdGVUaHJvdHRsZSgpO3ZhciB1PXRoaXMuX19nZXREZWx0YUxpbWl0KG4pO3IucmVuZGVyQnlQaXhlbHMmJih0PU1hdGgucm91bmQodCksZT1NYXRoLnJvdW5kKGUpKSxpLng9Yy5waWNrSW5SYW5nZS5hcHBseSh2b2lkIDAsW3RdLmNvbmNhdChvKHUueCkpKSxpLnk9Yy5waWNrSW5SYW5nZS5hcHBseSh2b2lkIDAsW2VdLmNvbmNhdChvKHUueSkpKX12YXIgdT1uKDIpLGE9cih1KSxjPW4oMTEyKSxsPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShsLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3NldE1vdmVtZW50XCIse3ZhbHVlOmksd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPzA6YXJndW1lbnRzWzBdLGU9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdPzA6YXJndW1lbnRzWzFdLG49dGhpcy5vcHRpb25zLHI9dGhpcy5vZmZzZXQsbz10aGlzLmxpbWl0O2lmKCFuLmNvbnRpbnVvdXNTY3JvbGxpbmcpcmV0dXJuITE7dmFyIHU9KDAsaS5waWNrSW5SYW5nZSkodCtyLngsMCxvLngpLGE9KDAsaS5waWNrSW5SYW5nZSkoZStyLnksMCxvLnkpLGM9ITA7cmV0dXJuIGMmPXU9PT1yLngsYyY9YT09PXIueSxjJj11PT09by54fHwwPT09dXx8YT09PW8ueXx8MD09PWF9dmFyIG89big3OCksaT1uKDExMik7T2JqZWN0LmRlZmluZVByb3BlcnR5KG8uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fc2hvdWxkUHJvcGFnYXRlTW92ZW1lbnRcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJcIjphcmd1bWVudHNbMF0sZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/MDphcmd1bWVudHNbMV07aWYoIXQpcmV0dXJuITE7dmFyIG49dGhpcy5vZmZzZXQscj10aGlzLmxpbWl0LG89blt0XTtyZXR1cm4oMCxpLnBpY2tJblJhbmdlKShlK28sMCxyW3RdKT09PW8mJigwPT09b3x8bz09PXJbdF0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3dpbGxPdmVyc2Nyb2xsXCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7XCJkZWZhdWx0XCI6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTU5KTsoMCxhW1wiZGVmYXVsdFwiXSkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaVtcImRlZmF1bHRcIl0pKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE2MCk7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KTt2YXIgbD1uKDE2MSk7KDAsYVtcImRlZmF1bHRcIl0pKGwpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGxbdF19fSl9KTt2YXIgZj1uKDE2OCk7KDAsYVtcImRlZmF1bHRcIl0pKGYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGZbdF19fSl9KTt2YXIgcz1uKDE2OSk7KDAsYVtcImRlZmF1bHRcIl0pKHMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHNbdF19fSl9KTt2YXIgZD1uKDE3MCk7KDAsYVtcImRlZmF1bHRcIl0pKGQpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRbdF19fSl9KTt2YXIgaD1uKDE3MSk7KDAsYVtcImRlZmF1bHRcIl0pKGgpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGhbdF19fSl9KTt2YXIgdj1uKDE3Mik7KDAsYVtcImRlZmF1bHRcIl0pKHYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9dGhpcy50YXJnZXRzLG49ZS5jb250YWluZXIscj1lLmNvbnRlbnQsbz0hMSx1PXZvaWQgMCxhPXZvaWQgMDtPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcIl9faXNEcmFnXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBvfSxlbnVtZXJhYmxlOiExfSk7dmFyIGM9ZnVuY3Rpb24gbChlKXt2YXIgbj1lLngscj1lLnk7aWYobnx8cil7dmFyIG89dC5vcHRpb25zLnNwZWVkO3QuX19zZXRNb3ZlbWVudChuKm8scipvKSx1PXJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2woe3g6bix5OnJ9KX0pfX07dGhpcy5fX2FkZEV2ZW50KG4sXCJkcmFnc3RhcnRcIixmdW5jdGlvbihlKXt0Ll9fZXZlbnRGcm9tQ2hpbGRTY3JvbGxiYXIoZSl8fChvPSEwLGE9ZS50YXJnZXQuY2xpZW50SGVpZ2h0LCgwLGkuc2V0U3R5bGUpKHIse1wicG9pbnRlci1ldmVudHNcIjpcImF1dG9cIn0pLGNhbmNlbEFuaW1hdGlvbkZyYW1lKHUpLHQuX191cGRhdGVCb3VuZGluZygpKX0pLHRoaXMuX19hZGRFdmVudChkb2N1bWVudCxcImRyYWdvdmVyIG1vdXNlbW92ZSB0b3VjaG1vdmVcIixmdW5jdGlvbihlKXtpZihvJiYhdC5fX2V2ZW50RnJvbUNoaWxkU2Nyb2xsYmFyKGUpKXtjYW5jZWxBbmltYXRpb25GcmFtZSh1KSxlLnByZXZlbnREZWZhdWx0KCk7dmFyIG49dC5fX2dldFBvaW50ZXJUcmVuZChlLGEpO2Mobil9fSksdGhpcy5fX2FkZEV2ZW50KGRvY3VtZW50LFwiZHJhZ2VuZCBtb3VzZXVwIHRvdWNoZW5kIGJsdXJcIixmdW5jdGlvbigpe2NhbmNlbEFuaW1hdGlvbkZyYW1lKHUpLG89ITF9KX12YXIgbz1uKDc4KSxpPW4oMTEyKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19kcmFnSGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8oKXt2YXIgdD10aGlzLGU9dGhpcy50YXJnZXRzLG49ZnVuY3Rpb24oZSl7dmFyIG49dC5zaXplLHI9dC5vZmZzZXQsbz10LmxpbWl0LGk9dC5tb3ZlbWVudDtzd2l0Y2goZSl7Y2FzZSBzLlNQQUNFOnJldHVyblswLDIwMF07Y2FzZSBzLlBBR0VfVVA6cmV0dXJuWzAsLW4uY29udGFpbmVyLmhlaWdodCs0MF07Y2FzZSBzLlBBR0VfRE9XTjpyZXR1cm5bMCxuLmNvbnRhaW5lci5oZWlnaHQtNDBdO2Nhc2Ugcy5FTkQ6cmV0dXJuWzAsTWF0aC5hYnMoaS55KStvLnktci55XTtjYXNlIHMuSE9NRTpyZXR1cm5bMCwtTWF0aC5hYnMoaS55KS1yLnldO2Nhc2Ugcy5MRUZUOnJldHVyblstNDAsMF07Y2FzZSBzLlVQOnJldHVyblswLC00MF07Y2FzZSBzLlJJR0hUOnJldHVybls0MCwwXTtjYXNlIHMuRE9XTjpyZXR1cm5bMCw0MF07ZGVmYXVsdDpyZXR1cm4gbnVsbH19LHI9ZS5jb250YWluZXIsbz0hMTt0aGlzLl9fYWRkRXZlbnQocixcImZvY3VzXCIsZnVuY3Rpb24oKXtvPSEwfSksdGhpcy5fX2FkZEV2ZW50KHIsXCJibHVyXCIsZnVuY3Rpb24oKXtvPSExfSksdGhpcy5fX2FkZEV2ZW50KHIsXCJrZXlkb3duXCIsZnVuY3Rpb24oZSl7aWYobyl7dmFyIGk9dC5vcHRpb25zLHU9dC5wYXJlbnRzLGE9dC5tb3ZlbWVudExvY2tlZCxjPW4oZS5rZXlDb2RlfHxlLndoaWNoKTtpZihjKXt2YXIgZj1sKGMsMikscz1mWzBdLGQ9ZlsxXTtpZih0Ll9fc2hvdWxkUHJvcGFnYXRlTW92ZW1lbnQocyxkKSlyZXR1cm4gci5ibHVyKCksdS5sZW5ndGgmJnVbMF0uZm9jdXMoKSx0Ll9fdXBkYXRlVGhyb3R0bGUoKTtlLnByZXZlbnREZWZhdWx0KCksdC5fX3VubG9ja01vdmVtZW50KCkscyYmdC5fX3dpbGxPdmVyc2Nyb2xsKFwieFwiLHMpJiYoYS54PSEwKSxkJiZ0Ll9fd2lsbE92ZXJzY3JvbGwoXCJ5XCIsZCkmJihhLnk9ITApO3ZhciBoPWkuc3BlZWQ7dC5fX2FkZE1vdmVtZW50KHMqaCxkKmgpfX19KSx0aGlzLl9fYWRkRXZlbnQocixcImtleXVwXCIsZnVuY3Rpb24oKXt0Ll9fdW5sb2NrTW92ZW1lbnQoKX0pfXZhciBpPW4oMTYyKSx1PXIoaSksYT1uKDE2NSksYz1yKGEpLGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsZSl7dmFyIG49W10scj0hMCxvPSExLGk9dm9pZCAwO3RyeXtmb3IodmFyIHUsYT0oMCxjW1wiZGVmYXVsdFwiXSkodCk7IShyPSh1PWEubmV4dCgpKS5kb25lKSYmKG4ucHVzaCh1LnZhbHVlKSwhZXx8bi5sZW5ndGghPT1lKTtyPSEwKTt9Y2F0Y2gobCl7bz0hMCxpPWx9ZmluYWxseXt0cnl7IXImJmFbXCJyZXR1cm5cIl0mJmFbXCJyZXR1cm5cIl0oKX1maW5hbGx5e2lmKG8pdGhyb3cgaX19cmV0dXJuIG59cmV0dXJuIGZ1bmN0aW9uKGUsbil7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZTtpZigoMCx1W1wiZGVmYXVsdFwiXSkoT2JqZWN0KGUpKSlyZXR1cm4gdChlLG4pO3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfX0oKSxmPW4oNzgpLHM9e1NQQUNFOjMyLFBBR0VfVVA6MzMsUEFHRV9ET1dOOjM0LEVORDozNSxIT01FOjM2LExFRlQ6MzcsVVA6MzgsUklHSFQ6MzksRE9XTjo0MH07T2JqZWN0LmRlZmluZVByb3BlcnR5KGYuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fa2V5Ym9hcmRIYW5kbGVyXCIse3ZhbHVlOm8sd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oMTYzKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNTcpLG4oNCksdC5leHBvcnRzPW4oMTY0KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTMpLG89big0NSkoXCJpdGVyYXRvclwiKSxpPW4oMjcpO3QuZXhwb3J0cz1uKDEyKS5pc0l0ZXJhYmxlPWZ1bmN0aW9uKHQpe3ZhciBlPU9iamVjdCh0KTtyZXR1cm4gdm9pZCAwIT09ZVtvXXx8XCJAQGl0ZXJhdG9yXCJpbiBlfHxpLmhhc093blByb3BlcnR5KHIoZSkpfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6bigxNjYpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big1Nyksbig0KSx0LmV4cG9ydHM9bigxNjcpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDUyKTt0LmV4cG9ydHM9bigxMikuZ2V0SXRlcmF0b3I9ZnVuY3Rpb24odCl7dmFyIGU9byh0KTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBpdGVyYWJsZSFcIik7cmV0dXJuIHIoZS5jYWxsKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9dGhpcyxlPXRoaXMudGFyZ2V0cyxuPWUuY29udGFpbmVyLHI9ZS54QXhpcyxvPWUueUF4aXMsdT1mdW5jdGlvbihlLG4pe3ZhciByPXQuc2l6ZSxvPXQudGh1bWJTaXplO1xuaWYoXCJ4XCI9PT1lKXt2YXIgaT1yLmNvbnRhaW5lci53aWR0aC0oby54LW8ucmVhbFgpO3JldHVybiBuL2kqci5jb250ZW50LndpZHRofWlmKFwieVwiPT09ZSl7dmFyIHU9ci5jb250YWluZXIuaGVpZ2h0LShvLnktby5yZWFsWSk7cmV0dXJuIG4vdSpyLmNvbnRlbnQuaGVpZ2h0fXJldHVybiAwfSxhPWZ1bmN0aW9uKHQpe3JldHVybigwLGkuaXNPbmVPZikodCxbci50cmFjayxyLnRodW1iXSk/XCJ4XCI6KDAsaS5pc09uZU9mKSh0LFtvLnRyYWNrLG8udGh1bWJdKT9cInlcIjp2b2lkIDB9LGM9dm9pZCAwLGw9dm9pZCAwLGY9dm9pZCAwLHM9dm9pZCAwLGQ9dm9pZCAwO3RoaXMuX19hZGRFdmVudChuLFwiY2xpY2tcIixmdW5jdGlvbihlKXtpZighbCYmKDAsaS5pc09uZU9mKShlLnRhcmdldCxbci50cmFjayxvLnRyYWNrXSkpe3ZhciBuPWUudGFyZ2V0LGM9YShuKSxmPW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscz0oMCxpLmdldFBvc2l0aW9uKShlKSxkPXQub2Zmc2V0LGg9dC50aHVtYlNpemU7aWYoXCJ4XCI9PT1jKXt2YXIgdj1zLngtZi5sZWZ0LWgueC8yO3QuX19zZXRNb3ZlbWVudCh1KGMsdiktZC54LDApfWVsc2V7dmFyIF89cy55LWYudG9wLWgueS8yO3QuX19zZXRNb3ZlbWVudCgwLHUoYyxfKS1kLnkpfX19KSx0aGlzLl9fYWRkRXZlbnQobixcIm1vdXNlZG93blwiLGZ1bmN0aW9uKGUpe2lmKCgwLGkuaXNPbmVPZikoZS50YXJnZXQsW3IudGh1bWIsby50aHVtYl0pKXtjPSEwO3ZhciBuPSgwLGkuZ2V0UG9zaXRpb24pKGUpLHU9ZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cz1hKGUudGFyZ2V0KSxmPXt4Om4ueC11LmxlZnQseTpuLnktdS50b3B9LGQ9dC50YXJnZXRzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKX19KSx0aGlzLl9fYWRkRXZlbnQod2luZG93LFwibW91c2Vtb3ZlXCIsZnVuY3Rpb24oZSl7aWYoYyl7ZS5wcmV2ZW50RGVmYXVsdCgpLGw9ITA7dmFyIG49dC5vZmZzZXQscj0oMCxpLmdldFBvc2l0aW9uKShlKTtpZihcInhcIj09PXMpe3ZhciBvPXIueC1mLngtZC5sZWZ0O3Quc2V0UG9zaXRpb24odShzLG8pLG4ueSl9aWYoXCJ5XCI9PT1zKXt2YXIgYT1yLnktZi55LWQudG9wO3Quc2V0UG9zaXRpb24obi54LHUocyxhKSl9fX0pLHRoaXMuX19hZGRFdmVudCh3aW5kb3csXCJtb3VzZXVwIGJsdXJcIixmdW5jdGlvbigpe2M9bD0hMX0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX21vdXNlSGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3RoaXMuX19hZGRFdmVudCh3aW5kb3csXCJyZXNpemVcIix0aGlzLl9fdXBkYXRlVGhyb3R0bGUpfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3Jlc2l6ZUhhbmRsZXJcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9ITEsbj12b2lkIDAscj10aGlzLnRhcmdldHMsbz1yLmNvbnRhaW5lcix1PXIuY29udGVudCxhPWZ1bmN0aW9uIGwoZSl7dmFyIHI9ZS54LG89ZS55O2lmKHJ8fG8pe3ZhciBpPXQub3B0aW9ucy5zcGVlZDt0Ll9fc2V0TW92ZW1lbnQocippLG8qaSksbj1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtsKHt4OnIseTpvfSl9KX19LGM9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJcIjphcmd1bWVudHNbMF07KDAsaS5zZXRTdHlsZSkobyx7XCItdXNlci1zZWxlY3RcIjp0fSl9O3RoaXMuX19hZGRFdmVudCh3aW5kb3csXCJtb3VzZW1vdmVcIixmdW5jdGlvbihyKXtpZihlKXtjYW5jZWxBbmltYXRpb25GcmFtZShuKTt2YXIgbz10Ll9fZ2V0UG9pbnRlclRyZW5kKHIpO2Eobyl9fSksdGhpcy5fX2FkZEV2ZW50KHUsXCJzZWxlY3RzdGFydFwiLGZ1bmN0aW9uKHIpe3JldHVybiB0Ll9fZXZlbnRGcm9tQ2hpbGRTY3JvbGxiYXIocik/YyhcIm5vbmVcIik6KGNhbmNlbEFuaW1hdGlvbkZyYW1lKG4pLHQuX191cGRhdGVCb3VuZGluZygpLHZvaWQoZT0hMCkpfSksdGhpcy5fX2FkZEV2ZW50KHdpbmRvdyxcIm1vdXNldXAgYmx1clwiLGZ1bmN0aW9uKCl7Y2FuY2VsQW5pbWF0aW9uRnJhbWUobiksYygpLGU9ITF9KSx0aGlzLl9fYWRkRXZlbnQobyxcInNjcm9sbFwiLGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxvLnNjcm9sbFRvcD1vLnNjcm9sbExlZnQ9MH0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3NlbGVjdEhhbmRsZXJcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9dGhpcy50YXJnZXRzLG49dGhpcy5tb3ZlbWVudExvY2tlZCxyPXRoaXMuX190b3VjaFJlY29yZCxvPWUuY29udGFpbmVyO3RoaXMuX19hZGRFdmVudChvLFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKGUpe2lmKCF0Ll9faXNEcmFnKXt2YXIgbj10Ll9fdGltZXJJRCxvPXQubW92ZW1lbnQ7Y2FuY2VsQW5pbWF0aW9uRnJhbWUobi5zY3JvbGxUbyksdC5fX3dpbGxPdmVyc2Nyb2xsKFwieFwiKXx8KG8ueD0wKSx0Ll9fd2lsbE92ZXJzY3JvbGwoXCJ5XCIpfHwoby55PTApLHIudHJhY2soZSksdC5fX2F1dG9Mb2NrTW92ZW1lbnQoKX19KSx0aGlzLl9fYWRkRXZlbnQobyxcInRvdWNobW92ZVwiLGZ1bmN0aW9uKGUpe2lmKCEodC5fX2lzRHJhZ3x8YSYmYSE9PXQpKXtyLnVwZGF0ZShlKTt2YXIgbj1yLmdldERlbHRhKCksbz1uLngsaT1uLnk7aWYodC5fX3Nob3VsZFByb3BhZ2F0ZU1vdmVtZW50KG8saSkpcmV0dXJuIHQuX191cGRhdGVUaHJvdHRsZSgpO3ZhciB1PXQubW92ZW1lbnQsYz10Lk1BWF9PVkVSU0NST0xMLGw9dC5vcHRpb25zO2lmKHUueCYmdC5fX3dpbGxPdmVyc2Nyb2xsKFwieFwiLG8pKXt2YXIgZj0yO1wiYm91bmNlXCI9PT1sLm92ZXJzY3JvbGxFZmZlY3QmJihmKz1NYXRoLmFicygxMCp1LngvYykpLE1hdGguYWJzKHUueCk+PWM/bz0wOm8vPWZ9aWYodS55JiZ0Ll9fd2lsbE92ZXJzY3JvbGwoXCJ5XCIsaSkpe3ZhciBzPTI7XCJib3VuY2VcIj09PWwub3ZlcnNjcm9sbEVmZmVjdCYmKHMrPU1hdGguYWJzKDEwKnUueS9jKSksTWF0aC5hYnModS55KT49Yz9pPTA6aS89c310Ll9fYXV0b0xvY2tNb3ZlbWVudCgpLGUucHJldmVudERlZmF1bHQoKSx0Ll9fYWRkTW92ZW1lbnQobyxpLCEwKSxhPXR9fSksdGhpcy5fX2FkZEV2ZW50KG8sXCJ0b3VjaGNhbmNlbCB0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpe2lmKCF0Ll9faXNEcmFnKXt2YXIgbz10Lm9wdGlvbnMuc3BlZWQsYz1yLmdldFZlbG9jaXR5KCksbD1jLngsZj1jLnk7bD1uLng/MDpNYXRoLm1pbihsKmkuR0xPQkFMX0VOVi5FQVNJTkdfTVVMVElQTElFUiwxZTMpLGY9bi55PzA6TWF0aC5taW4oZippLkdMT0JBTF9FTlYuRUFTSU5HX01VTFRJUExJRVIsMWUzKSx0Ll9fYWRkTW92ZW1lbnQoTWF0aC5hYnMobCk+dT9sKm86MCxNYXRoLmFicyhmKT51P2YqbzowLCEwKSx0Ll9fdW5sb2NrTW92ZW1lbnQoKSxyLnJlbGVhc2UoZSksYT1udWxsfX0pfXZhciBvPW4oNzgpLGk9big4OSksdT0xMDAsYT1udWxsO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3RvdWNoSGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PXRoaXMsZT10aGlzLnRhcmdldHMuY29udGFpbmVyLG49ITEscj0oMCxpLmRlYm91bmNlKShmdW5jdGlvbigpe249ITF9LDMwLCExKTt0aGlzLl9fYWRkRXZlbnQoZSx1LkdMT0JBTF9FTlYuV0hFRUxfRVZFTlQsZnVuY3Rpb24oZSl7dmFyIG89dC5vcHRpb25zLHU9KDAsaS5nZXREZWx0YSkoZSksYT11LngsYz11Lnk7cmV0dXJuIGEqPW8uc3BlZWQsYyo9by5zcGVlZCx0Ll9fc2hvdWxkUHJvcGFnYXRlTW92ZW1lbnQoYSxjKT90Ll9fdXBkYXRlVGhyb3R0bGUoKTooZS5wcmV2ZW50RGVmYXVsdCgpLHIoKSx0Lm92ZXJzY3JvbGxCYWNrJiYobj0hMCksbiYmKHQuX193aWxsT3ZlcnNjcm9sbChcInhcIixhKSYmKGE9MCksdC5fX3dpbGxPdmVyc2Nyb2xsKFwieVwiLGMpJiYoYz0wKSksdm9pZCB0Ll9fYWRkTW92ZW1lbnQoYSxjLCEwKSl9KX12YXIgbz1uKDc4KSxpPW4oMTEyKSx1PW4oODkpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3doZWVsSGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE3NCk7KDAsYVtcImRlZmF1bHRcIl0pKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGlbXCJkZWZhdWx0XCJdKShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNzUpOygwLGFbXCJkZWZhdWx0XCJdKShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSk7dmFyIGw9bigxNzYpOygwLGFbXCJkZWZhdWx0XCJdKShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBsW3RdfX0pfSk7dmFyIGY9bigxNzcpOygwLGFbXCJkZWZhdWx0XCJdKShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBmW3RdfX0pfSk7dmFyIHM9bigxNzgpOygwLGFbXCJkZWZhdWx0XCJdKShzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzW3RdfX0pfSk7dmFyIGQ9bigxNzkpOygwLGFbXCJkZWZhdWx0XCJdKShkKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBkW3RdfX0pfSk7dmFyIGg9bigxODIpOygwLGFbXCJkZWZhdWx0XCJdKShoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBoW3RdfX0pfSk7dmFyIHY9bigxODMpOygwLGFbXCJkZWZhdWx0XCJdKSh2KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB2W3RdfX0pfSk7dmFyIF89bigxODQpOygwLGFbXCJkZWZhdWx0XCJdKShfKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBfW3RdfX0pfSk7dmFyIHA9bigxODUpOygwLGFbXCJkZWZhdWx0XCJdKShwKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBwW3RdfX0pfSk7dmFyIHk9bigxODYpOygwLGFbXCJkZWZhdWx0XCJdKSh5KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpW1wiZGVmYXVsdFwiXSkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB5W3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSxuKXt2YXIgcj10aGlzO2lmKCF0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LmFkZEV2ZW50TGlzdGVuZXIpdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdCBlbGVtIHRvIGJlIGEgRE9NIGVsZW1lbnQsIGJ1dCBnb3QgXCIrdCk7dmFyIG89ZnVuY3Rpb24odCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgscj1BcnJheShlPjE/ZS0xOjApLG89MTtvPGU7bysrKXJbby0xXT1hcmd1bWVudHNbb107IXQudHlwZS5tYXRjaCgvZHJhZy8pJiZ0LmRlZmF1bHRQcmV2ZW50ZWR8fG4uYXBwbHkodm9pZCAwLFt0XS5jb25jYXQocikpfTtlLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7ci5fX2hhbmRsZXJzLnB1c2goe2V2dDplLGVsZW06dCxmbjpvLGhhc1JlZ2lzdGVyZWQ6ITB9KSx0LmFkZEV2ZW50TGlzdGVuZXIoZSxvKX0pfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2FkZEV2ZW50XCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSxlPXQudGFyZ2V0O3JldHVybiB0aGlzLmNoaWxkcmVuLnNvbWUoZnVuY3Rpb24odCl7cmV0dXJuIHQuY29udGFpbnMoZSl9KX12YXIgbz1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19ldmVudEZyb21DaGlsZFNjcm9sbGJhclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PSEoYXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdKSYmYXJndW1lbnRzWzBdLGU9dGhpcy5vcHRpb25zLG49dGhpcy5vZmZzZXQscj10aGlzLmxpbWl0O3JldHVybiB0JiYoZS5jb250aW51b3VzU2Nyb2xsaW5nfHxlLm92ZXJzY3JvbGxFZmZlY3QpP3t4OlstKDEvMCksMS8wXSx5OlstKDEvMCksMS8wXX06e3g6Wy1uLngsci54LW4ueF0seTpbLW4ueSxyLnktbi55XX19dmFyIG89big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KG8uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fZ2V0RGVsdGFMaW1pdFwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/MDphcmd1bWVudHNbMV0sbj10aGlzLmJvdW5kaW5nLHI9bi50b3Asbz1uLnJpZ2h0LHU9bi5ib3R0b20sYT1uLmxlZnQsYz0oMCxpLmdldFBvc2l0aW9uKSh0KSxsPWMueCxmPWMueSxzPXt4OjAseTowfTtyZXR1cm4gMD09PWwmJjA9PT1mP3M6KGw+by1lP3MueD1sLW8rZTpsPGErZSYmKHMueD1sLWEtZSksZj51LWU/cy55PWYtdStlOmY8citlJiYocy55PWYtci1lKSxzKX12YXIgbz1uKDc4KSxpPW4oMTEyKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19nZXRQb2ludGVyVHJlbmRcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX1mdW5jdGlvbiBvKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49QXJyYXkodC5sZW5ndGgpO2U8dC5sZW5ndGg7ZSsrKW5bZV09dFtlXTtyZXR1cm4gbn1yZXR1cm4oMCxoW1wiZGVmYXVsdFwiXSkodCl9ZnVuY3Rpb24gaSh0KXt2YXIgZT10aGlzLG49e3NwZWVkOjEsZGFtcGluZzouMSx0aHVtYk1pblNpemU6MjAsc3luY0NhbGxiYWNrczohMSxyZW5kZXJCeVBpeGVsczohMCxhbHdheXNTaG93VHJhY2tzOiExLGNvbnRpbnVvdXNTY3JvbGxpbmc6XCJhdXRvXCIsb3ZlcnNjcm9sbEVmZmVjdDohMSxvdmVyc2Nyb2xsRWZmZWN0Q29sb3I6XCIjODdjZWViXCIsb3ZlcnNjcm9sbERhbXBpbmc6LjJ9LHI9e2RhbXBpbmc6WzAsMV0sc3BlZWQ6WzAsMS8wXSx0aHVtYk1pblNpemU6WzAsMS8wXSxvdmVyc2Nyb2xsRWZmZWN0OlshMSxcImJvdW5jZVwiLFwiZ2xvd1wiXSxvdmVyc2Nyb2xsRGFtcGluZzpbMCwxXX0saT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9cImF1dG9cIjphcmd1bWVudHNbMF07aWYobi5vdmVyc2Nyb2xsRWZmZWN0IT09ITEpcmV0dXJuITE7c3dpdGNoKHQpe2Nhc2VcImF1dG9cIjpyZXR1cm4gZS5pc05lc3RlZFNjcm9sbGJhcjtkZWZhdWx0OnJldHVybiEhdH19LHU9e3NldCBpZ25vcmVFdmVudHModCl7Y29uc29sZS53YXJuKFwiYG9wdGlvbnMuaWdub3JlRXZlbnRzYCBwYXJhbWV0ZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGBpbnN0YW5jZSN1bnJlZ2lzdGVyRXZlbnRzKClgIG1ldGhvZCBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vaWRpb3RXdS9zbW9vdGgtc2Nyb2xsYmFyL3dpa2kvSW5zdGFuY2UtTWV0aG9kcyNpbnN0YW5jZXVucmVnaXN0ZXJldmVudHMtcmVnZXgtLXJlZ2V4LXJlZ2V4LS1cIil9LHNldCBmcmljdGlvbih0KXtjb25zb2xlLndhcm4oXCJgb3B0aW9ucy5mcmljdGlvbj1cIit0K1wiYCBpcyBkZXByZWNhdGVkLCB1c2UgYG9wdGlvbnMuZGFtcGluZz1cIit0LzEwMCtcImAgaW5zdGVhZC5cIiksdGhpcy5kYW1waW5nPXQvMTAwfSxnZXQgc3luY0NhbGxiYWNrcygpe3JldHVybiBuLnN5bmNDYWxsYmFja3N9LHNldCBzeW5jQ2FsbGJhY2tzKHQpe24uc3luY0NhbGxiYWNrcz0hIXR9LGdldCByZW5kZXJCeVBpeGVscygpe3JldHVybiBuLnJlbmRlckJ5UGl4ZWxzfSxzZXQgcmVuZGVyQnlQaXhlbHModCl7bi5yZW5kZXJCeVBpeGVscz0hIXR9LGdldCBhbHdheXNTaG93VHJhY2tzKCl7cmV0dXJuIG4uYWx3YXlzU2hvd1RyYWNrc30sc2V0IGFsd2F5c1Nob3dUcmFja3ModCl7dD0hIXQsbi5hbHdheXNTaG93VHJhY2tzPXQ7dmFyIHI9ZS50YXJnZXRzLmNvbnRhaW5lcjt0PyhlLnNob3dUcmFjaygpLHIuY2xhc3NMaXN0LmFkZChcInN0aWNreVwiKSk6KGUuaGlkZVRyYWNrKCksci5jbGFzc0xpc3QucmVtb3ZlKFwic3RpY2t5XCIpKX0sZ2V0IGNvbnRpbnVvdXNTY3JvbGxpbmcoKXtyZXR1cm4gaShuLmNvbnRpbnVvdXNTY3JvbGxpbmcpfSxzZXQgY29udGludW91c1Njcm9sbGluZyh0KXtcImF1dG9cIj09PXQ/bi5jb250aW51b3VzU2Nyb2xsaW5nPXQ6bi5jb250aW51b3VzU2Nyb2xsaW5nPSEhdH0sZ2V0IG92ZXJzY3JvbGxFZmZlY3QoKXtyZXR1cm4gbi5vdmVyc2Nyb2xsRWZmZWN0fSxzZXQgb3ZlcnNjcm9sbEVmZmVjdCh0KXt0JiYhfnIub3ZlcnNjcm9sbEVmZmVjdC5pbmRleE9mKHQpJiYoY29uc29sZS53YXJuKFwiYG92ZXJzY3JvbGxFZmZlY3RgIHNob3VsZCBiZSBvbmUgb2YgXCIrKDAsc1tcImRlZmF1bHRcIl0pKHIub3ZlcnNjcm9sbEVmZmVjdCkrXCIsIGJ1dCBnb3QgXCIrKDAsc1tcImRlZmF1bHRcIl0pKHQpK1wiLiBJdCB3aWxsIGJlIHNldCB0byBgZmFsc2VgIG5vdy5cIiksdD0hMSksbi5vdmVyc2Nyb2xsRWZmZWN0PXR9LGdldCBvdmVyc2Nyb2xsRWZmZWN0Q29sb3IoKXtyZXR1cm4gbi5vdmVyc2Nyb2xsRWZmZWN0Q29sb3J9LHNldCBvdmVyc2Nyb2xsRWZmZWN0Q29sb3IodCl7bi5vdmVyc2Nyb2xsRWZmZWN0Q29sb3I9dH19OygwLGxbXCJkZWZhdWx0XCJdKShuKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIXUuaGFzT3duUHJvcGVydHkodCl9KS5mb3JFYWNoKGZ1bmN0aW9uKHQpeygwLGFbXCJkZWZhdWx0XCJdKSh1LHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG5bdF19LHNldDpmdW5jdGlvbihlKXtpZihpc05hTihwYXJzZUZsb2F0KGUpKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0IGBvcHRpb25zLlwiK3QrXCJgIHRvIGJlIGEgbnVtYmVyLCBidXQgZ290IFwiKyhcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOmIoZSkpKTtuW3RdPWcucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFtlXS5jb25jYXQobyhyW3RdKSkpfX0pfSksdGhpcy5fX3JlYWRvbmx5KFwib3B0aW9uc1wiLHUpLHRoaXMuc2V0T3B0aW9ucyh0KX12YXIgdT1uKDg2KSxhPXIodSksYz1uKDkwKSxsPXIoYyksZj1uKDE4MCkscz1yKGYpLGQ9bigyKSxoPXIoZCksdj1uKDU1KSxfPXIodikscD1uKDYyKSx5PXIocCksYj1cImZ1bmN0aW9uXCI9PXR5cGVvZiB5W1wiZGVmYXVsdFwiXSYmXCJzeW1ib2xcIj09dHlwZW9mIF9bXCJkZWZhdWx0XCJdP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHlbXCJkZWZhdWx0XCJdJiZ0LmNvbnN0cnVjdG9yPT09eVtcImRlZmF1bHRcIl0/XCJzeW1ib2xcIjp0eXBlb2YgdH0sZz1uKDExMiksbT1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkobS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19pbml0T3B0aW9uc1wiLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDE4MSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEyKSxvPXIuSlNPTnx8KHIuSlNPTj17c3RyaW5naWZ5OkpTT04uc3RyaW5naWZ5fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBvLnN0cmluZ2lmeS5hcHBseShvLGFyZ3VtZW50cyl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3RoaXMudXBkYXRlKCksdGhpcy5fX2tleWJvYXJkSGFuZGxlcigpLHRoaXMuX19yZXNpemVIYW5kbGVyKCksdGhpcy5fX3NlbGVjdEhhbmRsZXIoKSx0aGlzLl9fbW91c2VIYW5kbGVyKCksdGhpcy5fX3RvdWNoSGFuZGxlcigpLHRoaXMuX193aGVlbEhhbmRsZXIoKSx0aGlzLl9fZHJhZ0hhbmRsZXIoKSx0aGlzLl9fcmVuZGVyKCl9dmFyIG89big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KG8uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9faW5pdFNjcm9sbGJhclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCxlKXtyZXR1cm4oMCx1W1wiZGVmYXVsdFwiXSkodGhpcyx0LHt2YWx1ZTplLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9dmFyIGk9big4NiksdT1yKGkpLGE9big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fcmVhZG9ubHlcIix7dmFsdWU6byx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLnRhcmdldHMsZT10aGlzLnNpemUsbj10aGlzLm9mZnNldCxyPXRoaXMudGh1bWJPZmZzZXQsaT10aGlzLnRodW1iU2l6ZTtyLng9bi54L2UuY29udGVudC53aWR0aCooZS5jb250YWluZXIud2lkdGgtKGkueC1pLnJlYWxYKSksci55PW4ueS9lLmNvbnRlbnQuaGVpZ2h0KihlLmNvbnRhaW5lci5oZWlnaHQtKGkueS1pLnJlYWxZKSksKDAsby5zZXRTdHlsZSkodC54QXhpcy50aHVtYix7XCItdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUzZChcIityLngrXCJweCwgMCwgMClcIn0pLCgwLG8uc2V0U3R5bGUpKHQueUF4aXMudGh1bWIse1wiLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlM2QoMCwgXCIrci55K1wicHgsIDApXCJ9KX12YXIgbz1uKDExMiksaT1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoaS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19zZXRUaHVtYlBvc2l0aW9uXCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9dGhpcy50YXJnZXRzLmNvbnRhaW5lcixlPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj1lLnRvcCxyPWUucmlnaHQsbz1lLmJvdHRvbSxpPWUubGVmdCx1PXdpbmRvdyxhPXUuaW5uZXJIZWlnaHQsYz11LmlubmVyV2lkdGg7dGhpcy5fX3JlYWRvbmx5KFwiYm91bmRpbmdcIix7dG9wOk1hdGgubWF4KG4sMCkscmlnaHQ6TWF0aC5taW4ocixjKSxib3R0b206TWF0aC5taW4obyxhKSxsZWZ0Ok1hdGgubWF4KGksMCl9KX12YXIgbz1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX191cGRhdGVCb3VuZGluZ1wiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGFbXCJkZWZhdWx0XCJdKSh0KX1mdW5jdGlvbiBpKCl7dmFyIHQ9dGhpcy50YXJnZXRzLGU9dC5jb250YWluZXIsbj10LmNvbnRlbnQ7dGhpcy5fX3JlYWRvbmx5KFwiY2hpbGRyZW5cIixbXS5jb25jYXQobyhuLnF1ZXJ5U2VsZWN0b3JBbGwobC5zZWxlY3RvcnMpKSkpLHRoaXMuX19yZWFkb25seShcImlzTmVzdGVkU2Nyb2xsYmFyXCIsITEpO2Zvcih2YXIgcj1bXSxpPWU7aT1pLnBhcmVudEVsZW1lbnQ7KWwuc2JMaXN0LmhhcyhpKSYmKHRoaXMuX19yZWFkb25seShcImlzTmVzdGVkU2Nyb2xsYmFyXCIsITApLHIucHVzaChpKSk7dGhpcy5fX3JlYWRvbmx5KFwicGFyZW50c1wiLHIpfXZhciB1PW4oMiksYT1yKHUpLGM9big3OCksbD1uKDg5KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoYy5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX191cGRhdGVUcmVlXCIse3ZhbHVlOmksd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSl7fV0pfSk7Il19

/* HC- Close variant dropdown when clicked outside - 21 June '17 */
$(document).mouseup(function(e) 
 {
  var container = $(".c-filter_wrap");
  if (!container.is(e.target) && container.has(e.target).length === 0) 
  {
    $(".c-filter_list").hide();
    $(".c-filter-btn").removeClass("is-open");
  }
});