import AbstractComponent from "./../components/abstract-component.js";

const createFooterStatistics = (countOfFilmsInTheDatabase) => `<p>${countOfFilmsInTheDatabase} movies inside</p>`;

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._countOfFilmsInTheDatabase = 0;
  }

  getTemplate() {
    this._countOfFilmsInTheDatabase = this._filmsModel.getAllFilms().length.toLocaleString();
    return createFooterStatistics(this._countOfFilmsInTheDatabase);
  }
}
