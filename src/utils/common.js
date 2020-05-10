const checksKeydownEsc = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

const ErrorMessage = {
  INSTANTIATE_PROHIBITION: `Can't instantiate AbstractComponent, only concrete one.`,
  UNREALIZED_METHOD: `Abstract method not implemented:`,
};

const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return `${hours} ${minutes}`;
};

const StatisticsSortType = {
  DEFAULT: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`,
};

const Status = {
  ONLINE: `online`,
  OFFLINE: `offline`,
};

export {checksKeydownEsc, ErrorMessage, getTimeFromMins, StatisticsSortType, Status};
