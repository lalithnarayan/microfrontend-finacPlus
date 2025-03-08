import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();

	return (
		<nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
			<h1 className="text-lg font-semibold">
				<Link to="/">Music Library</Link>
			</h1>
			<div className="space-x-4">
				{isAuthenticated ? (
					<>
						<Button onClick={logout} variant="outline" className="ml-4">
							Logout
						</Button>
					</>
				) : (
					<Link to="/" className="hover:text-gray-300">
						Login
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
