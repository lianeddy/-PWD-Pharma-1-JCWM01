const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'shabrinaartarini46@gmail.com',
        pass:'mderdpljoeepacxa'
    },
    tls:{
        rejectUnauthorized : false
    }
})

module.exports = transporter

