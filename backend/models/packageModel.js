const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema(
	{
		package_title: {
			type: String,
		},
		package_price: {
			type: Number,
			default: 0,
		},
		package_fee: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Package', packageSchema);
