import { Album, mockMusicLibrary as initialSongs, Track } from '@/utils/mockdata';
import { createContext, ReactNode, useContext, useState } from 'react';
import { MusicContextType } from '../types';

export const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
	const [albums, setAlbums] = useState<Album[]>(initialSongs);

	const addAlbum = (newAlbum: Album) => setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);

	const addSong = (albumId: string, newTrack: Track) => {
		setAlbums(
			albums.map((album) => {
				if (album.id === albumId) {
					return {
						...album,
						tracks: [...album.tracks, newTrack],
					};
				}
				return album;
			}),
		);
	};

	const removeSong = (songId: string, albumId: string) => {
		setAlbums(
			albums.map((album) => {
				if (album.id === albumId) {
					return {
						...album,
						tracks: album.tracks.filter((track) => track.id !== songId),
					};
				}
				return album;
			}),
		);
	};

	return <MusicContext.Provider value={{ albums, addSong, removeSong, addAlbum }}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
	const context = useContext(MusicContext);
	if (!context) throw new Error('useMusic must be used within a MusicProvider');
	return context;
};
