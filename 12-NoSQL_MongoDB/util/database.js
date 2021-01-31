const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb+srv://gowtham:Ironman@2021@cluster0.2phuv.mongodb.net/shop?retryWrites=true&w=majority')
    .then((client)=>{
        console.log('CONNECTED');
        _db = client.db();
        callback();
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    });
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

