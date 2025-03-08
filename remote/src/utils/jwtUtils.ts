export const encodeToken = (user: any) => btoa(JSON.stringify(user));
export const decodeToken = (token: string) => JSON.parse(atob(token));

export const users = [
	{ id: 1, username: 'admin', password: 'admin123', role: 'admin' },
	{ id: 2, username: 'user', password: 'user123', role: 'user' },
];

export const songs = [
	{ id: 1, title: 'Song A', artist: 'Artist A', genre: 'Rock' },
	{ id: 2, title: 'Song B', artist: 'Artist B', genre: 'Pop' },
];
