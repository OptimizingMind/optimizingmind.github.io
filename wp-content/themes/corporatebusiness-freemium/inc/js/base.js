(function($){jQuery(document).ready(function($){$("#primary-menu").clone().prependTo("#responsive-menu");var current=$("#site-navigation .current-menu-item > a").text();if(current)$(".responsive-menu-bar span").text(current);$(".open-responsive-menu").click(function(){$content=$('#responsive-menu');$content.slideToggle(500,function(){});});$('<a id="header-search-link" href="#"><i class="fa fa-search"></i></a>').insertAfter("header .search-submit");$('header form.search-form').attr('id','header-search-form');$('#header-search-link').click(function(){var formID=$(this).closest("form").attr('id');$('#'+formID).submit();});$('.testimonials-slider').bxSlider({mode:'vertical',slideMargin:3,auto:true,});$('.testimonials-slider .content').each(function(){$(this).css("margin-top",($(this).parent().height()- $(this).height())/2 + 'px' );
});$('.customers-slider').bxSlider({minSlides:6,maxSlides:6,moveSlides:1,slideWidth:175,slideMargin:20,auto:true,pager:false,});if($(".customers-slider").hasClass("disable-bw"))
$('.customer-logo').BlackAndWhite({hoverEffect:true,webworkerPath:false,invertHoverEffect:false,intensity:1,speed:{fadeIn:200,fadeOut:800},onImageReady:function(img){}});jQuery('#back_top').click(function(){jQuery('html, body').animate({scrollTop:0},'normal');return false;});jQuery(window).scroll(function(){if(jQuery(this).scrollTop()!==0){jQuery('#back_top').fadeIn();}else{jQuery('#back_top').fadeOut();}});if(jQuery(window).scrollTop()!==0){jQuery('#back_top').show();}else{jQuery('#back_top').hide();}
var col=1;if($('#secondary.sidebar-left').length||$('#secondary.sidebar-right').length)col=2;if($('#secondary.sidebar-left').length&&$('#secondary.sidebar-right').length)col=3;$("#secondary.sidebar-left").addClass("site-col-"+ col);$("#secondary.sidebar-right").addClass("site-col-"+ col);$("#primary.content-area").addClass("site-col-"+ col);});})(jQuery);