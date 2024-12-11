window.aiptag = window.aiptag || {cmd: []};
aiptag.cmd.display = aiptag.cmd.display || [];
aiptag.cmd.player = aiptag.cmd.player || [];
//CMP tool settings
aiptag.cmp = {
	show: true,
	position: "centered",  //centered, bottom
	button: true,
	buttonText: "Privacy settings",
	buttonPosition: "bottom-left" //bottom-left, bottom-right, top-left, top-right
}

aiptag.cmd.player.push(function() {
	aiptag.adplayer = new aipPlayer({
		AIP_REWARDEDCOMPLETE: function (state)  {
			
			//state can be: timeout, empty or closed
			console.log("Rewarded Ad Completed: " + state);
			rewardAdError();
		},
		AIP_REWARDEDGRANTED: function ()  {
			
			//at this point the reward is granted, usually this will be just before or after AIP_REWARDEDCOMPLETE but this is not always the case
			console.log("Reward Granted");
			rewardAdFinished();
		},
		AIP_ADBREAK_COMPLETE: function ()  {
			console.log("Adbreak Completed");
		},
		AD_WIDTH: 960,
		AD_HEIGHT: 540,
		AD_DISPLAY: 'fullscreen', //default, fullscreen, center, fill
		TRUSTED: true,
		LOADING_TEXT: 'Loading...',
		PREROLL_ELEM: function(){return document.getElementById('preroll')},
		AIP_COMPLETE: function (state)  {
			/*******************
			 ***** WARNING *****
			 *******************
			 Please do not remove the PREROLL_ELEM
			 from the page, it will be hidden automaticly.
			 If you do want to remove it use the AIP_REMOVE callback.
			*/
			
			if (prerollType === "reward")
				rewardAdFinished();
			else
				midgameFinished();
		},
		AIP_REMOVE: function ()  {
			// Here it's safe to remove the PREROLL_ELEM from the page if you want. But it's not recommend.
		}
	});
});


function show_preroll() {
		//check if the adslib is loaded correctly or blocked by adblockers etc.
		if (typeof aiptag.adplayer !== 'undefined') {
			if (prerollType === "reward")
				rewardAdStarted();
			else
				midgameStarted();
			
			aiptag.cmd.player.push(function() { aiptag.adplayer.startPreRoll(); });
		} else {
			//Adlib didnt load this could be due to an adblocker, timeout etc.
			//Please add your script here that starts the content, this usually is the same script as added in AIP_COMPLETE or AIP_REMOVE.
			console.log("Ad Could not be loaded, load your content here");
			
			if (prerollType === "reward")
				rewardAdError();
			else
				midgameError();
		}
	}
function show_adbreak() {
	//check if the adslib is loaded correctly or blocked by adblockers etc.
	if (typeof aiptag.adplayer !== 'undefined') {
		aiptag.cmd.player.push(function() { aiptag.adplayer.startAdBreak(); });
	} else {
		//Adlib didnt load this could be due to an adblocker, timeout etc.
		//Please add your script here that starts the content, this usually is the same script as added in AIP_REWARDEDCOMPLETE.
		//alert("Adbreak Could not be loaded, load your content here");
	}
}


function show_rewarded() {
	//check if the adslib is loaded correctly or blocked by adblockers etc.
	if (typeof aiptag.adplayer !== 'undefined') {
		rewardAdStarted();
		aiptag.cmd.player.push(function() { aiptag.adplayer.startRewardedAd({preload: false, showLoading: true}); });
		
	} else {
		//Adlib didnt load this could be due to an adblocker, timeout etc.
		//Please add your script here that starts the content, this usually is the same script as added in AIP_REWARDEDCOMPLETE.
		console.log("Rewarded Ad Could not be loaded, load your content here");
		rewardAdError();
	}
}