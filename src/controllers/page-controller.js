import FilmDetailsPopupComponent from "../components/film-details-popup.js";
import ButtonShowMoreComponent from "../components/button-show-more.js";
import CardFilmComponent from "../components/card-film.js";
import ExtraFilmsListComponent from "../components/extra-films-list.js";
import AllFilmsListComponent from "../components/all-films-list.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmsComponent from "./../components/films.js";
import SortingComponent, {SortType} from "./../components/sorting.js";

import {render, remove, appendChild, removeChild} from "../utils/render.js";
import {checksKeydownEsc} from "./../utils/common.js";


const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];
const SHOWING_FILMS = 5;


const renderFilmCard = (cardFilmComponent, filmDetailsPopupComponent, container) => {
  render(container, cardFilmComponent);

  const closePopup = () => {
    removeChild(filmDetailsPopupComponent);
    document.removeEventListener(`keydown`, documentKeydownHandler);
  };

  const documentKeydownHandler = (evt) => checksKeydownEsc(evt, closePopup);

  const openPopup = () => {
    appendChild(filmDetailsPopupComponent);
    filmDetailsPopupComponent.setCloseButtonClickHandler(closePopup);
    document.addEventListener(`keydown`, documentKeydownHandler);
  };

  cardFilmComponent.setPosterClickHandler(openPopup);
  cardFilmComponent.setTitleClickHandler(openPopup);
  cardFilmComponent.setCommentsClickHandler(openPopup);
};


const showFilms = (arrayFilms, container) => {
  arrayFilms.forEach((film) =>
    renderFilmCard(new CardFilmComponent(film), new FilmDetailsPopupComponent(film), container));
};


const showExtraFilms = (filmsElement, arrayFilms, mainElement) => {
  EXTRA_CLASS_FILMS.forEach((title) =>
    render(filmsElement, new ExtraFilmsListComponent(title)));

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


const getSortedFilms = (sortType, arrayFilms, from, to) => {
  let sortedFilms;
  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = arrayFilms; break;
    case SortType.BY_DATE:
      sortedFilms = arrayFilms.slice().sort((a, b) => b.releaseDate - a.releaseDate); break;
    case SortType.BY_RATING:
      sortedFilms = arrayFilms.slice().sort((a, b) => b.rating - a.rating); break;
  }
  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._allFilmsListComponent = new AllFilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsComponent = new FilmsComponent();
  }

  render(arrayFilms) {

    render(this._container, this._sortingComponent);

    this._sortingComponent.setSortTypeChangeHandler((activeSort) => {
      allFilmsContainerElement.innerHTML = ``;
      lastFilmForShowing = SHOWING_FILMS;
      const sortedFilms = getSortedFilms(activeSort, arrayFilms, 0, lastFilmForShowing);
      showFilms(sortedFilms, allFilmsContainerElement);
      this._buttonShowMoreComponent.remove();
      renderButtonShowMore();
    });

    render(this._container, this._filmsComponent);

    const filmsElement = this._container.querySelector(`.films`);
    render(filmsElement, this._allFilmsListComponent);
    const allFilmsListElement = filmsElement.querySelector(`.films-list`);

    if (arrayFilms.length === 0) {
      render(allFilmsListElement, this._noFilmsComponent);
      return;
    }

    const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

    const renderButtonShowMore = () => {
      if (lastFilmForShowing >= arrayFilms.length) {
        return;
      }

      render(allFilmsListElement, this._buttonShowMoreComponent);

      this._buttonShowMoreComponent.setClickHandler(() => {
        const firstFilmForShowing = lastFilmForShowing;
        lastFilmForShowing += SHOWING_FILMS;

        const sortType = this._sortingComponent.getSortType();
        const sortedFilms = getSortedFilms(sortType, arrayFilms, firstFilmForShowing, lastFilmForShowing);

        showFilms(sortedFilms, allFilmsContainerElement);

        if (lastFilmForShowing >= arrayFilms.length) {
          remove(this._buttonShowMoreComponent);
          return;
        }
      });
    };


    let lastFilmForShowing = SHOWING_FILMS;
    showFilms(arrayFilms.slice(0, lastFilmForShowing), allFilmsContainerElement);
    renderButtonShowMore();

    showExtraFilms(filmsElement, arrayFilms, this._container);
  }
}
