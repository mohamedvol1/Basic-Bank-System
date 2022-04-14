const path = require('path');
const db = require(path.join(__dirname, '..', '..', 'models', 'db.js'));

async function httpGetAllCustomers(req, res) {
	return await db.any('select * from clients order by client_id').then((rows) => res.json(rows));
}

async function httpGetCustomerById(req, res) {
	return db
		.task(async (t) => {
			const q1 = 'select * from clients where client_id = $1';
			const q2 =
				'select * from transactions where sender_id = $1 ' +
				'union ' +
				'select * from transactions where beneficiary_id = $1 ' +
				'order by transaction_created_at desc ' +
				'limit 10 ';
			const v = req.params.customerid;

			const clientData = await t.one(q1, v);
			const clinetTransactions = await t.any(q2, v);

			return { clientData, clinetTransactions };
		})
		.then(({ clientData, clinetTransactions }) => res.json({ clientData, clinetTransactions }))
		.catch((err) => res.json({ msg: 'Error happened while fetching the data: ' + err.message }));
}

async function httpGetCustomerTransfersById(req, res) {
	const q =
		'select * from transactions where sender_id = $1 ' +
		'union ' +
		'select * from transactions where beneficiary_id = $1 ' +
		'order by transaction_created_at desc ' +
		'limit 10 ';
	const v = req.params.customerid;
	return await db.any(q, v).then((rows) => res.json(rows));
}

async function httpPostCusotmerTransaction(req, res) {
	return db
		.tx(async (t) => {
			//grap the client data to do some checks
			const q = 'select * from clients where client_id = $1';
			const v = req.params.customerid;
			//grap the beneficiary data to do some checks
			const q0 = 'select * from clients where client_id = $1';
			const v0 = req.body.beneficiary_id;
			// transaction insert query
			const q1 = 'insert into transactions (sender_id, beneficiary_id, amount) values ($1, $2, $3)';
			const v1 = [ req.params.customerid, req.body.beneficiary_id, req.body.amount ];
			// cutting the amount from sender query
			const q2 =
				'update clients ' +
				'set client_balance = client_balance - $1 ' +
				'where client_id = $2 returning client_balance';
			const v2 = [ req.body.amount, req.params.customerid ];
			// adding the amount to beneficiary query
			const q3 = 'update clients ' + 'set client_balance = client_balance + $1 ' + 'where client_id = $2';
			const v3 = [ req.body.amount, req.body.beneficiary_id ];
			// fetch the newest client transaction
			const q4 =
				'select  * from transactions where sender_id = $1 ' + 'order by transaction_created_at desc ' + 'LIMIT 1';

			// beneficiary_name
			const { client_name } = await t.one(q0, v0);

			// sender balance
			const { client_balance } = await t.one(q, v);
			// some checks
			if (client_name !== req.body.beneficiary_name) {
				return { msg: 'Sorry, wrong client credentials' };
			}
			if (req.params.customerid === req.body.beneficiary_id) {
				return { msg: 'Sorry, you cant send money to the same account' }
			}
			if (req.body.amount > Number(client_balance)) {
				return { msg: "Your balance isn't enoungh" };
			}
			if (req.body.amount > 5000 ) {
				return { msg: "You can't send more than 5000$ for a one transaction" };
			}
			if (req.body.amount <= 0) {
				return { msg: "You have to specify a amount more than 0$!" };
			}
			
			await t.any(q1, v1);
      const latestTransaction = await t.one(q4, v)
			const newBalance = await t.any(q2, v2);
			await t.any(q3, v3);
			return { msg: 'transaction is done', newBalance: newBalance[0].client_balance, latestTransaction };
		})
		.then(({ msg, newBalance, latestTransaction }) => {
			console.log("port here")
			res.json({ msg, newBalance, latestTransaction })
		})
		.catch((err) => res.json({ msg: 'Error in transction: ' + err.message }));
}


module.exports = {
	httpGetAllCustomers,
	httpGetCustomerById,
	httpGetCustomerTransfersById,
	httpPostCusotmerTransaction
};
