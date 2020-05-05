export default class CommentsModel {
  constructor(api) {
    this._api = api;
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setCommentsByFilmId(filmId, handler) {
    this._api.getComments(filmId)
      .then((comments) => {
        this._comments = comments;
        handler();
      });
  }

  addComment(newComments) {
    this._comments.push(newComments[newComments.length - 1]);
  }

  deleteComment(commentId) {
    const commentIndex = this._comments.findIndex((comment) => comment.id === commentId);
    this._comments = [].concat(this._comments.slice(0, commentIndex), this._comments.slice(commentIndex + 1));
  }
}
