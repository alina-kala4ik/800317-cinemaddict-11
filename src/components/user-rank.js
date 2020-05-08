import {determinesUserRank} from "./../utils/rank.js";
import SmartAbstractComponent from "./../components/smart-abstract-component.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";


export const createUserRankTemplate = (countFilmsWatched) => {
  const rank = determinesUserRank(countFilmsWatched);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
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
