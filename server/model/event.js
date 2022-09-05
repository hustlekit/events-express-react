const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const eventSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: [ isEmail, 'Invalid email' ]
	},
	eventDate: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Event', eventSchema);