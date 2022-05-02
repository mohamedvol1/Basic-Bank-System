const path = require('path');
const { Clients } = require(path.join(__dirname, '..', '..', 'models', 'customers.models'));
const db = require(path.join(__dirname, '..', '..', 'models', 'db.js'));

const bcrypt = require('bcrypt');

async function httpLoginCustomer(req, res) {
	const { email, password } = req.body;
	await Clients.getCleintByEmail(email)
		.then(async function(data) {
			// success;
			if (data.length) {
				// compare input pass with client pass from database
				let isEqual = await bcrypt.compare(password, data[0].pass);
				if (isEqual) {
					return res.json(data);
				}
				return res.status(400).json('wrong password');
			}
			res.json('no user with this email');
		})
		.catch(function(error) {
			// error;
			return res.json(error.message);
		});
}

async function httpAddCustomers(req, res) {
	// check if the user already existed
	const isTrue = await Clients.isClientExisted(req.body.email);
	if (isTrue) {
		return res.json('This email is already existed');
	}
	// passing the clinet  data from request body to add is to table
	Clients.addClient(req.body)
		.then(() => res.json('You have added a client successfully'))
		.catch((err) => console.log(err.message));

	return;
}

async function httpGetAllCustomers(req, res) {
	return await db.any('select * from clients order by client_id').then((rows) => res.json(rows));
}

async function httpGetCustomerById(req, res) {
	return Clients.getCleintDataById(req.params.customerid)
		.then(({ clientData, clientTransactions }) => res.json({ clientData, clientTransactions }))
		.catch((err) => res.json({ msg: 'Error happened while fetching the data: ' + err.message }));
}

async function httpPostCusotmerTransaction(req, res) {
	const beneficiaryData = req.body;
	const senderId = req.params.customerid;

	return Clients.clientConductTrasnaction(senderId, beneficiaryData)
		.then(({ msg, newBalance, latestTransaction }) => {
			console.log('port here');
			res.json({ msg, newBalance, latestTransaction });
		})
		.catch((err) => res.json({ msg: 'Error in transction: ' + err.message }));
}

module.exports = {
	httpGetAllCustomers,
	httpGetCustomerById,
	httpLoginCustomer,
	httpAddCustomers,
	httpPostCusotmerTransaction
};
