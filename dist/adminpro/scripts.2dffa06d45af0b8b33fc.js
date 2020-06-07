!function(t){"use strict";if("undefined"==typeof window)throw new Error("Could not find DOM window object.");"function"==typeof define&&define.amd?define(["jquery",window],t):"object"==typeof exports?t(require("jquery"),window):t(jQuery,window)}(function(t,e,n){var i=function(e,n){this.element=e,this.settings=t.extend({},i.defaults,n),this.settings.fullPage=this.element.is("body"),this.init(),this.settings.start&&this.start()};i.defaults={overlay:n,zIndex:n,message:"Loading...",theme:"light",shownClass:"loading-shown",hiddenClass:"loading-hidden",stoppable:!1,start:!0,onStart:function(t){t.overlay.fadeIn(150)},onStop:function(t){t.overlay.fadeOut(150)},onClick:function(){}},i.setDefaults=function(e){i.defaults=t.extend({},i.defaults,e)},t.extend(i.prototype,{init:function(){this.isActive=!1,this.overlay=this.settings.overlay||this.createOverlay(),this.resize(),this.attachMethodsToExternalEvents(),this.attachOptionsHandlers()},createOverlay:function(){var e=t('<div class="loading-overlay loading-theme-'+this.settings.theme+'"><div class="loading-overlay-content">'+this.settings.message+"</div></div>").addClass(this.settings.hiddenClass).hide().appendTo("body"),n=this.element.attr("id");return n&&e.attr("id",n+"_loading-overlay"),e},attachMethodsToExternalEvents:function(){var n=this;n.element.on("loading.start",function(){n.overlay.removeClass(n.settings.hiddenClass).addClass(n.settings.shownClass)}),n.element.on("loading.stop",function(){n.overlay.removeClass(n.settings.shownClass).addClass(n.settings.hiddenClass)}),n.settings.stoppable&&n.overlay.on("click",function(){n.stop()}),n.overlay.on("click",function(){n.element.trigger("loading.click",n)}),t(e).on("resize",function(){n.resize()}),t(function(){n.resize()})},attachOptionsHandlers:function(){var t=this;t.element.on("loading.start",function(e,n){t.settings.onStart(n)}),t.element.on("loading.stop",function(e,n){t.settings.onStop(n)}),t.element.on("loading.click",function(e,n){t.settings.onClick(n)})},calcZIndex:function(){return this.settings.zIndex!==n?this.settings.zIndex:(parseInt(this.element.css("z-index"))||0)+1+this.settings.fullPage},resize:function(){var t=this,e=t.element,n=e.outerWidth(),i=e.outerHeight();this.settings.fullPage&&(i="100%",n="100%"),this.overlay.css({position:t.settings.fullPage?"fixed":"absolute",zIndex:t.calcZIndex(),top:e.offset().top,left:e.offset().left,width:n,height:i})},start:function(){this.isActive=!0,this.resize(),this.element.trigger("loading.start",this)},stop:function(){this.isActive=!1,this.element.trigger("loading.stop",this)},active:function(){return this.isActive},toggle:function(){this.active()?this.stop():this.start()},destroy:function(){this.overlay.remove()}});var s="jquery-loading";t.fn.loading=function(e){return this.each(function(){var o=t.data(this,s);o?e===n?o.start():"string"==typeof e?o[e].apply(o):(o.destroy(),t.data(this,s,new i(t(this),e))):e!==n&&"object"!=typeof e&&"start"!==e&&"toggle"!==e||t.data(this,s,new i(t(this),e))})},t.fn.Loading=function(e){var o=t(this).data(s);return o&&e===n||t(this).data(s,o=new i(t(this),e)),o},t.expr[":"].loading=function(e){var n=t.data(e,s);return!!n&&n.active()},t.Loading=i});