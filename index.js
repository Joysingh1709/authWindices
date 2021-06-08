const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const port = 3030 || process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('Hello from REST Email Services')
})


// app.get('/mail', async (req, res) => {

//     res.send('Hello from REST mail Services')

//     // let transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     // host: "http://localhost:3030",
//     //     // port: 587,
//     //     // secure: false, // true for 465, false for other ports
//     //     auth: {
//     //         user: 'joysinghcs18@acropolis.in', // generated ethereal user
//     //         pass: 'acro@1234', // generated ethereal password
//     //     }
//     // });

//     // // send mail with defined transport object
//     // let info = await transporter.sendMail({
//     //     from: '"Fred Foo 👻" <joysinghcs18@acropolis.in>', // sender address
//     //     to: "avnishmamta060606@gmail.com", // list of receivers
//     //     subject: "Hello ✔", // Subject line
//     //     text: "Hello world?", // plain text body
//     //     html: "<b>Hello world?</b>", // html body
//     // });

//     // console.log("Message sent: %s", info.messageId);
//     // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // // Preview only available when sending through an Ethereal account
//     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//     // res.send("Message sent: %s", info.messageId, "Preview URL: %s", nodemailer.getTestMessageUrl(info))
// })

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})