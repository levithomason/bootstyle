/*! angular-spectrum-colorpicker v1.0.13 */
!function(a){"use strict";var b=a.module("angularSpectrumColorpicker",[]);b.directive("spectrumColorpicker",function(){return{restrict:"E",require:"ngModel",scope:!1,replace:!0,template:'<span><input class="input-small" /></span>',link:function(b,c,d,e){function f(b){var c=h;b?c=b.toString():a.isUndefined(h)&&(c=b),e.$setViewValue(c)}var g=c.find("input"),h=b.$eval(d.fallbackValue),i=function(a){b.$apply(function(){f(a)})},j=function(){return g.spectrum("toggle"),!1},k=a.extend({color:e.$viewValue,change:i,move:i,hide:i},b.$eval(d.options));d.triggerId&&a.element(document.body).on("click","#"+d.triggerId,j),e.$render=function(){g.spectrum("set",e.$viewValue||"")},k.color&&(g.spectrum("set",k.color||""),f(k.color)),g.spectrum(k),b.$on("$destroy",function(){g.spectrum("destroy")})}}})}(angular);