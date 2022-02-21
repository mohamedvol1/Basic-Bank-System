import { useCallback, useState, useEffect } from 'react';
import { httpGetClients, httpGetClientById } from './requests';

let clientsToBeFiltered = [];

const useClients = () => {
	const [ clients, saveClients ] = useState([]);

	const getClients = useCallback(async () => {
		const fetchedClients = await httpGetClients();
		saveClients(fetchedClients);
	}, []);

	useEffect(
		() => {
			getClients();
		},
		[ getClients ]
	);

	return clients;
};

const useClientData = (id) => {
	const [ client, setClient ] = useState([]);
	const [ transactions, setTransactions ] = useState([]);

	useEffect(() => {
		httpGetClientById(id).then(({ clientData, clinetTransactions }) => {
			setClient(clientData);
			setTransactions(clinetTransactions);
		});
	}, []);

	return { client, transactions };
};

export { useClients, clientsToBeFiltered, useClientData };
