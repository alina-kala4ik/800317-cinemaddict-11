const InsertionPoint = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, component, place = InsertionPoint.BEFOREEND) => {
  switch (place) {
    case InsertionPoint.BEFOREEND:
      container.append(component.getElement());
      break;
    case InsertionPoint.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const appendChild = (component) => document.body.appendChild(component.getElement());

const removeChild = (component) => {
  document.body.removeChild(component.getElement());
  component.removeElement();
};

const replace = (parent, newElement, oldElement) => parent.replaceChild(newElement, oldElement);

export {createElement, render, remove, appendChild, removeChild, replace, InsertionPoint};
