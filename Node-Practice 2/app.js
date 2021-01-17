const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    next();
});

app.use('/users',(req,res,next)=>{
    res.send('<h2>This is Users route</h2>');
});

app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to my page</h1>');
});



app.listen(3000);