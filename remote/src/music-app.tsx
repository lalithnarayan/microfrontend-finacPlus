// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorPage from './components/error-page';
import { getDefaultLayout } from './components/layout';

import { AuthProvider, useAuth } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import MusicLibrary from './pages/MusicLibrary/MusicLibrary';
import './styles/globals.less';

const LoginPage = React.lazy(() => import('./pages/Login'));

import MusicPlayer from './components/MusicPlayer';

import { MusicPlayerProvider } from './context/MusicPlayerContext';

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
