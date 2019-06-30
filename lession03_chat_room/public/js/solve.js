var socket = io("http://localhost:3000/");
socket.on("server_send_rooms" , function(data){
    $("#active_rooms").html("");
    data.map(function(room){
        $("#active_rooms").append("<h4 class='room'>" + room + "</h4>")
    })
})

socket.on("server_send_current_room" , function(data){
    $("#cur_room").html(data);
})

socket.on("server_chat" , function(message){
    $("#chat_content").append("<div>" + message +"</div>")
})

$(document).ready(function () {
   $("#btn_Room").click(function(){
       var val = $("#txtRoom").val() ;
       socket.emit("create_room" , val) ;
   })
   $("#btnChat").click(function(){
       socket.emit("user_send_message_to_server" , $("#textMessage").val() ) ;
   })
});