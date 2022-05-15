

const route = require('express').Router();
const db = require('../db');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dealsonwheels181@gmail.com',
        pass: 'carsales2022'
    }
});

route.post('/signup', (req,res) => {
    db.addNewPerson(req.body.fullName,req.body.userName,req.body.password)
    .then(()=>{
        var mailOptions = {
            from: 'dealsonwheels181@gmail.com',
            to: req.body.userName,
            subject: 'DealsOnWheels',
            text: `Hey ${req.body.fullName} 
            This is Confirmation Mail that you have successfully registered with DealsOnWheels
            Thank you ${req.body.fullName} for registering with us`
        }
        transporter.sendMail(mailOptions, (err,info) => {
            if(err)
            {
                res.send(`<h1> some error occurred. Mail-id provided by you might be wrong please go back and try again </h1>`);
            }
            else
            {
                res.redirect('/frontPage');
            }
        });
    })
    .catch((err) => {
        res.send(err);
    });
});
route.post('/login',encoder, (req,res) => {
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
exports = module.exports = {
    route
}