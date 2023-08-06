const express = require('express');
const path = require('path');
const port = 8000;


//include mogobd just above express firedup

const db = require('./config/mongoose');

//require model

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());//parser used in middleware
//meddileware for adding css js files
app.use(express.static('assets'));



//Creat own middleware
// middleware 1
// app.use(function(req, res, next){
//     // console.log('mw1 called');
//     req.query.name = req.query.name
//     req.m = 'hahaha';

//     next();
// })

// //middleware 2
// app.use(function(req, res, next){
//     console.log('mw2 called', req.body.name);
//     next();
// })

// var contactList = [
//     {
//         name: 'Ganesh',
//         phone: '1234567890'
//     },
//     {
//         name: 'Tony Stark',
//         phone: '9876543210'
//     },
//     {
//         name: 'ninja',
//         phone: '9876541230'
//     }
// ]



app.get('/', async function (req, res) {

    try {
        let contaclist = await Contact.find({})

        console.log('*****', contaclist);
        return res.render('home', {
            title: "My contacs list",
            contact_list: contaclist
        })


    }
    catch (err) {
        console.log(err);
        return;
    }



    //withaut DB
    // return res.render('home', {
    //     title: "My contacs list",
    //     contact_list: contactList
    // })
})


//Function get data after form submit
app.post('/contactForm', async function (req, res) {

    /* these part is dome witahut DB */

    // console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name,
    //     phone : req.body.phone
    // })


    //shortly

    // contactList.push(req.body);

    /* This part done with DB Implement this 

    //Adding To Data Base
    //creat() is used to creat 

    /* can use this or below way */

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }).then((newContact) => {

    //     console.log("*******", newContact);
    //     return res.redirect('back');
    // }).catch((err) => {
    //     console.error(err);
    // })


    //alternate way

    try {
        let newContact = await Contact.create(
            {
                name: req.body.name,
                phone: req.body.phone
            }
        )

        console.log('*****', newContact);
        return res.redirect('back');


    }
    catch (err) {
        console.log(err);
        return;
    }

    // return res.redirect('/');
    // return res.redirect('back');  //for long url if going back to sm page
})


//Delete Contact
app.get('/delete-contact/', async function (req, res) {
    console.log(req.query);
    //get the  id from url

    let id = req.query.id;

    //find the contact in database using id and delete

    try {
        //function will find id and delete 
        await Contact.findByIdAndDelete(id);

        //redirect to home
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return;
    }


})


app.get('/playground', function (req, res) {
    return res.render('playground', {
        title:
            "My Playground"
    })
})




app.listen(port, function (err) {
    if (err) {
        console.log('an error has been occured ', err);
        return;
    }

    console.log('Yup! My express server is up on the port ', port);
})