import { useMusic } from '@/context/MusicContext';
import { Track } from '@/utils/mockdata';
import { useMemo } from 'react';

type GroupedSongs = Record<string, Track[]>;

export const useFilteredSongs = (filter: string, sortBy: keyof Track, groupBy: keyof Track | ''): GroupedSongs => {
	const { albums } = useMusic();

	const tracks = useMemo(() => {
		if (!albums?.length) return [];
		return albums.flatMap((album) =>
			album.tracks.map((track) => ({
				...track,
				albumTitle: album.title,
				artist: album.artist,
				coverUrl: album.coverUrl,
			})),
		);
	}, [albums]);

	const filteredTracks = useMemo(() => {
		if (!filter) return tracks;
		const lowerFilter = filter.toLowerCase();
		return tracks.filter(
			(track) =>
				track.title.toLowerCase().includes(lowerFilter) ||
				track.artist.toLowerCase().includes(lowerFilter) ||
				track.albumTitle.toLowerCase().includes(lowerFilter),
		);
	}, [tracks, filter]);

	const sortedTracks = useMemo(() => {
		if (!sortBy) return filteredTracks;
		return [...filteredTracks].sort((a, b) =>
			String(a[sortBy] ?? '').localeCompare(String(b[sortBy] ?? ''), undefined, { sensitivity: 'base' }),
		);
	}, [filteredTracks, sortBy]);

	const groupedTracks = useMemo(() => {
		if (!groupBy) return { 'All Tracks': sortedTracks };
		return sortedTracks.reduce((groups: GroupedSongs, track) => {
			const groupKey = String(track[groupBy] ?? 'Unknown');
			if (!groups[groupKey]) groups[groupKey] = [];
			groups[groupKey].push(track);
			return groups;
		}, {});
	}, [sortedTracks, groupBy]);

	return groupedTracks;
};
