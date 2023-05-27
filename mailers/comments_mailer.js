const nodeMailerr =require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment =(comment)=>{
    // console.log('inside new comment mailer',comment);
     let htmlString =nodeMailerr.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailerr.transporter.sendMail({
        from:'abishak22221@gmail.com',
        to: comment.user.email,
        subject:'New Comment Published!',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err)
            return;
        }
        // console.log('message sent',info);
        return;
    });

}