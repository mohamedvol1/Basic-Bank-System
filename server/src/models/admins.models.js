const path = require('path');
const db = require(path.join(__dirname, 'db.js'));

class AdminsClass {
	async getAdminByEmail(email) {
		return await db.any('SELECT * FROM admins WHERE admin_email = $1', [ email ]);
	}
}

const Admins = new AdminsClass();

module.exports = { Admins };
