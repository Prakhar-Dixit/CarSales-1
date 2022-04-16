const route = require('express').Router();
const db = require('../db');



const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dealsonwheels181@gmail.com',
        pass: 'carsales2022'
    }
});

route.post('/forget-pass-otp', (req,res) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    var mailOptions = {
        from: 'dealsonwheels181@gmail.com',
        to: req.body.mailId,
        subject: 'Forget Password',
        text: `Hey your four digit otp is ${otp}`
    }
    transporter.sendMail(mailOptions, (err,info) => {
        if(err)
        {
            res.send({otp:null});
        }
        else
        {
            res.send({otp:otp});
        }
    }); 

})
route.post("/forget-pass-success", (req,res) => {
    db.getPassword(req.body.mailId)
    .then((pass) => {
        //console.log(pass[0].password);
        var mailOptions = {
            from: 'dealsonwheels181@gmail.com',
            to: req.body.mailId,
            subject: 'Forget Password',
            text: `Hey your Password is ${pass[0].password}`
        }
        transporter.sendMail(mailOptions, (err,info) => {
            if(err)
            {
                res.send({status: 'fail'});
            }
            else
            {
                res.send({status: 'pass'});
            }
        })
    })
    .catch((err) => {
        res.send({status: 'fail'});
    })
})
exports = module.exports = {
    route
}