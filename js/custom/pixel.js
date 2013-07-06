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
	
	$color.click(function(){
		$color.removeClass('current');
		$(this).addClass('current');
	});
	
	$('.button.color').click(function() {
		pixel.color = $(this).attr('title');
		
		$('.draggy').css('box-shadow','5px 5px 0 ' + $(this).attr('title'));
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
	};
	

	
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
	    
	
		ctx.beginPath();
		    
	    xPos = ( Math.ceil(xPos/25) * 25 ) - 25;
	    yPos = ( Math.ceil(yPos/25) * 25 ) - 25;
		ctx.moveTo (xPos, yPos);          
		ctx.fillStyle = pixel.color;
		ctx.lineHeight = 0;
		ctx.fillRect(xPos,yPos,25,25);
	
	};
	
	
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

