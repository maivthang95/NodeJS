var socket = io("http://localhost:3000");


socket.on("server_send_users_online" ,  function(data){	
	if(Array.isArray(data)){
		var myUserName = $("#txtUsername").val();
		$("#users_online").html("") ;
		
		data.forEach( user => {
			const { username , peer_id } = user ;
			if(user.username != myUserName){
				$("#users_online").append(`<div><a href="#" id="${peer_id}"> ${username} </a></div>`);
			}
		})
	}
})
socket.on("server_send_announce" , function(announce){
	$("#announce").show().html(announce + " đã offline");
})
// socket.on("server_send_current_user" , function(user){
// 	$("#users_online").append("<div>" + user.username +"</div>")
// })
socket.on("server_send_error" , function(message){
	$("#message_error").show().css("color" , "red").html(message);
})

socket.on("server_send_myusername" , function(username){
	$("#my_username").html(username);
	socket.emit("user_send_username" , username)
})


$(document).ready(function () {
	$("#announce").hide();
})

function openStream(){
	return navigator.mediaDevices.getUserMedia({audio : false ,  video : true})
}

function playStream(id , stream ){
	var video = document.getElementById(id) ; 
	video.srcObject = stream ; 
	video.play() ;
}

var peer = new Peer() ; 

peer.on("open" , id => {
	$("#my_peer").html(id);
	$("#btnSignUp").click(function(){
		var username = $("#txtUsername").val() ;
		var data = {
			username : username ,
			peer_id : id
		}
		socket.emit("client_send_username" , data )
		$("#remoteId").val(id);
		$("#message_error").hide();
		
	})
	
})

//Call
$("#btnCall").click(function(){
	var anotherId = $("#remoteId").val() ;
	openStream().then( stream => {
		playStream("localStream" , stream ) ;
		var call = peer.call(anotherId , stream) ;
		call.on("stream" , remoteStream => {
			playStream( "remoteStream" ,  remoteStream)
		})
	})
})

peer.on("call" , call => {

	openStream().then( stream => {
		call.answer(stream) ;
		playStream("localStream" , stream) ;
		call.on("stream" , remoteStream => {
			playStream("remoteStream" , remoteStream);
		})
	})
})
$("#users_online").on("click" , "a" , function(){
	var anotherId = $(this).attr("id"); 
	openStream().then( stream => {
		playStream("localStream" , stream) ; 
		var call = peer.call(anotherId , stream) ;
		call.on("stream" , remoteStream => {
			playStream("remoteStream" , remoteStream);
		})
	})
})


