var express = require("express") ;

var app = express() ; 

var server = require("http").Server(app) ;

server.listen(3000 , function(){
    console.log("Server is running on port 3000")
}) 

//Set view
app.set("views" ,  "./views") ; 
app.set("view engine" , "ejs");

//Use static
app.use(express.static("public"));
app.get("" , (req , res) => {
    res.render("trangchu")
})
var io = require("socket.io")(server);

var usernames = [];
io.on("connection" , function(socket){
    console.log("Co nguoi ket noi den server , id: " + socket.id )
    socket.on("addUserName" , function(username){
        socket.username = username ; 
        var d = 1 ; 
        usernames.forEach( ( name , index )=>{
            if(name == username ){
                d = 0 ;
            }
        })
        if(d == 0 ){
            var data = {
                success : false , 
                message : "username has existed"
            }
            socket.emit("server_send_user" , data);
        }
        else{
            usernames.push(username);
            var data = {
                success : true ,
                user : username
            }
            console.log(usernames);
            socket.emit("server_send_user" , data );
            var message = username + " joins chat room";
            socket.broadcast.emit("server_send_list_currentUser" , message )
        }
        
        


        //socket.broadcast.emit("server_send_currentUsers" , username );
        io.sockets.emit("server_send_currentUsers" , usernames)

        socket.on("user_send_text" ,  function(text){
            var data = {
                sender : "You", 
                message : text 
            }

            socket.emit("server_send_text" , data);

            var data = {
                sender : socket.username , 
                message : text 
            }

            socket.broadcast.emit("server_send_text" , data)
        })

        socket.on("user_focus_inputText" , function(){
            var message = socket.username + " is typing" ;
            socket.broadcast.emit("server_send_inputText" , message)
        })

        socket.on("user_focusout_inputText" , function(){
            socket.broadcast.emit("server_send_inputText", "" )
        })
        socket.on("disconnect" , function(){
            usernames.forEach( (user , index) => {
                if(user == socket.username){
                    usernames.splice( index , 1);
                }
            })
          
                 
            var  message = socket.username + " has left chat room"
            
            socket.broadcast.emit("server_send_list_currentUser" , message)
            io.sockets.emit("server_send_currentUsers" , usernames)
        })

        
    })
})