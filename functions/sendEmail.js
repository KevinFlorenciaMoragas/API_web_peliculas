// const nodemailer = require('nodemailer')
// const pass = process.env.PASS
// const user = process.env.EMAIL
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: user,
//         pass: pass
//     }
// })
// function sendPasswordChangeEmail(userEmail, newPassword){
//     try{
//         console.log(pass, user)
//         let mailOptions = {
//             from:user,
//             to: userEmail,
//             subject:'Password changed',
//             text: `Your new Password is ${newPassword}`
//         }
        
//         transporter.sendMail(mailOptions,function(error,info){
//             if(error){
//                 console.log(error)
//             }else{
//                 console.log('Email sent:' + info.response)
//             }
//         })
//     }catch(err){
//         return err.message
//     }
// }
// module.exports = sendPasswordChangeEmail
const nodemailer = require('nodemailer');
const pass = process.env.PASS;
const user = process.env.EMAIL;

let transporter = nodemailer.createTransport({
    service: 'Outlook365', // Cambiado a Outlook
    auth: {
        user: user,
        pass: pass
    },
    tls: {
        ciphers: 'SSLv3' // Opcional: solo si es necesario para tu caso
    }
});

function sendPasswordChangeEmail(userEmail, newPassword) {
    try {
        console.log(pass, user);
        let mailOptions = {
            from: user,
            to: userEmail,
            subject: 'Password changed',
            text: `Your new Password is ${newPassword}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        return err.message;
    }
}

module.exports = sendPasswordChangeEmail;