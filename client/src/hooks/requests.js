const httpGetClients = async () => {
	const response = await fetch('/customers');
	return await response.json();
};

const httpPostClientTransaction = async (id, name, nameId, amount) => {
	const response = await fetch(`/customers/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			beneficiary_name: name,
			beneficiary_id: nameId,
			amount: amount
		})
	});
	return await response.json();
};

const httpGetClientById = async (id) => {
	const response = await fetch(`/customers/${id}`);
	return await response.json();
};

const httpPostUsertToSignin = async ({ email, password, userType }) => {
	const endPoint = userType === 'Client' ? `/customers/login` : `admins/login`;
	const response = await fetch(endPoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			password
		})
	});
	return await response.json();
};

const httpPostNewUser = async ({ name, phone, email, balance, password }) => {
	const response = await fetch('/customers', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name,
			phone,
			email,
			balance,
			password
		})
	});
	return await response.json();
};

export { httpGetClients, httpPostClientTransaction, httpGetClientById, httpPostUsertToSignin, httpPostNewUser };
