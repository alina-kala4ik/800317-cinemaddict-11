export const createCardFilmTemplate = (filmData) => {
  const {title, rating, releaseDate, runtime, genres, poster, description, comments, isAddedToWatchlist, isMarkAsWatched, isMarkAsFavorite} = filmData;

  const filmYear = releaseDate.getFullYear();
  const showingDescription = description.length > 140 ? `${description.substring(0, 140)}...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmYear}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${showingDescription}</p>
      <a class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkAsWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isMarkAsFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};
