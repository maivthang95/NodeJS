
const io = require("socket.io")(3000)

var users = []; 
var users_list = []; 
io.on("connection" , function(socket){
    console.log("Co nguoi ket noi den server " + socket.id ) ; 

    
    socket.emit("server_send_users_online" ,users );

    socket.on("client_send_username" , function(data){
        socket.username = data.username ;
        socket.peer_id = data.peer_id ;
        var d = 1 ;
       
        users.forEach( (user , index) => {
            if(user.username == data.username ){
                d = 0 ;
                socket.emit("server_send_error" , "Username đã tồn tại");
            }
             
        })
       
        if( d== 1){
            users.push( { username : data.username , peer_id : data.peer_id });
            socket.broadcast.emit("server_send_users_online" , users);
            socket.emit("server_send_myusername" , data.username)
        }
        
        console.log(users);
    })

    socket.on("disconnect" , function(){
        users.forEach( (user , index ) => {
            if(user.username == socket.username){
                users.splice(index , 1);
            }
        })
        socket.broadcast.emit("server_send_announce" , socket.username)
        socket.broadcast.emit("server_send_users_online" , users);
    })
   
   
    
})