const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;


const User = require('../models/user');

let opts ={
    jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';

passport.use(new JWTstrategy(opts, function(jwtPayLoads,done){

    User.findById(jwtPayLoads._id, function(err,user){
        if(err){console.log('error in finding the user from JWT');return;}
        
        if(user){
            return done(null,user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports  = passport;
