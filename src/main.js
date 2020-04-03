import {createFilmDetailsPopupTemplate} from "./components/film-details-popup.js";
import {createButtonShowMoreTemplate} from "./components/button-show-more.js";
import {createCardFilmTemplate} from "./components/card-film.js";
import {createExtraFilmsListTemplate} from "./components/extra-films-list.js";
import {createAllFilmsListTemplate} from "./components/all-films-list.js";
import {createFilmsTemplate} from "./components/films.js";
import {createMenuAndStatsTemplate} from "./components/menu-and-stats.js";
import {createUserRankTemplate} from "./components/user-rank.js";


const ALL_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, createUserRankTemplate());
render(mainElement, createMenuAndStatsTemplate());
render(mainElement, createFilmsTemplate());


const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, createAllFilmsListTemplate());

const allFilmsListElement = filmsElement.querySelector(`.films-list`);
const allFilmsContainerElement = allFilmsListElement.querySelector(`.films-list__container`);


for (let i = 0; i < ALL_FILMS_COUNT; i++) {
  render(allFilmsContainerElement, createCardFilmTemplate());
}
render(allFilmsListElement, createButtonShowMoreTemplate());

EXTRA_CLASS_FILMS.forEach((item) => {
  render(filmsElement, createExtraFilmsListTemplate(item));
});


const extraFilmsListElement = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedFilmsListElement = extraFilmsListElement[0];
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
const mostCommentedFilmsListElement = extraFilmsListElement[1];
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedFilmsContainerElement, createCardFilmTemplate());
}


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(mostCommentedFilmsContainerElement, createCardFilmTemplate());
}

render(document.body, createFilmDetailsPopupTemplate());
