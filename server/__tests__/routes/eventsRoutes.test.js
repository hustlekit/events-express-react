const supertest = require('supertest');
const app = require('../../server');

describe('Test /events post endpoint', () => {
	it('Should be status 200 and response.body instanceof Object', async () => {
		const inputObject = {
			firstName: "Krzysztof",
			lastName: "Pośpiech",
			email: "christoferrush@gmail.com",
			eventDate: "2022-10-01"
		};
		const res = await supertest(app)
			.post('/events')
			.send(inputObject);
		expect(res.status).toBe(200);
		expect(res.body.event.firstName).toEqual(inputObject.firstName);
		expect(res.body.event.lastName).toEqual(inputObject.lastName);
		expect(res.body.event.email).toEqual(inputObject.email);
	});
});