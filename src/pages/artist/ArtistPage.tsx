import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ArtistPage = () => {
	const { artistId } = useParams();
	const { songsByArtistId, isLoading, currentArtist, fetchArtistById, fetchSongsByArtistId } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	useEffect(() => {
		if (artistId){
			fetchArtistById(artistId);
			fetchSongsByArtistId(artistId);
		}
	}, [fetchArtistById, artistId, fetchSongsByArtistId]);

	if (isLoading) return null;

	const currentArtistAlbums = currentArtist?.albums || [];
	const currentArtistSongs = songsByArtistId || [];

	const handlePlayAlbum = () => {
		if (!currentArtistSongs) return;

		const isCurrentAlbumPlaying = currentArtistSongs?.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay();
		else {
			// start playing the album from the beginning
			playAlbum(currentArtistSongs, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentArtistSongs) return;

		playAlbum(currentArtistSongs, index);
	};
	

	return (

		

		<div className='h-full'>
			<ScrollArea className='h-full rounded-md'>
				{/* Main Content */}
				<div className='relative min-h-full'>
					{/* bg gradient */}
					<div
						className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>

					{/* Content */}
					<div className='relative z-10'>
						<div className='flex p-6 gap-6 pb-8'>
							<img
								src={currentArtist?.imageUrl}
								alt={currentArtist?.name}
								className='w-[240px] h-[240px] shadow-xl rounded'
							/>
							<div className='flex flex-col justify-end'>
								<p className='text-sm font-medium'>Artist</p>
								<h1 className='text-7xl font-bold my-4'>{currentArtist?.name}</h1>
								<div className='flex items-center gap-2 text-sm text-zinc-100'>
									<span>• {currentArtist?.songs.length} songs</span>
									<span>• {currentArtist?.albums.length} albums</span>
								</div>
							</div>
						</div>

						<div className='px-6 pb-4 flex items-center gap-6'>
							<h1 className='text-5xl font-bold my-4'>Discography</h1>
							{/* Album Section */}
						<ScrollArea className="max-w-lg whitespace-nowrap rounded-md">
							<div className="flex w-max space-x-4 p-4">
								{currentArtistAlbums?.map((album) => (
									<div key={album._id}>
										<Link
										to={`/albums/${album._id}`}
										
										className="flex flex-col items-center gap-2 cursor-pointer">
									
										<div className="overflow-hidden rounded-md">
											<img	
												src={album.imageUrl}
												alt={album.title}
												className="w-[150px] h-[150px] object-cover"
												width={300}
												height={400}
											/>
										</div>
											<figcaption className="pt-2 text-xs text-muted-foreground">
												<span className="font-semibold text-foreground">
													{album.title}
												</span>
										</figcaption>
									
										</Link>
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
						</div>
						

						{/* play button */}
						<div className='px-6 pb-4 flex items-center gap-6 mt-5'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
											hover:scale-105 transition-all'
							>
								{isPlaying && currentArtistSongs?.some((song) => song._id === currentSong?._id) ? (
									<Pause className='h-7 w-7 text-black' />
								) : (
									<Play className='h-7 w-7 text-black' />
								)}
							</Button>
						</div>

						{/* Table Section */}
						<div className='bg-black/20 backdrop-blur-sm'>
							{/* table header */}
							<div
								className='grid grid-cols-[16px_4fr_1fr] gap-4 px-10 py-2 text-sm  text-zinc-400 border-b border-white/5'
							>
								<div>#</div>
								<div>Title</div>
								<div>
									<Clock className='h-4 w-4' />
								</div>
							</div>

							{/* songs list */}

							<div className='px-6'>
								<div className='space-y-2 py-4'>
									{currentArtistSongs?.map((song, index) => {
										const isCurrentSong = currentSong?._id === song._id;
										return (
											<div
												key={song._id}
												onClick={() => handlePlaySong(index)}
												className={`grid grid-cols-[16px_4fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
													{isCurrentSong && isPlaying ? (
														<div className='size-4 text-green-500'>♫</div>
													) : (
														<span className='group-hover:hidden'>{index + 1}</span>
													)}
													{!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
													)}
												</div>

												<div className='flex items-center gap-3'>
													<img src={song.imageUrl} alt={song.title} className='size-10' />

													<div>
														<div className={`font-medium text-white`}>{song.title}</div>
														<div>{song.artist.name}</div>
													</div>
												</div>
												<div className='flex items-center'>{song.duration}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};
export default ArtistPage;
