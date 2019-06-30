var express = require("express") ; 
var router = express.Router() ;
var user_md = require("../models/user");
var helper = require("../helpers/helper")
router.get("/" , (req , res) => {
    res.render("dashboard");
})

router.route("/signup")
.get( (req , res) => {
    res.render("admin/signup", {data : {}});
})
.post( (req , res) => {
    var params = req.body ; 
    if(params.email.trim().length == 0 ){
        res.render("admin/signup" , {data : {error : "Vui lòng điền email"}});
    }
    else if(params.password.trim().length == 0 || params.password != params.repassword ){
        res.render("admin/signup" , { data : {error : "Mật khẩu không hợp lệ"}});
    }
    else{
        var now = new Date();
        var password = helper.hash_password(params.password) ;
        var data = {
            email : params.email , 
            password : password , 
            first_name : params.firstname , 
            last_name : params.lastname ,
            phone : params.phone,
            created_at : now , 
            updated_at : now
        }
        var resolve = user_md.addUser(data); 
        
        resolve.then( result => {
            res.redirect("/admin/login");
        }).catch( err => res.render("admin/signup" , { data : {error : "Email đã tồn tại"}}))
    }
})

router.route("/login" )
.get( (req , res) => {
    res.render("admin/login"  , {data : {}});
})
.post( (req , res) => {
    var params = req.body ; 
    if( params.email.trim().length == 0 ){
        res.render("admin/login" , {data : {error : "Vui lòng nhập email"}});
    }
    else if( params.password.trim().length == 0 ){
        res.render("admin/login" , {data : {error : "Vui lòng nhập mật khẩu"}});
    }
    else{
        var data = user_md.getUserByEmail(params.email);
        data.then( users => {
            var user = users[0] ;
            let status = helper.compare_password(params.password , user.password );
            if(status){
                res.redirect("/admin") ;
            }else{
                res.render("admin/login" , {data : {error : "Email hoặc mật khẩu không đúng"}})
            }
        }).catch( err => {
            res.render("admin/login" , {data : {error : "Email không tồn tại"}})
        })
    }
})

router.route("/posts")
.get( (req , res ) => {
    res.render("admin/posts/content_table");
})

module.exports = router 