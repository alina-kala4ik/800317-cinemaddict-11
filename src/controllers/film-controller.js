import CardFilmComponent from "../components/card-film.js";
import FilmDetailsPopupComponent from "../components/film-details-popup.js";

import {render, appendChild, removeChild, replace, remove} from "../utils/render.js";
import {checksKeydownEsc} from "./../utils/common.js";
import FilmModel from "./../models/film-model.js";

const Mode = {
  DEFAULT: `default`,
  POPUP_IS_OPEN: `popup is open`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange, commentsModel, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsModel = commentsModel;
    this._onCommentChange = onCommentChange;

    this._mode = Mode.DEFAULT;
    this._cardFilmComponent = null;
    this._filmDetailsPopupComponent = null;
    this._film = null;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
  }

  render(film) {
    this._film = film;

    if (this._cardFilmComponent && !this._isPopupOpen()) {
      this._updatesCardFilmComponent();
      this._updatesFilmDetailsPopupComponent();
    }

    if (this._cardFilmComponent && this._isPopupOpen()) {
      this._updatesCardFilmComponent();
    }

    if (!this._cardFilmComponent) {
      this._cardFilmComponent = new CardFilmComponent(film);
      render(this._container, this._cardFilmComponent);
    }


    this._cardFilmComponent.setPosterClickHandler(this._openPopup);
    this._cardFilmComponent.setTitleClickHandler(this._openPopup);
    this._cardFilmComponent.setCommentsClickHandler(this._openPopup);

    this._cardFilmComponent.setAddToWatchlistClickHandler(() => this._callOnDataChange(`isAddedToWatchlist`));

    this._cardFilmComponent.setMarkAsWatchedClickHandler(() => this._callOnDataChange(`isMarkAsWatched`));

    this._cardFilmComponent.setMarkAsFavoriteClickHandler(() => this._callOnDataChange(`isMarkAsFavorite`));
  }

  _callOnDataChange(variableParameter) {
    const newFilm = FilmModel.clone(this._film);
    newFilm[variableParameter] = !newFilm[variableParameter];
    if (variableParameter === `isMarkAsWatched`) {
      newFilm.watchingDate = new Date();
    }
    this._onDataChange(this._film, newFilm);
  }

  _documentKeydownHandler(evt) {
    checksKeydownEsc(evt, this._closePopup);
  }

  _closePopup() {
    this._mode = Mode.DEFAULT;
    removeChild(this._filmDetailsPopupComponent);
    document.removeEventListener(`keydown`, this._documentKeydownHandler);
  }

  _openPopup() {
    this._commentsModel.setCommentsByFilmId(this._film.id, () => {
      this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(this._film, this._commentsModel);
      this._onViewChange();
      this._mode = Mode.POPUP_IS_OPEN;
      appendChild(this._filmDetailsPopupComponent);
      this._filmDetailsPopupComponent.setCloseButtonClickHandler(this._closePopup);
      document.addEventListener(`keydown`, this._documentKeydownHandler);

      this._filmDetailsPopupComponent.setAddToWatchlistClickHandler(() => this._callOnDataChange(`isAddedToWatchlist`));

      this._filmDetailsPopupComponent.setMarkAsWatchedClickHandler(() => this._callOnDataChange(`isMarkAsWatched`));

      this._filmDetailsPopupComponent.setMarkAsFavoriteClickHandler(() => this._callOnDataChange(`isMarkAsFavorite`));

      this._filmDetailsPopupComponent.setDeleteCommentClickHandler(this._onCommentChange);
      this._filmDetailsPopupComponent.addCommentHandler(this._onCommentChange);
    });
  }

  _updatesCardFilmComponent() {
    const oldCardFilmComponent = this._cardFilmComponent;
    this._cardFilmComponent = new CardFilmComponent(this._film);
    replace(this._container, this._cardFilmComponent.getElement(), oldCardFilmComponent.getElement());
  }

  _updatesFilmDetailsPopupComponent() {
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(this._film, this._commentsModel);
  }

  _isPopupOpen() {
    return Boolean(document.body.querySelector(`.film-details`));
  }

  setDefaultView() {
    if (this._mode === Mode.POPUP_IS_OPEN) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._cardFilmComponent);
    remove(this._filmDetailsPopupComponent);
  }
}
