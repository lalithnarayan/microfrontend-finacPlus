import { lazy, Suspense, useEffect } from 'react';
import { of, tap } from 'rxjs';
import './App.css';
import Counter from './components/Counter';

const Remote = lazy(
	// @ts-ignore
	async () => import('remote/remote-app'),
);

export default () => {
	useEffect(() => {
		of('emit')
			.pipe(tap(() => console.log("I'm RxJs from host")))
			.subscribe();
	}, []);

	return (
		<Suspense fallback="loading...">
				<Remote />
			</Suspense>
	);
};
