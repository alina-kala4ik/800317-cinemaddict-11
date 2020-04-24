import AbstractComponent from "./abstract-component.js";
import {ErrorMessage} from "./../utils/common.js";
import {replace} from "../utils/render.js";

export default class SmartAbstractComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`${ErrorMessage.UNREALIZED_METHOD} recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(document.body, newElement, oldElement);
    this.recoveryListeners();
  }
}
