const RatioOfCountFilmsWatchedUserRank = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
};

const determinesUserRank = (countFilmsWatched) => {
  let rank;
  if (countFilmsWatched === RatioOfCountFilmsWatchedUserRank.NONE) {
    rank = ``;
  } else if (countFilmsWatched <= RatioOfCountFilmsWatchedUserRank.NOVICE) {
    rank = `Novice`;
  } else if (countFilmsWatched <= RatioOfCountFilmsWatchedUserRank.FAN) {
    rank = `Fan`;
  } else {
    rank = `Movie Buff`;
  }
  return rank;
};

export {RatioOfCountFilmsWatchedUserRank, determinesUserRank};
