"use strict";
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const path = require('path');

const port = 4001
app.use(express.static("src"));

app.get('/', (req, res) => {
    res.sendFile('src/index.html', {root: __dirname });
});


app.post('/sendmail', (req, res) => {
    main().then (response => {
        res.send(response);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
async function main(){
const transporter = nodemailer.createTransport({
    service: 'gmail',//smtp.gmail.com  //in place of service use host...
    secure: false,//true
    port: 25,//465
    auth: {
      user: 'yogeshcs0107@gmail.com',
      pass: ''
    }, tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <yogeshcs0107@gmail.com>', // sender address
    to: "manavmanuprakash@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });
  return info;
}

main().catch(console.error);
