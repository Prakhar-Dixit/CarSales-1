
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/pages', require('./routes/pages').route);
app.use('/api', require('./routes/api').route);

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));

// app.use('/', express.static(__dirname + '/front'));
// app.use('/frontPage', express.static(__dirname + '/front'));
// app.use('/forget-pass', express.static(__dirname + '/public_static'));


app.get('/', (req,res) =>{
    res.render('front');
});

app.get('/forget-pass', (req,res) => {
    res.render('forgetPass');
});

app.get('/frontpage', (req,res) => {
    res.render('front');
});

app.get('/LogInPage', (req,res) => {
    res.render('LogInPage');
});


app.listen(1234,() => {
    console.log("server Started");
});