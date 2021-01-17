const express = require('express');
const body = require('body-parser');
const path = require('path');

const app = express();

const adminData = require('./routes/admin_routes');
const shopRoute = require('./routes/shop');



app.use(body.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});


app.listen(3000);