import AbstractComponent from "./../components/abstract-component.js";

const createButtonShowMoreTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
