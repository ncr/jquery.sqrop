/* 
  Author: Jacek Becela 
  Homepage: http://github.com/ncr/sqrop
  License: MIT

  Inspiration: http://www.seifi.org/css/creating-thumbnails-using-the-css-clip-property.html

  Docs:
    $("img").sqrop()    // square crop with side length equal to shorter side of image
    $("img").sqrop(200) // square crop with 200px side length, image scaled accordingly
*/
 
$.fn.sqrop = function(l){
  return this.each(function(){
    var e = $(this),

      width = e.width(),
      height = e.height(),

      min = Math.min(width, height),
      max = Math.max(width, height),

      length = l || min,
      ratio = length / min;

      newWidth = width * ratio,
      newHeight = height * ratio,

      deltaX = (newWidth - length) / 2,
      deltaY = (newHeight - length) / 2,

      outer = $("<span />").css({
        position: "relative",
        width: length,
        height: length,
        display: "inline-block"
      }),

      inner = $("<span />").css({
        position: "absolute",
        clip: "rect(" + deltaY + "px " + (length + deltaX) + "px " + (length + deltaY) + "px " + deltaX + "px)",
        top: -deltaY,
        left: -deltaX
      });
 
    e.css({width: newWidth, height: newHeight}).wrap(inner).parent().wrap(outer);
  });
}
