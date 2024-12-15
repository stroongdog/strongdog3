var MODE_CONTAINER = "com.proletarium.social.MODE_CONTAINER";
var MODE_EXTERNAL = "com.proletarium.social.MODE_EXTERNAL";

var FRAMEWORK_OK = "com.proletarium.social.Odnoklassniki";
var FRAMEWORK_FB = "com.proletarium.social.Facebook";
var FRAMEWORK_MR = "com.proletarium.social.MailRu";
var FRAMEWORK_VK = "com.proletarium.social.Vkontakte";

var protocol = "http";

var paramsToSet = null;
var ok_api_initialized = false;
var fb_api_initialized = false;
var fo_initialized = false;

window.flashObj = null;

var feedPostingObject = null;
var currentPopup = null;
var currentPopupOpener = null;

// Cross-browser hasOwnProperty solution
function hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]);
}
if (Object.prototype.hasOwnProperty) {
    var hasOwnProperty = function(obj, prop) {
        return obj.hasOwnProperty(prop);
    }
}


window.fbAsyncInit = function() {
	FB.init({
		appId      : '335820976492937',
		xfbml      : true,
		version    : 'v2.2'
	});
	fb_api_initialized = true;
	FB.getLoginStatus(fb_statusCheckCallback);
};


// Callback that is being executed by app when it loads
function swf_ready() {
	protocol = location.protocol.substr(0, location.protocol.length - 1);
	//if (!flashObj) flashObj = document.getElementsByClassName("application")[0];
	if (!flashObj) flashObj = document.getElementById('haxe:openfl');
	flashObj.setCommonParams( { protocol: protocol }, true );
	
	//flashObj.style.position = "relative";
	return 0;
}

function swf_initSocial(from, mode) {
	var params = {};
	if (mode == MODE_CONTAINER) {
		if (from == FRAMEWORK_OK) {
			var params_arr = FAPI.Util.getRequestParameters();
			for(var key in params_arr) params[key] = params_arr[key];
			FAPI.init(
				params["api_server"], params["apiconnection"],
				ok_initSuccess, ok_initError
			);
			flashObj.initSocial(from, params);
			fo_initialized = true;
		} else if (from == FRAMEWORK_FB) {
			if (fb_api_initialized) FB.getLoginStatus(fb_statusCheckCallback);
			//fo_initialized = true;
		} else if (from == FRAMEWORK_MR) {
			paramsToSet = getGetParams();
			mailru.loader.require("api", mr_loaderCallback);
		} else if (from == FRAMEWORK_VK) {
			VK.init(vk_initSuccess, vk_initError, 'ENV_VK_API_VERSION');
		} else {
			params = getGetParams();
			flashObj.initSocial(from, params);
		}
	} else {
		if (from == FRAMEWORK_MR) {
			paramsToSet = getGetParams();
			mailru.loader.require("api", mr_loaderCallback);
		} else {
			try {
				flashObj.initSocial(from, {});
			} catch(e) {
				console.error(e);
			}
			fo_initialized = true;
		}
	}
	
	console.info("Framework [%s] is ready", from);
	
	return 0;
}

function openWindow(from, url) {
	
	currentPopupOpener = from;
	
	var params = "menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no,width=600,height=400"
	currentPopup = window.open(url, "_blank", params);
	currentPopup.focus();
	setTimeout(clearPopup, 20000);
	
	return 0;
}

function onPopupLoad(href) {
	
	
	var qmIdx = href.indexOf('?');
	var hsIdx = href.indexOf('#');
	
	var paramsHashStr = href.substr(hsIdx + 1);
	href = href.substr(0, hsIdx);
	var paramsGetStr = href.substr(qmIdx + 1);
	var paramsArrHash = paramsHashStr.indexOf('&') > 0 ? paramsHashStr.split('&') : [ ];
	var paramsArrGet = paramsGetStr.indexOf('&') > 0 ? paramsGetStr.split('&') : [ ];
	var paramsArr = paramsArrHash.concat(paramsArrGet);
	
	var params = {};
	for (key in paramsArr) {
		paramsArr[key] = paramsArr[key].split('=');
		params[paramsArr[key][0]] = paramsArr[key][1];
	}
	
	
	
	if (hasOwnProperty(flashObj, 'popupCallback') && typeof flashObj.popupCallback === 'function') {
		flashObj.popupCallback(currentPopupOpener, params);
	}
	else console.error("Warning! Flash object has no method 'popupCallback'!");
	
	currentPopup.close();
	currentPopup = null;
	currentPopupOpener = null;
}

function clearPopup() {
	
	if (currentPopup != null) {
		if (hasOwnProperty(flashObj, 'popupCallback') && typeof flashObj.popupCallback === 'function') {
			flashObj.popupCallback(currentPopupOpener, null);
			currentPopup.close();
			currentPopup = null;
			currentPopupOpener = null;
		}
	}
}

/******************************************************************************
 *
 *						ODNOKLASSNIKI API FUNCTIONS
 *
 *****************************************************************************/

function ok_request(params) {
	var method = params.method;
	FAPI.Client.call(params, function(status, result, data) {
		
		flashObj.ok_requestCallback(method, status, result);
	});
	return 0;
}

function ok_permissions(permissions) {
    FAPI.UI.showPermissions("[\"" + permissions.join('", "') + "\"]");
    // в результате будет вызвана функция API_callback
    // стоит обратить внимание на то, что если пользователь снял галочку, но все равно нажал кнопку "Разрешить",
    // вернется результат "ok", но разрешение предоставлено не будет
	return 0;
}

function ok_publish(message) {
	var description_utf8 = message;
	// подготовка параметров для публикации
	feedPostingObject = {
		method: 'stream.publish',
		message: description_utf8,
		attachment: JSON.stringify({'caption': message}),
		action_links: '[]'
	};
	// расчёт подписи
	sig = FAPI.Client.calcSignature(feedPostingObject);
	// вызов окна подтверждения
	FAPI.UI.showConfirmation('stream.publish', message, sig);
	return 0;
}

function ok_post(data, setStatus) {
	FAPI.UI.postMediatopic(data, setStatus);
	return 0;
}

function ok_invite(title, custom_args, selected_uids) {
	FAPI.UI.showInvite(title, custom_args, selected_uids);
	return 0;
}

function ok_buy(item_name, item_description, product_code, price) {
	FAPI.UI.showPayment(item_name, item_description, product_code, price, null, null, "ok", "true");
	return 0;
}

/*
 * Эта функция вызывается после завершения выполнения следующих методов:
 * showPermissions, showInvite, showNotification, showPayment, showConfirmation, setWindowSize
 */
function API_callback(method, result, data) {
	
	
	if (method == "showConfirmation" && result == "ok")
	{
		FAPI.Client.call(
			feedPostingObject,
			function(p_status, p_data, p_error) {
				console.log(p_status + " - " + p_data);
				console.log(p_error);
				
				result = p_status;
				data = p_error ? p_error : p_data;
			},
			data
		);
		feedPostingObject = null;
	}
	
	if (result == 'error')
	{
		var obj = JSON && JSON.parse(data) || $.parseJSON(data);
		data = { error_code: obj.code, error_message: obj.message };
	}
	
	flashObj.apiCallback(FRAMEWORK_OK, method, data);
}

function ok_initSuccess() {
	ok_api_initialized = true;
}
function ok_initError(error) {
	
	if (flashObj) flashObj.onError(FRAMEWORK_OK, "init", error);
}

/******************************************************************************
 *
 *							MAIL.RU API FUNCTIONS
 *
 *****************************************************************************/

function mr_loaderCallback() {
	try {
		mailru.app.init(flashObj.mr_getPrivateKey());
		fo_initialized = true;
	} catch (e) {
		console.warn(" - Mail.ru error:");
		console.error(e);
	}
	if (fo_initialized) {
		mailru.events.listen(mailru.app.events.paymentDialogStatus, mr_paymentCallback);
		mailru.events.listen(mailru.app.events.friendsInvitation, mr_invitationCallback);
		mailru.events.listen(mailru.app.events.friendsRequest, mr_requestCallback);
		mailru.events.listen(mailru.common.events.streamPublish, mr_postCallback);
		mailru.events.listen(mailru.app.events.incomingPayment, mr_paymentCallback);
	}
	flashObj.initSocial(FRAMEWORK_MR, paramsToSet);
	paramsToSet = null;
}

function mr_invite(message) {
	mailru.app.friends.invite( { text: message } );
	return 0;
}
function mr_invitationCallback(event) {
	
	flashObj.mr_invitationCallback(event);
}

function mr_request(params) {
	mailru.app.friends.request(params);
	return 0;
}
function mr_requestCallback(event) {
	
	flashObj.mr_requestCallback(event);
}

function mr_post(params) {
	mailru.common.stream.post(params);
	return 0;
}
function mr_postCallback(event) {
	
	flashObj.mr_postCallback(event);
}

function mr_openPaymentsDialog(params) {
	mailru.app.payments.showDialog(params);
	return 0;
}
function mr_paymentCallback(event) {
	
	flashObj.mr_paymentCallback(event);
}

function mr_openUrlInPage(url) {
	document.location = url;
	return 0;
}

function mr_setHeader(html) {
	var headerElem = document.getElementById("header");
	headerElem.innerHTML = html;
	return 0;
}

function mr_setFooter(html) {
	var footerElem = document.getElementById("footer");
	footerElem.innerHTML = html;
	return 0;
}

/******************************************************************************
 *
 *							FACEBOOK API FUNCTIONS
 *
 *****************************************************************************/

 var fb_uiMethod = null;
 
function fb_statusCheckCallback(response) {
	
	var result = hasOwnProperty(response, "authResponse") ? response.authResponse : null;
	if (/*response.status === 'connected' && */!fo_initialized) {
		flashObj.initSocial(FRAMEWORK_FB, result);
		fo_initialized = true;
	}/* else if (response.status === 'not_authorized' && !fo_initialized) {
		FB.login(function (response) {
			FB.getLoginStatus(fb_statusCheckCallback);
		});
	}*/
}

function fb_login(scopeObj) {
	
	FB.login(function(response) {
		
		if (hasOwnProperty(response, "authResponse")) {
			if (!fo_initialized) flashObj.initSocial(FRAMEWORK_FB, response.authResponse);
			else flashObj.setParams(FRAMEWORK_FB, "login", response.authResponse, true, true);
		}
	}, scopeObj);
	return 0;
}

function fb_api(path, method, params) {
	
	FB.api(path, method, params, function (response) {
		
		if ((hasOwnProperty(flashObj, 'apiCallback') || flashObj.apiCallback != undefined) && typeof flashObj.apiCallback === 'function') {
			flashObj.apiCallback(FRAMEWORK_FB, path, response);
		}
	});
	return 0;
}

function fb_ui(method, params) {
	if (fb_uiMethod != null) return 1;
	fb_uiMethod = method;
	params.method = method;
	FB.ui(params, fb_uiCallback);
	return 0;
}

function fb_uiCallback(response) {
	if (fb_uiMethod == null) return;
	
	if (response.error_code) flashObj.onError(FRAMEWORK_FB, fb_uiMethod, response);
	else {
		switch(fb_uiMethod) {
			case 'pay':
				flashObj.fb_paymentCallback(response);
				break;
			case 'apprequests':
				flashObj.fb_inviteCallback(response);
				break;
			default: break;
		}
	}
	fb_uiMethod = null;
}

/******************************************************************************
 *
 *							VKONTAKTE API FUNCTIONS
 *
 *****************************************************************************/

function vk_request(method, params) {
	VK.api(method, params, function(response) {
		
		if ((hasOwnProperty(flashObj, 'apiCallback') || flashObj.apiCallback != undefined) && typeof flashObj.apiCallback === 'function') {
			flashObj.apiCallback(FRAMEWORK_VK, method, response);
		}
	});
	return 0;
}

function vk_clientAPI(method, params) {
	params.unshift(method);
	VK.callMethod.apply(this, params);
	return 0;
}

function vk_showBuyWindow(method, params) {
	VK.callMethod(method, params);
	return 0;
}

function vk_onRequestSuccess() {
	
	flashObj.vk_requestCallback("success");
}
function vk_onRequestCancel() {
	
	flashObj.vk_requestCallback("canceled");
}
function vk_onRequestFail() {
	
	flashObj.vk_requestCallback("failed");
}
function vk_onSettingsChanged(settings) {
	
	flashObj.vk_onSettingsChanged(settings);
}
function vk_onBalanceChanged(balance) {
	
	flashObj.vk_onBalanceChanged(balance);
}
function vk_onOrderSuccess(orderId) {
	
	flashObj.vk_orderCallback("success", orderId);
}
function vk_onOrderCancel() {
	
	flashObj.vk_orderCallback("canceled");
}
function vk_onOrderFail(errorCode) {
	
	flashObj.vk_orderCallback("failed", errorCode);
}

function vk_initSuccess() {
	flashObj.initSocial(FRAMEWORK_VK, getGetParams());
	fo_initialized = true;
	VK.addCallback("onRequestSuccess", vk_onRequestSuccess);
	VK.addCallback("onRequestCancel", vk_onRequestCancel);
	VK.addCallback("onRequestFail", vk_onRequestFail);
	VK.addCallback("onSettingsChanged", vk_onSettingsChanged);
	VK.addCallback("onBalanceChanged", vk_onBalanceChanged);
	VK.addCallback("onOrderSuccess", vk_onOrderSuccess);
	VK.addCallback("onOrderCancel", vk_onOrderCancel);
	VK.addCallback("onOrderFail", vk_onOrderFail);
}
function vk_initError() {
	console.error("VK API initialization failed");
	fo_initialized = false;
}

// UTILS

function getGetParams(asHttpQuery) {
	var result = asHttpQuery ? "" : {}, tmp = null;
	if (asHttpQuery) {
		result = location.search.substr(1);
	} else {
		var items = location.search.substr(1).split("&");
		if (items.length > 0)
			for (var index = 0; index < items.length; index++) {
				if (items[index].length <= 0) continue;
				tmp = items[index].split("=");
				result[tmp[0]] = tmp[1];
		}
	}
	return result;
}

