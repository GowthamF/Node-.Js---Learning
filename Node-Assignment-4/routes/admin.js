const express = require("express");

const route = express.Router();

const users = [];

route.get('/add-user',(req,res,next)=>{
    res.render('add-user',{pageTitle:'Add User', path: '/admin/add-user'});
});

route.post('/add-user',(req,res,next)=>{
    users.push({name :req.body.name});
    res.redirect('/');
});

exports.router = route;
exports.users = users;