const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactCryto', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 5500; 

//defining schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    description: String,
  });

  const Contact = mongoose.model('contact', contactSchema);


//express specific code
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

// pug specific code
app.set("view engine",'pug') // set the template engine as pug
app.set('views', path.join(__dirname,'views')) //seting the views directory

//endpoint
app.get('/', (req, res)=>{
    const params = {  }
    res.status(200).render('home.pug',params);
    
});

app.get('/contact', (req, res)=>{
    const params = {  }
    res.status(200).render('contact.pug',params);
    
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("error saving in database")
    });
    //res.status(200).render('contact.pug');
    
});
app.listen(port, ()=>{
    console.log(`the app is started on port ${port}`);
});
