// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

//#!/usr/bin/env node

"use strict";

var express = require("express"),
    http = require("http"),
    app = express(),
    userChoice,
    serverChoice,
    jsonObject = {};
	
jsonObject.outcome = "";
jsonObject.wins = 0;
jsonObject.losses = 0; 
jsonObject.ties = 0;
jsonObject.userChoice = "";
jsonObject.serverChoice = "";
	
function gameLogic(userChoice) {

	var resArray = ["rock", "paper", "scissors", "lizard", "spock"];
	var rand = resArray[Math.floor(Math.random() * resArray.length)];
	
	serverChoice = rand;
	
	jsonObject.userChoice = userChoice;
	jsonObject.serverChoice = serverChoice;
	
	if (userChoice === "rock") {
        if (serverChoice === "lizard" || serverChoice === "scissors") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (serverChoice === "paper" || serverChoice === "spock") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
    } else if (userChoice === "paper") {
        if (serverChoice === "rock" || serverChoice === "spock") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (serverChoice === "scissors" || serverChoice === "lizard") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
    } else if (userChoice === "scissors") {
        if (serverChoice === "paper" || serverChoice === "lizard") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (serverChoice === "rock" || serverChoice === "spock") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
    } else if (userChoice === "lizard") {
        if (serverChoice === "paper" || serverChoice === "spock") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (serverChoice === "rock" || serverChoice === "scissors") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
    } else if (userChoice === "spock") {
        if (serverChoice === "rock" || serverChoice === "scissors") {
        	jsonObject.outcome = "win";
        	jsonObject.wins += 1;
        } else if (serverChoice === "paper" || serverChoice === "lizard") {
        	jsonObject.outcome = "lose";
        	jsonObject.losses += 1;
        } else {
        	jsonObject.outcome = "tie";
        	jsonObject.ties += 1;
        }
    }
}

app.use(express.static(__dirname + "/client"));

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// set up our routes
app.get("/play/rock", function (req, res) {
	gameLogic("rock");					// updates json object
	res.json(jsonObject); 				// sends json object
});

app.get("/play/paper", function (req, res) {
	gameLogic("paper");					// updates json object
	res.json(jsonObject); 				// sends json object
});

app.get("/play/scissors", function (req, res) {
	gameLogic("scissors");				// updates json object
	res.json(jsonObject); 				// sends json object
});

app.get("/play/lizard", function (req, res) {
	gameLogic("lizard");				// updates json object
	res.json(jsonObject); 				//	sends json object
});

app.get("/play/spock", function (req, res) {
	gameLogic("spock");					// updates json object
	res.json(jsonObject); 				// sends json object	
});

// set up the root route
app.get("/", function (req, res) {
    res.send("This is the root route!");
});

console.log("Server is listening at http://localhost:3000/");