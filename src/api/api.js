import CommentModel from "./../models/comment-model.js";
import FilmModel from "./../models/film-model.js";


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const Urls = {
  FILMS: `https://11.ecmascript.pages.academy/cinemaddict/movies`,
  COMMENTS: `https://11.ecmascript.pages.academy/cinemaddict/comments`,
};
export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Urls.FILMS, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(FilmModel.parseFilms)
      .catch(() => []);
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${Urls.COMMENTS}/${filmId}`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(CommentModel.parseComments)
      .catch(() => []);
  }

  updateFilm(filmId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${Urls.FILMS}/${filmId}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(FilmModel.parseFilm)
      .catch((err) => {
        throw err;
      });
  }

  addComment(newComment, filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${Urls.COMMENTS}/${filmId}`, {
      method: `POST`,
      body: JSON.stringify(newComment.toRAW()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
  }

  deleteComment(commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${Urls.COMMENTS}/${commentId}`, {
      method: `DELETE`,
      headers,
    })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  sync(films) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${Urls.FILMS}/sync`, {
      method: `POST`,
      body: JSON.stringify(films),
      headers,
    })
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
  }
}
