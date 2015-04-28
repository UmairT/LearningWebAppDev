// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

//#!/usr/bin/env node

"use strict";

var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app), // Create our Express-powered HTTP server
    socketIO = require("socket.io"),
    io = socketIO(server),
    mongoose = require("mongoose"), // import the mongoose library
    bodyParser = require("body-parser");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect to the amazeriffic data store in mongo
mongoose.connect("mongodb://localhost/amazeriffic");

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

app.get("/todos.json", function(req, res) {
    ToDo.find({}, function(err, toDos) {
        res.json(toDos);
    });
});

io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

io.on("connection", function(socket) {
    socket.on("todo item", function(item) {
        console.log("todo: " + item);
    });
});

io.on("connection", function(socket) {
    socket.on("todo item", function(item) {
        io.emit("todo item", item);
    });
});

app.post("/todos", function(req, res) {
    console.log(req.body);
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });
    newToDo.save(function(err, result) {
        if (err !== null) {
            // the element did not get saved!
            console.log(err);
            res.send("ERROR");
        } else {
            // our client expects *all* of the todo items to be returned, so we'll do
            // an additional request to maintain compatibility
            ToDo.find({}, function(err, result) {
                if (err !== null) {
                    // the element did not get saved!
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});

// tell the server to listen on port 3000
server.listen(3000, function() {
    console.log("Server is listening at http://localhost:3000/");
});
