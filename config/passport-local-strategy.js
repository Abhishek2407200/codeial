const  passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function(req,email,password,done){
    //  find  a user and establish the identity
    User.findOne({email:email},function(err,user) {
        if(err){
            req.flash('error',err);
            return done(err);
        }

        if(!user || user.password != password){
            req.flash('error','Invalid username and password');
            return done(null,false);

        }


        return done(null,user);

    });


    }  
));



// serialize the user to decide which key is kept to be in the cookie
passport.serializeUser(function(user,done){
    // console.log('serialize call');
    done(null,user.id);
});



// deserialize the user from the key in  cookie
passport.deserializeUser(function(id, done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user -->passport');
            return done(err);
        }

        return done(null,user);

    });
});


// check if the user is authenticated
passport.checkAuthentication =function(req,res,next){
    // if the user is signed in , then pass on the request to next function(conntroller action)
    if(req.isAuthenticated()){
        return next();

    }

    //  if user is not signed in
   
    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //  req.user contains the current signed in user from the session cookie and we are just sending it to the locals for views 
        res.locals.user = req.user;
    }

    next();

}



module.exports = passport;