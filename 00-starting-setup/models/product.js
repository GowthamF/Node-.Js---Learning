const fs = require('fs');
const { get } = require('https');
const path = require('path');
const pathUtil = require('../util/path');
const p = path.join(pathUtil,'data','products.json');

const getProductsFromFile = (cb)=>{
    
        fs.readFile(p,(err,data)=>{
            if(err){
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
            
        });
}

module.exports=  class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
    }

    static getAllProducts(cb){
        getProductsFromFile(cb);
    }
}