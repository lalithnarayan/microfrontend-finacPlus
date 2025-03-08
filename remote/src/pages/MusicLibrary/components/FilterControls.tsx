import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/context/AuthContext';
import { Group, Search, SortAsc } from 'lucide-react';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui';
import AddTrackForm from './AddTrackForm';
import { Track } from '@/utils/mockdata';

interface FilterControlsProps {
	filterText: string;
	setFilterText: (text: string) => void;
	sortBy: string;
	setSortBy: (sort: keyof Track) => void;
	groupBy: string;
	setGroupBy: (group: keyof Track | '') => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ filterText, setFilterText, sortBy, setSortBy, groupBy, setGroupBy }) => {
	const { role } = useAuth();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const handleClosePopover = () => {
		setIsPopoverOpen(false);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-2 items-center">
				<div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md grow">
					<Search className="text-gray-500" />
					<input
						type="text"
						placeholder="Search by track, artist, or album"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
						className="p-2 w-full bg-transparent focus:outline-none"
					/>
				</div>
				<Toaster position="top-right" reverseOrder={false} />
				{role === 'admin' && (
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<Button className="px-4 py-2 bg-green-500 text-white rounded-md">Add Track</Button>
						</PopoverTrigger>
						<PopoverContent className="w-96" sideOffset={8}>
							<AddTrackForm onClose={handleClosePopover} />
						</PopoverContent>
					</Popover>
				)}
			</div>
			<div className="flex flex-wrap gap-4">
				<div className="flex items-center space-x-2 flex-1 min-w-[150px]">
					<SortAsc className="text-gray-500" />
					<select className="p-2 border rounded-md bg-white w-full" value={sortBy} onChange={(e) => setSortBy(e.target.value as keyof Track)}>
						<option value="title">Sort by Title</option>
						<option value="artist">Sort by Artist</option>
						<option value="albumTitle">Sort by Album</option>
					</select>
				</div>
				<div className="flex items-center space-x-2 flex-1 min-w-[150px]">
					<Group className="text-gray-500" />
					<select className="p-2 border rounded-md bg-white w-full" value={groupBy} onChange={(e) => setGroupBy(e.target.value as keyof Track | '')}>
						<option value="">No Grouping</option>
						<option value="artist">Group by Artist</option>
						<option value="albumTitle">Group by Album</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default FilterControls;
