import FilmDetailsPopupComponent from "./components/film-details-popup.js";
import ButtonShowMoreComponent from "./components/button-show-more.js";
import CardFilmComponent from "./components/card-film.js";
import ExtraFilmsListComponent from "./components/extra-films-list.js";
import AllFilmsListComponent from "./components/all-films-list.js";
import FilmsComponent from "./components/films.js";
import MenuAndStatsComponent from "./components/menu-and-stats.js";
import UserRankComponent from "./components/user-rank.js";
import NoFilmsComponent from "./components/no-films.js";

import {generateArrayFilms} from "./mocks/films.js";
import {generateStats} from "./mocks/stats.js";


const ALL_FILMS_COUNT = 20;
const SHOWING_FILMS = 5;
const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];

const arrayFilms = generateArrayFilms(ALL_FILMS_COUNT);
const stats = generateStats(arrayFilms);

const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case `beforeend`: container.append(element); break;
  }
};

const renderFilmCard = (filmCardComponent, filmPopupComponent, container) => {
  const filmCard = filmCardComponent.getElement();
  const filmPopup = filmPopupComponent.getElement();

  render(container, filmCard);

  const poster = filmCard.querySelector(`.film-card__poster`);
  const title = filmCard.querySelector(`.film-card__title`);
  const comments = filmCard.querySelector(`.film-card__comments`);

  const closePopupButton = filmPopup.querySelector(`.film-details__close-btn`);

  const closePopup = () => {
    document.body.removeChild(filmPopup);
    filmPopupComponent.removeElement();
    document.removeEventListener(`keydown`, documentKeydownHandler);
  };

  const documentKeydownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup();
    }
  };

  const openPopup = () => {
    document.body.appendChild(filmPopup);
    closePopupButton.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, documentKeydownHandler);
  };

  poster.addEventListener(`click`, openPopup);
  title.addEventListener(`click`, openPopup);
  comments.addEventListener(`click`, openPopup);
};

let firstFilmForShowing = 0;
let lastFilmForShowing = SHOWING_FILMS;

const showFilms = (loadMoreButton, allFilmsContainerElement) => {
  arrayFilms.slice(firstFilmForShowing, lastFilmForShowing)
  .forEach((film) => {
    renderFilmCard(new CardFilmComponent(film), new FilmDetailsPopupComponent(film), allFilmsContainerElement);
  });

  if (lastFilmForShowing >= arrayFilms.length) {
    loadMoreButton.remove();
    return;
  }

  loadMoreButton.addEventListener(`click`, () => {
    firstFilmForShowing += SHOWING_FILMS;
    lastFilmForShowing += SHOWING_FILMS;
    showFilms(loadMoreButton, allFilmsContainerElement);
  }, {once: true});
};

const showExtraFilms = (filmsElement) => {
  EXTRA_CLASS_FILMS.forEach((title) => {
    render(filmsElement, new ExtraFilmsListComponent(title).getElement());
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


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankComponent().getElement());
render(mainElement, new MenuAndStatsComponent(stats).getElement());
render(mainElement, new FilmsComponent().getElement());

const renderFilmsSection = () => {
  const filmsElement = mainElement.querySelector(`.films`);
  render(filmsElement, new AllFilmsListComponent().getElement());
  const allFilmsListElement = filmsElement.querySelector(`.films-list`);

  if (arrayFilms.length === 0) {
    render(allFilmsListElement, new NoFilmsComponent().getElement());
    return;
  }

  const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

  render(allFilmsListElement, new ButtonShowMoreComponent().getElement());

  const loadMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);

  showFilms(loadMoreButton, allFilmsContainerElement);
  showExtraFilms(filmsElement);
};

renderFilmsSection();


const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
