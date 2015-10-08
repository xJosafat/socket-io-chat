var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
	res.sendFile('/Users/Josafat/Desktop/learn/socket-io-chat/index.html');
});

io.on('connection', function(socket){
	socket.broadcast.emit('chat message', "a user connected");
	socket.on('disconnect', function(){
		io.emit('chat message', "user disconnected");
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

server.listen(3000, function(){
	console.log('listening on *:3000');
});