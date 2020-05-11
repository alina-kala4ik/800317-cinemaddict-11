import SmartAbstractComponent from "./../components/smart-abstract-component.js";
import {replace} from "./../utils/render.js";

const createFooterStatistics = (countOfFilmsInTheDatabase) => `<p>${countOfFilmsInTheDatabase} movies inside</p>`;

export default class FooterStatistics extends SmartAbstractComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._countOfFilmsInTheDatabase = 0;
  }

  getTemplate() {
    this._countOfFilmsInTheDatabase = this._filmsModel.getAllFilms().length.toLocaleString();
    return createFooterStatistics(this._countOfFilmsInTheDatabase);
  }

  reRender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(oldElement.parentNode, newElement, oldElement);
  }
}
