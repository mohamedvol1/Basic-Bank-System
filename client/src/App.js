import './App.css';

import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import ClientsPage from './pages/ClientsPage/ClientsPage';
import ClientProfile from './pages/ClientProfile/ClientProfile';

function App() {
	return (
		<div className="App">
			<NavigationBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientProfile />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
