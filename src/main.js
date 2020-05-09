import API from "./api/api.js";
import CommentsModel from "./models/comments-model.js";
import FilmsModel from "./models/films-model.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import MenuComponent from "./components/menu.js";
import Provider from "./api/provider.js";
import PageController from "./controllers/page-controller.js";
import StatisticComponent from "./components/statistic.js";
import Store from "./api/store.js";
import UserRankComponent from "./components/user-rank.js";
import {StatisticsSortType} from "./utils/common.js";
import {render} from "./utils/render.js";

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

const AUTHORIZATION = `Basic eo0w839ikh749a=`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

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
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(apiWithProvider);
const userRankComponent = new UserRankComponent(filmsModel);
const menuComponent = new MenuComponent();
const filterController = new FilterController(menuComponent.getElement(), filmsModel);
const pageController = new PageController(mainElement, filmsModel, commentsModel, apiWithProvider);
const footerStatisticsComponent = new FooterStatisticsComponent(filmsModel);
const statisticComponent = new StatisticComponent(filmsModel);


render(headerElement, userRankComponent);
render(mainElement, menuComponent);
filterController.onLoading();
pageController.onLoading();

render(footerStatisticsElement, footerStatisticsComponent);

apiWithProvider.getFilms()
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

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
