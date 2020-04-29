import MenuAndStatsComponent from "./components/menu-and-stats.js";
import UserRankComponent from "./components/user-rank.js";
import {generateArrayFilms} from "./mocks/films.js";
import {generateStats} from "./mocks/stats.js";
import {render} from "./utils/render.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";

const ALL_FILMS_COUNT = 20;

const arrayFilms = generateArrayFilms(ALL_FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(arrayFilms);

const stats = generateStats(filmsModel.getAllFilms());


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankComponent());
render(mainElement, new MenuAndStatsComponent(stats));


new PageController(mainElement, filmsModel).render();

const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
