export const generateStats = (arrayFilms) => {

  const addedToWatchlist = arrayFilms.filter((film) => Boolean(film.isAddedToWatchlist));
  const markAsWatched = arrayFilms.filter((film) => Boolean(film.isMarkAsWatched));
  const markAsFavorite = arrayFilms.filter((film) => Boolean(film.isMarkAsFavorite));

  return {
    Watchlist: addedToWatchlist.length,
    History: markAsWatched.length,
    Favorites: markAsFavorite.length,
  };
};
