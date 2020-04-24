const checksKeydownEsc = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

const ErrorMessage = {
  INSTANTIATE_PROHIBITION: `Can't instantiate AbstractComponent, only concrete one.`,
  UNREALIZED_METHOD: `Abstract method not implemented:`,
};

export {checksKeydownEsc, ErrorMessage};
