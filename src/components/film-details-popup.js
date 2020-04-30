import SmartAbstractComponent from "./../components/smart-abstract-component.js";
import moment from "moment";
import {getTimeFromMins} from "./../utils/common.js";

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

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
  const {emoji, date, author, message} = commentData;

  const commentDate = moment.calendarFormat(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createComments = (commentIds, commentsModel) => {
  const commentsTemplate = [];
  const commentsData = commentsModel.getDataByIds(commentIds);
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


const createFilmDetailsPopupTemplate = (film, checkedEmoji, commentsModel) => {
  const {poster, title, ageLimit, originalTitle, rating, director, writers, actors, releaseDate, runtime, country, genres, description, isAddedToWatchlist, isMarkAsWatched, isMarkAsFavorite, comments} = film;

  const stringWriters = writers.join(`, `);
  const stringActors = actors.join(`, `);
  const formatedReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const formatedRuntime = moment(getTimeFromMins(runtime), `h mm`).format(`h[h] mm[m]`);
  const genresTitle = genres.length === 1 ? `Genre` : `Genres`;
  const genresTemplate = createGenresTemplate(genres);
  const checkChecklist = isAddedToWatchlist ? `checked` : ``;
  const checkWatched = isMarkAsWatched ? `checked` : ``;
  const checkFavorite = isMarkAsFavorite ? `checked` : ``;
  const commentsLength = comments.length;
  const commentsTemplate = createComments(comments, commentsModel);

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
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

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
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${stringWriters}</td>
                </tr>
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

    this._setEmojiListClickHandler();

    this._checkedEmoji = null;
    this._closeHandler = null;
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._film, this._checkedEmoji, this._commentsModel);
  }

  setCloseButtonClickHandler(handler) {
    this._closeHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._setEmojiListClickHandler();
    this.setCloseButtonClickHandler(this._closeHandler);
  }

  _setEmojiListClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._checkedEmoji = evt.target.value;
      this.rerender();
    });
  }
}
