import * as React from 'react';
import { Fragment } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ user, setUser }) => {
	const Navigate = useNavigate();

	const [ anchorElNav, setAnchorElNav ] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const endUserSession = () => {
		// clearing user data
		localStorage.clear();
		setUser({});
		Navigate('/');
	};

	let pages = [];
	if (Object.keys(user).length === 0) {
		// default viea
		pages = [ { page: 'Home', path: '/' }, { page: 'Admin', path: 'admin' }, { page: 'Client', path: 'client' } ];
	} else {
		// admin viea
		if (user['admin_email']) {
			pages = [ { page: 'Home', path: '/' }, { page: 'View all Clients', path: 'clients' }, { page: 'Add Client', path: 'signup' }, { page: `Hi ${user['admin_name']}`, path: '/' } ];
		} else {
			// client viea
			pages = [ { page: 'Home', path: '/' }, { page: `Hi ${user['client_name']}`, path: `/clients/${user['client_id']}` } ];
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="secondary">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' }
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.page} onClick={handleCloseNavMenu}>
										<Typography
											key={page.page}
											onClick={() => {
												handleCloseNavMenu();
												Navigate(page.path);
											}}
											sx={{ display: 'block', width: '100%', height: '100%', py: 2 }}
										>
											{page.page}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page.page}
									onClick={() => {
										handleCloseNavMenu();
										Navigate(page.path);
									}}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.page}
								</Button>
							))}
							{Object.keys(user).length !== 0 && (
									<Button key={'Logout'} onClick={endUserSession}>
										<Typography
											key={'Logout'}
											sx={{ my: 2, color: 'white', display: 'block' }}
											// onClick={}
										>
											Logout
										</Typography>
									</Button>
								)}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};

export default NavigationBar;
