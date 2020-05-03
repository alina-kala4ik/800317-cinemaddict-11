export default class CommentModel {
  constructor(data) {
    this.id = data.id;
    this.emoji = data.emotion;
    this.date = data.date ? new Date(data.date) : null;
    this.author = data.author;
    this.message = data.comment;
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
