// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
var main = function () {
    "use strict"

    var toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                $slideshow,
                $screenshot1,
                $screenshot2,
                $screenshot3,
                $screenshot4,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */

                $button.on("keypress", function (event) { 
                    if (event.keyCode === 13) {
                        if ($input.val() !== "") {
                            toDos.push($input.val());
                            $input.val("");
                        }
                    }
                });

                $content = $("<div>").append($input).append($button);
            }

            else if ($element.parent().is(":nth-child(4)")) {
                $slideshow = $("<script>");

                $slideshow.text("jQuery('a.gallery').colorbox({opacity:0.5, rel:'group1', slideshow:true});");

                $screenshot1 = $("<a class='gallery' href='Screenshot1.png'>Start SlideShow</a>");
                $screenshot2 = $("<a class='gallery' href='Screenshot2.png'></a>");
                $screenshot3 = $("<a class='gallery' href='Screenshot3.png'></a>");
                $screenshot4 = $("<a class='gallery' href='Screenshot4.png'></a>"); 

                $content = $("<ul>").append($screenshot1, $screenshot2, $screenshot3, $screenshot4, $slideshow);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
