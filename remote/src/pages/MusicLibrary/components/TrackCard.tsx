import { useAuth } from '@/context/AuthContext';
import { Track } from '@/utils/mockdata';
import { motion } from 'framer-motion';
import { PlayCircle, Trash2 } from 'lucide-react';

interface TrackCardProps {
	track: Track;
	onRemove: (id: string, albumId: string) => void;
	isFirstCard: boolean;
}

const TrackCard = ({ track, onRemove, isFirstCard }: TrackCardProps) => {
	const { role } = useAuth();
	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.4 }}
			className="relative bg-gray-800 p-4 rounded-lg shadow-lg group"
		>
			<div className="relative">
				<img
					src={track.coverUrl}
					alt={track.title}
					className="w-full h-40 object-cover rounded-md mb-2"
					loading={isFirstCard ? 'eager' : 'lazy'}
				/>
				<motion.button
					className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-20"
					onClick={() => console.log(`Play ${track.title}`)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					aria-label={`Play ${track.title} by ${track.artist}`}
				>
					<PlayCircle className="text-green-500 w-16 h-16" />
				</motion.button>
			</div>

			<h4 className="text-white text-lg font-bold truncate">{track.title}</h4>
			<p className="text-gray-400 text-sm truncate">{track.artist}</p>

			{role === 'admin' && (
				<motion.button
					onClick={() => onRemove(track.id, track.albumId)}
					className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.8 }}
					aria-label={`Delete ${track.title} by ${track.artist}`}
				>
					<Trash2 className="w-5 h-5" />
				</motion.button>
			)}
		</motion.div>
	);
};

export default TrackCard;
