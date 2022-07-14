require('dotenv').config();
const express = require('express')
const bodyParser=require('body-parser')
const ejs= require('ejs')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const encrypt = require('mongoose-encryption');
//---------------DB-----------------------//
const connectDb = require('./config/db');
const { Console } = require('console');

//-------------schema---------------------//
const userSchema = new mongoose.Schema ({
    email : String,
    password: String 
    });
    
//-----------bcrpy-----------------//
userSchema.plugin(encrypt,{secret : process.env.SECRATE , MediaEncryptedField: ["password"]})

const User = new mongoose.model("secrateDB",userSchema)

//--------- app configs-----------------//
connectDb();
const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended : true
}))

//-------------API------------------//
app.get('/', function(req,res){
    res.render("home")
});

app.get('/login', function(req,res){
    res.render("login")
})

app.get('/register', function(req,res){
    res.render("register")
})
app.post('/register', function(req,res){
    const newUser= new User ({
        email : req.body.username,
        password : req.body.password
    });
    newUser.save(function(err){
        if(err){
           console.log(err);
       
        }else {
           res.render("secrets")
        }
       });
})

app.post('/login',  function (req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email : username}, function(err,founduser){
        if(err){
            console.log(err)
        }else {
            if(founduser){
                if(founduser.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});

app.listen (8080, function () {
    console.log("server started on port 8080")
})