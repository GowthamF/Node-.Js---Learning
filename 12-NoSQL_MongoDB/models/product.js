const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectId;

class Product{
    constructor(title,price,imageUrl,description, id, userId){
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id ? new ObjectId.createFromHexString(id) : null;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('products').updateOne(
                {_id:this._id},
                {
                    // $set:{
                    //     title: this.title,
                    //     price : this.price,
                    //     imageUrl : this.imageUrl,
                    //     description : this.description
                    // }
                    $set : this
                });
        }else{
            dbOp = db.collection('products')
            .insertOne(this);
        }

        return dbOp
            .then((result)=>{
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            });
        
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray().then((products)=>{
            console.log(products);
            return products;
        }).catch((err)=>{
            console.log(err);
        })
    }

    static findById(prodId){
        const db = getDb();
        console.log(prodId);
        return db.collection('products').findOne({_id: new ObjectId.createFromHexString(prodId)}).then((product)=>{
            console.log(product);
            return product;
        }).catch((err)=>{
            console.log(err);
        })
    }

    static deleteById(prodId){
        const db = getDb();

        return db.collection('products').deleteOne({_id : new ObjectId.createFromHexString(prodId)});
    }
}

module.exports = Product;