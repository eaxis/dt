function class_mood() {
	var self = this;

	self.moods = {
		'mood-bad': 'Все наладится',
		'mood-default': 'Выше нос',
		'mood-good': 'Это замечательно'
	};

	self.start = function() {
		$('#mood-bad, #mood-default, #mood-good').on('click', function() {
			var mood = $(this).attr('id');
			var name = (self.getName()) ? ', ' + self.getName() : '';
			$('.content-top h1').html(self.moods[mood] + name).css({'font-size': '50pt'});
		});
	}

	self.getName = function() {
		if (!document.cookie || document.cookie.indexOf('dt_settings') == -1) {
			return false;
		}

		var name = document.cookie.split('dt_settings=')[1];

		if (name.indexOf(';') != -1) {
			name = name.split(';')[0];
		}

		name = atob(decodeURIComponent(name));
		name = decodeURIComponent(name);

		return name;
	}
}

var mood = new class_mood();

$(document).ready(function() {
	mood.start();
});