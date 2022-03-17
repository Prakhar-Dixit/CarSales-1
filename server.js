
const express = require('express');
const app = express();
const db = require( __dirname + '/db.js');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
var count = 4;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', express.static(__dirname + '/LogInPage'));

app.use('/frontPage', express.static(__dirname + '/front'));

app.post('/signup', (req,res) => {
    db.addNewPerson(req.body.fullName,req.body.userName,req.body.password)
    .then(()=>{

        res.redirect('/frontPage');
    })
    .catch((err) => {
        res.send(err);
    });
});
app.post('/login',encoder, (req,res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    db.checkIfExist(userName,password)
    .then((id)=>{
        if(id.length > 0)
        {
            res.redirect('/frontPage');
        }
        else
        {
            res.send("<h1> userName or Password is wrong go back and Try Again</h1>");
        }
    })
    .catch((err) => {
        res.send(err);
    });
   
});
app.listen(1234,() => {
    console.log("server Started");
})