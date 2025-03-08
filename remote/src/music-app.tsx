// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ErrorPage from './components/error-page';
import { getDefaultLayout } from './components/layout';

import { AuthProvider, useAuth } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';

import LoginPage from './pages/Login';
import MusicLibrary from './pages/MusicLibrary/MusicLibrary';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import MusicPlayer from './components/MusicPlayer';
import './styles/globals.less';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<MusicProvider>
					<MusicPlayerProvider>
						<Navbar />
						<Routes>
							<Route path="/" element={<AuthHandler />} />
							<Route path="*" element={<ErrorPage />} />
						</Routes>
						<MusicPlayer />
					</MusicPlayerProvider>
				</MusicProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

// This component decides whether to show the LoginPage or MusicLibrary based on authentication status
const AuthHandler = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? getDefaultLayout(<MusicLibrary />) : getDefaultLayout(<LoginPage />);
};

export default App;
