export default class FilmsModel {
  constructor() {
    this._films = [];
  }

  setFilms(films) {
    this._films = films;
  }

  getAllFilms() {
    return this._films;
  }

  getFilteredFilms() {
    return this._films;
  }

  updateFIlm(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
  }
}
