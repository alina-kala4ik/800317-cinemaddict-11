import {FilterTypes, getFilteredFilms} from "./../utils/filter.js";

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._activeFilter = FilterTypes.ALL;
    this._filterChangeHandlers = [];
    this.filmsChangeHandlers = [];
  }

  setFilms(films) {
    this._films = films;
  }

  getAllFilms() {
    return this._films;
  }

  getFilteredFilms() {
    return getFilteredFilms(this._activeFilter, this._films);
  }

  updateFIlm(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    this._callHandlers(this.filmsChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilmsChangeHandlers(handler) {
    this.filmsChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
