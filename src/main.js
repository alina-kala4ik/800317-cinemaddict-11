import {createFilmDetailsPopupTemplate} from "./components/film-details-popup.js";
import {createButtonShowMoreTemplate} from "./components/button-show-more.js";
import {createCardFilmTemplate} from "./components/card-film.js";
import {createExtraFilmsListTemplate} from "./components/extra-films-list.js";
import {createAllFilmsListTemplate} from "./components/all-films-list.js";
import {createFilmsTemplate} from "./components/films.js";
import {createMenuAndStatsTemplate} from "./components/menu-and-stats.js";
import {createUserRankTemplate} from "./components/user-rank.js";
import {generateArrayFilms} from "./mocks/films.js";
import {generateStats} from "./mocks/stats.js";


const ALL_FILMS_COUNT = 20;
const SHOWING_FILMS = 5;
const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];

const arrayFilms = generateArrayFilms(ALL_FILMS_COUNT);
const stats = generateStats(arrayFilms);


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, createUserRankTemplate());
render(mainElement, createMenuAndStatsTemplate(stats));
render(mainElement, createFilmsTemplate());


const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, createAllFilmsListTemplate());

const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);


arrayFilms.slice(1, SHOWING_FILMS + 1)
  .forEach((film) => render(allFilmsContainerElement, createCardFilmTemplate(film)));


render(allFilmsListElement, createButtonShowMoreTemplate());


const loadMoreButton = allFilmsListElement.querySelector(`.films-list__show-more`);
let firstFilmForShowing = SHOWING_FILMS + 1;
let lastFilmForShowing = SHOWING_FILMS * 2 + 1;


loadMoreButton.addEventListener(`click`, () => {
  arrayFilms.slice(firstFilmForShowing, lastFilmForShowing)
    .forEach((film) => render(allFilmsContainerElement, createCardFilmTemplate(film)));
  if (lastFilmForShowing >= arrayFilms.length) {
    loadMoreButton.remove();
  }
  firstFilmForShowing += SHOWING_FILMS;
  lastFilmForShowing += SHOWING_FILMS;
});


EXTRA_CLASS_FILMS.forEach((item) => {
  render(filmsElement, createExtraFilmsListTemplate(item));
});


const extraFilmsListElement = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedFilmsListElement = extraFilmsListElement[0];
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsListElement = extraFilmsListElement[1];
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

const topRatedFilms = arrayFilms.slice()
  .sort((max, min) => min.rating - max.rating);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedFilmsContainerElement, createCardFilmTemplate(topRatedFilms[i]));
}

const mostCommentedFilms = arrayFilms.slice()
  .sort((max, min) => min.comments.length - max.comments.length);


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(mostCommentedFilmsContainerElement, createCardFilmTemplate(mostCommentedFilms[i]));
}

render(document.body, createFilmDetailsPopupTemplate(arrayFilms[0]));

const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
