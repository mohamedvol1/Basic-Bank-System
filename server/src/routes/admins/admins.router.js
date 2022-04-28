const express = require('express');

const adminsRouter = express.Router();

const { httpLoginAdmins } = require('./admins.controller');

adminsRouter.post('/admins/login', httpLoginAdmins);

module.exports = adminsRouter;
