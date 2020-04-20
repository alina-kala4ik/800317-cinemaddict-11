import AbstractComponent from "./abstract-component.js";

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
};

const createSortingTemplate = () => {
  const sortItems = Object.values(SortType).map((type) => {
    const activeSortClass = type === SortType.DEFAULT ? `sort__button--active` : ``;
    return `<li><a href="#" class="sort__button ${activeSortClass}" data-sort="${type}">Sort by ${type}</a></li>`;
  }).join(``);

  return (
    `<ul class="sort">
      ${sortItems}
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

      this.getElement().querySelector(`[data-sort="${this._activeSort}"]`).classList.remove(`sort__button--active`);
      this.getElement().querySelector(`[data-sort="${selectedSortType}"]`).classList.add(`sort__button--active`);

      this._activeSort = selectedSortType;

      handler(this._activeSort);
    });
  }
}

export {SortType};
