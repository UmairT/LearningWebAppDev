// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

//#!/usr/bin/env node

"use strict";

var http = require("http"),
    server, 
    jsonObject = {
	"outcome": "", 
	"wins": 0, 
	"losses": 0, 
	"ties": 0 };
	
function beginPage(res, title) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html lang='en'>\n");
    res.write("<head>\n");
    res.write("<meta charset='utf-8'>\n");
    res.write("<title>"+ title + "</title>\n");
    res.write("<link rel='stylesheet' href='style.css' type='text/css'>\n");
    res.write("</head>\n");
    res.write("<body>\n");
}

function endPage(res) {
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
}

function writeHeading(res, tag, title) {
    res.write("<" + tag + ">" + title + "</" + tag + ">\n");
}

function createButtons(res) {
    res.write("<form method='POST' action='/play/rock'>\n");
    res.write("<input type='submit' value='Rock'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/paper'>\n");
    res.write("<input type='submit' value='Paper'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/scissors'>\n");
    res.write("<input type='submit' value='Scissors'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/lizard'>\n");
    res.write("<input type='submit' value='Lizard'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/spock'>\n");
    res.write("<input type='submit' value='Spock'>\n");
    res.write("</form>\n<br>");
    res.write("<form method='POST' action='/../..'>\n");
    res.write("<input type='submit' value='Home'>\n");
    res.write("</form>\n<br>");
}

function gameLogic(req, res) {

	var resArray = ["rock", "paper", "scissors", "lizard", "spock"];
	var rand = resArray[Math.floor(Math.random() * resArray.length)];
	
	if (req.method === "POST" && req.url === "/play/rock") {
        if (rand === "lizard" || rand === "scissors") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (rand === "paper" || rand === "spock") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
        res.write("<p>Server Choice: " + rand + "</p>\n");
    } else if (req.method === "POST" && req.url === "/play/paper") {
        if (rand === "rock" || rand === "spock") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (rand === "scissors" || rand === "lizard") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
        res.write("<p>Server Choice: " + rand + "</p>\n");
    } else if (req.method === "POST" && req.url === "/play/scissors") {
        if (rand === "paper" || rand === "lizard") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (rand === "rock" || rand === "spock") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
        res.write("<p>Server Choice: " + rand + "</p>\n");
    } else if (req.method === "POST" && req.url === "/play/lizard") {
        if (rand === "paper" || rand === "spock") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (rand === "rock" || rand === "scissors") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
        res.write("<p>Server Choice: " + rand + "</p>\n");
    } else if (req.method === "POST" && req.url === "/play/spock") {
        if (rand === "rock" || rand === "scissors") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (rand === "paper" || rand === "lizard") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
        res.write("<p>Server Choice: " + rand + "</p>\n");
    }
    res.end(JSON.stringify(jsonObject));
}

function frontPage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    
    var title = "Rock Paper Scissors Lizard Spock",
    	options = "Choose one of the following options:";
    
    beginPage(res, title);
    writeHeading(res, "h1", title);
    writeHeading(res, "h2", options);
    
    createButtons(res);

    if (req.method === "POST") {
        gameLogic(req, res);
    }
    
    endPage(res);
}

var server = http.createServer(frontPage);
server.listen(3000);

console.log("Server running on port 3000");