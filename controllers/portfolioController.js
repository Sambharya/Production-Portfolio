const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');

//transport
const transport = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: process.env.API_POSTMARK,
  },
}));
const sendEmailController = (req,res) => {
    try {
        const { name, email, msg } = req.body;

        //validation
        if (!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        //email matter
        transport.sendMail({
        to: "abhisheksambharya05@gmail.com",
        from: "abhisheksambharya_mc21a11_06@dtu.ac.in ",
        subject: "Regarding Mern Portfolio App",
        html: `
            <h5>Detail Information</h5>
            <ul>
            <li><p>Name : ${name}</p></li>
            <li><p>Email : ${email}</p></li>
            <li><p>Message : ${msg}</p></li>
            </ul>
        `,
        });
        return res.status(200).send({
            success:true,
            message:'Your Message Sent Successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Send Email API Error',
            error,
        });
    }
};

module.exports = {sendEmailController};