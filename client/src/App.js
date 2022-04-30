import './App.css';

import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import ClientsPage from './pages/ClientsPage/ClientsPage';
import ClientProfile from './pages/ClientProfile/ClientProfile';
import LoginForm from './components/LoginForm/LoginForm';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignUpForm from './components/SignUpForm/SignUpForm';

import { useCallback, useEffect, useState } from 'react';

function App() {
	const [ user, setUser ] = useState({});
	const setUserSession = (data) => {
		localStorage.setItem('user', JSON.stringify(data));
		setUser(data);
	};
	
	const checkUserSession = useCallback(() => {
		if (localStorage.getItem('user')) {
			const data = JSON.parse(localStorage.getItem('user'));
			setUserSession(data);
		}
	}, [])
	useEffect(() => {
		checkUserSession()
	}, [checkUserSession])

	return (
		<div className="App">
			<NavigationBar user={user} setUser={setUser} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="admin"
					element={<LoginPage LoginForm={<LoginForm setUser={setUserSession} userType={'Admin'} />} />}
				/>
				<Route
					path="client"
					element={<LoginPage LoginForm={<LoginForm setUser={setUserSession} userType={'Client'} />} />}
				/>
				<Route path="signup" element={<SignUpPage SignUpForm={<SignUpForm user={user} />} />} />
				<Route path="clients" element={<ClientsPage user={user} />} />
				<Route path="clients/:id" element={<ClientProfile user={user} />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
