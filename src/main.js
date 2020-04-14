import FilmDetailsPopupComponent from "./components/film-details-popup.js";
import ButtonShowMoreComponent from "./components/button-show-more.js";
import CardFilmComponent from "./components/card-film.js";
import ExtraFilmsListComponent from "./components/extra-films-list.js";
import AllFilmsListComponent from "./components/all-films-list.js";
import FilmsComponent from "./components/films.js";
import MenuAndStatsComponent from "./components/menu-and-stats.js";
import UserRankComponent from "./components/user-rank.js";

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


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankComponent().getElement());
render(mainElement, new MenuAndStatsComponent(stats).getElement());
render(mainElement, new FilmsComponent().getElement());


const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, new AllFilmsListComponent().getElement());

const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);


arrayFilms.slice(1, SHOWING_FILMS + 1)
  .forEach((film) => render(allFilmsContainerElement, new CardFilmComponent(film).getElement()));


render(allFilmsListElement, new ButtonShowMoreComponent().getElement());


const loadMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);
let firstFilmForShowing = SHOWING_FILMS + 1;
let lastFilmForShowing = SHOWING_FILMS * 2 + 1;


loadMoreButton.addEventListener(`click`, () => {
  arrayFilms.slice(firstFilmForShowing, lastFilmForShowing)
    .forEach((film) => render(allFilmsContainerElement, new CardFilmComponent(film).getElement()));
  if (lastFilmForShowing >= arrayFilms.length) {
    loadMoreButton.remove();
  }
  firstFilmForShowing += SHOWING_FILMS;
  lastFilmForShowing += SHOWING_FILMS;
});


EXTRA_CLASS_FILMS.forEach((item) => {
  render(filmsElement, new ExtraFilmsListComponent(item).getElement());
});


const extraFilmsListElement = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedFilmsListElement = extraFilmsListElement[0];
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsListElement = extraFilmsListElement[1];
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

const topRatedFilms = arrayFilms.slice()
  .sort((max, min) => min.rating - max.rating);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedFilmsContainerElement, new CardFilmComponent(topRatedFilms[i]).getElement());
}

const mostCommentedFilms = arrayFilms.slice()
  .sort((max, min) => min.comments.length - max.comments.length);


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(mostCommentedFilmsContainerElement, new CardFilmComponent(mostCommentedFilms[i]).getElement());
}

render(document.body, new FilmDetailsPopupComponent(arrayFilms[0]).getElement());

const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
