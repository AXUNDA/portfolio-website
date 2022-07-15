
const express = require('express');
const bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true}))
app.get("/", function(req, res) {

      res.sendFile(__dirname + '/index.html');
})
app.post("/", async function(req, res) {
      var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'charlesemmanuelazunda@gmail.com',
              pass: 'lssnzpgwzldfhsmz'
            }
          });
          var mailOptions = {
            from: req.body.email,
            to: 'axundah@outlook.com',
            subject:req.body.subject,
            text: req.body.message+" "+req.body.name+" "+req.body.email
          };
      try {
            console.log(req.body)
            
                await transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    res.send("error sending your message please try again")
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.send("your message has been sent,you will be contacted shortly")
                  }
                });
               
            
      } catch (error) {
            console.log(error)
            
      }


})


app.listen(process.env.PORT||3000, function() {

      console.log('listening on port 3000');
})