const express = require('express');
const bodyParser = require('body-parser');
const { raw } = require('body-parser');

const routes = [
	require('./routes/auth'),
    require('./routes')
];


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example

// We define the standard REST APIs for each route (if they exist).
routes.map((route) => {
    app.use(route);
})

module.exports = app;