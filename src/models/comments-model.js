export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments;
  }

  getComments() {
    return this._comments;
  }

  getCommentsById(id) {
    return this._comments.filter((comment) => comment.filmId === id);
  }

  addComment(newComment) {
    this._comments.push(newComment);
  }
}
