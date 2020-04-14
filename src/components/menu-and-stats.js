import {createElement} from "./../util.js";

const createMenuAndStatsTemplate = (stats) => {

  const statsLinksTemplate = Object.entries(stats).map((statsItem) => {
    const [title, count] = statsItem;
    return (
      ` <a href="#${title}" class="main-navigation__item">${title} <span
          class="main-navigation__item-count">${count}</span></a>`
    );
  }).join(``);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          ${statsLinksTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MenuAndStats {
  constructor(stats) {
    this._stats = stats;
    this._element = null;
  }
  getTemplate() {
    return createMenuAndStatsTemplate(this._stats);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
