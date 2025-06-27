import { axiosInstance } from "@/lib/axios";
import { Album, Artist, Song, Stats, User } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	songsByAlbumId: Song[];
	songsByArtistId: Song[];
	albums: Album[];
	artists: Artist[];
	users: User[];
	favoriteSongs: Song[];
	isFavorite: boolean;
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	currentArtist: Artist | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchArtists: () => Promise<void>;
	fetchArtistById: (id: string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	fetchSongsByAlbumId: (albumId: string) => Promise<void>;
	fetchSongsByArtistId: (artistId: string) => Promise<void>;
	fetchUsers: () => Promise<void>;
	fetchFavorites: (user: string) => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
	deleteArtist: (id: string) => Promise<void>;
	deleteUser: (id: string) => Promise<void>;
	deleteFavorite: (user: string, song: string) => Promise<void>;
	toggleFavorite: (user: string, song: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
	albums: [],
	songs: [],
	songsByAlbumId: [],
	songsByArtistId: [],
	artists: [],
	users: [],
	favoriteSongs: [],
	isFavorite: false,
	isLoading: false,
	error: null,
	currentAlbum: null,
	currentArtist: null,
	currentRole: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	deleteArtist: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/artists/${id}`);
			set((state) => ({
				artists: state.artists.filter((artist) => artist._id !== id),
			}));
			toast.success("Artist deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete artist: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	deleteUser: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/users/${id}`);
			set((state) => ({
				users: state.users.filter((user) => user._id !== id),
			}));
			toast.success("User deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete user: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongsByAlbumId: async (albumId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/songs/album/${albumId}`);
			set({ songsByAlbumId: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongsByArtistId: async (artistId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/songs/artist/${artistId}`);
			set({ songsByArtistId: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchArtists: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/artists");
			set({ artists: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchUsers: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/users");
			set({ users: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchArtistById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/artists/${id}`);
			set({ currentArtist: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFavorites: async (user) =>{
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/favorites/${user}`);
			// set({ favorites: response.data.favorites });
			set({ favoriteSongs: response.data})
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteFavorite: async (user, song) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/favorites/${user}/${song}`);
			// set((state) => ({
			// 	favorites: state.favorites.filter((favorite) => favorite.song._id !== song),
			// }));
			toast.success("Favorite deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete favorite: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	toggleFavorite: async (user, song) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axiosInstance.post(`/favorites`, { user, song });
        const { favorited } = response.data;

        if (favorited) {
            set({ isFavorite: true });
            toast.success("Added to favorites");
        } else {
            set({ isFavorite: false });
            toast.success("Removed from favorites");
        }
        get().fetchFavorites(user); // Refresh favorites list
    } catch (error: any) {
        toast.error("Failed to toggle favorite: " + (error.response?.data?.message || error.message));
    } finally {
        set({ isLoading: false });
    }
},
}));
