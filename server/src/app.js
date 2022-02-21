const express = require('express');
const cors = require('cors');

const app = express();

const customerRouter = require('./routes/customers/customer.router')

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(customerRouter)


module.exports = app;