const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case `beforeend`: container.append(component.getElement()); break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const appendChild = (component) => {
  document.body.appendChild(component.getElement());
};

const removeChild = (component) => {
  document.body.removeChild(component.getElement());
  component.removeElement();
};

export {createElement, render, remove, appendChild, removeChild};
