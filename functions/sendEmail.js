const nodemailer = require('nodemailer')
const pass = require('../Keys/password.js')
const user = require('../Keys/email.js')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: user,
        pass: pass
    }
})
function sendPasswordChangeEmail(userEmail, newPassword){
    let mailOptions = {
        from:'kevinflorencia@gmail.com',
        to: userEmail,
        subject:'Password changed',
        text: `Your new Password is ${newPassword}`
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log('Email sent:' + info.response)
        }
    })
}
module.exports = sendPasswordChangeEmail