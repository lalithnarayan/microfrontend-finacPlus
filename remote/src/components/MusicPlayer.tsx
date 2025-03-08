// src/components/MusicPlayer.tsx
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Pause, Play, StopCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import MidiPlayer from 'react-midi-player';

const MusicPlayer = () => {
	const { currentTrack, stopTrack } = useMusicPlayer();
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (currentTrack) {
			setIsPlaying(true);
		} else {
			setIsPlaying(false);
		}
	}, [currentTrack]);

	if (!currentTrack) return null;

	return (
		<div className=" bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50">
			<div className="flex items-center space-x-4">
				<div className="flex flex-col">
					<span className="text-lg font-semibold">{currentTrack}</span>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				{isPlaying ? (
					<Pause className="w-8 h-8 text-green-500 cursor-pointer" onClick={stopTrack} />
				) : (
					<Play className="w-8 h-8 text-green-500 cursor-pointer" onClick={() => setIsPlaying(true)} />
				)}
				<StopCircle className="w-8 h-8 text-red-500 cursor-pointer" onClick={stopTrack} />
				<MidiPlayer src={currentTrack} autoplay onEnd={stopTrack} onError={() => console.error('Error playing MIDI')} className="hidden" />
			</div>
		</div>
	);
};

export default MusicPlayer;
