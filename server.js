const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-order', (req, res) => {
    const { name, email, order } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shanemandla01@gmail.com', // Replace with your email
            pass: 'corruptocurrency',  // Replace with your email password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'shanemandla01@gmail.com',  // Replace with your email
        subject: 'New Order',
        text: `Name: ${name}\nEmail: ${email}\nOrder: ${order}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Order submitted successfully.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});