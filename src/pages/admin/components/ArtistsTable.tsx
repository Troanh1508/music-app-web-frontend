import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Library, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const ArtistsTable = () => {
	const { artists, deleteArtist, fetchArtists } = useMusicStore();

	useEffect(() => {
		fetchArtists();
	}, [fetchArtists]);

	return (
		<Table>
			<TableHeader>
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Albums</TableHead>
					<TableHead>Songs</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{artists.map((artist) => (
					<TableRow key={artist._id} className='hover:bg-zinc-800/50'>
						<TableCell>
							<img src={artist.imageUrl} alt={artist.name} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{artist.name}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Library className='h-4 w-4' />
								{artist.albums.length} albums
							</span>
						</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Music className='h-4 w-4' />
								{artist.songs.length} songs
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => {
										if (window.confirm(`Are you sure you want to delete "${artist.name}"?\nThis will also delete all their albums and songs.`)) {
											deleteArtist(artist._id);}
									}}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default ArtistsTable;
