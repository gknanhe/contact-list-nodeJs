//require library to ease our stuff
const mongoose = require('mongoose');

//creat Schema 
/* Schema can be said as the difination or ehat fields should be thre in DB */
//creating Object throught constructor function
const contactScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true   //to make it required
    },

    phone: {
        type: String,
        required: true
    }
});


//creating and assigning schema (Contact  is name of schema & coationntactSchema is defin)
const Contact = mongoose.model('Contact', contactScheme);

//export module
//when in index.js we require it this Contact will be exported
module.exports = Contact;