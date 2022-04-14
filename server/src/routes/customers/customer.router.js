const path = require('path');

const express = require('express');

const customerRouter = express.Router();

const { httpGetAllCustomers, httpGetCustomerById, httpPostCusotmerTransaction } = require('./customer.controller');

customerRouter.get('/customers', httpGetAllCustomers);

customerRouter.get('/customers/:customerid', httpGetCustomerById);

customerRouter.post('/customers/:customerid', httpPostCusotmerTransaction);

module.exports = customerRouter;
