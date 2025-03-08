import { generate } from 'random-words';

export type UserRole = 'admin' | 'user';

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt: string;
	lastLogin: string | null;
}

export interface Album {
	id: string;
	title: string;
	artist: string;
	releaseDate: string;
	coverUrl: string;
	genre: string;
	tracks: Track[];
}

export interface Track {
	artist: any;
	coverUrl: string | undefined;
	id: string;
	title: string;
	duration: number; // in seconds
	albumId: string;
}

export interface ApiResponse<T> {
	status: string;
	data: T;
	message?: string;
}

// Mock Users
export const mockUsers: User[] = [
	{
		id: '1',
		username: 'admin',
		email: 'admin@example.com',
		password: 'admin123',
		role: 'admin',
		createdAt: '2023-01-10T12:00:00Z',
		lastLogin: '2025-03-06T15:30:00Z',
	},
	{
		id: '2',
		username: 'user',
		email: 'john@example.com',
		password: 'user123',
		role: 'user',
		createdAt: '2023-06-15T09:45:00Z',
		lastLogin: '2025-03-06T08:20:00Z',
	},
];

// Mock Music Library (Albums & Tracks)
export const mockMusicLibrary: Album[] = Array.from({ length: 4 }, (_, i) => ({
	id: `album-${i + 1}`,
	title: generate({ min: 2, max: 3, join: ' ' }),
	artist: generate({ min: 1, max: 3, join: ' ' }),
	releaseDate: `202${i % 10}-01-01`,
	genre: ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic'][i % 6],
	coverUrl: `https://picsum.photos/200?random=${i + 1}`,
	tracks: Array.from({ length: 10 }, (_, j) => ({
		id: `track-${i + 1}-${j + 1}`,
		title: generate({ min: 1, max: 2, join: ' ' }),
		duration: Math.floor(Math.random() * 300) + 120,
		albumId: `album-${i + 1}`,
		artist: generate({ min: 1, max: 3, join: ' ' }),
		coverUrl: `https://picsum.photos/200?random=${i + 1}`,
	})),
}));

// Mock API Functions
export const mockApi = {
	login: (username: string, password: string): Promise<ApiResponse<User | null>> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const user = mockUsers.find((u) => u.username === username && u.password === password);
				if (user) {
					resolve({ status: 'success', data: user });
				} else {
					resolve({ status: 'error', data: null, message: 'Invalid credentials' });
				}
			}, 500); // Simulate API delay
		});
	},

	getMusicLibrary: (): Promise<ApiResponse<Album[]>> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve({ status: 'success', data: mockMusicLibrary }), 500);
		});
	},

	getAlbum: (albumId: string): Promise<ApiResponse<Album | null>> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const album = mockMusicLibrary.find((a) => a.id === albumId);
				resolve({ status: album ? 'success' : 'error', data: album || null });
			}, 500);
		});
	},
};
