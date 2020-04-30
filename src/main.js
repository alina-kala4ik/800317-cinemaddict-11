import UserRankComponent from "./components/user-rank.js";
import {generateArrayFilms, generateArrayComments} from "./mocks/films.js";
import {render} from "./utils/render.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";
import FilterController from "./controllers/filter-controller.js";
import CommentsModel from "./models/comments-model.js";

const ALL_FILMS_COUNT = 20;

const arrayFilms = generateArrayFilms(ALL_FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(arrayFilms);

const commentsModel = new CommentsModel();
commentsModel.setComments(generateArrayComments());

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankComponent());
const filterController = new FilterController(mainElement, filmsModel);
filterController.render();


new PageController(mainElement, filmsModel, commentsModel).render();

const footerStatistics = document.body.querySelector(`.footer__statistics`);
footerStatistics.innerHTML = `<p>${arrayFilms.length.toLocaleString()} movies inside</p>`;
