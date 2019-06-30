var bcrypt = require("bcrypt") ;
var config = require("config") ;
function hash_password(password){
    var saltRound = config.get("salt") ; 
    var salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password , salt)
}

function compare_password(password , hash ){
    return bcrypt.compareSync(password , hash);
}
module.exports = {
    hash_password : hash_password,
    compare_password : compare_password
}