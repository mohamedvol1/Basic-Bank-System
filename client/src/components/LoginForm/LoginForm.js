import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, TextField, Typography } from '@mui/material';

import { httpPostUsertToSignin } from '../../hooks/requests';

const LoginForm = ({ setUser, userType }) => {
	const [ email, setEmail ] = useState('');
	const [ pass, setPass ] = useState('');
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: email,
			password: pass,
			userType: userType
		};

		httpPostUsertToSignin(data)
			.then((res) => {
				if (typeof res == 'string') {
					alert(res);
				} else {
					if (res[0]['admin_id']) {
						// user is an admin
						setUser(res[0]); //set user session
						navigate('/clients'); // navigate to clients page
					} else {
            setUser(res[0]);
            navigate(`/clients/${res[0]['client_id']}`);
						console.log(res[0]);
					}
				}
			})
			.catch((err) => console.log('err', err));

		// console.log(data)
	};

	return (
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
					<h1>{userType} Login</h1>
					<Divider sx={{ m: 'auto', width: '400px' }} variant="middle" />
				</Box>
				<Box id="product_form" sx={{ width: '320px', m: 'auto', my: '3rem' }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
						<Typography sx={{ py: '1rem' }}> Email </Typography>
						<TextField
							sx={{ width: '260px' }}
							id="emai;"
							label="email"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
					<Button type="submit" sx={{ m: 'auto', width: '200px' }} variant="contained" onClick={handleSubmit}>
						Login
					</Button>
				</Box>
			</Box>
		</Fragment>
	);
};

export default LoginForm;
