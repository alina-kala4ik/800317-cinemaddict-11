
const addedToWatchlist = (films) => films.filter((film) => Boolean(film.isAddedToWatchlist));
const markAsWatched = (films) => films.filter((film) => Boolean(film.isMarkAsWatched));
const markAsFavorite = (films) => films.filter((film) => Boolean(film.isMarkAsFavorite));


const FilterTypes = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites,`
};

const getFilteredTasks = (activeFilter, films) => {
  let filteredFilms;
  switch (activeFilter) {
    case FilterTypes.ALL:
      filteredFilms = films;
      break;
    case FilterTypes.WATCHLIST:
      filteredFilms = addedToWatchlist(films);
      break;
    case FilterTypes.HISTORY:
      filteredFilms = markAsWatched(films);
      break;
    case FilterTypes.FAVORITES:
      filteredFilms = markAsFavorite(films);
      break;
  }
  return filteredFilms;
};

export {getFilteredTasks, FilterTypes};

