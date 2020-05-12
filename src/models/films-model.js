import {FilterTypes, getFilteredFilms} from "./../utils/filter.js";

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._activeFilter = FilterTypes.ALL;
    this._filterChangeHandlers = [];
    this.filmsChangeHandlers = [];
  }

  getAllFilms() {
    return this._films;
  }

  getFilteredFilms() {
    return getFilteredFilms(this._activeFilter, this._films);
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilms(films) {
    this._films = films;
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFIlm(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    this._callHandlers(this.filmsChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilmsChangeHandlers(handler) {
    this.filmsChangeHandlers.push(handler);
  }
}
