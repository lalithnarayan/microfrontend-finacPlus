import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MusicPlayerContextType {
	currentTrack: string | null;
	playTrack: (src: string) => void;
	stopTrack: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
	const [currentTrack, setCurrentTrack] = useState<string | null>(null);

	const playTrack = (src: string) => {
		setCurrentTrack(src);
	};

	const stopTrack = () => {
		setCurrentTrack(null);
	};

	return <MusicPlayerContext.Provider value={{ currentTrack, playTrack, stopTrack }}>{children}</MusicPlayerContext.Provider>;
};

export const useMusicPlayer = () => {
	const context = useContext(MusicPlayerContext);
	if (!context) {
		throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
	}
	return context;
};
