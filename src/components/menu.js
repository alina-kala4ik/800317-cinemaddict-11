import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, () => {
      this.getElement().querySelector(`.main-navigation__additional`).classList.add(`main-navigation__additional--active`);
      handler();
    });
  }

  removesLinkSelection() {
    this.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__additional--active`);
  }
}
