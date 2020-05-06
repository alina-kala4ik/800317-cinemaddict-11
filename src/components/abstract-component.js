import {createElement} from "./../utils/render.js";
import {ErrorMessage} from "./../utils/common.js";


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
  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }
  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
}
