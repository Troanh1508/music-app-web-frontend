import { useMusicStore } from "@/stores/useMusicStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface HeartButtonProps {
    user: string;
    song: string;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ user, song }) => {
    const { favorites, toggleFavorite, fetchFavorites, isFavorite } = useMusicStore();
    const { authUser } = useAuthStore();



    const handleToggleFavorite = () => {
        if (!authUser) return toast.error("Please sign in to add songs to favorites"); // Ensure user is authenticated
        toggleFavorite(user, song); // Call the toggleFavorite function
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className="text-green-500 hover:text-green-400 transition-all"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? (
                <FaHeart className="h-6 w-6" /> // Filled heart for favorite
            ) : (
                <FaRegHeart className="h-6 w-6" /> // Outline heart for non-favorite
            )}
        </button>
    );
};