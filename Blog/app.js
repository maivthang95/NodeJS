var express = require("express")
var bodyParser = require("body-parser") ;
var session = require("express-session");
var fs = require("fs") ;
var config = JSON.parse(fs.readFileSync("./config/default.json"));
var app = express() ; 

app.use(session({secret : "mysecret"}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

app.set("views" , "./apps/views") ;
app.set("view engine" , "ejs") ; 
//use Static folder

app.use(express.static("public"));

app.use(require("./apps/controllers"));

var host = config.server.host ; 
var port = config.server.port ;

app.listen( port , host , function(){
    console.log("Server is running on port " + port + ", host: " + host );
})

