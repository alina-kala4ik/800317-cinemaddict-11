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
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, handler);
  }

}
