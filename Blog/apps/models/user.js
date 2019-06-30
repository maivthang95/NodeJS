var q =  require("q") ; 
var db = require("../common/database");

var conn = db.getConnection(); 

function addUser( data ){
    if(data){
        var defer = q.defer() ; 
        var query = conn.query("INSERT INTO users SET ? " , data , (err , result)=> {
            if(err){
                defer.reject(err) ; 
            }else{
                defer.resolve(err) ; 
            }
        })
        return defer.promise;
    }
    return false ;
}

function getUserByEmail(email){
    var defer = q.defer() ;
    conn.query("SELECT * FROM users WHERE ? " , {email : email} , (err ,result ) => {
        if(err){
            defer.reject(err) ; 
        }
        else{
            defer.resolve(result) ; 
        }
    })
    return defer.promise ;
}
module.exports = {
    addUser : addUser,
    getUserByEmail : getUserByEmail
}

