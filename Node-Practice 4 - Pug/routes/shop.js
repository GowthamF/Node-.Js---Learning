const express = require('express');
const path = require('path');
const rootDir= require('../helper/path');

const adminData = require('./admin_routes');

const router = express.Router();


router.get('/',(req,res,next)=>{
    const products = adminData.products;
    res.render('shop',{products: products , pageTitle : 'Shop',path: '/'});
});

module.exports = router;