const express =require('express');

const app = express();

const port = 8000;
const expressLayouts =require('express-ejs-layouts');
const db =require('./config/mongoose');

app.use(expressLayouts);
// extract styles and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assests'));
// use express routes
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});

