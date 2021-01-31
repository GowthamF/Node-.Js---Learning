const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User= require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.pool.execute('SELECT * FROM products').then((result)=>{console.log(result[0])}).catch((err)=>{console.log(err);});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('6012720ed2b3da27d8c4c3e1').then((user)=>{
        console.log(user);
        req.user= new User(user.name,user.email,user.cart,user._id);
        req.user.getCart();
        next();
    }).catch((err)=>{
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{

    app.listen(3000);
});