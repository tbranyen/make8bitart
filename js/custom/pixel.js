$(function(){

	var $window = $(window);
	var $body = $('body');
	var $color = $('.color');
	var $toolbox = $('#toolbox');
	var $savebox = $('#savebox');
	var $draggydivs = $('.draggy');
	
	var saveMode = {
		on : false,
		instructOne : $('.step-one').hide(),
		instructTwo : $('.step-two').hide(),
		instructThree : $('.step-three').hide()
	}
	
	var windowCanvas = {
		height: $window.height(),
		width: $window.width(),
	};
	
	var pixel = {
		color: '#9cc',
	};
	
	
	var $canvas, ctx, leftSide, topSide, xPos, yPos, resetSelectStart, saveSelection;

	/**
	* DraggyBits plugin
	*/
	
	$draggydivs.draggyBits();

	
	/**
	* Toolbox
	*/
	
	$color.click(function(){
		
		var $newColor = $(this);
		var newColorLabel = $newColor.attr('title');
		
		$color.removeClass('current');
		$newColor.addClass('current');
		pixel.color = newColorLabel;
		
		$draggydivs.css('box-shadow','5px 5px 0 ' + newColorLabel);
		
	});
	
	$toolbox.css({
		'left' : '20px',
		'top' : '20px'
	});
	
	
	/**
	* Savebox 
	*/
	
	$('#save-full').click(function(){
		var savedPNG = $canvas[0].toDataURL("image/png");
		window.open(savedPNG,'_blank');
		console.log($canvas);
	});
	
	$('#save-selection').click(function(){
		saveMode.on = true;
		saveMode.instructOne.fadeIn();
	});
	
	$savebox.css({
		'left' : '800px',
		'top' : '20px'
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
		
		$canvas.mousedown(function(e){
			if ( saveMode.on == false ) {
				generatePixel(e);
			}
			else {
				startSaveSelection(e);
			}
		});
		
		$canvas.mouseup(function(e){
			if ( saveMode.on == false ) {
				return;
			}
			else {
				generateSaveSelection(e);
			}
		});
	};
	

	
	// draw pixels
	var generatePixel = function(e) {
	
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
	
	var startSaveSelection = function(e) {
		saveSelection = {
			startX : e.pageX,
			startY : e.pageY 
		};
	};
	
	var generateSaveSelection = function(e) {
		saveSelection.endX = e.pageX;
		saveSelection.endY = e.pageY;
		
		console.log(saveSelection);
		saveMode.on = false;
		$('.instructions li').hide();	
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

