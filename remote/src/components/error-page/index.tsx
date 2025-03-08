import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function ErrorPage() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
			<h1 className="text-4xl font-bold">Oops! Page not found.</h1>
			<Button asChild aria-label="Back to Homepage">
				<Link to="/">Back to Homepage</Link>
			</Button>
		</div>
	);
}
