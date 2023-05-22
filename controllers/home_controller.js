const Post = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes/api/v1');


module.exports.home = async function(req,res){
    try{
    // populate the user of each post
   let posts = await Post.find({})
   .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    // console.log(posts);
   
    let  users = await User.find({});
    return res.render('home',{
        title :"Codeial | Home",
        posts: posts,
        all_users: users
    });

}catch(err){

    console.log('Erorr', err);
    return;
}
}