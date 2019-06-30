var express = require("express");
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("./config/default.json"));
var app = express() ;

app.use(express.static("./public"));

//Set views
app.set("views" , "./views");
app.set("view engine" , "ejs");

var server = require("http").Server(app);

server.listen(config.server.port , config.server.host , function(){
    console.log("Server is running on " , config.server.port , "hostname: " , config.server.host)
})

app.get("/trangchu" , (req , res)=>{
    res.render("trangchu");
})

var io = require("socket.io")(server);
var usernames = [] ;
io.on("connection" , function(socket){
    
    console.log("Co nguoi ket noi den server ,id: " , socket.id);
    var id = socket.id;
    socket.on("addUsername" , function(username){
        socket.username = username ; 
        usernames.push({username , id});
        var data = {
            sender : "SERVER" ,
            username : username ,
            users : usernames
        }
        socket.broadcast.emit("server_send_data" , data );
    })
    socket.on("client_send_data" , function(data){
        console.log(socket.username + " sends " + data);
       
    })
    
  
    
    socket.on("disconnect" , function(){
        console.log(socket.username + " has left web");
        console.log(usernames);
    })
})