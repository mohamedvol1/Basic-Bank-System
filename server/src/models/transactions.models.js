class Transactions {
	// initiate class with a task object from db module
	constructor(taskObj) {
		this.task = taskObj;
	}

	// fetch the newest client transaction
	async getJustAddedTransaction(id) {
		const q =
			'select * from transactions where sender_id = $1 ' + 'order by transaction_created_at desc ' + 'LIMIT 1';

		return await this.task.one(q, id);
	}

	// return latest 10 transaction
	async getLatestTransactions(id) {
		const q =
			'select * from transactions where sender_id = $1 ' +
			'union ' +
			'select * from transactions where beneficiary_id = $1 ' +
			'order by transaction_created_at desc ' +
			'limit 10 ';

		return await this.task.any(q, id);
	}

	async addTransaction(TransactionDataArray) {
		const q = 'insert into transactions (sender_id, beneficiary_id, amount) values ($1, $2, $3)';
		return await this.task.any(q, TransactionDataArray);
	}
}

// const Transactions = new TransactionsClass();

module.exports = { Transactions };
