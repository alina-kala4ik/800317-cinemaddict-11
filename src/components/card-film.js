import AbstractComponent from "./../components/abstract-component.js";

const MAX_DESCRIPTION_LENGTH = 140;

const createCardFilmTemplate = (film) => {
  const {title, rating, releaseDate, runtime, genres, poster, description, comments, isAddedToWatchlist, isMarkAsWatched, isMarkAsFavorite} = film;

  const filmYear = releaseDate.getFullYear();
  const showingDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : description;

  const genre = genres[0];
  const titleComment = comments.length === 1 ? `comment` : `comments`;
  const addedToWatchlistClass = isAddedToWatchlist ? `film-card__controls-item--active` : ``;
  const markAsWatchedClass = isMarkAsWatched ? `film-card__controls-item--active` : ``;
  const markAsFavoriteClass = isMarkAsFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmYear}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${showingDescription}</p>
      <a class="film-card__comments">${comments.length} ${titleComment}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addedToWatchlistClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${markAsWatchedClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${markAsFavoriteClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class CardFilm extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createCardFilmTemplate(this._film);
  }
  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }
  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
