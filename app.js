const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('express-ejs-layouts');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/img', express.static(path.join(__dirname, '/public/img')));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/index'));
});

app.listen(3000);