var express = require("express") ;
var app = express() ; 
var server = require("http").Server(app);
var io = require("socket.io")(server); 
server.listen(3000 , function(){
    console.log("Server is running on port 3000");
}) ; 
//set Static folder 
app.use(express.static("./public"));

//set Views
app.set("views" , "./views");
app.set("view engine" , "ejs");


//Create Object for Advertisement
function Advertisement(img , link){
    this.img = img ;
    this.link = link 
}

//Create Array for Advertisement

var adArray = [
    new Advertisement("mihaohao.jpg" , "https://acecookvietnam.vn/san-pham/mi-hao-hao/"), 
    new Advertisement("mihoanggia.jpg" , "https://vifon.com.vn/product/hg-mi-thit-bam-120g/"), 
    new Advertisement("milauthai.jpg" , "https://www.bachhoaxanh.com/mi/mi-an-lien-lau-thai-30goi-x-80g"), 
    new Advertisement("miomachi.jpg" , "https://www.bachhoaxanh.com/mi/mi-khoai-tay-omachi-special-bo-ham-xot-vang-92g")
]


app.get("/admin" , (req , res )=> {
    res.render("admin", {data : adArray });
})

app.get("/client" , (req , res)=> {
    res.render("client");
})


io.on("connection" , function(socket){
    console.log("Co nguoi ket noi den server , id: " +  socket.id)

    socket.on("admin_send_ad" , function(data){
        io.sockets.emit("server_send_client" , data) ;
    })
})


