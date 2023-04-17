const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/codeial_devlopment',
{     useNewUrlParser: true,      useUnifiedTopology: true,     family: 4, });

const db = mongoose.connection;

db.on('error' , console.error.bind(console,"Error connecting to MongoDB"));

db.once('open', function(){
    console.log('connected to database :: MongoDB')
});

module.exports = db;