var nodemailer = require("nodemailer");

async function httpSendEmail(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: req.body.service,
      auth: {
        user: req.body.user,
        pass: req.body.pass,
      },
    });

    const mailOptions = {
      from: req.body.user,
      to: req.body.recipient,
      subject: req.body.subject,
      text: req.body.text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        console.log(info);
        res.status(500).json(["Error occured while sending email"]);
      } else {
        res.json("Email sent: " + info.response);
      }
    });
  } catch (e) {
    return res.status(500).json(["Error occured"]);
  }
}

module.exports = {
  httpSendEmail,
};
