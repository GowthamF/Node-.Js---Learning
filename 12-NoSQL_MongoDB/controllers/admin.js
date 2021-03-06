const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId).then((product)=>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product:product
    });
  }).catch((err)=>{
    console.log(err);
  })
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title,price, imageUrl, description, null, req.user._id);

  product.save()
  .then((result)=>{
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err);
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  console.log(productId);
  const product = new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDescription, productId, );
  product.save().then((result)=>{
    console.log('UPDATED PRODUCT');
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err);
  }); 
};

exports.deleteProduct = (req,res,next)=>{
  const productId = req.body.productId;
  Product.deleteById(productId).then((result)=>{
    console.log('DELETED PRODUCT');
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err);
  });
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err)=>{
    console.log(err);
  })
};
