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

export { httpGetClients, httpPostClientTransaction, httpGetClientById };
