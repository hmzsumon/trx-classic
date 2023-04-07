const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
	const msg = {
		to: options.email,
		from: {
			name: 'Trx Classic',
			email: process.env.SENDGRID_MAIL,
		},
		subject: options.subject,
		text: options.message,
	};

	await sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = sendEmail;
