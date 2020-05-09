import AbstractComponent from "./../components/abstract-component.js";

const createExtraFilmsListTemplate = (title) => {
  return (
    `<section class="films-list--extra ${title.split(` `).join(`-`).toLowerCase()}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraFilmsList extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._title);
  }
}
