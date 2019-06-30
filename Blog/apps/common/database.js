var mysql = require("mysql") ; 
var config = require("config") ; 
var conn = mysql.createConnection({
    database : config.get("mySQL.database") ,
    host : config.get("mySQL.host") , 
    user : config.get("mySQL.username") , 
    password : config.get("mySQL.password") 
})

conn.connect();

function getConnection(){
    if(!conn){
        conn.connect() ; 
    }

    return conn ; 
}

module.exports = {
    getConnection : getConnection
}