const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const customerRouter = require('./routes/customers/customer.router');

app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);
app.use(express.json());
app.use(customerRouter);

app.use(express.static(path.join(__dirname, '..', '..', 'client/build')));

app.get("*", (req, res) => {
	console.log('no route')
	return res.sendFile(path.join(__dirname, '..', '..', 'client/build/index.html'))
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', '..', 'client/build')));
}

module.exports = app;
