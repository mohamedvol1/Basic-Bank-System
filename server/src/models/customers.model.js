const db = require('./db');

async function getCustomers() {
	return await db.any('select * from clients');
}

async function getCustomerById(id) {
	return await db.any('select * from clients where client_id = $1', [id]);
}

module.exports = {
	getCustomers: getCustomers(),
  getCustomerById
};
