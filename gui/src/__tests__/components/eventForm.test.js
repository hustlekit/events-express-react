import '@testing-library/jest-dom';
import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import EventForm from '../../components/EventForm';

const URL = process.env.REACT_APP_API_URL + '/events';

const mockResponse = {
	event: {
		firstName: 'Chris',
		lastName: 'Rush',
		email: 'christoferrush@gmail.com',
		eventDate: new Date('2022-09-08T22:00:00.000Z')
	}
};

const server = setupServer(
	rest.post(URL, (req, res, ctx) => {
		return res(ctx.json(mockResponse));
	})
);

beforeAll(() => server.listen());
afterEach(() => {
	window.localStorage.removeItem('event');
});
afterAll(() => server.close());

test('fill form successfully', async () => {
	const { container } = render(<EventForm/>);
	
	fireEvent.change(screen.getByLabelText(/First name/i), {
		target: { value: 'Chris' }
	});
	
	fireEvent.change(screen.getByLabelText(/Last name/i), {
		target: { value: 'Rush' }
	});
	
	fireEvent.change(screen.getByLabelText(/Email/i), {
		target: { value: 'christoferrush@gmail.com' }
	});
	
	const datePicker = container.querySelector(`input[name="date"]`)
	datePicker.value = '2022-09-08';
	
	fireEvent.click(screen.getByText(/submit/i));
	
	const headline = await screen.findByText(/Event Saved/i);
	expect(headline).toHaveTextContent(/Event Saved/i);
});