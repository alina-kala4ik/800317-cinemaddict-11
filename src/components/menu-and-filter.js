import AbstractComponent from "./abstract-component.js";

const HREF_PREFIX = `#`;

const createMenuAndStatsTemplate = (stats) => {

  const statsLinksTemplate = stats.map((statsItem) => {
    const {title, count, isChecked} = statsItem;
    const activeClass = isChecked ? `main-navigation__item--active` : ``;
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

export default class MenuAndFilter extends AbstractComponent {
  constructor(stats) {
    super();
    this._stats = stats;
  }
  getTemplate() {
    return createMenuAndStatsTemplate(this._stats);
  }

  setFilterChangeClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        const selectedFilter = evt.target.getAttribute(`href`).substring(HREF_PREFIX.length);
        handler(selectedFilter);
      }
    });
  }
}
