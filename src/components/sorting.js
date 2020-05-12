import SmartAbstractComponent from "./smart-abstract-component.js";

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
};

const createSortingTemplate = (activeSort) => {
  const sortItems = Object.values(SortType).map((type) => {
    const activeSortClass = type === activeSort ? `sort__button--active` : ``;
    return `<li><a href="#" class="sort__button ${activeSortClass}" data-sort="${type}">Sort by ${type}</a></li>`;
  }).join(``);

  return (
    `<ul class="sort">
      ${sortItems}
    </ul>`
  );
};

export default class Sorting extends SmartAbstractComponent {
  constructor() {
    super();
    this._activeSort = SortType.DEFAULT;
    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortingTemplate(this._activeSort);
  }

  getSortType() {
    return this._activeSort;
  }

  setSortType(sortType) {
    this._activeSort = sortType;
    this.reRender();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
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
      this.reRender();
      handler(this._activeSort);
    });
    this._sortTypeChangeHandler = handler;
  }
}

export {SortType};
