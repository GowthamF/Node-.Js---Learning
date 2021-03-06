const getDb= require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectId;

class User{
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save(){
    const db = getDb();

    return db.collection('users').insertOne(this)
  }

  addToCart(product){
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    

    if(cartProductIndex >=0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }else{
      updatedCartItems.push({productId : new ObjectId(product._id), quantity: newQuantity});
    }
    

    const updatedCart = {items:updatedCartItems};
    const db = getDb();

    return db.collection('users').updateOne({_id: this._id},
    {$set:{
      cart: updatedCart
    }})

  }

  static findById(userId){
    const db = getDb();
    console.log(userId);
    return db.collection('users').findOne({_id: new ObjectId.createFromHexString(userId)}).then((user)=>{
      console.log(user);
      return user;
    }).catch((err)=>{
      console.log(err);
    });
  }

  getCart(){
    const db = getDb();
    const productIds = this.cart.items.map((cp)=> {
      return cp.productId;
    });
    return db.collection('products').find({_id: {$in: productIds}}).toArray().then((products)=>{

      db.collection('products').find().toArray().then((products)=>{
        const existingProductIds = products.map((p)=>{
          return p._id.toString();
        });
        
        // Comparing elements from two array
        // const diff = productIds.filter((p)=>{
        //   return !existingProductIds.includes(p.toString())
        // });

        // Comparing elements from two array
        const updatedCartItems = this.cart.items.filter(cp=>{
          return existingProductIds.includes(cp.productId.toString());
        });
        db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:{items: updatedCartItems}}});


        console.log(updatedCartItems);

        }).catch((err)=>{
            console.log(err);
        });
      return products.map((product)=>{
        return {...product, quantity: this.cart.items.find((i)=>{
          return i.productId.toString() === product._id.toString();
        }).quantity
      }
      });
    });
  }

  deleteCartItem(prodId){
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(cp=>{
      return cp.productId.toString() !== product._id.toString();
    }); 
    return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:{items: updatedCartItems}}}
    );
  }

  addOrder(){
    const db = getDb();
    return this.getCart().then((products)=>{
      const orders= {
        items: products,
        user: {
          _id: new ObjectId(this._id),
          name: this.name,
        }
      };
      return db.collection('orders').insertOne(orders);
    })    
    .then((result)=>{
      this.cart={items:[]};
      return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:{items: []}}});
    });
  }

  getOrders(){
    const db = getDb();
    return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
  }
}

module.exports = User;