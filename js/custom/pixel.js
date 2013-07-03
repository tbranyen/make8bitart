$(function(){

	var $window = $(window);
	var $body = $('body');
	var $color = $('.color');
	var $toolbox = $('#toolbox');
	
	var windowCanvas = {
		height: $window.height(),
		width: $window.width(),
	};
	
	var pixel = {
		color: '#9cc',
	};
	
	
	var ctx, leftSide, topSide, xPos, yPos, resetSelectStart;

	/**
	* DraggyBits plugin
	*/
	$('.draggy').draggyBits();

	
	/**
	* Toolbox
	*/
	var brushColor = "erase";	
	
	$color.click(function(){
		$color.removeClass('current');
		$(this).addClass('current');
	});
	
	$('.button.color').click(function() {
		pixel.color = $(this).attr('title');
	});
	
	
	
	/**
	* Functions
	*/
	
	// generate window-sized canvas
	var generateCanvas = function(){

		$body.prepend('<canvas id="canvas" width="' + windowCanvas.width + 
						'" height="' + windowCanvas.height + 
						'">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
	
		$canvas = $("#canvas");
		ctx = $canvas[0].getContext("2d");
		$canvas.click(generatepixel);
		$canvas.mousemove()
	}
	

	
	// draw pixels
	var generatepixel = function(e) {
	
		if (e.pageX != undefined && e.pageY != undefined) {
			xPos = e.pageX;
			yPos = e.pageY;
	    }
	    else {
			xPos = e.clientX;
			yPos = e.clientY;
	    }
	    
	    calculatePosition(xPos,yPos);
		
		/*coefficient = (xPos-pixel.sideLength)/width;
		if ( coefficient % 2 != 0 ) {
			yPos += height / 2;
		} 
		
		xPos -= coefficient * (width / 4);
	*/
	
		ctx.beginPath();
		ctx.moveTo (xPos + pixel.sideLength * Math.cos(0), yPos +  pixel.sideLength *  Math.sin(0));          
		for (var i = 1; i <= 6; i += 1) {
		    ctx.lineTo (xPos + pixel.sideLength * Math.cos(i * 2 * Math.PI / 6), yPos + pixel.sideLength * Math.sin(i * 2 * Math.PI / 6));
		}	
		ctx.fillStyle = pixel.color;
		ctx.lineHeight = 0;
		ctx.fill();	
	}
	
	var calculatePosition = function(x,y) {
		
		/*xPos = ( Math.ceil(xPos/pixel.width) * pixel.width ) - (pixel.sideLength) ;
	    yPos = ( Math.ceil(yPos/pixel.height) * pixel.height ) - (pixel.sideLength) ;
		*/
	}
	
	
	/* Init */
	
	var initpixel = function(size) {
		
		var sqrt3 = Math.sqrt(3);
		var rad = Math.PI/180;

		pixel.sideLength = size;
		pixel.apothem = Math.cos(30 * rad) * pixel.sideLength;		
		pixel.height = Math.sqrt(3) * pixel.sideLength;
		pixel.width = 2 * pixel.sideLength;
		pixel.edge = Math.sin(30 * rad) * pixel.sideLength;
		pixel.period = pixel.width - pixel.edge;

		console.log(pixel);
	};
	
	var init = (function(size){
	
		generateCanvas();
		initpixel(size);

	}(16));


});

