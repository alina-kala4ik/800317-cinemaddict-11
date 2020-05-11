import AllFilmsListComponent from "../components/all-films-list.js";
import ButtonShowMoreComponent from "../components/button-show-more.js";
import CommentModel from "./../models/comment-model.js";
import ExtraFilmsListComponent from "../components/extra-films-list.js";
import FilmController from "./film-controller.js";
import FilmsComponent from "./../components/films.js";
import FilmModel from "./../models/film-model.js";
import {FilterTypes} from "./../utils/filter.js";
import LoadingComponent from "./../components/load.js";
import NoFilmsComponent from "../components/no-films.js";
import SortingComponent, {SortType} from "./../components/sorting.js";
import {render, remove} from "../utils/render.js";


const EXTRA_FILMS_COUNT = 2;
const MIN_SHOWED_COUNT_EXTRA_FILMS = 1;
const ExtraClassFilms = {
  RATING: `Top rated`,
  COMMENTS: `Most commented`
};
const SHOWING_FILMS = 5;


const showFilms = (films, container, onDataChange, onViewChange, commentsModel, onCommentChange) =>
  films.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange, commentsModel, onCommentChange);
    filmController.render(film);
    return filmController;
  });


const getSortedFilms = (sortType, films, from, to) => {
  let sortedFilms;
  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = films; break;
    case SortType.BY_DATE:
      sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate); break;
    case SortType.BY_RATING:
      sortedFilms = films.slice().sort((a, b) => b.rating - a.rating); break;
  }
  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, filmsModel, commentsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._allFilmsListComponent = new AllFilmsListComponent();
    this._noFilmsComponent = null;
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsComponent = new FilmsComponent();
    this._loadingComponent = new LoadingComponent();

    this._showedFilmsControllers = [];
    this._showedMostCommentedFilmsControllers = [];
    this._showedTopRatedFilmsControllers = [];
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

    this._mostCommentedFilmsListComponent = null;
    this._topRatedFilmsListComponent = null;
    this.renderMostCommentedFilms = this.renderMostCommentedFilms.bind(this);
    this._filmsModel.setFilmsChangeHandlers(this.renderMostCommentedFilms);
  }

  onLoading() {
    render(this._container, this._sortingComponent);
    render(this._container, this._filmsComponent);
    render(this._filmsElement, this._allFilmsListComponent);
    render(this._allFilmsListElement, this._loadingComponent);
  }

  render() {
    remove(this._loadingComponent);
    const films = this._filmsModel.getFilteredFilms();

    render(this._container, this._sortingComponent);
    render(this._container, this._filmsComponent);

    render(this._filmsElement, this._allFilmsListComponent);

    this._renderAllFilms(films);
    this._renderButtonShowMore();

    this._renderTopRatedFilms();
    this.renderMostCommentedFilms();
  }

  _renderAllFilms(films) {
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
      this._noFilmsComponent = null;
    }
    if (!films.length) {
      this._noFilmsComponent = new NoFilmsComponent();
      render(this._allFilmsListElement, this._noFilmsComponent);
      return;
    }
    const filmsControllers = showFilms(films.slice(0, this._lastFilmForShowing), this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);
  }

  renderMostCommentedFilms() {
    const films = this._filmsModel.getFilteredFilms();
    const filteredFilms = films.filter((film) => film.comments.length > 0);

    if (this._mostCommentedFilmsListComponent) {
      remove(this._mostCommentedFilmsListComponent);
      this._showedMostCommentedFilmsControllers = [];
    }

    if (filteredFilms.length < MIN_SHOWED_COUNT_EXTRA_FILMS) {
      return;
    }

    this._mostCommentedFilmsListComponent = new ExtraFilmsListComponent(ExtraClassFilms.COMMENTS);


    render(this._filmsElement, this._mostCommentedFilmsListComponent);

    const container = this._container.querySelector(`.most-commented .films-list__container`);
    const sortedFilms = filteredFilms.slice().sort((filmA, filmB) =>filmB.comments.length - filmA.comments.length);
    const shownCountOfSortedFilms = sortedFilms.slice(0, EXTRA_FILMS_COUNT);

    const filmController = showFilms(shownCountOfSortedFilms, container, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedMostCommentedFilmsControllers = this._showedMostCommentedFilmsControllers.concat(filmController);
  }

  _renderTopRatedFilms() {
    const films = this._filmsModel.getFilteredFilms();
    const filteredFilms = films.filter((film) => film.rating > 0);

    if (this._topRatedFilmsListComponent) {
      remove(this._topRatedFilmsListComponent);
    }

    if (filteredFilms.length < MIN_SHOWED_COUNT_EXTRA_FILMS) {
      return;
    }

    this._topRatedFilmsListComponent = new ExtraFilmsListComponent(ExtraClassFilms.RATING);


    render(this._filmsElement, this._topRatedFilmsListComponent);

    const container = this._container.querySelector(`.top-rated .films-list__container`);
    const sortedFilms = filteredFilms.slice().sort((filmA, filmB) =>filmB.rating - filmA.rating);
    const shownCountOfSortedFilms = sortedFilms.slice(0, EXTRA_FILMS_COUNT);


    const filmController = showFilms(shownCountOfSortedFilms, container, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedTopRatedFilmsControllers = this._showedTopRatedFilmsControllers.concat(filmController);
  }

  _renderButtonShowMore() {
    const films = this._filmsModel.getFilteredFilms();
    if (this._lastFilmForShowing >= films.length) {
      return;
    }

    render(this._allFilmsListElement, this._buttonShowMoreComponent);

    this._buttonShowMoreComponent.setClickHandler(() => {
      const firstFilmForShowing = this._lastFilmForShowing;
      this._lastFilmForShowing += SHOWING_FILMS;

      const sortType = this._sortingComponent.getSortType();
      const sortedFilms = getSortedFilms(sortType, films, firstFilmForShowing, this._lastFilmForShowing);

      const filmsControllers = showFilms(sortedFilms, this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);

      if (this._lastFilmForShowing >= films.length) {
        remove(this._buttonShowMoreComponent);
        return;
      }
    });
  }

  _onSortTypeChange(activeSort) {
    const films = this._filmsModel.getFilteredFilms();
    this._allFilmsContainerElement.innerHTML = ``;
    this._lastFilmForShowing = SHOWING_FILMS;
    const sortedFilms = getSortedFilms(activeSort, films, 0, this._lastFilmForShowing);
    this._showedFilmsControllers = [];
    const filmsControllers = showFilms(sortedFilms, this._allFilmsContainerElement, this._onDataChange, this._onViewChange, this._commentsModel, this.onCommentChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(filmsControllers);
    remove(this._buttonShowMoreComponent);
    this._renderButtonShowMore();
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((film) => {
        this._filmsModel.updateFIlm(oldData.id, film);
        this._reRenderFilm(film);
        if (this._filmsModel.getFilter() !== FilterTypes.ALL) {
          this._updateFilms(SHOWING_FILMS);
        }
      });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((controller) => controller.setDefaultView());
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
    this._renderTopRatedFilms();
    this.renderMostCommentedFilms();
  }

  _onFilterChange() {
    this._sortingComponent.setSortType(SortType.DEFAULT);
    this._updateFilms(SHOWING_FILMS);
  }

  onCommentChange(film, idOfDeletedComment, newComment, popup) {
    if (newComment) {
      this._api.addComment(newComment, film.id)
        .then((answer) => {
          this._commentsModel.addComment(CommentModel.parseComments(answer.comments));
          const newFilmData = FilmModel.parseFilm(answer.movie);
          this._filmsModel.updateFIlm(film.id, newFilmData);
          this._reRenderFilm(newFilmData);
          popup.reRender(newFilmData);
        })
        .catch(() => {
          popup.returnsTextFieldToDefaultState();
          popup.shake();
          popup.addRedBorderToTextField();
        });
    } else {
      this._api.deleteComment(idOfDeletedComment)
        .then(() => {
          this._commentsModel.deleteComment(idOfDeletedComment);

          const oldCommentsIds = film.comments;
          const indexOfDeletedComment = oldCommentsIds.findIndex((id) => id === idOfDeletedComment);
          if (indexOfDeletedComment === -1) {
            return;
          }
          const newCommentsIds = [].concat(oldCommentsIds.slice(0, indexOfDeletedComment), oldCommentsIds.slice(indexOfDeletedComment + 1));
          film.comments = newCommentsIds;
          this._filmsModel.updateFIlm(film.id, film);
          this._reRenderFilm(film);
          popup.reRender(film);
        })
        .catch(() => {
          popup.shake();
          popup.returnsDeleteButtonToDefaultState();
        });
    }
  }

  _reRenderFilm(updatedFilm) {
    let allFilmsControllers = this._showedFilmsControllers;
    allFilmsControllers = allFilmsControllers.concat(this._showedMostCommentedFilmsControllers);
    allFilmsControllers = allFilmsControllers.concat(this._showedTopRatedFilmsControllers);
    const filmsControllers = allFilmsControllers.filter((controller) => controller._film.id === updatedFilm.id);
    filmsControllers.forEach((controller) => controller.render(updatedFilm));
  }

  show() {
    this._sortingComponent.getElement().classList.remove(`visually-hidden`);
    this._filmsComponent.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sortingComponent.getElement().classList.add(`visually-hidden`);
    this._filmsComponent.getElement().classList.add(`visually-hidden`);
  }
}

