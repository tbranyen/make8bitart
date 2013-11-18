/**
* pixelDiv
* 
* The MIT License (MIT)
* Copyright (c) 2013 Jenn Schiffer
*/ 

(function($) {

	var pluginName = 'pixelDiv';

	var defaults = {
		hideIMG : true,
		pixelSize : 1,
	};
	
	var test = 1;

	var methods = {

		init : function (opts) {
			
			return this.each(function() {	  
			
				var $this = $(this);
				var options = $.extend({}, defaults, opts);

				var data = {
					$this : $this,
					imgSRC : $this.attr('src'),
					hideIMG : options.hideIMG,
					pixelSize : options.pixelSize,
					divID : options.divID,
					divClass : options.divClass,
					onComplete : options.onComplete,
				};

				$this.data(pluginName, data);
				
				methods.initCanvas.call($this);
			}); 
		},
		
		initCanvas : function(){
			var $this = $(this);
			var data = $this.data(pluginName);	

			// create canvas
			data.$canvas = $('<canvas width="' + $this.width() + '" height="' + $this.height() + '">');
			
			// create div for pixelDiv image
			data.$pixelDiv = $('<div>').addClass(pluginName);
			data.$pixelDiv.css('width', $this.width() * data.pixelSize);
			
			if ( data.divID ) {
				data.$pixelDiv.attr('id', data.divID);
			}
			
			if ( data.divClass ) {
				data.$pixelDiv.addClass(data.divClass);
			}
			
			// add canvas after image
			$this.after(data.$canvas);
			
			// get 2d context
			data.context = data.$canvas[0].getContext("2d");	
			
			// if hideIMG is true, hide it
			if ( data.hideIMG ) {
				$this.hide();
			}
			
			// save canvas and context to data
			$this.data(pluginName, data);
			
			// draw image
			var img = new Image();
			img.src = data.imgSRC;
			img.onload = methods.drawPixelDiv.call($this, img);
			
			data.img = img;
			
			// add pixelDiv after image
			$this.after(data.$pixelDiv);
		},
		
		drawPixelDiv : function(img) {
			var $this = $(this);
			var data = $this.data(pluginName);
			
			var isFirstPixel;
			
			// draw image onto canvas
			data.context.drawImage(img, 0, 0 );
		
			for ( var row = 0; row < data.$canvas.height(); row++ ) {
			
				isFirstPixel = true;
				
				for ( var column = 0; column < data.$canvas.width(); column++ ) {
					var pixelData = data.context.getImageData(column, row, 1, 1 );
					//var pixelData = methods.getImageDataFaster.call($this, column, row, 1, 1, data.$canvas.width, data.$canvas.height, img);
					var pixelDiv = methods.rgbDiv.call($this, pixelData, column, row);
					
					if ( isFirstPixel ) {
						pixelDiv.css('clear','both');
					}
					
					data.$pixelDiv.append(pixelDiv);
					isFirstPixel = false;
				}
			}		

			
			// remove canvas
			data.$canvas.remove();
			// if a callback onComplete is given, call that function
			if ( data.onComplete ) {
				data.onComplete();
			}

		},
	
		rgbDiv : function( pixelArray, pixelColumn, pixelRow ) {
			var $this = $(this);
			var data = $this.data(pluginName);
			
			// generate pixel div
			var $pixel = $('<div>');
			
			// add position classes and css
			$pixel.addClass('pixelDiv-pixel')
				  .addClass('col-' + pixelColumn)
				  .addClass('row-' + pixelRow)
				  .css({
					  'width' : data.pixelSize,
					  'height' : data.pixelSize,
					  'background-color' : 'rgba(' + pixelArray.data[0] + ',' + pixelArray.data[1] + ',' + pixelArray.data[2] + ', ' + pixelArray.data[3] + ')',
					  'float' : 'left'
				  });
			
			// return pixel
			return $pixel;
		},

	
	};


    /*** MODULE DEFINITION ***/

    $.fn[pluginName] = function (method) {
        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this,arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    };	

})( jQuery );