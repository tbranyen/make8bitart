<div id="toolbox" class="draggy" title="Canvas Tools">

	<div class="controls">
		<img class="ui-dragger" src="assets/draggybits/dragger.png">	
	</div>
	
	<div id="clear" class="inner">
		<h3>new canvas:</h3>
		<p><em>this *will* clear the whole page and your art will be gone forever</em></p>
		<input type="submit" value="white bg" id="clear-white" />
		<input type="submit" value="transparent bg" id="clear-transparent" />
	</div>
	
	<div id="size" class="inner">
		<h3>pixel size:</h3>
		<p><em>this *won't* clear the whole page, but using different sized pixels makes it less "8-bit"ish. you do you.</em></p>
		<input id="size-slider" type="range" min="1" max="100" step="1" value="25" /> 
		<span id="pixel-size-number"> </span>px
		<div id="pixel-size-demo"> </div>
	</div>

</div>