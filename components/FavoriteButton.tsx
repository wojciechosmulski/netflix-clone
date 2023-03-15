import axios from "axios";
import { FC, useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite`, {data: {movieId}});
    } else {
      response = await axios.post(`/api/favorite`, {movieId});
    }

    const updatedFavorites = response?.data?.favoriteIds;

    mutate({
      ...user,
      favorites: updatedFavorites,
    })

    mutateFavorites();
  }, [isFavorite, movieId, user, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiFillHeart : AiOutlineHeart;

  return (
    <div 
    onClick={toggleFavorites}
    className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
      <Icon className="text-gray-800" />
    </div>
  )
}

export default FavoriteButton