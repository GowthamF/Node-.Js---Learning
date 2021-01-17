const express = require('express');
const body = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine','pug');
app.set('views','views');

const adminData = require('./routes/admin_routes');
const shopRoute = require('./routes/shop');



app.use(body.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});
});


app.listen(3000);