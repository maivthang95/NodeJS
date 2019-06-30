$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btn_register").click(function(){
        var username = $("#txtUserName").val() ;
        socket.emit("addUserName" , username )
    })

    socket.on("server_send_user" , function(data){
        if(data.success == true ){
           $("#loginForm").hide(2000);
            $("#chatForm").show(1000) ;
            $("#currentUser").html(data.user) ;
            $("#status1").html("");
        }
        else{
            $("#status").html(data.message) ;
        }
    })
    socket.on("server_send_currentUsers" , function(usernames){
        
        $("#boxContent").html("");
        var txtUsername = $("#txtUserName").val();
        usernames.forEach( (user , index)=> {
            if(user == txtUsername){
                usernames.splice(index , 1);
            }
        } )
        usernames.forEach( (user , index ) => {
            $("#boxContent").append("<div>" + user +"</div>")
        })
    })

    $("#btn_logout").click(function(){
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
        location.reload();
    })
    socket.on("server_send_list_currentUser" , function(data){
        $("#status1").html(data) ;
    })
    // socket.on("server_send_status_login_to_otherUsers" , function(username){
        
    //     $("#status1").html(username + " joins chat room");
    // })

    $("#btn_send_message").click(function(){
        var textVal = $("#txtMessage").val();
        if(textVal.trim().length != 0){
        socket.emit("user_send_text" , textVal);
        $("#txtMessage").val("");
        }
    })
    $("#txtMessage").keypress(function(event){
        if(event.which == 13 ){
            event.preventDefault();
            $("#btn_send_message").trigger("click");
        }
    })
    socket.on("server_send_text" , function(data){
        $("#listMessage").append("<div><b>" + data.sender + "</b> :" + data.message +"</div>")
    })

    $("#txtMessage").focusin(function(){
        socket.emit("user_focus_inputText");
    })

    socket.on("server_send_inputText" , function(message){
        $("#status_typing").html(message); 
    })
    $("#txtMessage").focusout(function(){
        socket.emit("user_focusout_inputText");
    })
})