import UserRankComponent from "./components/user-rank.js";
import {render, remove} from "./utils/render.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import CommentsModel from "./models/comments-model.js";
import API from "./api.js";
import StatisticComponent from "./components/statistic.js";
import MenuComponent from "./components/menu.js";

const AUTHORIZATION = `Basic eo0w680ik93889a=`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.body.querySelector(`.footer__statistics`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(api);
const userRankComponent = new UserRankComponent(filmsModel);
let menuComponent = new MenuComponent();
const filterController = new FilterController(menuComponent.getElement(), filmsModel);
const pageController = new PageController(mainElement, filmsModel, commentsModel, api);
const footerStatisticsComponent = new FooterStatisticsComponent(filmsModel);
const statisticComponent = new StatisticComponent(filmsModel);


render(headerElement, userRankComponent);
render(mainElement, menuComponent);
filterController.onLoading();
pageController.onLoading();

render(footerStatisticsElement, footerStatisticsComponent);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    userRankComponent.rerender();

    render(mainElement, menuComponent);
    menuComponent.setStatsClickHandler(() => {
      statisticComponent.rerender();
      statisticComponent.show();
      pageController.hide();
      menuComponent.getElement().querySelector(`.main-navigation__additional`).classList.add(`main-navigation__additional--active`);
      filterController.removeActiveFilter();

    });

    filterController.render();
    filterController.setFilterClickHandler(() => {
      statisticComponent.hide();
      pageController.show();
      menuComponent.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__additional--active`);
    });

    pageController.render();
    render(mainElement, statisticComponent);
    statisticComponent.hide();

    remove(footerStatisticsComponent);
    render(footerStatisticsElement, new FooterStatisticsComponent(filmsModel));
  });
