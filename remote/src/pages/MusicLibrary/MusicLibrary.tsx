import { useState, useMemo } from 'react';
import { useMusic } from '@/context/MusicContext';
import EmptyState from './components/EmptyState';
import FilterControls from './components/FilterControls';
import TrackCard from './components/TrackCard';
import { useFilteredSongs } from './useFilteredSongs';
import { Track } from '@/utils/mockdata';

const MusicLibrary = () => {
	const { removeSong } = useMusic();

	const [filterText, setFilterText] = useState('');
	const [sortBy, setSortBy] = useState<keyof Track>('title');
	const [groupBy, setGroupBy] = useState<keyof Track | ''>('');

	const filteredSongs = useFilteredSongs(filterText, sortBy, groupBy);

	const isEmpty = Number(filteredSongs?.length) === 0;

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			{/* Filter Controls */}
			<FilterControls
				filterText={filterText}
				setFilterText={setFilterText}
				sortBy={sortBy}
				setSortBy={setSortBy}
				groupBy={groupBy}
				setGroupBy={setGroupBy}
			/>

			<div className="p-4 flex-1 overflow-auto">
				{isEmpty ? (
					<EmptyState />
				) : (
					Object.entries(filteredSongs).map(([group, tracks]) => (
						<div key={group} className="mb-8">
							{group !== 'All Tracks' && <h3 className="text-lg font-bold mb-2">{group}</h3>}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{tracks.map((track, id) => (
									<TrackCard key={track.id} track={track} onRemove={removeSong} isFirstCard={id === 0} />
								))}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default MusicLibrary;
