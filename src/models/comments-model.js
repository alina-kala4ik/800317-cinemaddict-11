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

  getDataByIds(arrayIds) {
    const arrayData = [];
    arrayIds.forEach((id) => {
      arrayData.push(this.getDataById(id));
    });
    return arrayData;
  }

  getDataById(id) {
    let data;
    this._comments.forEach((comment) => {
      if (comment.idComment === id) {
        data = comment;
      }
    });
    return data;
  }
}