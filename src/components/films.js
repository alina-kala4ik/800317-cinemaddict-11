import AbstractComponent from "./../components/abstract-component.js";

const createFilmsTemplate = () => `<section class="films"></section>`;

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
