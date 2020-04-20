const checksKeydownEsc = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

export {checksKeydownEsc};
