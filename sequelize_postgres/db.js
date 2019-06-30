const sequalize = require("sequelize") ; 


const db = new sequalize({
    database : "myDB" , 
    username : "postgres" , 
    password : "123456" , 
    host : "localhost" ,
    port : "5432" , 
    dialect : "postgres" ,
    dialectOption : {
        ssl : false 
    },
    define : {
        freezeTableName : true 
    }
})

db.authenticate().then(() => console.log("Ket noi thanh cong")).catch( err => console.log(err.message));

const users = db.define('users' , {
    username : sequalize.STRING , 
    password : sequalize.STRING
})

db.sync()
// Tạo 1 object
// users.create({
//     username : "ezreal" ,
//     password : "eqweqe123" 
// }).then( user => console.log(user.get({plain : true })))

//Tạo nhiều object
// users.bulkCreate([
//     { username : "Janna" , password : "11hjaskdhk"},
//     { username : "Soraka" , password : "ejhj1jk232"} ,
//     { username : "Viktor" , password : "sakhdksa"} ,
//     { username : "Teemo" , password : "sadhnmmmnc"},
// ]).then( usersArray => usersArray.map( user => console.log(user.get({plain : true}))));


//Xóa theo id , usename ....
// users.destroy({
//     where : {
//         username : [ "maivthang95" , "caitlyn"]
//     }
// }).then( row => console.log(row));

//update dữ liệu
// users.update({
//     password : "choilienminhhuyenthoai"
// } , {
//     where : {
//         id: [16 ,17 ,18]
//     }
// }).then(row => console.log(row));

//users.findOne({raw : true }).then( user => console.log(user));
// users.findAll({raw : true }).then(users => users.map( user => console.log(user)))

// users.findOne({where : { id : [17 , 18 , 19] } }, {raw : true}).then(user => console.log(user));
users.findOrCreate({where : {username : "yasuo"} , defaults : {password : "hasagi"}})
.then(([user , created]) => {
    console.log(user.get({
        plain : true 
    }))
    console.log(created);
})

//users.update({password : "123456"},{ where : {id : 20 }}).then(user => console.log(user));