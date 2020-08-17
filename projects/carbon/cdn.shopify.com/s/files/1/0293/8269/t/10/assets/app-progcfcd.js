Shopify.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}
// $(function() {
//   $('.js-article-more').on('click',function() {
//     var $al = $('<div id="article-loader" style="display:none" />').appendTo($('body'));
//     $al.load('/pages/article-loader',function() {
//       nb = 0;
//       var allshown = true;
//       $al.find('.o-third').each(function() {
//         if (nb >= 6) {
//           	allshown = false;
// 			return false;
//         }
//         if ($('#js-blog-parallax #'+$(this).attr('id')).length > 0) return;
//         nb++;
//         $(this).find('.js-parallax:first').attr('data-speed',(nb==2||nb==5 ? '0.3' : '1.5')).end().appendTo($('#js-blog-parallax .o-grid'));
//       });
//       $al.remove();
//       if (allshown) {
//         $('.js-article-more').hide();
//       }
//       setTimeout(function() {
//         $(window).resize();
//       },100);
//     });
//     return false;
//   });
  
  
//   $('body').on('click','.js-more-products',function() {
//     var $more = $(this);
//     var container = $more.data('container');
//     var $pl = $('<div id="product-loader" style="display:none" />').appendTo($('body'));
//     $pl.load($(this).attr('href')+' .js-products-container',function() {
//       if (container) {
//         $pl.find('.js-product-item-container').each(function() {
//           $(this).appendTo($('.js-product-grid:first'));
//         });
//       } else {
//         $.each(['.js-col-1','.js-col-2','.js-col-3'],function() {
//           var selector = this;
//           $pl.find(selector+' .js-product-item').each(function() {
//             $(this).appendTo($('#js-product-parallax '+selector));
//           });
//         });
//       }
//       if ($pl.find('.js-more-products').length) {
//         $pl.find('.js-more-products').appendTo($('.js-load-more-container:first'));
//       }
//       setTimeout(function() {
//         $(window).resize();
//       },100);
//     });
//     $more.remove();
//     return false;
//   });
  
//   $('.js-sort-items a').on('click',function() {
//     Shopify.queryParams.sort_by = $(this).data('sort');
//     location.search = $.param(Shopify.queryParams);
//     return false;
//   });
  
//   $('.js-brands-filter a').each(function() {
//     $(this).addClass('c-filter_link').wrapInner('<span />');
//   });
  
//   $('.js-add-to-cart').on('click',function() {
//     Shopify.addItem($('.js-filter-variant').data('variantid'),$('.js-quantity').val(),function(e){
//     	location.href = '/cart';
//     });
//     return false;
//   });
  
//   $('.js-variant-select').on('click',function() {
//   	$('.js-filter-variant').data('variantid',$(this).data('variantid'));
//     $('.js-variant-title').text($(this).text());
//     $('.js-filter.is-open').removeClass('is-open').next().slideUp(300);
//     return false;
//   });
  
//   $('.js-less').on('click',function() {
//     var qty = $(this).next().val();
//     if (parseInt(qty,10) > 1) qty--;
//     else qty = 1;
//     $(this).next().val(qty);
//     return false;
//   });
//   $('.js-more').on('click',function() {
//     var qty = $(this).prev().val();
//     if (parseInt(qty,10)) qty++;
//     else qty = 1;
//     $(this).prev().val(qty);
//     return false;
//   });
  
//   $('.c-index-alphabtical_item').on('click',function() {
//     $('.c-index-alphabtical_item.is-active').removeClass('is-active');
//     var $this = $(this);
//     var letter = $(this).find('span').text().toString().toLowerCase()[0];
//     var idx = $(this).index();
//     if (idx > 13) {
//       var toMove = idx - 13;
//       for(var x=0;x<toMove;x++) {
//         setTimeout(function() {
//           $('.c-index-alphabtical_item:first').appendTo($('.c-index-alphabtical_item').parent());
//         },x*70);
//       }
//       setTimeout(function() {
//         $this.addClass('is-active');
//       },toMove*70);
//     } else if (idx < 13) {
//       var toMove = 13 - idx;
//       for(var x=0;x<toMove;x++) {
//         setTimeout(function() {
//           $('.c-index-alphabtical_item:last').prependTo($('.c-index-alphabtical_item').parent());
//         },x*70);
//       }
//       setTimeout(function() {
//         $this.addClass('is-active');
//       },toMove*70);
//     }
//     $('.js-ingredient-list li.c-index-results_item').hide().removeClass('is-active');
//     var t = toMove*70;
//     $('.js-ingredient-list li.c-index-results_item').each(function() {
      
//       var txt = $(this).find('span').text();
      
//       if (txt[0].toLowerCase() == letter) {
//         t += 70;
//         var $that = $(this);
//         $that.show();
//         setTimeout(function() {
//           $that.addClass('is-active');
//         },t);
//       }
//     });
  	
//   });
  
//   if ($('.js-ingredient-list').length) {
//     $('.js-ingredient-list li.c-index-results_item').each(function() {
//       var txt = $(this).find('span').text();
//       if (txt[0].toLowerCase() != 'a') $(this).hide();
//       else $(this).addClass('is-active');
//     });
//   }
  
//   $('.contact-form').on('submit',function() {
//     $.post($(this).attr('action').split('#')[0],$(this).serializeArray());
//     $('.js-form-enquiries, .js-form-feedback').toggleClass('is-hide');

//     setTimeout(function(){
//       $('.js-form-enquiries, .js-form-feedback').hide();
//       $('.js-mail-sent').show();
//     },1200);

//     setTimeout(function(){
//       $('.js-mail-sent').toggleClass('is-hide');
//       $(document).trigger('SmoothScroll.rebuild');
//     },1600);
//     return false;
//   });
  
//   $('.js-search-input').on('keyup',function() {
//     $.get('/search.json?q='+$(this).val()+'&type=product',function(data) { 
//       $('.js-products-search-results').html('');
//       $('.js-search-product-count').text(data.length);
//       $.each(data,function() {
        
//         $('<div class="o-half">\
//             <a href="/products/'+this.handle+'" class="c-search-product_link">\
//             <img src="'+this.featured_image+'" alt="">\
//             <div class="c-search-product_text">\
//             <h3><span>'+this.title+'</span></h3>\
//             <p>'+this.vendor+'</p>\
//             </div>\
//             </a>\
//             </div>')
//         .appendTo($('.js-products-search-results'));
//       });
//     });
//   });
  
//   $('.js-fb-share').attr('href',$('.js-fb-share').attr('href')+'?u='+location.href);
//   $('.js-twitter-share').attr('href',$('.js-twitter-share').attr('href')+'&url='+location.href);
//   $('.js-mail-share').attr('href',$('.js-mail-share').attr('href')+location.href);
  
//   var url = location.pathname;
//   var navShown = false;
//   if (url.indexOf('/collections/') != -1) {
//     if ($('a.c-select-category_link[href="'+url+'"]').length) {
//       $('a.c-select-category_link[href="'+url+'"]').addClass('is-active');
//       var nav = url.replace('/collections/','').replace('-1','');
//       $('nav.c-nav-product').hide();
//       $('nav.c-nav-product[data-nav="'+nav+'"]').show();
//       navShown = true;
//     }
//     if ($('a.c-nav-product_link[href="'+url+'"]').length) {
//        $('nav.c-nav-product').hide();
//        $('a.c-nav-product_link[href="'+url+'"]').addClass('is-active').closest('.c-nav-product').show();
//        var nav = $('a.c-nav-product_link[href="'+url+'"]').closest('.c-nav-product').data('nav');
//        $('a.c-select-category_link[href*="'+nav+'"]').addClass('is-active');
//        navShown = true;
//     }
//   }
//   if (!navShown) {
//     $('nav.c-nav-product').hide();
//     $('nav.c-nav-product:first').show();
//   }
  
// });