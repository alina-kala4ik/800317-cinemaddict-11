export default class CommentModel {
  constructor(data) {
    this.id = data.id;
    this.emoji = data.emotion;
    this.date = new Date(data.date);
    this.author = data.author;
    this.message = data.comment;
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }

  toRAW() {
    return {
      "emotion": this.emoji,
      "date": this.date,
      "comment": this.message,
    };
  }

  static clone(data) {
    return new CommentModel(data.toRAW());
  }
}
