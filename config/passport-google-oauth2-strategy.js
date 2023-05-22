const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use new strategy for google login 
passport.use(new googleStrategy({
        clientID:"454343445834-njq0af47ceve4d5usq1k860tb1edl1l4.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/user/auth/google/callback"
   },
   function(accessToken,refreshToken,profile,done){

    // find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google strategy',err);return;}

        console.log(profile);
        if(user){
            // if found, set this user to  req.user
            return done(null,user);
        }else{
            // if  not found , create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
            },function(err){
                if(err){console.log('error in creating user  google strategy',err);return;}

                return done(null,user);
            });
        }
    });


   }
));


module.exports = passport;