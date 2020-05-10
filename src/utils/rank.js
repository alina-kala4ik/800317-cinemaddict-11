const determinesUserRank = (countFilmsWatched) => {
  let rank;
  if (countFilmsWatched === 0) {
    rank = ``;
  } else if (countFilmsWatched <= 10) {
    rank = `Novice`;
  } else if (countFilmsWatched <= 20) {
    rank = `Fan`;
  } else {
    rank = `Movie Buff`;
  }
  return rank;
};

export {determinesUserRank};
