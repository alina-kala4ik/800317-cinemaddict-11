const MAX_SENTENCES_IN_DESCRIPTION = 5;
const maxRating = 10;

const POSTERS_SRC = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTIONS_PHRASES = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`.`);

const EMOJIS = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];


const getRandomNumber = (max = 1, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRating = () => {
  return (Math.random() * (maxRating - 0) + 0).toFixed(1);
};

const generateDate = () => {
  const date = new Date();
  date.setFullYear(getRandomNumber(2020, 1895));
  date.setMonth(getRandomNumber(12));
  date.setDate(getRandomNumber(31));
  date.setHours(getRandomNumber(24));
  date.setMinutes(getRandomNumber(60));
  return date;
};

const generateRunTime = () => {
  const runTime = new Date();
  runTime.setHours(getRandomNumber(3));
  runTime.setMinutes(getRandomNumber(60));
  const hours = runTime.getHours().toString().padStart(2, `0`);
  const minutes = runTime.getMinutes();
  return `${hours}h ${minutes}m`;
};

const generateComment = () => {
  return {
    emoji: EMOJIS[getRandomNumber(EMOJIS.length - 1)],
    date: generateDate(),
    author: `John Doe`,
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  };
};

const generateArrayComments = (countComments) => {
  const arrayComments = [];
  for (let i = 0; i < countComments; i++) {
    arrayComments.push(generateComment());
  }
  return arrayComments;
};

const generateFilm = () => {
  const randomNumber = getRandomNumber(DESCRIPTIONS_PHRASES.length - 1);

  return {
    title: `The Dance of life`,
    originalTitle: `The Dance of life`,
    smallPoster: POSTERS_SRC[getRandomNumber(POSTERS_SRC.length - 1)],
    bigPoster: POSTERS_SRC[getRandomNumber(POSTERS_SRC.length - 1)],
    director: `Anthony Mann`,
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    releaseDate: generateDate(),
    runtime: generateRunTime(),
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    description: DESCRIPTIONS_PHRASES.slice(randomNumber, randomNumber + getRandomNumber(MAX_SENTENCES_IN_DESCRIPTION), 1).join(`.`),
    rating: getRandomRating(),
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    comments: generateArrayComments(getRandomNumber(5)),
    ageLimit: getRandomNumber(18),
    isAddedToView: getRandomNumber(),
    isMarkAsWatched: getRandomNumber(),
    isMarkAsFavorite: getRandomNumber(),
  };
};

const generateArrayFilms = (countFilms) => {
  const arrayFilms = [];
  for (let i = 0; i < countFilms; i++) {
    arrayFilms.push(generateFilm());
  }
  return arrayFilms;
};

export {generateArrayFilms};
