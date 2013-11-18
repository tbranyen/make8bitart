<div id="toolbox" class="draggy">

	<div class="controls">
		<img class="ui-dragger" src="assets/draggybits/dragger.png">	
	</div>
	
	<div id="clear" class="inner">
		<h3>canvas tools</h3>

		<input type="submit" value="new canvas" id="clear-canvas" /> <div class="tip"> ? <span class="tip-text">this will clear your canvas and create a new one with the background of whichever color is selected, including "erase" for a transparent one</span></div>
	</div>
	
	<div id="size" class="inner">
		<h3>pixel size</h3>
		<input id="size-slider" type="number" min="1" max="100" step="1" value="25" /> <div class="tip"> ? <span class="tip-text">changing pixel size *won't* clear the whole page, but using different sized pixels makes it less "8-bit"ish. you do you, though. I'm not the 8-bit police.</span></div>
		<div id="pixel-size-demo" class="color-demo"> </div>
	</div>
	
	<div id="save" class="inner">
		<h3>save your art:</h3>
		
		<input type="submit" value="full page" id="save-full" /><br />
		<input type="submit" value="selection" id="save-selection" />
		
		<ul class="instructions">
			<li class="step-one">click and drag to select the area of the canvas you want to save (top-left to bottom-right)</li>		
		</ul>
		
	</div>

</div>