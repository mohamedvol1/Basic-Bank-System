import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useClientData } from '../../hooks/useClients';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { httpPostClientTransaction } from '../../hooks/requests';
import TransfersLog from '../../components/TransfersLog/TransferLog';

const ClientProfile = () => {
	const params = useParams();

	const [ open, setOpen ] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [ beneficiaryName, setBeneficiaryName ] = useState('');
	const [ beneficiaryId, setBeneficiaryId ] = useState('');
	const [ amount, setAmount ] = useState(0);

	const [ responseMessage, setResponseMessage ] = useState('');
	const [ isTransactionPending, setIsTransactionPending ] = useState(false);
	const [ newBalance, setNewBalance ] = useState(0);

	const { client, transactions } = useClientData(params.id);

	//posting form and fetching new info
	const handleSubmit = () => {
		setIsTransactionPending(true);
		httpPostClientTransaction(
			params.id,
			beneficiaryName,
			beneficiaryId,
			amount
		).then(({ msg, newBalance, latestTransaction }) => {
			setResponseMessage(msg);
			// update balance after transaction
			if (newBalance) {
				setNewBalance(newBalance);
				transactions.unshift(latestTransaction);
				if (transactions.length > 10) {
					transactions.pop(transactions[transactions.length - 1]);
				}
			}
			setIsTransactionPending(false);
		});

		setOpen(false);
		cleanTranactionForm();
		openSnackBar();
	};

	const cleanTranactionForm = () => {
		setBeneficiaryName('');
		setBeneficiaryId('');
		setAmount(0);
	};

	const [ snackbarOpen, setSnackBarOpen ] = useState(false);
	const vertical = 'top';
	const horizontal = 'left';

	const openSnackBar = () => {
		setSnackBarOpen(true);
	};

	const handleSnackBarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackBarOpen(false);
	};

	return (
		<div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackBarClose}
				anchorOrigin={{ vertical, horizontal }}
				key={vertical + horizontal}
			>
				{responseMessage === 'transaction is done' ? (
					<Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
						{responseMessage}!
					</Alert>
				) : (
					<Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
						{responseMessage}!
					</Alert>
				)}
			</Snackbar>
			<Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '7rem', marginBottom: '15rem' }}>
				{client &&
					(isTransactionPending ? (
						<h1>pending....</h1>
					) : (
						<CardContent>
							<Grid container alignItems="center">
								<Grid item xs>
									<Typography
										sx={{ textAlign: 'left', m: 1 }}
										gutterBottom
										variant="h4"
										component="div"
									>
										{client.client_name}
									</Typography>
								</Grid>
								<Grid item>
									<Typography gutterBottom variant="h6" component="div">
										Balance
									</Typography>
									{newBalance === 0 ? (
										<span>${client.client_balance}</span>
									) : (
										<span>${newBalance}</span>
									)}
								</Grid>
							</Grid>
							<Typography sx={{ textAlign: 'left', m: 1 }} color="text.secondary" variant="body2">
								<span>{client.client_email}</span>
								<br />
								<span>{client.client_phone}</span>
							</Typography>
							<Divider>clients transfers ( latest 10 )</Divider>
							<TransfersLog transactions={transactions} id={params.id} />
						</CardContent>
					))}
				<CardActions>
					<div style={{ width: '100%' }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								p: 1,
								m: 1
							}}
						>
							<Button sx={{}} onClick={handleOpen}>
								Transfer money
							</Button>
						</Box>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: 400,
									bgcolor: 'background.paper',
									border: '2px solid #000',
									boxShadow: 24,
									p: 4
								}}
							>
								<TextField
									id="outlined-basic"
									label="Beneficiary ID (should be bank acount)"
									variant="outlined"
									value={beneficiaryId}
									onChange={(e) => {
										setBeneficiaryId(e.target.value);
									}}
								/>
								<TextField
									id="outlined-basic"
									label="Beneficiary Name"
									variant="outlined"
									value={beneficiaryName}
									onChange={(e) => {
										setBeneficiaryName(e.target.value);
									}}
									sx={{ marginTop: '2rem' }}
								/>
								<TextField
									value={amount}
									onChange={(e) => {
										setAmount(e.target.value);
									}}
									sx={{ marginTop: '2rem' }}
									id="outlined-number"
									label="Amount"
									type="number"
									helperText="Maximum amount is 5000$"
									InputLabelProps={{
										shrink: true
									}}
									InputProps={{
										inputProps: {
											min: 0,
											max: 5000
										}
									}}
								/>
								<Button
									sx={{ width: '100px', margin: 'auto', marginTop: '2rem' }}
									variant="contained"
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</Box>
						</Modal>
					</div>
				</CardActions>
			</Card>
		</div>
	);
};
export default ClientProfile;
