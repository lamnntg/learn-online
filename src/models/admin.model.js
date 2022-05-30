import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar_url: {
		type: String,
		default: 'https://seud.org/wp-content/uploads/2020/06/avatar-nobody.png',
	},
	address: {
		type: String,
		default: 'Hà Nội, Việt Nam',
	},
});

export const AdminModel = mongoose.model('Admin', adminSchema);
