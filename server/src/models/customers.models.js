const path = require('path');
const db = require(path.join(__dirname, 'db.js'));
const { Transactions } = require(path.join(__dirname, 'transactions.models.js'));
const bcrypt = require('bcrypt');

class ClientsClass {
	// get client data by passing email
	async getCleintByEmail(email) {
		return await db.any('SELECT * FROM clients WHERE client_email = $1', [ email ]);
	}

	// retunrs client data and latest 10 transactions by passing id
	async getCleintDataById(id) {
		return await db.task(async (t) => {
			// initiate a Transactions class object
			const transaction = new Transactions(t);
			const q = 'select * from clients where client_id = $1';
			const clientData = await t.one(q, id);
			const clientTransactions = await transaction.getLatestTransactions(id);
			return { clientData, clientTransactions };
		});
	}

	async isClientExisted(email) {
		const data = await db.any('SELECT * FROM clients WHERE client_email = $1', [ email ]);
		if (data.length) {
			return true;
		}
		return false;
	}

	async addClient(data) {
		const { name, phone, email, balance, password } = data;
		const salt = await bcrypt.genSalt();
		const hashedPass = await bcrypt.hash(password, salt);
		return await db.none(
			'INSERT INTO clients(' +
				'client_name,' +
				'client_phone,' +
				'client_email,' +
				'client_balance,' +
				'pass)' +
				'VALUES( $1, $2, $3, $4, $5 )',
			[ name, phone, email, balance, hashedPass ]
		);
	}

	// carry out a transaction from sender (senderId) to the receiver (beneficiaryData)
	async clientConductTrasnaction(senderId, beneficiaryData) {
		const { beneficiary_name, beneficiary_id, amount } = beneficiaryData;
		return await db.tx(async (t) => {
			// initiate a Transaction Class object
			const transaction = new Transactions(t);
			//grap the client data to do some checks
			const q = 'select * from clients where client_id = $1';
			const v = senderId;
			//grap the beneficiary data to do some checks
			const q0 = 'select * from clients where client_id = $1';
			const v0 = beneficiary_id;
			// cutting the amount from sender query
			const q2 =
				'update clients ' +
				'set client_balance = client_balance - $1 ' +
				'where client_id = $2 returning client_balance';
			const v2 = [ amount, senderId ];
			// adding the amount to beneficiary query
			const q3 = 'update clients ' + 'set client_balance = client_balance + $1 ' + 'where client_id = $2';
			const v3 = [ amount, beneficiary_id ];
			// beneficiary_name
			const { client_name } = await t.one(q0, v0);

			// sender balance
			const { client_balance } = await t.one(q, v);
			// some checks
			if (client_name !== beneficiary_name) {
				return { msg: 'Sorry, wrong client credentials' };
			}
			if (senderId === beneficiary_id) {
				return { msg: 'Sorry, you cant send money to the same account' };
			}
			if (amount > Number(client_balance)) {
				return { msg: "Your balance isn't enoungh" };
			}
			if (amount > 5000) {
				return { msg: "You can't send more than 5000$ for a one transaction" };
			}
			if (amount <= 0) {
				return { msg: 'You have to specify a amount more than 0$!' };
			}

			// add new transaction
			const transferData = [ senderId, beneficiary_id, amount ];
			await transaction.addTransaction(transferData);

			const latestTransaction = await transaction.getJustAddedTransaction(v);
			const newBalance = await t.any(q2, v2);
			await t.any(q3, v3);
			return { msg: 'transaction is done', newBalance: newBalance[0].client_balance, latestTransaction };
		});
	}
}

const Clients = new ClientsClass();

module.exports = { Clients };
