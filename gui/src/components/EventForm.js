import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import DatePicker from 'react-date-picker';
import axios from 'axios';

const required = value => {
	if ( !value ) {
		return (
			<div>
				This field is required!
			</div>
		);
	}
};

const EventForm = () => {
	const classes = styles();
	const [ formSent, setFormSent ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ eventDate, setEventDate ] = useState(new Date());
	const [ savedEvent, setSavedEvent ] = useState({});
	
	const onChangeFirstName = (e) => {
		setFirstName(e.target.value);
	};
	
	const onChangeLastName = (e) => {
		setLastName(e.target.value);
	};
	
	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const event = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			eventDate: eventDate
		};
		
		const url = process.env.REACT_APP_API_URL + '/events';
		const res = await axios.post(url, event);
		console.log(res.data.event);
		setSavedEvent(res.data.event);
		setFormSent(true);
	};
	
	const handleBackButton = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setEventDate(new Date());
		setSavedEvent({});
		setFormSent(false);
	}
	
	return (
		<div className={ classes.root }>
			{
				!formSent ?
					<div>
						<Form onSubmit={ handleSubmit }>
							<div className={ classes.formControl }>
								<label className={ classes.labelElement } htmlFor={ 'firstName' }>First Name:</label>
								<Input
									className={ classes.inputElement }
									type={ 'text' }
									id={ 'firstName' }
									name={ 'firstName' }
									value={ firstName }
									onChange={ onChangeFirstName }
									validations={ [ required ] }
								/>
							</div>
							<div className={ classes.formControl }>
								<label className={ classes.labelElement } htmlFor={ 'lastName' }>Last Name:</label>
								<Input
									className={ classes.inputElement }
									type={ 'text' }
									id={ 'lastName' }
									name={ 'lastName' }
									value={ lastName }
									onChange={ onChangeLastName }
									validations={ [ required ] }
								/>
							</div>
							<div className={ classes.formControl }>
								<label className={ classes.labelElement } htmlFor={ 'email' }>Email:</label>
								<Input
									className={ classes.inputElement }
									type={ 'text' }
									id={ 'email' }
									name={ 'email' }
									value={ email }
									onChange={ onChangeEmail }
									validations={ [ required ] }
								/>
							</div>
							<div className={ classes.formControl }>
								<label className={ classes.labelElement } htmlFor={ 'eventDate' }>Event Date:</label>
								<DatePicker
									value={ eventDate }
									onChange={ setEventDate }
								/>
							</div>
							<div>
								<button type={ 'submit' }>
									Submit
								</button>
							</div>
						</Form>
					</div>
					:
					<div>
						<h2>Event Saved</h2>
						<ul className={ classes.ulElement }>
							<li>First name: { savedEvent.firstName }</li>
							<li>Last name: { savedEvent.lastName }</li>
							<li>Email: { savedEvent.email }</li>
							<li>Event date: { savedEvent.eventDate }</li>
						</ul>
						<button onClick={ handleBackButton }>Back</button>
					</div>
			}
		</div>
	);
};

const styles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '50px'
	},
	formControl: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: '10px',
		height: '30px'
	},
	labelElement: {
		width: '100px',
		textAlign: 'right',
		paddingRight: '20px'
	},
	inputElement: {
		width: '300px'
	},
	ulElement: {
		listStyleType: 'none'
	}
});

export default EventForm;