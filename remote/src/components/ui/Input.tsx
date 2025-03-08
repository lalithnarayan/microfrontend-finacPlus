import { InputHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
	const [touched, setTouched] = useState(false);

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
			<input
				{...props}
				onBlur={() => setTouched(true)}
				className={cn(
					'block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm',
					error && touched
						? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
						: 'border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500',
					className,
				)}
			/>
			{error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};
