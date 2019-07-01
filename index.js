"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const path = require('path');

const port = process.env.PORT || 4001
app.use(bodyParser.json());
app.use(express.static("src"));

app.get('/', (req, res) => {
    res.sendFile('src/index.html', {root: __dirname });
});


app.post('/sendmail', (req, res) => {
    main(req.body).then (response => {
        res.send(response);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
function main (req) {
  let data = req || {};
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: '13cabservicesmelbourne@gmail.com',
      pass: '9876061718'
    }, tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"13 Cab Services Melbourne" <13cabservicesmelbourne@gmail.com>', // sender address
    to: "13cabservicesmelbourne@gmail.com, yogeshcs0107@gmail.com", // list of receivers
    subject: "Customer Data", // Subject line
    html: `
      <table>
        <tr>
          <td>Name</td>:<td>${data.name}</td>
        </tr>
        <tr>
        <td>Phone Number</td>:<td>${data.number}</td>
        </tr>
        <tr>
        <td>Email</td>:<td>${data.email}</td>
        </tr>
        <tr>
        <td>Date of Travel</td>:<td>${data.dateOfTravel}</td>
        </tr>
        <tr>
        <td>Time</td>:<td>${data.time}</td>
        </tr>
        <tr>
        <td>Pickup Location</td>:<td>${data.pickupLoc}</td>
        </tr>
        <tr>
        <td>Destination(To)</td>:<td>${data.destLoc}</td>
        </tr>
        <tr>
        <td>Number of passengers</td>:<td>${data.numberOfPassenger}</td>
        </tr>
        <tr>
        <td>Type of Vehicle</td>:<td>${data.vehicle}</td>
        </tr>
      </table>
    `
  });
  return info;
}

main().catch(console.error);
