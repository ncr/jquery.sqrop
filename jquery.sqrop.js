/* 
  Author: Jacek Becela 
  Homepage: http://github.com/ncr/sqrop
  License: MIT

  Inspiration: http://www.seifi.org/css/creating-thumbnails-using-the-css-clip-property.html

  Docs:
    $("img").sqrop()    // square crop with side length equal to shorter side of image
    $("img").sqrop(200) // square crop with 200px side length, image scaled accordingly

    Ensure your your images are loaded when calling #sqrop(). Use something like this:
    
    $(document).ready(function(){ // document ready event
      $("img").load(function(){$(this).sqrop(123)}) // image load event
    })

*/

(function ($) {
  $.fn.sqrop = function (l) {
    return this.each(function () {
      var e = $(this),

        width  = e.width(),
        height = e.height(),

        min = Math.min(width, height),
        max = Math.max(width, height),

        length = l || min,
        ratio  = length / min,

        newWidth  = Math.round(width * ratio),
        newHeight = Math.round(height * ratio),

        deltaX = Math.round((newWidth - length) / 2),
        deltaY = Math.round((newHeight - length) / 2),

        outer = $("<span />").css({
          position: "relative",
          display:  "inline-block",
          width:    length,
          height:   length
        }),

        inner = $("<span />").css({
          position: "absolute",
          clip:     "rect(" + deltaY + "px " + (length + deltaX) + "px " + (length + deltaY) + "px " + deltaX + "px)",
          top:      -deltaY,
          left:     -deltaX
        });

      e.css({ width: newWidth, height: newHeight }).wrap(outer).wrap(inner);
    });
  }
})(jQuery);
