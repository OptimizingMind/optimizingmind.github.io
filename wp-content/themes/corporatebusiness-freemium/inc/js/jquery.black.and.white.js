(function($){$.fn.extend({BlackAndWhite:function(customOptions){'use strict';var $el=this,options=$.extend({hoverEffect:true,webworkerPath:false,invertHoverEffect:false,speed:500,onImageReady:null,intensity:1},customOptions),hoverEffect=options.hoverEffect,webworkerPath=options.webworkerPath,invertHoverEffect=options.invertHoverEffect,intensity=(typeof options.intensity==='number'&&options.intensity<1&&options.intensity>0)?options.intensity:1,fadeSpeedIn=$.isPlainObject(options.speed)?options.speed.fadeIn:options.speed,fadeSpeedOut=$.isPlainObject(options.speed)?options.speed.fadeOut:options.speed,$window=$(window),_evtNamespace='.BlackAndWhite',_isIE7=(document.all&&!window.opera&&window.XMLHttpRequest)?true:false,_browserPrefixes=' -webkit- -moz- -o- -ms- '.split(' '),_cssPrefixString={},_cssPrefix=function(property){if(_cssPrefixString[property]||_cssPrefixString[property]===''){return _cssPrefixString[property]+ property;}
var e=document.createElement('div'),prefixes=['','Moz','Webkit','O','ms','Khtml'];for(var i in prefixes){if(typeof e.style[prefixes[i]+ property]!=='undefined'){_cssPrefixString[property]=prefixes[i];return prefixes[i]+ property;}}
return property.toLowerCase();},_cssfilters=(function(){var el=document.createElement('div');el.style.cssText=_browserPrefixes.join('filter'+':blur(2px); ');return!!el.style.length&&((document.documentMode===undefined||document.documentMode>9));}()),_supportsCanvas=!!document.createElement('canvas').getContext,_supportWebworker=(function(){return(typeof(Worker)!=='undefined')?true:false;}()),_cssFilter=_cssPrefix('Filter'),_imagesArray=[],_webWorker=_supportWebworker&&webworkerPath?new Worker(webworkerPath+'BnWWorker.js'):false,_onMouseLeave=function(e){$(e.currentTarget).find('.BWfade').stop(true,true).animate({opacity:invertHoverEffect?0:1},fadeSpeedOut);},_onMouseEnter=function(e){$(e.currentTarget).find('.BWfade').stop(true,true).animate({opacity:invertHoverEffect?1:0},fadeSpeedIn);},_onImageReady=function(img){if(typeof options.onImageReady==='function'){options.onImageReady(img);}},_initWebworker=function(imagesToLoadlength){if(_webWorker&&_supportsCanvas&&!_cssfilters&&!imagesToLoadlength){_webWorkerLoop();}},_webWorkerLoop=function(){if(!_imagesArray.length){if(_webWorker.terminate){_webWorker.terminate();}
if(_webWorker.close){_webWorker.close();}
return;}
_webWorker.postMessage({imgData:_imagesArray[0].imageData,intensity:intensity});_webWorker.onmessage=function(event){_imagesArray[0].ctx.putImageData(event.data,0,0);_onImageReady(_imagesArray[0].img);_imagesArray.splice(0,1);_webWorkerLoop();};},_isImageLoaded=function(img){return img.complete||(typeof img.naturalWidth!=='undefined'&&img.naturalWidth);},_generateCanvasImage=function(img,canvas,width,height){var ctx=canvas.getContext('2d'),currImg=img,i=0,grey;ctx.drawImage(img,0,0,width,height);var imageData=ctx.getImageData(0,0,width,height),px=imageData.data,length=px.length;if(_webWorker){_imagesArray.push({imageData:imageData,ctx:ctx,img:img});}else{for(;i<length;i+=4){var k=px[i]*0.3+ px[i+ 1]*0.59+ px[i+ 2]*0.11;px[i]=~~(k*intensity+ px[i]*(1- intensity));px[i+ 1]=~~(k*intensity+ px[i+ 1]*(1- intensity));px[i+ 2]=~~(k*intensity+ px[i+ 2]*(1- intensity));}
ctx.putImageData(imageData,0,0);_onImageReady(img);}},_injectTags=function($img,$imageWrapper){var img=$img[0],src=img.src,offset=$img.position(),css={top:offset.top,left:offset.left,position:'absolute','-webkit-transform':'translate3d(0,0,0)',opacity:invertHoverEffect?0:1},$overlay;img.crossOrigin='anonymous';if(_supportsCanvas&&!_cssfilters){$overlay=$('<canvas width="'+ img.naturalWidth+'" height="'+ img.naturalHeight+'" class="BWfade"></canvas>');css.width=$img.width();css.height=$img.height();_generateCanvasImage(img,$overlay.get(0),img.naturalWidth,img.naturalHeight);}else{if(_supportsCanvas){css[_cssFilter]='grayscale('+ intensity*100+'%)';}else{css.filter='progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';}
$overlay=$img.clone().addClass('BWFilter BWfade');_onImageReady(img);}
$overlay.css(css).prependTo($imageWrapper);if(!$.support.opacity&&invertHoverEffect){$overlay.animate({opacity:0},0);}},_resizeCanvases=function(){$el.each(function(index,currImageWrapper){var img=$(currImageWrapper).find('img'),currWidth=$(img).width(),currHeight=$(img).height();$(this).find('canvas').css({width:currWidth,height:currHeight});});},_init=function(){var imagesToLoadlength=$el.find('img').filter(function(){return!$(this).data('_b&w');}).length;$el.each(function(index,tmpImageWrapper){var $imageWrapper=$(tmpImageWrapper),$img=$imageWrapper.find('img');if($img.data('_b&w')){return;}
if(!_isImageLoaded($img[0])){$img.on('load',function(){if($img.data('_b&w_loaded')||!$img[0].complete){setTimeout(function(){$img.load();},20);return;}
_injectTags($img,$imageWrapper);$img.data('_b&w_loaded',true);imagesToLoadlength--;_initWebworker(imagesToLoadlength);}).load();}else{imagesToLoadlength--;_injectTags($img,$imageWrapper);}
$img.data('_b&w',true);});_initWebworker(imagesToLoadlength);if(hoverEffect){$el.unbind(_evtNamespace).on('mouseleave'+ _evtNamespace,_onMouseLeave).on('mouseenter'+ _evtNamespace,_onMouseEnter);}
if(_supportsCanvas&&!_cssfilters){$window.unbind(_evtNamespace).on('resize'+ _evtNamespace+' orientationchange'+ _evtNamespace,_resizeCanvases);}};var destroy=function(){$el.off(_evtNamespace);$window.off(_evtNamespace);};_init();return{destroy:destroy};}});}(jQuery));