import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const TransfersLog = ({ transactions, id }) => {
	return (
		<List
			sx={{
				maxHeight: '190px',
				overflow: 'auto',
				width: '100%',
				bgcolor: 'background.paper'
			}}
		>
			{transactions.map((trans) => {
				// current client is beneficiary
				let sign = '+';
				const { sender_id, amount, transaction_created_at } = trans;
				const dateobj = new Date(transaction_created_at);
				const options = {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				};
				const formattedDate = dateobj.toLocaleDateString(undefined, options);
				if (sender_id === +id) {
					// current client is the sender
					sign = '-';
				}
				return (
					<ListItem key={dateobj.getTime()}>
						<ListItemText secondary={formattedDate} sx={{ color: sign === '+' ? '#04AA6D' : 'red' }}>
							{sign}
							{amount}
						</ListItemText>
					</ListItem>
				);
			})}
		</List>
	);
};

export default TransfersLog;
