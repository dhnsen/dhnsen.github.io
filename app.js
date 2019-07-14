const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('express-ejs-layouts');
const nodemailer = require('nodemailer');
const path = require('path');
const secrets = require(path.join(__dirname, '/secrets'));

const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/img', express.static(path.join(__dirname, '/public/img')));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/views/index'), {msg:''});
});

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new cotnact request.</p>
    <h3>contact details:</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Name: ${req.body.email}</li>
    <li>Name: ${req.body.phone}</li>
    </ul>
    <h3>Message: </h3>
    <p> ${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: secrets.emailUser,
            pass: secrets.password 
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"danHansen.me" <>', // sender address
        to: "daniel.hansen@live.com", // list of receivers
        subject: "New Contact request", // Subject line
        text: "plain text not supported ¯\\_(ツ)_/¯", // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('message sent.');

        res.render(path.join(__dirname + '/views/index'), {msg:'Your message was sent.'});
    });


})

app.listen(3000);