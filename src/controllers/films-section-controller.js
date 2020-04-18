import FilmDetailsPopupComponent from "./../components/film-details-popup.js";
import ButtonShowMoreComponent from "./../components/button-show-more.js";
import CardFilmComponent from "./../components/card-film.js";
import ExtraFilmsListComponent from "./../components/extra-films-list.js";
import AllFilmsListComponent from "./../components/all-films-list.js";
import NoFilmsComponent from "./../components/no-films.js";

import {render, remove, appendChild, removeChild} from "./../utils/render.js";

const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];
const SHOWING_FILMS = 5;

const renderFilmCard = (cardFilmComponent, filmDetailsPopupComponent, container) => {
  render(container, cardFilmComponent);

  const closePopup = () => {
    removeChild(filmDetailsPopupComponent);
    document.removeEventListener(`keydown`, documentKeydownHandler);
  };

  const documentKeydownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup();
    }
  };

  const openPopup = () => {
    appendChild(filmDetailsPopupComponent);
    filmDetailsPopupComponent.setCloseButtonClickHandler(closePopup);
    document.addEventListener(`keydown`, documentKeydownHandler);
  };

  cardFilmComponent.setPosterClickHandler(openPopup);
  cardFilmComponent.setTitleClickHandler(openPopup);
  cardFilmComponent.setCommentsClickHandler(openPopup);
};

let firstFilmForShowing = 0;
let lastFilmForShowing = SHOWING_FILMS;
const showFilms = (buttonShowMoreComponent, allFilmsContainerElement, arrayFilms) => {
  arrayFilms.slice(firstFilmForShowing, lastFilmForShowing)
  .forEach((film) => {
    renderFilmCard(new CardFilmComponent(film), new FilmDetailsPopupComponent(film), allFilmsContainerElement);
  });

  if (lastFilmForShowing >= arrayFilms.length) {
    remove(buttonShowMoreComponent);
    return;
  }

  buttonShowMoreComponent.setClickHandler(() => {
    firstFilmForShowing += SHOWING_FILMS;
    lastFilmForShowing += SHOWING_FILMS;
    showFilms(buttonShowMoreComponent, allFilmsContainerElement, arrayFilms);
  });
};

const showExtraFilms = (filmsElement, arrayFilms, mainElement) => {
  EXTRA_CLASS_FILMS.forEach((title) => {
    render(filmsElement, new ExtraFilmsListComponent(title));
  });

  const extraFilmsListElement = mainElement.querySelectorAll(`.films-list--extra`);
  const topRatedFilmsListElement = extraFilmsListElement[0];
  const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
  const mostCommentedFilmsListElement = extraFilmsListElement[1];
  const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

  const topRatedFilms = arrayFilms.slice()
    .sort((max, min) => min.rating - max.rating);

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(new CardFilmComponent(topRatedFilms[i]), new FilmDetailsPopupComponent(topRatedFilms[i]), topRatedFilmsContainerElement);
  }

  const mostCommentedFilms = arrayFilms.slice()
    .sort((max, min) => min.comments.length - max.comments.length);


  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(new CardFilmComponent(mostCommentedFilms[i]), new FilmDetailsPopupComponent(mostCommentedFilms[i]), mostCommentedFilmsContainerElement);
  }
};

export default class FilmsSectionController {
  constructor(container) {
    this._container = container;

    this._allFilmsListComponent = new AllFilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
  }
  render(arrayFilms) {
    const filmsElement = this._container.querySelector(`.films`);
    render(filmsElement, this._allFilmsListComponent);
    const allFilmsListElement = filmsElement.querySelector(`.films-list`);

    if (arrayFilms.length === 0) {
      render(allFilmsListElement, this._noFilmsComponent);
      return;
    }

    const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

    render(allFilmsListElement, this._buttonShowMoreComponent);

    showFilms(this._buttonShowMoreComponent, allFilmsContainerElement, arrayFilms);
    showExtraFilms(filmsElement, arrayFilms, this._container);
  }
}
