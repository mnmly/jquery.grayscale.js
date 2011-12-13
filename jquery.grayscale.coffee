(($) ->

  cssRule = """.gs-wrapper img{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  } 
  .gs-wrapper .gs{
    opacity: 1;
    -webkit-transition: opacity .2s ease;
    -moz-transition: opacity .2s ease;
    transition: opacity .2s ease;
    z-index: 1;
  } 
  .gs-wrapper:hover .gs{
    opacity: 0;
  }
  .image-gallery:hover .gs{
    opacity: 0;
  }"""

  styleElement = document.createElement("style")
  styleElement.type = "text/css"
  
  if styleElement.styleSheet
    styleElement.styleSheet.cssText = cssRule
  else
    styleElement.appendChild document.createTextNode(cssRule)

  document.getElementsByTagName("head")[0].appendChild styleElement

  $.fn.grayscale = ->

    @each ->

      if not $(this).is("img") and not $(this).parent().is("a")

        console.log "Hey it's not gonna do anything, it should be image and wrapped by anchor tag"

      else

        image            = $(this).get(0)
        imgWidth         = image.width
        imgHeight        = image.height
        $parentContainer = $("<div class='gs-wrapper'>").appendTo($(this).parent())
        $parentContainer.append $(this).addClass("original")

        canvas           = document.createElement("canvas")
        canvas.width     = imgWidth
        canvas.height    = imgHeight
        canvas.className = "gs"

        context          = canvas.getContext("2d")
        context.drawImage image, 0, 0

        imgData = context.getImageData(0, 0, imgWidth, imgHeight)

        pixels = imgData.data

        parentContainer.css
          position: "relative"
          width   : imgWidth
          height  : imgHeight
          display : "block"
        
        i = 0
        n = pixels.length
        
        while i < n
          grayscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11
          pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale
          i += 4

        context.putImageData( imgData, 0, 0 )
        $parentContainer.append canvas

)( jQuery )

