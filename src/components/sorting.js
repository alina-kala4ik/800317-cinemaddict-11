import AbstractComponent from "./abstract-component.js";

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by_date`,
  BY_RATING: `by_rating`,
}

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="by_date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="by_rating">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._activeSort = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortingTemplate();
  }
  getSortType() {
    return this._activeSort;
  }
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const selectedSortType = evt.target.getAttribute(`data-sort`);

      if (selectedSortType === this._activeSort) {
        return;
      }

      this._activeSort = selectedSortType;

      handler(this._activeSort);
    });
  }
}
