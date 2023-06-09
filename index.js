const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session  cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore  = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');





app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assests'));
// make the uploads paths available to the broweser 
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract styles and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//  mongo is used  to store the session cookie
app.use(session({
    name: 'codeial',
    // /TODO change the secret before the deployment  in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    },
    store: MongoStore.create(
    {
        mongoUrl: 'mongodb://0.0.0.0:27017/codeial_devlopment',
        autoRemove:'disabled'
    },

    function(err)
    {
        console.log(err ||'connect mongodb setup ok');
    }
    )
}));

// app.use(session({
//     name:'codeial',
//     //todo : cahnge the secret before deploying
//     secret: "blahsomething",
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//         maxAge:(1000*60*100)
//     },
//     store: MongoStore.create(
//         {
//             mongoUrl:'mongodb://0.0.0.0:27017/codeial_devlopment',
//             autoRemove: 'disabled'
//         },
//         function(err){
//             console.log(err || 'connect-mongo-db-setup ok');
//         }
//     )
    
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express routes
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});

