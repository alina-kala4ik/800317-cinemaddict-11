import SmartAbstractComponent from "./../components/smart-abstract-component.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";

const RatioOfCountFilmsWatchedUserRank = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
};

export const createUserRankTemplate = (countFilmsWatched) => {
  let profileRating;
  if (countFilmsWatched === RatioOfCountFilmsWatchedUserRank.NONE) {
    profileRating = ``;
  } else if (countFilmsWatched <= RatioOfCountFilmsWatchedUserRank.NOVICE) {
    profileRating = `Novice`;
  } else if (countFilmsWatched <= RatioOfCountFilmsWatchedUserRank.FAN) {
    profileRating = `Fan`;
  } else {
    profileRating = `Movie Buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends SmartAbstractComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._countFilmsWatched = null;
    this.rerender = this.rerender.bind(this);
    this._filmsModel.setFilmsChangeHandlers(this.rerender);
  }

  getTemplate() {
    this._countFilmsWatched = getFilteredFilms(FilterTypes.HISTORY, this._filmsModel.getAllFilms()).length;
    return createUserRankTemplate(this._countFilmsWatched);
  }

  recoveryListeners() {}
}
