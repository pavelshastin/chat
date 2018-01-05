var http = require("http");
var Static = require("node-static");
var WebSocketServer = require("ws");


var wss = new WebSocketServer.Server({port: 8080});

wss.on("connection", function(ws){
  
  ws.on("message", function(mes){
    

    ws.send(mes);
  });


  
});




var server = new Static.Server(".");

http.createServer(function(req, res){

  server.serve(req, res)


}).listen(8080);

console.log("Server is listening port 8080")