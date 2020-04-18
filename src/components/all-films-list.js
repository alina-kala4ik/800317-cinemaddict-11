import AbstractComponent from "./../components/abstract-component.js";

const createAllFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class AllFilmsList extends AbstractComponent {
  getTemplate() {
    return createAllFilmsListTemplate();
  }
}
