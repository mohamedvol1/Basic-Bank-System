const path = require('path');

const express = require('express');

const customerRouter = express.Router();

const { httpGetAllCustomers,
        httpGetCustomerById, 
        httpPostCusotmerTransaction,
        httpLoginCustomer, 
        httpAddCustomers } = require('./customer.controller');

        
        
customerRouter.get('/customers', httpGetAllCustomers);

customerRouter.post('/customers', httpAddCustomers);

customerRouter.post('/customers/login', httpLoginCustomer);


customerRouter.get('/customers/:customerid', httpGetCustomerById);

customerRouter.post('/customers/:customerid', httpPostCusotmerTransaction);

module.exports = customerRouter;
