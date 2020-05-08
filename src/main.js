import API from "./api.js";
import CommentsModel from "./models/comments-model.js";
import FilmsModel from "./models/films-model.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import MenuComponent from "./components/menu.js";
import PageController from "./controllers/page-controller.js";
import StatisticComponent from "./components/statistic.js";
import UserRankComponent from "./components/user-rank.js";
import {StatisticsSortType} from "./utils/common.js";
import {render} from "./utils/render.js";

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

const AUTHORIZATION = `Basic eo0w650ik93889a=`;

const statisticClickHandler = () => {
  statisticComponent.setSortType(StatisticsSortType.DEFAULT);
  statisticComponent.rerender();
  statisticComponent.show();
  pageController.hide();
  filterController.removeActiveFilter();
};
const filterClickHandler = () => {
  statisticComponent.hide();
  pageController.show();
  menuComponent.removesLinkSelection();
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.body.querySelector(`.footer__statistics`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(api);
const userRankComponent = new UserRankComponent(filmsModel);
const menuComponent = new MenuComponent();
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

    menuComponent.setStatsClickHandler(statisticClickHandler);

    filterController.render();
    filterController.setFilterClickHandler(filterClickHandler);

    pageController.render();
    render(mainElement, statisticComponent);
    statisticComponent.hide();

    footerStatisticsComponent.rerender();
  });
