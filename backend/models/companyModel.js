const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		website: {
			type: String,
			trim: true,
		},
		currency: {
			type: String,
			default: 'USD',
		},
		address: {
			type: String,
			trim: true,
		},

		city: {
			type: String,
			trim: true,
		},

		state: {
			type: String,
			trim: true,
		},

		zip: {
			type: String,
			trim: true,
		},

		country: {
			type: String,
			default: 'USA',
		},

		// about
		about: {
			type: String,
			trim: true,
		},
		// company logo
		companyLogo: {
			type: String,
			trim: true,
		},

		// lottery options
		lottery: {
			isLottery: {
				type: Boolean,
				default: true,
			},
			totalSellCount: {
				type: Number,
				default: 0,
			},
			totalSellAmount: {
				type: Number,
				default: 0,
			},
			toDaySellCount: {
				type: Number,
				default: 0,
			},
			toDaySellAmount: {
				type: Number,
				default: 0,
			},
			lotteryProfit: {
				type: Number,
				default: 0,
			},
			todayProfit: {
				type: Number,
				default: 0,
			},
			totalDraw: {
				type: Number,
				default: 0,
			},
		},

		// convert options
		convert: {
			isConvert: {
				type: Boolean,
				default: true,
			},
			totalConvert: {
				type: Number,
				default: 0,
			},
			totalConvertCount: {
				type: Number,
				default: 0,
			},
			todayConvert: {
				type: Number,
				default: 0,
			},
			todayConvertCount: {
				type: Number,
				default: 0,
			},
		},

		// withdraw options
		withdraw: {
			is_withdraw: {
				type: Boolean,
				default: true,
			},

			totalWithdraw: {
				type: Number,
				default: 0,
			},

			totalWithdrawCount: {
				type: Number,
				default: 0,
			},

			todayWithdraw: {
				type: Number,
				default: 0,
			},

			total_w_charge: {
				type: Number,
				default: 0,
			},

			total_w_balance: {
				type: Number,
				default: 0,
			},

			new_withdraw: {
				type: Number,
				default: 0,
			},

			pending_withdraw_count: {
				type: Number,
				default: 0,
			},
			pending_withdraw_amount: {
				type: Number,
				default: 0,
			},

			todayWithdrawCount: {
				type: Number,
				default: 0,
			},

			total_c_w_amount: {
				type: Number,
				default: 0,
			},
		},

		// deposit options
		deposit: {
			totalDepositCount: {
				type: Number,
				default: 0,
			},
			totalDepositAmount: {
				type: Number,
				default: 0,
			},
			todayDepositCount: {
				type: Number,
				default: 0,
			},
			todayDepositAmount: {
				type: Number,
				default: 0,
			},
			new_deposit_amount: {
				type: Number,
				default: 0,
			},
			new_deposit_count: {
				type: Number,
				default: 0,
			},
			total_cancel_deposit: {
				type: Number,
				default: 0,
			},
		},

		//verify options
		verify: {
			pending: {
				type: Number,
				default: 0,
			},
			verified: {
				type: Number,
				default: 0,
			},
			rejected: {
				type: Number,
				default: 0,
			},
			new_verify: {
				type: Number,
				default: 0,
			},
		},
		notifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Notification',
			},
		],
		// loan options
		loan: {
			islLoan: {
				type: Boolean,
				default: true,
			},
			total_loan_amount: {
				type: Number,
				default: 0,
			},
			total_loan_count: {
				type: Number,
				default: 0,
			},
			pending_loan_amount: {
				type: Number,
				default: 0,
			},
			pending_loan_count: {
				type: Number,
				default: 0,
			},
			pending_request: {
				type: Number,
				default: 0,
			},
		},
		// merchant options
		merchant: {
			is_merchant: {
				type: Boolean,
				default: true,
			},
			total_merchant: {
				type: Number,
				default: 0,
			},
			total_merchant_profit: {
				type: Number,
				default: 0,
			},

			pending_request: {
				type: Number,
				default: 0,
			},
		},
		// user options
	},
	{ timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
