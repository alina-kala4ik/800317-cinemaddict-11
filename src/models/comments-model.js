export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments;
    this._generatesIds();
  }

  _generatesIds() {
    this._comments = this._comments.map((comment, i) => Object.assign({}, comment, {id: i}));
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

  deleteComment(commentId) {
    this._comments = [].concat(this._comments.slice(0, commentId), this._comments.slice(commentId + 1));
    this._generatesIds();
  }
}
