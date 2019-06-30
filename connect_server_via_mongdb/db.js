//1 . require mongoose
var mongoose = require("mongoose")
//2. connect

mongoose.connect('mongodb://localhost/myDatabase' , { useNewUrlParser: true }) ; 

//3. Tạo schema
var  clientSchema = new  mongoose.Schema({
    name : String , 
    age : Number 
})

//4. Tạo Model

var clients = mongoose.model('clients' , clientSchema);

// clients.create([
//     {name : 'Leesin' , age : 35 },
//     {name : 'Shaco' , age : 33 },
//     {name : 'Syndra' , age :28 },
//     {name : 'Jhin' , age : 45},
//     {name : 'Gankplank' , age : 49 }
// ])

//Find All
clients.find().exec( (err , result) => {
    console.log(result);
})


//Find One
// clients.find({name : 'Leesin'}).exec((err , result) => {
//     console.log(result);
// })

//Update Doc
// clients.update({name : 'Jhin'} , { name : 'Ryze' , age: 54}).exec( (err, result) => {
//     console.log(result);
// })

//Remove Doc
clients.remove( { _id : "5d12c02218489f30584e6465" } ).exec( (err , result ) => {
    console.log(result);
})
