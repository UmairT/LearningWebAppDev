var main = function () {
	"use strict";

	var $button = $("<button>").text("Check Api");
	$('main .result').append($button);

	$button.on("click", function () {
		$.ajax({
		url: 'http://api.themoviedb.org/3/search/movie?api_key=5760c5d7185a5ec3493b63d13e65394c&query=frozen',
		data: {
			format: 'json'
		},
		error: function() {
			$('main .result').append('<p>error in ajax</p>');
		},
		dataType: 'jsonp',
		success: function(data) {
			//$('main .result').append('<p>'+ data.overview +'</p>');
			findMovie(data.results[0].id);
		},
		type: 'Get'
		});	
	});

	function findMovie (id) {
		$.ajax({
		url: 'http://api.themoviedb.org/3/movie/' + id + '?api_key=5760c5d7185a5ec3493b63d13e65394c',
		data: {
			format: 'json'
		},
		error: function() {
			$('main .result').append('<p>error in ajax</p>');
		},
		dataType: 'jsonp',
		success: function(data) {
			$('main .result').append('<p>'+ data.overview +'</p>');
		},
		type: 'Get'
		});	
	}

};
$(document).ready(main);
