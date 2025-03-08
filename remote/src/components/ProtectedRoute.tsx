// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
	redirectPath?: string;
}

const ProtectedRoute = ({ children, redirectPath = '/' }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

export default ProtectedRoute;
