import { getFromLocalStorage } from "./storage.js";

export const isMovieInFavourites = (movie) => {
    const favourites = getFromLocalStorage("favourite");
    return favourites.some(fav => fav.id === movie.id);
};  