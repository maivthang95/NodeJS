var express = require("express");
var bodyParser = require("body-parser") ;
var Passport = require("passport");
var session = require("express-session")
var fs = require("fs");
var LocalStrategy = require("passport-local").Strategy; 
var app = express() ; 

app.use(bodyParser.urlencoded({extended : true }));
app.use(session({secret : "mysecret",
        cookie : {
            maxAge : 1000 * 30 * 60
        }
}));
app.use(Passport.initialize());
app.use(Passport.session());


app.set("views" , "./views");
app.set("view engine" , "ejs");

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
})

app.get("/" , (req , res) =>{
    res.render("home")
})

app.route("/login")
.get( (req , res) => { res.render("login")})
.post(Passport.authenticate('local' , { failureRedirect : "/login" ,
                                        successRedirect: "/loginOK"}));

app.get("/loginOK" , (req , res )=> {
    res.send("You have Loged in successfully")
})

app.get("/private" , (req ,res)=>{
    if(req.isAuthenticated()){
        res.send("Welcome to private Page");
    }else{
        res.redirect("/login")
    }
})

Passport.use( new LocalStrategy(
    (username , password , done ) => {
        fs.readFile("./userDB.json" , (err , data) =>{ 
            var db = JSON.parse(data) ; 
            var userRecord =  db.find( user => user.usr == username);
            if(userRecord && userRecord.pwd == password){
                return done(null , userRecord) ;
            }
            else{
                return done(null , false );
            }
        
        })
    }
))



Passport.serializeUser( ( user , done ) => {
    done(null ,user.usr)
})

Passport.deserializeUser( (name ,  done) => {
    fs.readFile("./userDB.json" , (err , data)=> {
    
        var db = JSON.parse(data);
        var userRecord = db.find( user => user.usr == name)
        if(userRecord){
            return done(null , userRecord) ;
        }
        else{
            return done(null , false );
        }
    
    })
})
