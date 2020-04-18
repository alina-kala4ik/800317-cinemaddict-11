import AbstractComponent from "./../components/abstract-component.js";

const optionsReleaseDate = {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
};

const optionsCommentDate = {
  year: `numeric`,
  month: `numeric`,
  day: `numeric`,
};

const optionsCommentTime = {
  hour: `numeric`,
  minute: `numeric`,
};

const createGenresTemplate = (genres) => {
  return genres.map((genre, i) => {
    genre += (i === genres.length - 1) ? `` : `,`;
    return `<span class="film-details__genre">${genre}</span>`;
  })
  .join(``);
};

const createComment = (comment) => {
  const {emoji, date, author, message} = comment;

  const now = new Date();
  const today = new Intl.DateTimeFormat(`en-GB`, optionsCommentDate).format(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const yesterday = new Intl.DateTimeFormat(`en-GB`, optionsCommentDate).format(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
  const twoDaysAgo = new Intl.DateTimeFormat(`en-GB`, optionsCommentDate).format(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2));

  let commentDate = new Intl.DateTimeFormat(`en-GB`, optionsCommentDate).format(date);
  switch (commentDate) {
    case today: commentDate = `today`; break;
    case yesterday: commentDate = `yesterday`; break;
    case twoDaysAgo: commentDate = `twoDaysAgo`; break;
  }

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">
          ${commentDate}
          ${new Intl.DateTimeFormat(`en-GB`, optionsCommentTime).format(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createComments = (comments) => {
  const commentsTemplate = [];
  comments.forEach((comment) => {
    commentsTemplate.push(createComment(comment));
  });
  return commentsTemplate.join(``);
};


const createFilmDetailsPopupTemplate = (film) => {
  const {poster, title, ageLimit, originalTitle, rating, director, writers, actors, releaseDate, runtime, country, genres, description, isAddedToWatchlist, isMarkAsWatched, isMarkAsFavorite, comments} = film;

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
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${new Intl.DateTimeFormat(`en-GB`, optionsReleaseDate).format(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length === 1 ? `Genre` : `Genres`}</td>
                  <td class="film-details__cell">
                    ${createGenresTemplate(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}.
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddedToWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
              watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isMarkAsWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already
              watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isMarkAsFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
              favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createComments(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                  name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


export default class FilmDetailsPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createFilmDetailsPopupTemplate(this._film);
  }
  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}
