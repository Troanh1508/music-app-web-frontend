import { useMusicStore } from "@/stores/useMusicStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

interface HeartButtonProps {
    user: string;
    song: string;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ user, song }) => {
    const { toggleFavorite, favoriteSongs } = useMusicStore();
    const { authUser } = useAuthStore();

    // Check if this song is in the user's favorites
    const isFavorited = favoriteSongs.some(
        (fav: any) => fav._id === song || fav === song
    );

    const handleToggleFavorite = () => {
        if (!authUser) return toast.error("Please sign in to add songs to favorites"); 
        toggleFavorite(user, song); 
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className="text-green-500 hover:text-green-400 transition-all"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorited ? (
                <FaHeart className="h-6 w-6" /> // Filled heart for favorite
            ) : (
                <FaRegHeart className="h-6 w-6" /> // Outline heart for non-favorite
            )}
        </button>
    );
};