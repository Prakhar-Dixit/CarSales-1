
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/pages', require('./routes/pages').route);
app.use('/api', require('./routes/api').route);


app.use('/', express.static(__dirname + '/front'));

app.use('/forget-pass', express.static(__dirname + '/public_static'));

app.use('/frontPage', express.static(__dirname + '/front'));


app.listen(1234,() => {
    console.log("server Started");
})