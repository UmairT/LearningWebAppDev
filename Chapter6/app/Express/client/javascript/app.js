// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

"use strict";

function generateResults(results) {

	var $resultString= $("<p>").html("Game Result: " + results.outcome + "<br><br>Total Wins: " + results.wins +
		"<br>Total losses: " + results.losses + "<br>Total ties: " + results.ties);

	console.log("got JSON");
	return $resultString;
}

function processResults(path) {
	var $result;

	$.getJSON(path, function(results) {
		$("main .gameResults").empty();
		$result = generateResults(results);
		$("main .gameResults").append($result);
	});
}

var main = function() {
	$("#rock").click(function() {
		processResults("/play/rock");
	});
	
	$("#paper").click(function() {
		processResults("/play/paper");
	});

	$("#scissors").click(function() {
		processResults("/play/scissors");
	});

	$("#lizard").click(function() {
		processResults("/play/lizard");
	});

	$("#spock").click(function() {
		processResults("/play/spock");
	});
};
	
$(document).ready(main);