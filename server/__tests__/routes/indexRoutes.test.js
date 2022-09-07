const supertest = require('supertest');
const app = require('../../server');

describe('Test root endpoint', () => {
	it('It should response the GET method with status 200', async () => {
		const res = await supertest(app).get('/');
		expect(res.status).toEqual(200);
		expect(res.body).toBeInstanceOf(Object);
	})
})