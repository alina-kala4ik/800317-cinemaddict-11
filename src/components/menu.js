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

  removesLinkSelection() {
    this.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__additional--active`);
  }

  setStatsClickHandler(handler) {
    const statsButton = this.getElement().querySelector(`.main-navigation__additional`);
    statsButton.addEventListener(`click`, () => {
      statsButton.classList.add(`main-navigation__additional--active`);
      handler();
    });
  }
}
