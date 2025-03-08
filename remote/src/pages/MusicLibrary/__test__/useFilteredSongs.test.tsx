import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import { useFilteredSongs } from '../useFilteredSongs';
import { MusicContext } from '@/context/MusicContext';

const mockAlbums = [
	{
		title: 'Album 1',
		artist: 'Artist 1',
		coverUrl: 'url1',
		tracks: [
			{ id: '1', title: 'Song A', artist: 'Artist 1', duration: 200 },
			{ id: '2', title: 'Song B', artist: 'Artist 1', duration: 180 },
		],
	},
	{
		title: 'Album 2',
		artist: 'Artist 2',
		coverUrl: 'url2',
		tracks: [
			{ id: '3', title: 'Song C', artist: 'Artist 2', duration: 240 },
			{ id: '4', title: 'Song D', artist: 'Artist 2', duration: 220 },
		],
	},
];

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<MusicContext.Provider value={{ albums: mockAlbums, addAlbum: () => {}, addSong: () => {}, removeSong: () => {} }}>
		{children}
	</MusicContext.Provider>
);

describe('useFilteredSongs Hook', () => {
	it('returns all songs when no filter is applied', () => {
		const { result } = renderHook(() => useFilteredSongs('', 'title', ''), { wrapper });
		expect(result.current['All Tracks']).toHaveLength(4);
	});

	it('filters songs by title', () => {
		const { result } = renderHook(() => useFilteredSongs('Song A', 'title', ''), { wrapper });
		expect(result.current['All Tracks']).toHaveLength(1);
		expect(result.current['All Tracks'][0].title).toBe('Song A');
	});

	it('sorts songs by artist', () => {
		const { result } = renderHook(() => useFilteredSongs('', 'artist', ''), { wrapper });
		expect(result.current['All Tracks'][0].artist).toBe('Artist 1');
	});

	it('groups songs by album title', () => {
		const { result } = renderHook(() => useFilteredSongs('', 'title', 'artist'), { wrapper });
		expect(result.current['Album 1']).toHaveLength(2);
		expect(result.current['Album 2']).toHaveLength(2);
	});
});
