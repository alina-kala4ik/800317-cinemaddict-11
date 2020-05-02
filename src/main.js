import UserRankComponent from "./components/user-rank.js";
import {comments} from "./mocks/films.js";
import {render} from "./utils/render.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatistics from "./components/footer-statistics.js";
import CommentsModel from "./models/comments-model.js";
import API from "./api.js";

const AUTHORIZATION = `Basic eo0w680ik93889a=`;

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.body.querySelector(`.footer__statistics`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterController = new FilterController(mainElement, filmsModel);
const pageController = new PageController(mainElement, filmsModel, commentsModel);
const footerStatistics = new FooterStatistics(filmsModel);

render(headerElement, new UserRankComponent());
filterController.render();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
    render(footerStatisticsElement, footerStatistics);
  });
