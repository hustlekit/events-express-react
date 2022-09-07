const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');

const app = express();

const MONGODB_URI = 'mongodb+srv://chris:slayer665@cluster0.kmlgi.mongodb.net/events?retryWrites=true&w=majority';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventsRouter);

mongoose
	.connect(
		MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	)
	.then(() => {
		console.log('Connected to the database.')
	})
	.catch(err => {
		console.log(err);
	});

module.exports = app;
