import mongoose from 'mongoose';
const { Schema } = mongoose;

const userClassroomPendingSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: 'Hà Nội, Việt Nam',
	},
	status: {
		type: String,
		default: 'pending',
	},
	phone: {
		type: String,
		default: '0967999999',
	},
}, {
	timestamps: true,
});

export const UserClassroomPendingModel = mongoose.model('UserClassroomPending', userClassroomPendingSchema);
