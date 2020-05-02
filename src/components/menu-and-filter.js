import SmartAbstractComponent from "./smart-abstract-component.js";
import {FilterTypes} from "./../utils/filter.js";

const HREF_PREFIX = `#`;

const createMenuAndStatsTemplate = (stats, activeFilter) => {

  const statsLinksTemplate = stats.map((statsItem) => {
    const {title, count} = statsItem;
    const activeClass = activeFilter === title ? `main-navigation__item--active` : ``;
    return (
      ` <a href="#${title}" class="main-navigation__item ${activeClass}">${title} <span
          class="main-navigation__item-count">${count}</span></a>`
    );
  }).join(``);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
          ${statsLinksTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MenuAndFilter extends SmartAbstractComponent {
  constructor(stats) {
    super();
    this._stats = stats;
    this._activeFilter = FilterTypes.ALL;
    this.filterChangeHandler = null;
  }

  getTemplate() {
    return createMenuAndStatsTemplate(this._stats, this._activeFilter);
  }

  recoveryListeners() {
    this.setFilterChangeClickHandler(this.filterChangeHandler);
  }

  setFilterChangeClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        const selectedFilter = evt.target.getAttribute(`href`).substring(HREF_PREFIX.length);
        if (selectedFilter === this._activeFilter) {
          return;
        }
        handler(selectedFilter);
        this._activeFilter = selectedFilter;
        this.rerender();
      }
    });
    this.filterChangeHandler = handler;
  }
}
