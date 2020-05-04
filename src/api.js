import FilmModel from "./models/film-model.js";
import CommentModel from "./models/comment-model.js";
export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then(FilmModel.parseFilms)
      .catch(() => []);
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((response) => response.json())
      .then(CommentModel.parseComments)
      .catch(() => []);
  }

  updateFilm(filmId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${filmId}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilm);
  }

  addComment(newComment, filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {
      method: `POST`,
      body: JSON.stringify(newComment.toRAW()),
      headers,
    })
      .then((response) => response.json());
  }

  deleteComment() {

  }
}
