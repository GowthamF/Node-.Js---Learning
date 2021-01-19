const express = require('express');

const adminData= require('../routes/admin');

const router = express.Router();

router.get('/',(req,res,next)=>{
    const users = adminData.users;

    res.render('users',{users: users, pageTitle : 'Users', path : '/'});
});

exports.router = router;