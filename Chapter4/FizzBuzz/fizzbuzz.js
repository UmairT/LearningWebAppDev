// Client-side code
var main = function () {
    "use strict";
    var $content, $newline;

	// gets the values to print
	function addline(num) {
		$newline = $("<span>").text(num + " ");
		$("body").append($newline);
	}

	// space to separate output for each function
	function endspace()
	{
		$content = $("<p>");
		$("body").append($content);
	}
	
	// fizzbuzz functions
	function fizzbuzz_1() {
		var i;
		for (var i = 1; i <= 101; i++) {
			if (i % 3 === 0 && i % 5 === 0)
				addline("FizzBuzz");
			else if (i % 3 === 0)
				addline("Fizz");
			else if (i % 5 === 0)
				addline("Buzz");
			else
				addline(i);
		}
		endspace();
	}


	function fizzbuzz_2 (start, end) {
		var i;
		for (var i = start; i <= end; i++) {
			if (i % 3 === 0 && i % 5 === 0)
				addline("FizzBuzz");
			else if (i % 3 === 0)
				addline("Fizz");
			else if (i % 5 === 0)
				addline("Buzz");
			else
				addline(i);
		}
		endspace();
	}

	function fizzbuzz_3 (arr) {
		var i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i] % 3 === 0 && arr[i] % 5 === 0) {
				addline("FizzBuzz");
			} else if (arr[i] % 5 === 0) {
				addline("Buzz");
			} else if (arr[i] % 3 === 0) {
				addline("Fizz");
			} else {
				addline(arr[i]);
			}	
		}
		endspace();
	}

	function fizzbuzz_4 (obj) {
		var i;
		for (i = 1; i <= 101; i++) {
			if (i % 3 === 0 && i % 5 === 0) {
				addline(obj.divisibleByThree + obj.divisibleByFive);
			} else if (i % 5 === 0) {
				addline(obj.divisibleByFive);
			} else if (i % 3 === 0) {
				addline(obj.divisibleByThree);
			} else {
				addline(i);
			}	
		}
		endspace();
	}

	function fizzbuzz_5 (arr, obj) {
		var i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i] % 3 === 0 && arr[i]%5 === 0) {
				addline(obj.divisibleByThree + obj.divisibleByFive);
			} else if (arr[i]%5 === 0) {
				addline(obj.divisibleByFive);
			} else if (arr[i]% 3 === 0) {
				addline(obj.divisibleByThree);
			} else {
				addline(arr[i]);
			}	
		}
		endspace();
	}
	
	// function calls
	fizzbuzz_1();
	fizzbuzz_2(200, 300);
	fizzbuzz_3([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]);
	fizzbuzz_4({ divisibleByThree:"foo", divisibleByFive: "bar"});
	fizzbuzz_5([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], { divisibleByThree:"foo", divisibleByFive: "bar"});
};

$(document).ready(main);
