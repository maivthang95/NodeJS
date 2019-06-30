var express = require("express") ;
var app = express();

app.use(express.static("public"));

app.set("views" , "./views");
app.set("view engine" , "ejs"); 

var server = require("http").Server(app);

server.listen(3000 , function(){
    console.log("Server is running on port 3000");
})

app.get("/" , (req , res)=> {
    res.render("trangchu");
})

var io = require("socket.io")(server);

io.on("connection" , function(socket){
    console.log("Co nguoi ket noi den server");
    console.log(socket.adapter.rooms);
    socket.on("create_room" , function(data){
        socket.room = data  ;
        socket.join(data);
        var rooms = [];
        for(var r in socket.adapter.rooms){
            rooms.push(r);
        }
        io.sockets.emit("server_send_rooms" ,  rooms)
        socket.emit("server_send_current_room" , data)
    })

    socket.on("user_send_message_to_server" ,  function(message){
        io.sockets.in(socket.room).emit("server_chat" ,  message)
    })
})
