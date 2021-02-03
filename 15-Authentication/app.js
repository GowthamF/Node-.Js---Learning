const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbStore= require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User= require('./models/user');

const mongoDbUri = 'mongodb+srv://gowtham:Ironman@2021@cluster0.2phuv.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store = new mongodbStore({
  uri: mongoDbUri,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// db.pool.execute('SELECT * FROM products').then((result)=>{console.log(result[0])}).catch((err)=>{console.log(err);});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'1q2w3e4r5t6y', resave:false,saveUninitialized: false,store: store}));

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then((user)=>{
        console.log(user);
        req.user = user;
        next();
    }).catch((err)=>{
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(mongoDbUri,{useNewUrlParser: true,useUnifiedTopology: true})
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