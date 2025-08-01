import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FavoritePage = () => {
	const { fetchArtists, fetchFavorites, favoriteSongs, isLoading } = useMusicStore();
	const { authUser } = useAuthStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	if (!authUser) return null;
	useEffect(() => {
			fetchArtists();
	}, [ fetchArtists]);

	useEffect(() => {
			fetchFavorites(authUser._id);
		}, [fetchFavorites, authUser._id]);
	

	if (isLoading) return null;
	console.log("Liked Songs:", favoriteSongs);

	const handlePlayAlbum = () => {

		if (favoriteSongs.length === 0) return; // No songs to play

        const isCurrentQueuePlaying = favoriteSongs.some((song) => song._id === currentSong?._id);

        if (isCurrentQueuePlaying) {
            togglePlay(); // Toggle play/pause if the queue is already playing
        } else {
            playAlbum(favoriteSongs, 0); // Start playing the queue from the first song
        }
    };

	console.log("Current Playlist:", favoriteSongs);

	const handlePlaySong = (index: number) => {
		if (favoriteSongs.length === 0) return;

		playAlbum(favoriteSongs, index);
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
								src='/Liked.png' 
								alt='liked logo'
								className='w-[240px] h-[240px] shadow-xl rounded'
							/>
							<div className='flex flex-col justify-end'>
								<p className='text-sm font-medium'>Playlist</p>
								<h1 className='text-7xl font-bold my-4'>Liked Songs</h1>
								<div className='flex items-center gap-2 text-sm text-zinc-100'>
									<span className='font-medium text-white'>{authUser?.username}</span>
									<span>• {favoriteSongs.length} songs</span>
								</div>
							</div>
						</div>

						{/* play button */}
						<div className='px-6 pb-4 flex items-center gap-6'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all'
							>
								{isPlaying && favoriteSongs.some((song) => song._id === currentSong?._id) ? (
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
								className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5'
							>
								<div>#</div>
								<div>Title</div>
								<div>Artist</div>
								<div>
									<Clock className='h-4 w-4' />
								</div>
							</div>

							{/* songs list */}

							<div className='px-6'>
								<div className='space-y-2 py-4'>
									{favoriteSongs.map((song, index) => {
										const isCurrentSong = currentSong?._id === song._id;
										return (
											<div
												key={song._id || index}
												className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'
												onClick={() => handlePlaySong(index)}>
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
													</div>
												</div>
												<Link 
													to={`/artists/${song.artist._id}`}
													key={song.artist._id}
													className='flex items-center'>	
												<div className="hover:underline cursor-pointer">
													{song.artist.name} 
												</div>
												</Link>
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
export default FavoritePage;
