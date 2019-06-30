const MongoClient = require("mongodb").MongoClient ;
const assert = require("assert");

const url = "mongodb://localhost:27017" ;
const dbName = "myData" ; 

//Connect 
const mongoConnect = MongoClient.connect( url , {useNewUrlParser : true } , (err , client ) =>{
    assert.equal(null , err) ;
    console.log("Connected successfully to server ") ; 

    const db = client.db(dbName) ; 
    insertDocuments(db ,function(){
        updateDocuments(db, function(){
            client.close();
        }); 
        
    })
    
})

//insertDocument
function insertDocuments( db , callback){
    var collection = db.collection("documents");

    collection.insertMany([
        {  "city" : "AGAWAM", "loc" : [ -72.622739, 42.070206 ], "pop" : 15338, "state" : "MA" },
        {  "city" : "CUSHMAN", "loc" : [ -72.51564999999999, 42.377017 ], "pop" : 36963, "state" : "MA" },
        {  "city" : "BARRE", "loc" : [ -72.10835400000001, 42.409698 ], "pop" : 4546, "state" : "MA" },
        {  "city" : "BELCHERTOWN", "loc" : [ -72.41095300000001, 42.275103 ], "pop" : 10579, "state" : "MA" },
        {  "city" : "BLANDFORD", "loc" : [ -72.936114, 42.182949 ], "pop" : 1240, "state" : "MA" },
        {  "city" : "BRIMFIELD", "loc" : [ -72.188455, 42.116543 ], "pop" : 3706, "state" : "MA" },
        {  "city" : "CHESTER", "loc" : [ -72.988761, 42.279421 ], "pop" : 1688, "state" : "MA" },
        {  "city" : "CHESTERFIELD", "loc" : [ -72.833309, 42.38167 ], "pop" : 177, "state" : "MA" }
    ] , (err , result )=> {
        assert.equal(err , null );
        console.log("Inserted "+ result.result.n +"documents into the collection");
        callback(result)
    })
}

const findDocuments = function(db , callback){
    var collection = db.collection("documents");
    collection.find({ "pop" : {$gte : 4500 }}).toArray( (err , docs ) => {
        assert.equal(err , null ) ;
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    })
}

const updateDocuments = function(db , callback){
    var collection = db.collection("documents") ;
    collection.update({"state" : "MA" } , {$set : {"pop" : Number("pop") + 500 } } , {multi: true }, (err , docs) => {
        assert.equal(err , null );
        console.log("Updated the document with the field ");
        callback(docs);
    })
}

