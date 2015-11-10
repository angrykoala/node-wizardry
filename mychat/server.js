var express = require("express"); //"loads" express framework library
var app = express(); //new express app (some magic here)
var http = require('http').Server(app); //http server using app
var io = require('socket.io')(http); //attach out socket.io to our server


app.use(express.static('public'));

//what happens with a get request to our server?
app.get('/', function(req, res) {
	//this function is a magical callback
	//req is the request info, response is used to send our funny stuff
	res.redirect('/client.html');
});

//when a socket connects
io.on('connection', function (socket) { //the callback arg is the connected socket
 	console.log("User connected");

	//attach an event listener (msg) to connected socket
	socket.on('msg', function (content) {
		io.emit('receive', content);
  	});
	//will fire when socket disconnects
	socket.on('disconnect', function () {
		console.log('User disconnected');
	});
});

//server starts listening to port 9090
http.listen(9090, function() {
	//Another magical callback
	console.log("Magic happens in port 9090");
});
