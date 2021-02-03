const User= require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true';
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated : false
  });
};

exports.postLogin = (req,res,next)=>{
  User.findById('6016d98f311b792a284a37bd').then((user)=>{
    console.log(user);
    req.session.isLoggedIn=true;
    req.session.user = user;

    req.session.save((err)=>{
      res.redirect('/');
    });    
    }).catch((err)=>{
      console.log(err);
    });
};

exports.postLogout = (req,res,next)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  });
};
