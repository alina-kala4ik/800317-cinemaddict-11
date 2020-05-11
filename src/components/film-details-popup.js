import CommentModel from "./../models/comment-model.js";
import {encode} from "he";
import {getTimeFromMins} from "./../utils/common.js";
import moment from "moment";
import SmartAbstractComponent from "./../components/smart-abstract-component.js";

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];
const ENTER_KEY_CODE = 13;

const CommentPlaceholder = {
  ONLINE: `Select reaction below and write comment here`,
  OFFLINE: `You can not leave a comment offline`,
};

const createNewComment = (formData, emoji) => {
  const newComment = new CommentModel({
    "emotion": emoji,
    "date": new Date().toISOString(),
    "comment": formData.get(`comment`),
  });
  delete newComment.author;
  delete newComment.id;
  return newComment;
};

const createGenresTemplate = (genres) => {
  return genres.map((genre, i) => {
    genre += (i === genres.length - 1) ? `` : `,`;
    return `<span class="film-details__genre">${genre}</span>`;
  })
  .join(``);
};

moment.calendarFormat = (myMoment) => {
  const daysDiff = moment(myMoment).diff(moment(), `days`);
  let dateFormate;
  switch (daysDiff) {
    case 0: dateFormate = `Today`; break;
    case -1: dateFormate = `Yesterday`; break;
    case -2: dateFormate = `2 days ago`; break;
    default: dateFormate = moment(myMoment).format(`DD/MM/YY hh:mm`);
  }
  return dateFormate;
};

const createComment = (commentData) => {
  const {emoji, date, author, message, id} = commentData;

  const safeMessage = encode(message);
  const commentDate = moment.calendarFormat(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${safeMessage}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createComments = (commentsData) => {
  const commentsTemplate = [];
  commentsData.forEach((comment) => commentsTemplate.push(createComment(comment)));
  return commentsTemplate.join(``);
};

const createEmojiItems = (checkedEmoji) =>
  EMOJIS.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${checkedEmoji === emoji ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
    </label>`
  ).join(``);


const createFilmDetailsPopupTemplate = (film, options) => {
  const {poster, title, ageLimit, originalTitle, rating, director, writers, actors, releaseDate, runtime, country, genres, description, isAddedToWatchlist, isMarkAsWatched, isMarkAsFavorite} = film;
  const {checkedEmoji, comments} = options;

  const stringWriters = writers.join(`, `);
  const showWriters = writers.length > 0 ? `<tr class="film-details__row"><td class="film-details__term">Writers</td><td class="film-details__cell">${stringWriters}</td></tr>` : ``;
  const stringActors = actors.join(`, `);
  const formatedReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const formatedRuntime = moment(getTimeFromMins(runtime), `h mm`).format(`h[h] mm[m]`);
  const genresTitle = genres.length === 1 ? `Genre` : `Genres`;
  const genresTemplate = createGenresTemplate(genres);
  const checkChecklist = isAddedToWatchlist ? `checked` : ``;
  const checkWatched = isMarkAsWatched ? `checked` : ``;
  const checkFavorite = isMarkAsFavorite ? `checked` : ``;
  const commentsLength = comments.length;
  const commentsTemplate = createComments(comments);

  const EmojiItemsTemplate = createEmojiItems(checkedEmoji);

  const isCheckedEmoji = checkedEmoji ? `<img src="./images/emoji/${checkedEmoji}.png" width="55" height="55" alt="emoji-${checkedEmoji}">` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="${title}">

              <p class="film-details__age">${ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                ${showWriters}
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${stringActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatedReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatedRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresTitle}</td>
                  <td class="film-details__cell">
                    ${genresTemplate}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}.
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${checkChecklist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
              watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${checkWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already
              watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${checkFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
              favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsLength}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsTemplate}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${isCheckedEmoji}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                  name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${EmojiItemsTemplate}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


export default class FilmDetailsPopup extends SmartAbstractComponent {
  constructor(film, commentsModel) {
    super();
    this._film = film;
    this._commentsModel = commentsModel;
    this._comments = [];
    this._deleteCommentHandler = null;
    this._setEmojiListClickHandler();

    this._checkedEmoji = null;
    this._closeHandler = null;
    this.reRender = this.reRender.bind(this);

    this._commentInputField = null;
    this._activeDeleteButton = null;

    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
    window.addEventListener(`online`, this.onOnline);
    window.addEventListener(`offline`, this.onOffline);

    this._addToWatchlistClickHandler = null;
    this._markAsWatchedClickHandler = null;
    this._markAsFavoriteClickHandler = null;
    this.addComment = this.addComment.bind(this);
    this._commentHandler = null;
  }

  getTemplate() {
    const options = {
      checkedEmoji: this._checkedEmoji,
      comments: this._commentsModel.getComments(),
    };
    return createFilmDetailsPopupTemplate(this._film, options);
  }

  setCloseButtonClickHandler(handler) {
    this._closeHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    this._addToWatchlistClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
    this._markAsWatchedClickHandler = handler;
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
    this._markAsFavoriteClickHandler = handler;
  }

  recoveryListeners() {
    this._setEmojiListClickHandler();
    this.setCloseButtonClickHandler(this._closeHandler);
    this.addsClickHandlerToAllDeleteButtons();
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setMarkAsWatchedClickHandler(this._markAsWatchedClickHandler);
    this.setMarkAsFavoriteClickHandler(this._markAsFavoriteClickHandler);
  }

  _reRenderEmoji() {
    const emojiWrapper = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const newEmoji = `<img src="./images/emoji/${this._checkedEmoji}.png" width="55" height="55" alt="emoji-${this._checkedEmoji}"></img>`;
    emojiWrapper.innerHTML = newEmoji;
  }

  _setEmojiListClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._checkedEmoji = evt.target.value;
      this._reRenderEmoji();
    });
  }

  _deleteComment(evt, handler) {
    evt.preventDefault();
    this._activeDeleteButton = evt.target;
    this._activeDeleteButton.setAttribute(`disabled`, `disabled`);
    this._activeDeleteButton.innerText = `Deleting…`;
    const commentId = evt.target.getAttribute(`data-comment-id`);
    handler(this._film, commentId, null, this);
  }

  setDeleteCommentClickHandler(handler) {
    this._deleteCommentHandler = handler;
    this.addsClickHandlerToAllDeleteButtons();
  }

  addComment(evt) {
    if (evt.ctrlKey && evt.keyCode === ENTER_KEY_CODE || evt.metaKey && evt.keyCode === ENTER_KEY_CODE) {
      const form = this.getElement().querySelector(`.film-details__inner`);
      const formData = new FormData(form);
      const newComment = createNewComment(formData, this._checkedEmoji);

      if (!newComment.emoji || newComment.message.length < 1) {
        return;
      }
      this._commentInputField = this.getElement().querySelector(`.film-details__comment-input`);
      this._commentInputField.setAttribute(`disabled`, `disabled`);
      this._commentInputField.style.border = `none`;

      this._commentHandler(this._film, null, newComment, this);
    }
  }

  addCommentHandler(handler) {
    this._commentHandler = handler;
    document.addEventListener(`keydown`, this.addComment);
  }

  reRender(newFilmData) {
    this._film = newFilmData;
    this._checkedEmoji = null;
    super.reRender();
  }

  shake() {
    this.getElement().classList.add(`shake`);

    setTimeout(() => {
      this.getElement().classList.remove(`shake`);
    }, 600);
  }

  addRedBorderToTextField() {
    this._commentInputField.style.border = `1px solid red`;
  }

  returnsTextFieldToDefaultState() {
    this._commentInputField.removeAttribute(`disabled`);
  }

  returnsDeleteButtonToDefaultState() {
    this._activeDeleteButton.innerText = `Delete`;
    this._activeDeleteButton.removeAttribute(`disabled`);
  }

  onOnline() {
    document.addEventListener(`keydown`, this.addComment);
    this._commentsModel.setCommentsByFilmId(this._film.id, (comments) => {
      this._comments = comments;
      this.reRender(this._film);
    });
  }

  onOffline() {
    document.removeEventListener(`keydown`, this.addComment);
    const commentInputField = document.body.querySelector(`.film-details__comment-input`);
    const allDeleteButton = document.body.querySelectorAll(`.film-details__comment-delete`);

    commentInputField.setAttribute(`disabled`, `disabled`);
    commentInputField.setAttribute(`placeholder`, CommentPlaceholder.OFFLINE);
    if (allDeleteButton) {
      allDeleteButton.forEach((button) => {
        button.setAttribute(`disabled`, `disabled`);
      });
    }
  }

  addsClickHandlerToAllDeleteButtons() {
    const allDeleteButton = document.body.querySelectorAll(`.film-details__comment-delete`);
    allDeleteButton.forEach((button) => button.addEventListener(`click`, (evt) => {
      this._deleteComment(evt, this._deleteCommentHandler);
    }));
  }
}
