import CardFilmComponent from "../components/card-film.js";
import FilmDetailsPopupComponent from "../components/film-details-popup.js";

import {render, appendChild, removeChild} from "../utils/render.js";
import {checksKeydownEsc} from "./../utils/common.js";

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._cardFilmComponent = null;
    this._filmDetailsPopupComponent = null;
    this._film = null;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
  }

  render(film) {
    this._film = film;

    this._cardFilmComponent = new CardFilmComponent(film);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

    render(this._container, this._cardFilmComponent);

    this._cardFilmComponent.setPosterClickHandler(this._openPopup);
    this._cardFilmComponent.setTitleClickHandler(this._openPopup);
    this._cardFilmComponent.setCommentsClickHandler(this._openPopup);
  }

  _documentKeydownHandler(evt) {
    checksKeydownEsc(evt, this._closePopup);
  }

  _closePopup() {
    removeChild(this._filmDetailsPopupComponent);
    document.removeEventListener(`keydown`, this._documentKeydownHandler);
  }

  _openPopup() {
    appendChild(this._filmDetailsPopupComponent);
    this._filmDetailsPopupComponent.setCloseButtonClickHandler(this._closePopup);
    document.addEventListener(`keydown`, this._documentKeydownHandler);
  }
}
