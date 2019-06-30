var sequelize = require("sequelize");

var db = new sequelize({
    database : "mydatabase" , 
    username : "mysql_user" , 
    password : "123456" ,
    dialect : "mysql" ,
    dialectOptions :{
        ssl : false 
    },
    define : {
        freezeNameTable : true 
    }
})

db.authenticate().then(() => console.log("Ket noi thanh cong")).catch( err => console.log(err.message));

var users = db.define( 'users' ,{
    username : sequelize.STRING , 
    password : sequelize.STRING 
})

db.sync();

//Tạo 1 user
//users.create({ username : "elise" , password : "xmhLNVKajhsa"}).then(user => console.log(user.get({ plain : true})));

//Tạo nhiều user
// users.bulkCreate([
//     { username : "ezreal" , password : "shadqkwqkj"},
//     { username : "xinzhao" , password : "sangjcdjwqghj"},
//     { username : "masteryi" , password : "kjkljfieoK"},
//     { username : "leesin" , password : "7982hKHKHYnksla"},
//     { username : "leesin" , password : "7982hKHKHYnksla"},
//     { username : "karthus" , password : "sdasdnwqji2"},
//     { username : "reksai" , password : "sdqwd24213sda"},
//     { username : "talon" , password : "dsadqw421sdasd"},
// ]).then( usersArray => usersArray.map( user => console.log(user.get({plain : true }))))

//Xóa user
//users.destroy({ where : {id : [20 , 21 ,22 ,23]}}).then(row => console.log(row));

//Cập nhật dữ liệu
//users.update({ password : "123456"} , {where : { id : [11 ,12 ,13 ,14]}}).then(row => console.log("So dong duoc cap nhat " + row));

//Tìm 1 phần tử
//users.findOne({raw : true}).then(user => console.log(user));
//Tìm tất cả
//users.findAll({raw : true}).then(user => console.log(user))
//Tìm theo id , username...

//Tìm theo id , username ...
//users.findOne({where : {id : 10}} , {raw : true}).then(user => console.log(user));

//Tìm nếu ko có thì tạo
users.findOrCreate({where : { username : "jhinn"} , defaults : { password : "123456789"}})
.then(([user,created]) => {
    console.log(user.get({plain: true}));
    console.log(created)
})
