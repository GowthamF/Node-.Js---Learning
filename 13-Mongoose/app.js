const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
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
    User.findById('6016d98f311b792a284a37bd').then((user)=>{
        console.log(user);
        req.user= user
        // req.user.getCart();
        next();
    }).catch((err)=>{
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://gowtham:Ironman@2021@cluster0.2phuv.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>{
    User.findOne().then((user)=>{
        if(!user){
            const user = new User({ 
                name: 'Gowtham',
                email: 'Gowtham@test.com',
                cart:{
                    items:[]
                }
            });
        
            user.save();
        }
    })
    
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
});