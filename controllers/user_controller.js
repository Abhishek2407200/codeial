
const User =require('../models/user');
const fs =require('fs');
const path = require('path');

module.exports.profile =function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title:"user",
            profile_user: user,
         });
    });
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user =  await User.findById(req.params.id);
            User.uploadedAvatars(req,res, function(err){
                if(err){console.log('****Multer error',err)}
                
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // this is saving the path of the uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','unauthorized!');
        return res.status(401).send('unauthorized');
        }
}



// render the sign up page 
module.exports.signUp =function(req,res){

    if (req.isAuthenticated()){
       return res.redirect('/user/profile')

    }


    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    })
}

// render the sign in page 
module.exports.signIn =function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/user/profile')
 
     }

    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    })
}

// get the sign up data 
module.exports.create =function(req,res){
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
     
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finnding the user in signing up');return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){req.flash('error', err); return}
                return res.redirect('/user/sign-in');
            })
        }else{
            return res.redirect('back');
        }



    });
}


// Sign in and craete a session for the user 
module.exports.createSession =function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession =function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','You have logged out');
        res.redirect('/');
      });
}