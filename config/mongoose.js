// require the library
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//aquire the connection (to check if it is succesfully connected)
const db = mongoose.connection;

//error  (eventListener)
db.on('error', console.error.bind('error connecting to db'));


//up and running (event Listner on open)
db.once('open', function(){
    console.log('successfully connected to Data Base')
});