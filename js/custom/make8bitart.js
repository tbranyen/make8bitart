$(function(){

	var $window = $(window);
	var $body = $('body');
	var $color = $('.color');
	var $toolbox = $('#toolbox');
	var $savebox = $('#savebox');
	var $colorbox = $('#colorbox');
	var $clearBG = $('#clear-canvas');
	var $buttonSaveFull = $('#save-full');
	var $buttonSaveSelection = $('#save-selection');
	var $sliderSize = $('#size-slider');
	var $pixelDemoDiv = $('#pixel-size-demo');
	var $pixelDemoNumber = $('#pixel-size-number');
	var $draggydivs = $('.draggy');
	var isDrawing = false;
	var colorJennsPick = $('.button.color.favorite').css('background-color');

	var $canvas, ctx, leftSide, topSide, xPos, yPos, resetSelectStart, saveSelection;

	var saveMode = {
		on : false,
		instructOne : $('.step-one').hide(),
		instructTwo : $('.step-two').hide(),
		instructThree : $('.step-three').hide()
	}
	
	var windowCanvas = {
		height: $window.height(),
		width: $window.width(),
		background: 'url("assets/bg.png")'
	};

	var copy = {
		selectionOff : 'turn off selection',
		selectionOn : 'selection'
	};
	
	var classes = {
		selectionCanvas : 'selectionCanvas'
	};
	
	var pixel = {
		color: '#000',
		size: 25
	};
	

	// overlay stuff
	var rect = {};
    var drag = false;
	
	

	/*** OUTSIDE LIBRARY STUFF ***/
	
	$draggydivs.draggyBits();

	$toolbox.css({
		'left' : '20px',
		'top' : '20px'
	});

	$savebox.css({
		'left' : '800px',
		'top' : '20px'
	});
	
	$colorbox.css({
		'left' : '300px',
		'top' : '100px'
	});
	
	
	/*** LET'S MAKE SOME EFFING ART ***/
	
	// generate window-sized canvas
	var generateCanvas = function( isOverlay ){

		if ( !isOverlay ) {
			$body.prepend('<canvas id="canvas" width="' + windowCanvas.width + 
							'" height="' + windowCanvas.height + 
							'">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
		
			$canvas = $("#canvas").css('background',windowCanvas.background);
			ctx = $canvas[0].getContext("2d");
		}
		else {
			$body.prepend('<canvas id="overlay" width="' + windowCanvas.width + 
							'" height="' + windowCanvas.height + 
							'"></canvas>');
		
			$overlay = $("#overlay").css({
				'background':'rgba(0,0,0,.5)',
				'position' : 'absolute',
				'top' : 0,
				'left' : 0
			});
			ctxOverlay = $overlay[0].getContext("2d");
			$overlay.mousedown(onMouseDown).mouseup(onMouseUp);

		}
		
	};
	
	// draw pixels
	var drawPixel = function(e) {
		if (e.pageX != undefined && e.pageY != undefined) {
			xPos = e.pageX;
			yPos = e.pageY;
	    }
	    else {
			xPos = e.clientX;
			yPos = e.clientY;
	    }
	
		ctx.beginPath();  
	    xPos = ( Math.ceil(xPos/pixel.size) * pixel.size ) - pixel.size;
	    yPos = ( Math.ceil(yPos/pixel.size) * pixel.size ) - pixel.size;
		ctx.moveTo (xPos, yPos);          
		ctx.fillStyle = pixel.color;
		ctx.lineHeight = 0;

		if ( pixel.color == 'erase' ) {
			ctx.clearRect(xPos,yPos,pixel.size,pixel.size);
		}
		else {
			ctx.fillRect(xPos,yPos,pixel.size,pixel.size);
		}
	
	};
	
	// start save selection mode
	var startSaveSelection = function(e) {
		saveSelection = {
			startX : e.pageX,
			startY : e.pageY 
		};
	};
	
	// get position data of selection
	var generateSaveSelection = function(e) {
		saveSelection.endX = e.pageX;
		saveSelection.endY = e.pageY;

		generateSelectionCanvas(saveSelection);
		$buttonSaveSelection.val(copy.selectionOn);
		$overlay.remove();
		
		// turn off save mode and directions
		saveMode.on = false;
		$('.instructions li').hide();	
	};
	
	// generate image from save selection
	var generateSelectionCanvas = function(coords) {
		
		$body.append('<canvas id="' + classes.selectionCanvas + '">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');

		var tempCanvas = $('<canvas id="' + classes.selectionCanvas + '">');
		
        var tCtx = tempCanvas[0].getContext("2d");

	    var width = coords.endX - coords.startX;
	    var height = coords.endY - coords.startY;
	    
		tempCanvas[0].width = width;
		tempCanvas[0].height = height;
		tCtx.drawImage($canvas[0],coords.startX, coords.startY, width, height, 0, 0, width, height);
	
	    // write on screen
	    var img = tempCanvas[0].toDataURL("image/png");
	    window.open(img,'_blank');
		
	};

	var drawSelection = function(e) {
	if (drag) {
	    rect.w = (e.pageX - this.offsetLeft) - rect.startX;
	    rect.h = (e.pageY - this.offsetTop) - rect.startY ;
	    ctxOverlay.clearRect(0,0,$overlay.width(),$overlay.height());
	    ctxOverlay.fillRect(rect.startX, rect.startY, rect.w, rect.h);
	  }
	  else {
	  	console.log('nope');
	  }
	};
	
	var resetCanvas = function(background) {
		ctx.clearRect(0, 0, $canvas.width(), $canvas.height());	
		
		// only fill background if color given and not transparent
		if ( background && background != 'erase') {
			ctx.fillStyle = background;
			ctx.fillRect(0,0,$canvas.width(),$canvas.height());
		}
	};
	
	
	/*** INITIALIZE ***/
	
	var initpixel = function(size) {
		pixel.size = size;
		$pixelDemoDiv.css({
			'width' : pixel.size,
			'height': pixel.size
		});
		$pixelDemoNumber.text(pixel.size);
	};
	
	var init = (function(size){
		generateCanvas();
		initpixel(size);
	}(25));
	
	

	/*** EVENT HANDLERS ***/
	
	// mouse down drawing or saving
	var onMouseDown = function(e) {
		e.preventDefault();
		if ( saveMode.on == false ) {
			drawPixel(e);
			$canvas.on('mousemove', drawPixel);
			isDrawing = true;
		}
		else {
			startSaveSelection(e);			drag = true;

			$overlay.on('mousemove', drawSelection(e));
		}
	};
	
	// mouse up drawing or saving
	var onMouseUp = function(e) {

		if ( saveMode.on == false ) {
			$canvas.off('mousemove');
			isDrawing = false;
		}
		else {
			generateSaveSelection(e);
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			
		}
	};
	
	// bind mousedown and mouseup to canvas
	$canvas.mousedown(onMouseDown).mouseup(onMouseUp);

	// reset canvas 
	$clearBG.click(function(){
		resetCanvas( pixel.color );
	});
	
	// color chosen
	$color.click(function(){
		var $newColor = $(this);
		
		if ( $newColor.hasClass('favorite') ) {
			var newColorLabel = colorJennsPick;
		}
		else {
			var newColorLabel = $newColor.attr('title');
		}
		
		$color.removeClass('current');
		$newColor.addClass('current');
		pixel.color = newColorLabel;

		if ( pixel.color != 'erase' ) {
			var demoColor = pixel.color;
		}
		else {
			var demoColor = windowCanvas.background;
		} 
		$pixelDemoDiv.css('background', demoColor);

		$draggydivs.css('box-shadow','5px 5px 0 ' + newColorLabel);
	});
	
	// save full canvas button clicked
	$buttonSaveFull.click(function(){
		var savedPNG = $canvas[0].toDataURL("image/png");
		window.open(savedPNG,'_blank');
	});
	
	// save selection of canvas button clicked
	$buttonSaveSelection.click(function(){
		
		if ( saveMode.on ) {
			saveMode.on = false;
			saveMode.instructOne.fadeOut();
			$(this).val(copy.selectionOn)
			$overlay.remove();
		}
		else {
			saveMode.on = true;
			saveMode.instructOne.fadeIn();
			$(this).val(copy.selectionOff);

			// create transparent canvas over whole page
			generateCanvas(true);
		}
	});

	// pixel size slider changed
	$sliderSize.change(function(){
		pixel.size = $(this).val();
		
		$pixelDemoDiv.css({
			'width' : pixel.size,
			'height': pixel.size
		});
		
		$pixelDemoNumber.text(pixel.size);
	});


});

