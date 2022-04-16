const app = require('express').Router();
const nodeMailer = require('nodemailer');
const db = require( __dirname + '/db.js');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dealsonwheels181@gmail.com',
        pass: 'carsales2022'
    }
});

app.post('/forget-pass-otp', (req,res) => {
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
            res.error({otp:0000});
        }
        else
        {
            res.send({otp:otp});
        }
    }); 

})
app.post("/forget-pass-success", (req,res) => {
    db.getPasssword(req.body.mailId)
    .then((password) => {
        var mailOptions = {
            from: 'dealsonwheels181@gmail.com',
            to: req.body.mailId,
            subject: 'Forget Password',
            text: `Hey your Password is ${password}`
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
        });
    })
})