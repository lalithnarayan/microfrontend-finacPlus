import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
	isAuthenticated: boolean;
	role: UserRole;
	login: (username: string, password: string) => boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [role, setRole] = useState<UserRole>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const storedRole = localStorage.getItem('role') as UserRole;

		if (token && storedRole) {
			setIsAuthenticated(true);
			setRole(storedRole);
			navigate('/');
		} else {
			setIsAuthenticated(false);
			setRole(null);
			navigate('/');
		}
	}, [navigate]);

	const login = (username: string, password: string): boolean => {
		// Example login logic for admin and user
		if (username === 'admin' && password === 'admin123') {
			localStorage.setItem('token', 'mockToken');
			localStorage.setItem('role', 'admin');
			setIsAuthenticated(true);
			setRole('admin');
			navigate('/');
			return true;
		} else if (username === 'user' && password === 'user123') {
			localStorage.setItem('token', 'mockToken');
			localStorage.setItem('role', 'user');
			setIsAuthenticated(true);
			setRole('user');
			navigate('/');
			return true;
		}
		return false;
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		setIsAuthenticated(false);
		setRole(null);
		navigate('/');
	};

	return <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
