import FilmModel from "./../models/film-model.js";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedTasks = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map((film) => film.toRAW()));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());
    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }

  updateFilm(filmId, data) {
    if (isOnline()) {
      return this._api.updateFilm(filmId, data)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm.toRAW());

          return newFilm;
        });
    }
    const localFilms = FilmModel.clone(Object.assign(data, {filmId}));
    this._store.setItem(filmId, localFilms.toRAW());
    return Promise.resolve(localFilms);
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId);
    }
    return Promise.resolve([]);
  }

  addComment(newComment, filmId) {
    return this._api.addComment(newComment, filmId);
  }

  deleteComment(commentId) {
    return this._api.deleteComment(commentId);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedTasks(response.updated);
          this._store.setItems(updatedFilms);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
