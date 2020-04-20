import {createElement} from "./../utils/render.js";

const ErrorMessage = {
  INSTANTIATE_PROHIBITION: `Can't instantiate AbstractComponent, only concrete one.`,
  UNREALIZED_METHOD: `Abstract method not implemented:`,
};

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ErrorMessage.INSTANTIATE_PROHIBITION);
    }

    this._element = null;
  }
  getTemplate() {
    throw new Error(`${ErrorMessage.UNREALIZED_METHOD} getTemplate`);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
