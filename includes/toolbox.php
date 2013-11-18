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
		<h3>save your art</h3> 
		
		<input type="submit" value="full page" id="save-full" /> <div class="tip"> ? <span class="tip-text">opens art in new window for you to save. may not work if your image is super huge. if that's the case, save by selection.</span></div><br />
		<input type="submit" value="selection" id="save-selection" />
		
		<ul class="instructions">
			<li class="step-one">click and drag to select the area of the canvas you want to save (top-left to bottom-right). your art will open up in a new window for you to save.</li>		
		</ul>
		
	</div>
	
	<div id="share">
		<h3>tell your pals</h3>
	<iframe id="facebook" src="http://www.facebook.com/plugins/like.php?app_id=124052687676604&amp;href=http%3A%2F%2Fmake8bitart.com&amp;send=false&amp;layout=button_count&amp;width=140&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=verdana&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:140px; height:21px;" allowTransparency="true"></iframe>
	<br /><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://make8bitart.com" data-text="Make 8-bit art!" data-via="jennschiffer" data-related="jennschiffer">Tweet</a>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>

</div>