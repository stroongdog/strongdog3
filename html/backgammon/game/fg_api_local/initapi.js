window.famobi_gameJS = window.famobi_gameJS || [];

var _fgq = [];

(function (d, url, fgJS, firstJS) {
	fgJS = d.createElement('script');
	firstJS = d.getElementsByTagName('script')[0];
	fgJS.src = url;
	fgJS.onload = function() {
		if (typeof fg_api == "function" && typeof famobi != "undefined" && famobi instanceof fg_api) {
			return;
		}

		var configData = {
			"features": {
				"highscores": 0,
				"menu": 0,
				"fullscreen": 0,
				"screenshot": 0,
				"payment": 0,
				"ads": 0
			},
			"game_i18n": {
				"de": {
					"api.back": "&laquo; zur&uuml;ck",
					"api.more": "&raquo; mehr Spiele",
					"api.fullscreen": "Vollbildmodus",
					"api.payment": "Credits kaufen",
					"api.close": "Schlie&szling;en",
					"api.ad_modal_header": "Werbung schlie\u00dft automatisch in&hellip;",
					"api.ad_modal_header2": "Kurze Werbepause&hellip;",
					"api.teaser_modal_header": "Spiele jetzt den n\u00e4chsten Teil&hellip;",
					"api.payment_success": "Bezahlung erfolgreich!",
					"api.payment_credits_available": "Credits verf\u00fcgbar",
					"api.screenshot": "Screenshot",
					"api.continue": "Weiter",
					"api.play_now": "Jetzt spielen",
					"api.previous": "Vorheriges",
					"api.next": "N\u00e4chstes Spiel",
					"api.home": "Home"
				},
				"en": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home"
				},
				"tr": {
					"api.back": "&laquo; Geri",
					"api.more": "&raquo; Daha Fazla Oyun",
					"api.fullscreen": "Tam ekran",
					"api.payment": "Kredi Sat\u0131n Al",
					"api.close": "Kapat",
					"api.ad_modal_header": "Reklam &ndash; otomatik kapanacakt\u0131r&hellip;",
					"api.ad_modal_header2": "Reklam&hellip;",
					"api.teaser_modal_header": "Sonraki B\u00f6l\u00fcm&hellip;",
					"api.payment_success": "\u00d6deme ba\u015far\u0131l\u0131 oldu!",
					"api.payment_credits_available": "Kredi al\u0131nabilir",
					"api.continue": "Devam",
					"api.play_now": "Oyna",
					"api.previous": "Geri",
					"api.next": "\u0130leri",
					"api.home": "Ba\u015fla"
				},
				"es": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home"
				},
				"default": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home",
					more_games_image: "fg_api_local/branding/default/logo.png",
					more_games_image2: "fg_api_local/branding/default/logo.png",
					more_games_image3: "fg_api_local/branding/default/logo.png",
					"more_games_image²": "",
					"more_games_image2²": "",
					"more_games_image3²": "",
					more_games_url: "",
					preload_image: "fg_api_local/images/invisPreloadImage.png",
					test_preload_image: "fg_api_local/images/invisPreloadImage.png"
				}
			},
			"gameParams": {
				"languages_available": ["de", "tr", "en", "es"],
				"orientation": "",
				"highscores_enabled": 1,
				"screenshot": {
					"active": false,
					"areas": {
						"default": {
							"x": 0,
							"y": 0,
							"width": 100,
							"height": 100
						}
					},
					"camera": {
						"position": ["right", "top"],
						"x": 5,
						"y": 5
					}
				},
				"payment": {
					"active": false,
					"provider": "paymentwall"
				}
			},
			"urlRoot": d.location,
			"assetsPath": "fg_api_local",
			"ts": 1,
			"short_url": "",
			"uuid": "",
			"pid": "",
			"aid": "A1000-1",
			"name": "\"\"",
			"languages": ["de", "en", "tr", "es"],
			"ads": {
				"off": true,
				"adsense_channels": [],
				"adx_channels": [],
				"min_s_between": 120,
				"min_s_before": null,
				"show_initial": false,
				"show_video": false,
				"description_url": "",
				"provider": "dfp",
				"dfp_available": false
			},
			"i18n": {
				"default": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home",
					more_games_image: "fg_api_local/branding/default/logo.png",
					more_games_image2: "fg_api_local/branding/default/logo.png",
					more_games_image3: "fg_api_local/branding/default/logo.png",
					"more_games_image²": "",
					"more_games_image2²": "",
					"more_games_image3²": "",
					more_games_url: "",
					preload_image: "fg_api_local/images/invisPreloadImage.png",
					test_preload_image: "fg_api_local/images/invisPreloadImage.png"
				},
				"de": {
					"api.back": "&laquo; zur&uuml;ck",
					"api.more": "&raquo; mehr Spiele",
					"api.fullscreen": "Vollbildmodus",
					"api.payment": "Credits kaufen",
					"api.close": "Schlie&szling;en",
					"api.ad_modal_header": "Werbung schlie\u00dft automatisch in&hellip;",
					"api.ad_modal_header2": "Kurze Werbepause&hellip;",
					"api.teaser_modal_header": "Spiele jetzt den n\u00e4chsten Teil&hellip;",
					"api.payment_success": "Bezahlung erfolgreich!",
					"api.payment_credits_available": "Credits verf\u00fcgbar",
					"api.screenshot": "Screenshot",
					"api.continue": "Weiter",
					"api.play_now": "Jetzt spielen",
					"api.previous": "Vorheriges",
					"api.next": "N\u00e4chstes Spiel",
					"api.home": "Home"
				},
				"en": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home"
				},
				"tr": {
					"api.back": "&laquo; Geri",
					"api.more": "&raquo; Daha Fazla Oyun",
					"api.fullscreen": "Tam ekran",
					"api.payment": "Kredi Sat\u0131n Al",
					"api.close": "Kapat",
					"api.ad_modal_header": "Reklam &ndash; otomatik kapanacakt\u0131r&hellip;",
					"api.ad_modal_header2": "Reklam&hellip;",
					"api.teaser_modal_header": "Sonraki B\u00f6l\u00fcm&hellip;",
					"api.payment_success": "\u00d6deme ba\u015far\u0131l\u0131 oldu!",
					"api.payment_credits_available": "Kredi al\u0131nabilir",
					"api.continue": "Devam",
					"api.play_now": "Oyna",
					"api.previous": "Geri",
					"api.next": "\u0130leri",
					"api.home": "Ba\u015fla"
				},
				"es": {
					"api.back": "&laquo; Back",
					"api.more": "&raquo; More Games",
					"api.fullscreen": "Fullscreen mode",
					"api.payment": "Buy Credits",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement closes in&hellip;",
					"api.ad_modal_header2": "Advertisement&hellip;",
					"api.teaser_modal_header": "Continue with the next episode&hellip;",
					"api.payment_success": "Payment successful!",
					"api.payment_list": "Purchase List",
					"api.payment_items": "Items",
					"api.payment_credits_available": "Credits available",
					"api.screenshot": "Screenshot",
					"api.continue": "Continue",
					"api.play_now": "Play now",
					"api.previous": "Previous",
					"api.next": "Next Game",
					"api.home": "Home"
				}
			},
			"branding": {
				more_games_image: "fg_api_local/branding/default/logo.png",
				more_games_url: "",
				preload_image: "fg_api_local/invisPreloadImage.png",
				test_preload_image: "fg_api_local/testPreloadImage.png"
			},
			"style": "\t<style type=\"text\/css\">\n\t\t#fg-overlay{display:none}\n\t<\/style>",
			"headerHtml": "<header id=\"fg-header\"><div id=\"fg-back\" class=\"icon-arrow icon-arrow-left\" data-fg-module=\"navigation\" data-fg-method=\"show\"><\/div><div id=\"fg-logo\"><img src=\"fg_api_local\/branding\/default\/logo.png\" alt=\"\"><\/div><div class=\"fg-clip\" id=\"fg-clip\"><div class=\"fg-clip-btn\"><img src=\"fg_api_local\/branding\/default\/icon.png\" alt=\"\"><\/div><\/div><\/header>",
			"menuHtml": "<ul><li data-famobi-href=\"back\"><a href=\"javascript:void(0);\" data-i18n=\"api.back\"><\/a><\/li><li data-famobi-href=\"moreGames\"><a href=\"javascript:void(0);\" data-i18n=\"api.more\"><\/a><\/li><li data-famobi-fullscreen><a href=\"javascript:void(0);\" data-i18n=\"api.fullscreen\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"de\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"fg_api_local\/images\/flag_de.png\" alt=\"de\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"en\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"fg_api_local\/images\/flag_en.png\" alt=\"en\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"tr\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"fg_api_local\/images\/flag_tr.png\" alt=\"tr\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"es\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"fg_api_local\/images\/flag_es.png\" alt=\"es\"><\/a><\/li><\/ul>"	};

		faZepto.getJSON("famobi.json", function(gameData) {
			faZepto.extend(!0, configData, gameData || {});
			window.famobi = new fg_api(configData, _fgq, '1');
		});
	};
	firstJS.parentNode.insertBefore(fgJS, firstJS);
})(document, 'fg_api_local/gameapi.js');
