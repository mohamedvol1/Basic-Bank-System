const path = require('path');
const db = require(path.join(__dirname, '..', '..', 'models', 'db.js'));
const bcrypt = require('bcrypt');

async function httpLoginAdmins(req, res) {
	const { email, password } = req.body;
	await db
		.any('SELECT * FROM admins WHERE admin_email = $1', [ email ])
		.then(async function(data) {
			// success;
			if (data.length) {
				// compare input pass with client pass from database
				let isEqual = await bcrypt.compare(password, data[0].pass)
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

// code for adding admins

// async function httpAddAdmin(req, res) {
// 	const { name, phone, email, balance, password } = req.body;
// 	// check if the user already existed
// 	const isTrue = await is_existed(email)
// 	if (isTrue) {
// 		return res.json('This email is already existed')
// 	}
// 	const salt = await bcrypt.genSalt();
// 	const hashedPass = await bcrypt.hash(password, salt);
// 	await db
// 		.none(
// 			'INSERT INTO admins(' +
// 				'admin_name,' +
// 				'admin_phone,' +
// 				'admin_email,' +
// 				'pass)' +
// 				'VALUES( $1, $2, $3, $4)',
// 			[ name, phone, email, hashedPass ]
// 		)
// 		.then(() => res.json('You have added a admin successfully'))
// 		.catch((err) => res.status(500).json(err.message));

// }

module.exports = { httpLoginAdmins };
