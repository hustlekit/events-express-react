import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import DatePicker from 'react-date-picker';
import axios from 'axios';


const EventForm = () => {
	const classes = styles();
	const [ valid, setValid ] = useState(true);
	const [ formSent, setFormSent ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ eventDate, setEventDate ] = useState(new Date());
	const [ savedEvent, setSavedEvent ] = useState({});
	
	const validateEmail = () => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
	
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
		setValid(true);
		
		if (!firstName || !lastName || !email || !eventDate || !validateEmail()) {
			setValid(false);
			return;
		}
		
		const event = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			eventDate: eventDate
		};
		
		const url = process.env.REACT_APP_API_URL + '/events';
		const res = await axios.post(url, event);
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
								/>
							</div>
							<div className={ classes.formControl }>
								<label className={ classes.labelElement } htmlFor={ 'eventDate' }>Event Date:</label>
								<DatePicker
									value={ eventDate }
									onChange={ setEventDate }
									data-testid={ 'eventDate' }
								/>
							</div>
							<div>
								<button type={ 'submit' }>
									Submit
								</button>
							</div>
						</Form>
						<div>
							{
								!valid ? <div><span>Invalid Data</span></div> : null
							}
						</div>
					</div>
					:
					<div className={ classes.container }>
						<h2>Event Saved</h2>
						<div className={ classes.savedContainer }>
							<div><span>First name:</span><span>{ savedEvent.firstName }</span></div>
							<div><span>Last name:</span><span>{ savedEvent.lastName }</span></div>
							<div><span>Email:</span><span>{ savedEvent.email }</span></div>
							<div><span>Event date:</span><span>{ savedEvent.eventDate }</span></div>
						</div>
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
	container: {
		flex: 1
	},
	savedContainer: {
		display: 'flex',
		flexDirection: 'column',
		'& span': {
			flex: 1,
		},
		'& span:first-of-type': {
			textAlign: 'right'
		},
		'& span:last-of-type': {
			paddingLeft: '5px'
		}
	},
});

export default EventForm;