export interface Song {
	_id: string;
	title: string;
	artist: Artist;
	album: Album;
	genre: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: string;
	createdAt: string;
	updatedAt: string;
}

export interface ArtistInfo {
	_id: string;
	name: string;
}

export interface Album {
	_id: string;
	title: string;
	artist: Artist;
	imageUrl: string;
	releaseYear: number;
	songs: Song[];
}

export interface Artist {
	_id: string;
	name: string;
	imageUrl: string;
	albums: Album[];
	songs: Song[];

}

export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface User {
	_id: string;
	username: string;
	profileImage: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}