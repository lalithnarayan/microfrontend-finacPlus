import { Button, Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [errors, setErrors] = useState({ username: '', password: '', form: '' });
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/library');
		}
	}, [isAuthenticated, navigate]);

	const validate = () => {
		const newErrors = { username: '', password: '' };
		let valid = true;

		if (!formData.username) {
			newErrors.username = 'Username is required.';
			valid = false;
		}

		if (!formData.password) {
			newErrors.password = 'Password is required.';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) {
			setErrors(prev => ({
				...prev,
				form: 'Please fill in all required fields.'
			}));
			return;
		}
	
		if (!login(formData.username, formData.password)) {
			setErrors(prev => ({
				...prev,
				form: 'Invalid username or password. Please try again.'
			}));
		}
	};
		console.log(errors);
	return (
		<div className="flex min-h-screen flex-col justify-center px-6 py-12">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-10 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
				<form className="space-y-6" onSubmit={handleSubmit} noValidate>
					{errors.form && (
						<div className="rounded-md bg-red-50 p-4">
							<p className="text-sm text-red-700">{errors.form}</p>
						</div>
					)}
					<Input
						label="Username"
						name="username"
						type="text"
						value={formData.username}
						onChange={handleChange}
						error={errors.username}
						required
					/>
					<Input
						label="Password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						error={errors.password}
						required
					/>
					<Button type="submit">Sign in</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
