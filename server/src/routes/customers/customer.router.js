const path = require('path');

const express = require('express');

const customerRouter = express.Router();

const { getCustomers, getCustomerById } = require(path.join(__dirname, '..', '..', 'models', 'customers.model.js'));
const { httpGetAllCustomers, httpGetCustomerById, httpPostCusotmerTransaction, httpGetCustomerTransfersById } = require('./customer.controller');

customerRouter.get('/customers', httpGetAllCustomers);

customerRouter.get('/customers/:customerid', httpGetCustomerById);

customerRouter.post('/customers/:customerid', httpPostCusotmerTransaction);

// customerRouter.get('/customers/transactions/:customerid', httpGetCustomerTransfersById);

module.exports = customerRouter;
// 