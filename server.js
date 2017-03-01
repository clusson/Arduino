var express  = require('express');
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

var port = 8888;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

io.on("connection",(socket)=>{
      socket.emit("connected");

      socket.on("data",(data)=>{
        io.sockets.emit("data_received",data);
        console.log(data);
      });

});
