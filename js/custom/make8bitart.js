$(function(){

	var DOM = {
		$window : $(window),
		$body : $('body'),
		$color : $('.color'),
		$toolbox : $('#toolbox'),
		$savebox : $('#savebox'),
		$colorbox : $('#colorbox'),
		$clearBG : $('#clear-canvas'),
		$buttonSaveFull : $('#save-full'),
		$buttonSaveSelection : $('#save-selection'),
		$sliderSize : $('#size-slider'),
		$pixelDemoDiv : $('#pixel-size-demo'),
		$pixelDemoNumber : $('#pixel-size-number'),
		$draggydivs : $('.draggy')
	};

	var isDrawing = false;
	var colorJennsPick = $('.button.color.favorite').css('background-color');
	var ctx, leftSide, topSide, xPos, yPos, resetSelectStart, saveSelection, rect;

	var saveMode = {
		on : false,
		instructOne : $('.step-one').hide()
	};
	
	var windowCanvas = {
		height: DOM.$window.height(),
		width: DOM.$window.width(),
		background: 'url("assets/bg.png")'
	};	

	var copy = {
		selectionOff : 'turn off selection',
		selectionOn : 'selection',
		fullPage : 'full page'
	};
	
	var classes = {
		selectionCanvas : 'selectionCanvas'
	};
	
	var pixel = {
		color: '#000',
		size: 25
	};

	
	

	/*** OUTSIDE LIBRARY STUFF ***/
	
	DOM.$draggydivs.draggyBits();
	DOM.$toolbox.css({
		'left' : '20px',
		'top' : '20px'
	});
	DOM.$savebox.css({
		'left' : '800px',
		'top' : '20px'
	});
	DOM.$colorbox.css({
		'left' : '300px',
		'top' : '100px'
	});
	


	
	/*** LET'S MAKE SOME EFFING ART ***/

	var generateCanvas = function() {
		// drawing
		DOM.$canvas = $('<canvas id="canvas" width="' + windowCanvas.width + '" height="' + windowCanvas.height + '">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
		DOM.$canvas.css('background',windowCanvas.background);
		DOM.$body.prepend( DOM.$canvas );
		ctx = DOM.$canvas[0].getContext("2d");
		
		// selection overlay
		DOM.$overlay = $('<canvas id="overlay" width="' + windowCanvas.width + '" height="' + windowCanvas.height + '"></canvas>');
		DOM.$overlay.css({
			'background':'none',
			'position' : 'absolute',
			'top' : 0,
			'left' : 0,
			'display' : 'none'
		});
		DOM.$body.prepend( DOM.$overlay );
		ctxOverlay = DOM.$overlay[0].getContext("2d");
		ctxOverlay.fillStyle = 'rgba(0,0,0,.5)';

	};
	
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
	
	var startSaveSelection = function(e) {
		saveSelection = {
			startX : e.pageX,
			startY : e.pageY 
		};
	};
	
	var generateSaveSelection = function(e) {
		saveSelection.endX = e.pageX;
		saveSelection.endY = e.pageY;

		generateSelectionCanvas(saveSelection);
		
		DOM.$buttonSaveSelection.click();
	};
	
	var generateSelectionCanvas = function(coords) {
		
		// temporary canvas to save image
		DOM.$body.append('<canvas id="' + classes.selectionCanvas + '"></canvas>');
		var tempCanvas = $('#' + classes.selectionCanvas);
        var tempCtx = tempCanvas[0].getContext("2d");

		// set dimensions and draw based on selection
	    var width = Math.abs(coords.endX - coords.startX);
	    var height = Math.abs(coords.endY - coords.startY);
		tempCanvas[0].width = width;
		tempCanvas[0].height = height;

		var startX = Math.min( coords.startX, coords.endX );
		var startY = Math.min( coords.startY, coords.endY );

		if ( width && height ) {
			tempCtx.drawImage(DOM.$canvas[0],startX, startY, width, height, 0, 0, width, height);
		
		    // write on screen
		    var img = tempCanvas[0].toDataURL("image/png");
		    window.open(img,'_blank');
		}
	    
	    // remove tempCamvas
	    tempCanvas.remove();
	};

	var drawSelection = function(e) {
		rect.w = (e.pageX - this.offsetLeft) - rect.startX;
		rect.h = (e.pageY - this.offsetTop) - rect.startY ;
		ctxOverlay.clearRect(0,0,DOM.$overlay.width(),DOM.$overlay.height());
		ctxOverlay.fillStyle = 'rgba(0,0,0,.5)';
		ctxOverlay.fillRect(0,0,DOM.$overlay.width(),DOM.$overlay.height());
		ctxOverlay.clearRect(rect.startX, rect.startY, rect.w, rect.h);
	};
	
	var resetCanvas = function(background) {
		ctx.clearRect(0, 0, DOM.$canvas.width(), DOM.$canvas.height());	
		
		if ( background && background != 'erase') {
			ctx.fillStyle = background;
			ctx.fillRect(0,0,DOM.$canvas.width(),DOM.$canvas.height());
		}
	};
	
	
	
	
	/*** MOUSE EVENT FUNCTIONS ***/
	
	var onMouseDown = function(e) {
		e.preventDefault();
		if ( saveMode.on == false ) {
			drawPixel(e);
			DOM.$canvas.on('mousemove', drawPixel);
			isDrawing = true;
		}
		else {
			// overlay stuff
			rect = {};
			startSaveSelection(e);	
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			DOM.$overlay.on('mousemove', drawSelection);		
		}
	};
	
	var onMouseUp = function(e) {

		if ( saveMode.on == false ) {
			DOM.$canvas.off('mousemove');
			isDrawing = false;
		}
		else {
			DOM.$overlay.off('mousemove');
			ctxOverlay.clearRect(0,0,DOM.$overlay.width(),DOM.$overlay.height());
			generateSaveSelection(e);
			saveMode.on = false;
			rect = {};
		}
	};
	
	

	
	/*** INITIALIZE ***/
	
	var initpixel = function(size) {
		pixel.size = size;
		DOM.$pixelDemoDiv.css({
			'width' : pixel.size,
			'height': pixel.size
		});
		DOM.$pixelDemoNumber.text(pixel.size);
	};
	
	var init = (function(size){
		generateCanvas();
		initpixel(size);
		
		// bind mousedown to canvi, mouseup to window
		DOM.$canvas.mousedown(onMouseDown).mouseup(onMouseUp);
		DOM.$overlay.mousedown(onMouseDown).mouseup(onMouseUp);
		DOM.$draggydivs.mouseup(onMouseUp);
	}(25));
	
	



	/*** EVENT HANDLERS ***/

	// reset canvas 
	DOM.$clearBG.click(function(){
		resetCanvas( pixel.color );
	});
	
	// choose color
	DOM.$color.click(function(){
		var $newColor = $(this);
		
		if ( $newColor.hasClass('favorite') ) {
			var newColorLabel = colorJennsPick;
		}
		else {
			var newColorLabel = $newColor.attr('title');
		}
		
		DOM.$color.removeClass('current');
		$newColor.addClass('current');
		pixel.color = newColorLabel;

		if ( pixel.color != 'erase' ) {
			var demoColor = pixel.color;
		}
		else {
			var demoColor = windowCanvas.background;
		} 
		DOM.$pixelDemoDiv.css('background', demoColor);
		DOM.$draggydivs.css('box-shadow','5px 5px 0 ' + newColorLabel);
	});
	
	// pixel size slider changed
	DOM.$sliderSize.change(function(){
		pixel.size = $(this).val();
		
		DOM.$pixelDemoDiv.css({
			'width' : pixel.size,
			'height': pixel.size
		});
		
		DOM.$pixelDemoNumber.text(pixel.size);
	});

	// save full canvas 
	DOM.$buttonSaveFull.click(function(){
		var savedPNG = DOM.$canvas[0].toDataURL("image/png");
		window.open(savedPNG,'_blank');
	});
	
	// save selection of canvas button clicked
	DOM.$buttonSaveSelection.click(function(){
		if ( saveMode.on ) {
			saveMode.on = false;
			saveMode.instructOne.fadeOut();
			$(this).val(copy.selectionOn)
			DOM.$overlay.hide();
		}
		else {
			saveMode.on = true;
			saveMode.instructOne.fadeIn();
			$(this).val(copy.selectionOff);
			ctxOverlay.fillRect(0,0,DOM.$overlay.width(),DOM.$overlay.height());			
			DOM.$overlay.show();
		}
	});

});