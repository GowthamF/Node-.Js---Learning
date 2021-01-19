const express= require('express');
const body = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');


app.use(body.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoute.router);
app.use(userRoute.router);

app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});
});

app.listen(3000);