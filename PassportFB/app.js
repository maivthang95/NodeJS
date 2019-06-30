var express = require("express");
var passport = require("passport");
var passportFB = require("passport-facebook").Strategy;
var session = require("express-session");
var db = require("./db");
var app = express();
app.use(session({secret : "mysecret"}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
})

app.set("views" , "./views");
app.set("view engine" , "ejs")

app.get("/auth/fb" , passport.authenticate("facebook"))

app.get("/" , (req , res) => {
    res.send("Welcome to Website");
})

app.get("/login" , (req , res) => {
    res.render("login");
})


app.get("/auth/fb/cb", passport.authenticate('facebook' , {failureRedirect: '/login' , successRedirect:'/'}) );

passport.use( new passportFB({
    clientID : "488163485325136" , 
    clientSecret : "83f3dd219544865b91bd781aafbdfcd3" ,
    callbackURL : "http://localhost:3000/auth/fb/cb"    
    },
    (accessToken , refreshToken , profile , done) =>{
        console.log(profile);
    }
))


passport.serializeUser( (user , done) => {
    done(null, user.id);
})

passport.deserializeUser( (id , done) =>{
    db.findOne({id} , (err , user) =>{
        done(null , user);
    })
})


