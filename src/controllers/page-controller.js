import ButtonShowMoreComponent from "../components/button-show-more.js";
import ExtraFilmsListComponent from "../components/extra-films-list.js";
import AllFilmsListComponent from "../components/all-films-list.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmsComponent from "./../components/films.js";
import SortingComponent, {SortType} from "./../components/sorting.js";

import {render, remove} from "../utils/render.js";

import FilmController from "./film-controller.js";


const EXTRA_FILMS_COUNT = 2;
const EXTRA_CLASS_FILMS = [`Top rated`, `Most commented`];
const SHOWING_FILMS = 5;


const showFilms = (arrayFilms, container, onDataChange, onViewChange, commentsModel, onCommentChange) =>
  arrayFilms.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange, commentsModel, onCommentChange);
    filmController.render(film);
    return filmController;
  });


const getSortedFilms = (sortType, arrayFilms, from, to) => {
  let sortedFilms;
  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = arrayFilms; break;
    case SortType.BY_DATE:
      sortedFilms = arrayFilms.slice().sort((a, b) => b.releaseDate - a.releaseDate); break;
    case SortType.BY_RATING:
      sortedFilms = arrayFilms.slice().sort((a, b) => b.rating - a.rating); break;
  }
  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._allFilmsListComponent = new AllFilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsComponent = new FilmsComponent();

    this._showedFilmsControllers = [];
    this._showedExtraFilmsControllers = [];
    this._arrayFilms = null;
    this._lastFilmForShowing = SHOWING_FILMS;

    this._filmsElement = this._filmsComponent.getElement();
    this._allFilmsListElement = this._allFilmsListComponent.getElement();
    this._allFilmsContainerElement = this._allFilmsListElement.querySelector(`.films-list__container`);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandlers(this._onFilterChange);

    this.onCommentChange = this.onCommentChange.bind(this);
  }

  render() {
    const arrayFilms = this._filmsModel.getFilteredFilms();

    render(this._container, this._sortingComponent);
    render(this._container, this._filmsComponent);

    render(this._filmsElement, this._allFilmsListComponent);

    if (arrayFilms.length === 0) {
      render(this._allFilmsListElement, this._noFilmsComponent);
      return;
    }

    this._renderAllFilms(arrayFilms);
    this._renderButtonShowMore();

    this._renderExtraFilms();
  }

  _renderAllFilms(arrayFilms) {
    const filmsControllers = showFilms(arrayFilms.slice(0, this._lastFilmForShowing), this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);
  }

  _renderExtraFilms() {
    const arrayFilms = this._filmsModel.getAllFilms();
    EXTRA_CLASS_FILMS.forEach((title) =>
      render(this._filmsElement, new ExtraFilmsListComponent(title)));

    const extraFilmsListElement = this._container.querySelectorAll(`.films-list--extra`);
    const topRatedFilmsListElement = extraFilmsListElement[0];
    const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
    const mostCommentedFilmsListElement = extraFilmsListElement[1];
    const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);

    const topRatedFilms = arrayFilms.slice()
      .sort((filmA, filmB) => filmB.rating - filmA.rating);

    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      const filmController = showFilms([topRatedFilms[i]], topRatedFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(filmController);
    }

    const mostCommentedFilms = arrayFilms.slice()
      .sort((filmA, filmB) => this._commentsModel.getCommentsById(filmB.id).length - this._commentsModel.getCommentsById(filmA.id).length);


    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      const filmController = showFilms([mostCommentedFilms[i]], mostCommentedFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(filmController);
    }
  }

  _renderButtonShowMore() {
    const arrayFilms = this._filmsModel.getFilteredFilms();
    if (this._lastFilmForShowing >= arrayFilms.length) {
      return;
    }

    render(this._allFilmsListElement, this._buttonShowMoreComponent);

    this._buttonShowMoreComponent.setClickHandler(() => {
      const firstFilmForShowing = this._lastFilmForShowing;
      this._lastFilmForShowing += SHOWING_FILMS;

      const sortType = this._sortingComponent.getSortType();
      const sortedFilms = getSortedFilms(sortType, arrayFilms, firstFilmForShowing, this._lastFilmForShowing);

      const filmsControllers = showFilms(sortedFilms, this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);

      if (this._lastFilmForShowing >= arrayFilms.length) {
        remove(this._buttonShowMoreComponent);
        return;
      }
    });
  }

  _onSortTypeChange(activeSort) {
    const arrayFilms = this._filmsModel.getFilteredFilms();
    this._allFilmsContainerElement.innerHTML = ``;
    this._lastFilmForShowing = SHOWING_FILMS;
    const sortedFilms = getSortedFilms(activeSort, arrayFilms, 0, this._lastFilmForShowing);
    this._showedFilmsControllers = [];
    const filmsControllers = showFilms(sortedFilms, this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);
    remove(this._buttonShowMoreComponent);
    this._renderButtonShowMore();
  }

  _onDataChange(oldData, newData) {
    this._filmsModel.updateFIlm(oldData.id, newData);

    const controllerIndex = this._showedFilmsControllers.findIndex((controller) => controller._film === oldData);
    this._showedFilmsControllers[controllerIndex].render(newData);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((controller) => controller.setDefaultView());
    this._showedExtraFilmsControllers.forEach((controller) => controller.setDefaultView());
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
    this._lastFilmForShowing = SHOWING_FILMS;
    remove(this._buttonShowMoreComponent);
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderAllFilms(this._filmsModel.getFilteredFilms().slice(0, count));
    this._renderButtonShowMore();
  }

  _onFilterChange() {
    this._sortingComponent.setSortType(SortType.DEFAULT);
    this._updateFilms(SHOWING_FILMS);
  }

  onCommentChange(film, commentId, newComment) {
    this._commentsModel.deleteComment(commentId);

    const controllerIndex = this._showedFilmsControllers.findIndex((controller) => controller._film === film);
    this._showedFilmsControllers[controllerIndex].render(film);

    if (newComment) {
      this._commentsModel.addComment(newComment);
    }
  }
}

