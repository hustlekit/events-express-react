const Event = require('../model/event');

exports.saveEvent = async (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const eventDate = req.body.eventDate;
	
	if (firstName && lastName && email && eventDate) {
		const event = new Event({
			firstName: firstName,
			lastName: lastName,
			email: email,
			eventDate: eventDate
		});
		
		try {
			await event.save();
			res.status(200).send({ event: event });
		} catch ( error ) {
			console.log(error);
			res.status(500).send({ message: error.message })
		}
		
	} else {
		res.status(422).send({ message: 'Invalid Data' });
	}
}