const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addProduct(id,productPrice){
        this.getCartItems((cart)=>{
            console.log(cart);
            const existingProductIndex = cart.products.findIndex(prod=>prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = { id:id,qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            });
        })
    }

    static getCartItems(cb){
        fs.readFile(p,(err,data)=>{
            let cart = {products : [] , totalPrice : 0};
            if(err){
                cb(cart);
            }
            else{
                cart = JSON.parse(data);
                cb(cart);
            }
        })
    }

    static deleteCartItem(id, productPrice){
        this.getCartItems((carts)=>{
            const updatedCart = {...carts};
            const product = updatedCart.products.find(prod=> prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod=> prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
                console.log(err);
            });
        });
    }

    static getCart(cb){
        this.getCartItems(cb);
    }

}