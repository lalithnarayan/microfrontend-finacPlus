import React, { useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Album, Track } from '@/utils/mockdata';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { Button, Input } from '@/components/ui';


interface FormState {
	trackTitle: string;
	trackDuration: number | '';
	selectedAlbumId: string;
	isNewAlbum: boolean;
	newAlbumTitle: string;
	newAlbumArtist: string;
	newAlbumReleaseDate: string;
	newAlbumGenre: string;
	newAlbumCoverUrl: string;
}

const AddTrackForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { albums, addAlbum, addSong } = useMusic();

	const [formState, setFormState] = useState<FormState>({
		trackTitle: '',
		trackDuration: '',
		selectedAlbumId: '',
		isNewAlbum: false,
		newAlbumTitle: '',
		newAlbumArtist: '',
		newAlbumReleaseDate: '',
		newAlbumGenre: '',
		newAlbumCoverUrl: '',
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		// General validation
		if (!formState.trackTitle.trim()) {
			newErrors.trackTitle = 'Track title is required';
		}

		if (!formState.selectedAlbumId) {
			newErrors.selectedAlbumId = 'Please select an album or add a new one';
		}

		// Conditional validation for new albums
		if (formState.isNewAlbum) {
			if (!formState.newAlbumTitle.trim()) {
				newErrors.newAlbumTitle = 'Album title is required';
			}

			if (!formState.newAlbumArtist.trim()) {
				newErrors.newAlbumArtist = 'Artist name is required';
			}

			if (!formState.newAlbumReleaseDate) {
				newErrors.newAlbumReleaseDate = 'Release date is required';
			}

			if (!formState.newAlbumGenre.trim()) {
				newErrors.newAlbumGenre = 'Genre is required';
			}

			if (formState.newAlbumCoverUrl && !isValidUrl(formState.newAlbumCoverUrl)) {
				newErrors.newAlbumCoverUrl = 'Invalid URL for cover image';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: name === 'trackDuration' ? parseInt(value) || '' : value,
		}));

		// Clear error when input changes
		if (errors[name]) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
		}
	};

	const handleAlbumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setFormState((prevState) => ({
			...prevState,
			selectedAlbumId: value !== 'new' ? value : '',
			isNewAlbum: value === 'new',
		}));
		if (errors.selectedAlbumId) {
			setErrors((prevErrors) => ({ ...prevErrors, selectedAlbumId: '' }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		let albumId = formState.selectedAlbumId;
		let artist: string | undefined;
		let coverUrl: string | undefined;

		if (formState.isNewAlbum) {
			const newAlbum: Album = {
				id: uuidv4(),
				title: formState.newAlbumTitle,
				artist: formState.newAlbumArtist,
				releaseDate: formState.newAlbumReleaseDate || new Date().toISOString().split('T')[0],
				genre: formState.newAlbumGenre,
				coverUrl: formState.newAlbumCoverUrl || `https://picsum.photos/200?random=${Date.now()}`,
				tracks: [],
			};
			addAlbum(newAlbum);
			albumId = newAlbum.id;
			artist = newAlbum.artist;
			coverUrl = newAlbum.coverUrl;
			toast.success(`New album "${newAlbum.title}" added!`);
		} else {
			const selectedAlbum = albums.find(album => album.id === albumId);
			artist = selectedAlbum?.artist;
			coverUrl = selectedAlbum?.coverUrl;
		}

		const newTrack: Track = {
			id: uuidv4(),
			title: formState.trackTitle,
			duration: formState.trackDuration || 0,
			albumId,
			artist,
			coverUrl
		};

		addSong(albumId, newTrack);
		toast.success(`Track "${newTrack.title}" added successfully!`);
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto pr-2">
			<div className="grid grid-cols-2 gap-4">
				<Input label="Track Title" name="trackTitle" value={formState.trackTitle} onChange={handleInputChange} error={errors.trackTitle} />
				<Input
					label="Duration (seconds)"
					name="trackDuration"
					type="number"
					value={formState.trackDuration || ''}
					onChange={handleInputChange}
					error={errors.trackDuration}
					min="1"
				/>
				<div className="col-span-2">
					<label className="block mb-1">Select Album *</label>
					<select
						name="selectedAlbumId"
						value={formState.isNewAlbum ? 'new' : formState.selectedAlbumId}
						onChange={handleAlbumChange}
						className="p-2 border rounded w-full"
					>
						<option value="">-- Select Album --</option>
						{albums.map((album) => (
							<option key={album.id} value={album.id}>
								{album.title} by {album.artist}
							</option>
						))}
						<option value="new">Add New Album</option>
					</select>
					{errors.selectedAlbumId && <p className="text-red-500">{errors.selectedAlbumId}</p>}
				</div>
			</div>

			{formState.isNewAlbum && (
				<div className="grid grid-cols-2 gap-4">
					<Input
						label="New Album Title"
						name="newAlbumTitle"
						value={formState.newAlbumTitle}
						onChange={handleInputChange}
						error={errors.newAlbumTitle}
					/>
					<Input
						label="New Album Artist"
						name="newAlbumArtist"
						value={formState.newAlbumArtist}
						onChange={handleInputChange}
						error={errors.newAlbumArtist}
					/>
					<Input
						label="Release Date"
						name="newAlbumReleaseDate"
						type="date"
						value={formState.newAlbumReleaseDate}
						onChange={handleInputChange}
						error={errors.newAlbumReleaseDate}
					/>
					<Input
						label="Genre"
						name="newAlbumGenre"
						value={formState.newAlbumGenre}
						onChange={handleInputChange}
						error={errors.newAlbumGenre}
					/>
					<Input
						label="Cover URL"
						name="newAlbumCoverUrl"
						type="url"
						value={formState.newAlbumCoverUrl}
						onChange={handleInputChange}
						error={errors.newAlbumCoverUrl}
					/>
				</div>
			)}

			<div className="sticky bottom-0 bg-white pt-4">
				<Button type="submit" variant="default">
					Add Track
				</Button>
			</div>
		</form>
	);
};

export default AddTrackForm;
