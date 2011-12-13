(function() {
  (function($) {
    var cssRule, styleElement;
    cssRule = ".gs-wrapper img{\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n} \n.gs-wrapper .gs{\n  opacity: 1;\n  -webkit-transition: opacity .2s ease;\n  -moz-transition: opacity .2s ease;\n  transition: opacity .2s ease;\n  z-index: 1;\n} \n.gs-wrapper:hover .gs{\n  opacity: 0;\n}\n.image-gallery:hover .gs{\n  opacity: 0;\n}";
    styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssRule;
    } else {
      styleElement.appendChild(document.createTextNode(cssRule));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
    return $.fn.grayscale = function() {
      return this.each(function() {
        var $parentContainer, canvas, context, grayscale, i, image, imgData, imgHeight, imgWidth, n, pixels;
        if (!$(this).is("img") && !$(this).parent().is("a")) {
          return console.log("Hey it's not gonna do anything, it should be image and wrapped by anchor tag");
        } else {
          image = $(this).get(0);
          imgWidth = image.width;
          imgHeight = image.height;
          $parentContainer = $("<div class='gs-wrapper'>").appendTo($(this).parent());
          $parentContainer.append($(this).addClass("original"));
          canvas = document.createElement("canvas");
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          canvas.className = "gs";
          context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          imgData = context.getImageData(0, 0, imgWidth, imgHeight);
          pixels = imgData.data;
          parentContainer.css({
            position: "relative",
            width: imgWidth,
            height: imgHeight,
            display: "block"
          });
          i = 0;
          n = pixels.length;
          while (i < n) {
            grayscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale;
            i += 4;
          }
          context.putImageData(imgData, 0, 0);
          return $parentContainer.append(canvas);
        }
      });
    };
  })(jQuery);
}).call(this);
