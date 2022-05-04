import mongoose from 'mongoose';
import { uploadImage } from '../apis/imgBB.api';
import { UserQuestionModel } from '../models/userQuestion.model';

const updateQuestionById = async (id, data) => {
	try {
		let qa;
		let question = await UserQuestionModel.findOne({ _id: mongoose.Types.ObjectId(id) });
		if (!question) {
			return {
				error: true,
				message: 'Question not found',
			};
		}

		if (data.image) {
			await uploadImage(data.image).then((result) => {
				qa = {
					title: data.title,
					description: data.desc,
					url: result,
					author: data.author,
					content: data.content,
				};
			});
		} else {
			const result = data.image === false ? '' : question.url;
			qa = {
				title: data.title,
				description: data.desc,
				url: result,
				author: data.author,
				content: data.content,
			};
		}
		const value = await UserQuestionModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, qa);
		return value;
	} catch (error) {
		throw new Error(error);
	}
};

export const questionService = { updateQuestionById };
