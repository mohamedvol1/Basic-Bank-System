import { Fragment, useState } from 'react';

import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { httpPostNewUser } from '../../hooks/requests';

const SignUpForm = ({ user }) => {
	const [ email, setEmail ] = useState('');
	const [ pass, setPass ] = useState('');
	const [ name, setName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ balance, setBalance ] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email == false || name == false || phone == false || pass == false) {
			alert('you have to fill all fields');
			return;
		}
		const data = { name, phone, email, balance, password: pass };
		httpPostNewUser(data).then((res) => console.log(res)).catch((err) => console.log(err));
	};

	return (
		Object.keys(user).length !== 0 &&
		user['admin_id'] && (
			<Fragment>
				<Box
					component="form"
					action=""
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column'
					}}
				>
					<Box>
						<h1> Add Client </h1>
						<Divider sx={{ m: 'auto', width: '400px' }} variant="middle" />
					</Box>
					<Box id="product_form" sx={{ width: '320px', m: 'auto', my: '3rem' }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
							<Typography sx={{ py: '1rem' }}> Email </Typography>
							<TextField
								sx={{ width: '260px' }}
								id="emai"
								label="email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
							<Typography sx={{ py: '1rem' }}> Name </Typography>
							<TextField
								sx={{ width: '260px' }}
								id="Name"
								label="name"
								variant="outlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
							<Typography sx={{ py: '1rem' }}> Phone </Typography>
							<TextField
								sx={{ width: '260px' }}
								id="Phone"
								label="phone"
								variant="outlined"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
							<Typography sx={{ py: '1rem' }}> balance </Typography>
							<TextField
								sx={{ width: '260px' }}
								id="balance"
								type="number"
								label="balance"
								variant="outlined"
								value={balance}
								onChange={(e) => setBalance(e.target.value)}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								mb: '2rem'
							}}
						>
							<Typography sx={{ py: '1rem' }}> Pass </Typography>
							<TextField
								type="password"
								sx={{ width: '260px' }}
								id="Pass"
								label="Pass"
								variant="outlined"
								value={pass}
								onChange={(e) => setPass(e.target.value)}
							/>
						</Box>
						<Button
							type="submit"
							sx={{ m: 'auto', width: '200px', mb: '7rem' }}
							variant="contained"
							onClick={handleSubmit}
						>
							Add
						</Button>
					</Box>
				</Box>
			</Fragment>
		)
	);
};

export default SignUpForm;
