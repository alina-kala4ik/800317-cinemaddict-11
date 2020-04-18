import FilmsComponent from "./components/films.js";
import MenuAndStatsComponent from "./components/menu-and-stats.js";
import UserRankComponent from "./components/user-rank.js";

import {generateArrayFilms} from "./mocks/films.js";
import {generateStats} from "./mocks/stats.js";

import {render} from "./utils/render.js";

import FilmsSectionController from "./controllers/films-section-controller.js";

const ALL_FILMS_COUNT = 20;

const arrayFilms = generateArrayFilms(ALL_FILMS_COUNT);
const stats = generateStats(arrayFilms);


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankComponent());
render(mainElement, new MenuAndStatsComponent(stats));
render(mainElement, new FilmsComponent());

new FilmsSectionController(mainElement).render(arrayFilms);

const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
