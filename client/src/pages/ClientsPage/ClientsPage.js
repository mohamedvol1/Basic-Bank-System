import { Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import { useClients } from '../../hooks/useClients';

const ClientsPage = () => {
	const clients = useClients();

	return (
		<Fragment>
			<h1 style={{}}>All Clients</h1>
			{clients.length ? (
				<TableContainer component={Paper} sx={{ maxWidth: '900px', margin: 'auto', marginBottom: '9rem' }}>
					<Table aria-label="simple table">
						<TableHead
							sx={{
								'&:first-of-type th': {
									color: 'white'
								},
								backgroundColor: 'black'
							}}
						>
							<TableRow sx={{ color: 'white' }}>
								<TableCell key="id">id</TableCell>
								<TableCell key="name" align="right">
									name
								</TableCell>
								<TableCell key="email" align="right">
									email
								</TableCell>
								<TableCell key="phone" align="right">
									phone
								</TableCell>
								<TableCell key="Balance" align="right">
									Balance
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((client) => (
								<TableRow
									sx={{
										'&:nth-of-type(odd)': {
											backgroundColor: '#f5f5f5'
										},
										'&:last-child td, &:last-child th': { border: 0 }
									}}
									key={client.client_id}
								>
									<TableCell
										component="th"
										scope="row"
										key={`${client.client_id}${client.client_id}`}
									>
										{client.client_id}
									</TableCell>
									<TableCell key={`${client.client_id}${client.client_name}`} align="right">
										<Link to={`${client.client_id}`}>{client.client_name}</Link>
									</TableCell>
									<TableCell key={`${client.client_id}${client.client_email}`} align="right">
										{client.client_email}
									</TableCell>
									<TableCell key={`${client.client_id}${client.client_phone}`} align="right">
										{client.client_phone}
									</TableCell>
									<TableCell key={`${client.client_id}${client.client_balance}`} align="right">
										{client.client_balance}$
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<h1>Loading...</h1>
			)}
		</Fragment>
	);
};

export default ClientsPage;
