// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ErrorPage from './components/error-page';
import { getDefaultLayout } from './components/layout';

import { AuthProvider, useAuth } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';

const LoginPage = React.lazy(() => import('./pages/Login'));
const MusicLibrary = React.lazy(() => import('./pages/MusicLibrary/MusicLibrary'));
const MusicPlayer = React.lazy(() => import('./components/MusicPlayer'));
import './styles/globals.less';
import React from 'react';
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
