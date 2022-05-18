

const route = require('express').Router();
const db = require('../db');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
const nodeMailer = require('nodemailer');
const { use } = require('express/lib/application');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dealsonwheels181@gmail.com',
        pass: 'carsales2022'
    }
});

route.post('/signup', (req,res) => {
    let s = req.body.fullName;
    db.getPassword(req.body.userName)
    .then((pass)=>{
        if(pass.length > 0)
        {
            res.send(`<h3> user with this mail id is already registered please try with different id </h3>`)
        }
        else
        {
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
                        res.send(`<h3> some error occurred. Mail-id provided by you might be wrong please go back and try again </h3>`);
                    }
                    else
                    {
                        res.render('front', {name: s, lgtbtn: 'Logout'});
                    }
                })
            })
            .catch((err)=>{
                res.send(err);
            });

        }
    })
    .catch((err)=>{
        res.send(err);
    })
});
    
route.post('/login',encoder, (req,res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    db.checkIfExist(userName,password)
    .then((id)=>{
        if(id.length > 0)
        {
            let fullName = id[0].fullName;
            res.render('front', {name: fullName, lgtbtn: 'Logout'});
        }
        else
        {
            res.send("<h3> userName or Password is wrong go back and Try Again</h3>");
        }
    })
    .catch((err) => {
        res.send("<h3> There is some error in our servers please try after some time.. Thank you</h3>");
    });
    
});
exports = module.exports = {
    route
}