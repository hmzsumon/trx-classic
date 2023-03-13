const nodeMailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '381648523398-nupbr6sl63lg14m6k7hfvgu4ve6421k6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04HuehLmXNH70CgYIARAAGAQSNwF-L9IrT_lRZ-u2ESl94_xuJreoqrRTTwrSqVfyGCNwsZIRUKAweaJDgQ-UKQjkusI513jxhxw';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const sendEmail2 = async (options) => {
// 	try {
// 		const accessToken = await oauth2Client.getAccessToken();
// 		const transport = nodeMailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				type: 'OAuth2',
// 				user: "payunxgetway@gmail.com",
// 				clientId: CLIENT_ID,
// 				clientSecret: CLIENT_SECRET,
// 				refreshToken: REFRESH_TOKEN,
// 				accessToken: accessToken,
// 			}
// 		});

// 		const mailOptions = {
// 			from: "payunxgetway@gmail.com",
// 			to: options.to,
// 			subject: options.subject,
// 			text: options.text,
// 			html: options.html
// 		}

// } catch (error) {
// 	console.log(error);
// }

const sendEmail = async (options) => {
  const accessToken = await oauth2Client.getAccessToken();
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'payunxgetway@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'payunxgetway@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

// send me email
const sendMe = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: 'zakariasumon555@gmail.com',
      pass: 'rsutgdolqsktwqdy',
    },
  });

  await transporter.sendMail({
    from: '"Zakarias sumon" <zakariasumon555@gmail.com>',
    to: 'zakariadev01@gmail.com',
    subject: options.subject,
    text: options.message,
  });
  // console.log(options.message);
};

// send verification email
const sendVerificationEmail = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMPT_HOST,
      service: process.env.SMPT_SERVICE,
      port: process.env.SMPT_PORT,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });
    await transporter.sendMail(
      {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: subject,
        text: text,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendEmail, sendMe, sendVerificationEmail };
