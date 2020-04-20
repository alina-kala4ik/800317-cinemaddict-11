import AbstractComponent from "./../components/abstract-component.js";

const createNoFilmsTemplate = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
