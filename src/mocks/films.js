const MAX_SENTENCES_IN_DESCRIPTION = 5;
const MAX_RATING = 10;
const MAX_GENERATED_YEAR = 2020;
const MIN_GENERATED_YEAR = 1895;
const QUANTITY_MONTHS = 12;
const QUANTITY_DAYS = 31;
const QUANTITY_HOURS = 24;
const QUANTITY_MINUTES = 60;
const MAX_RUN_TIME = 3;

const FILM_TITLE = `The Dance of life`;
const FILM_ORIGINAL_TITLE = `The Dance of life`;
const FILM_DIRECTOR = `Anthony Mann`;
const FILM_WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const FILM_ACTORS = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const FILM_COUNTRY = `USA`;
const FILM_GENRES = [`Drama`, `Film-Noir`, `Mystery`];
const COMMENT_MESSAGE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
const COMMENT_AUTHOR = `John Doe`;

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

const EMOJIS = [`angry`, `puke`, `sleeping`, `smile`];


const getRandomNumber = (max = 1, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRating = () => (Math.random() * (MAX_RATING - 0) + 0).toFixed(1);

const generateDate = () => {
  const date = new Date();
  date.setFullYear(getRandomNumber(MAX_GENERATED_YEAR, MIN_GENERATED_YEAR));
  date.setMonth(getRandomNumber(QUANTITY_MONTHS));
  date.setDate(getRandomNumber(QUANTITY_DAYS));
  date.setHours(getRandomNumber(QUANTITY_HOURS));
  date.setMinutes(getRandomNumber(QUANTITY_MINUTES));
  return date;
};

const generateRunTime = () => {
  const runTime = new Date();
  runTime.setHours(getRandomNumber(MAX_RUN_TIME));
  runTime.setMinutes(getRandomNumber(QUANTITY_MINUTES));
  const hours = runTime.getHours();
  const minutes = runTime.getMinutes().toString().padStart(2, `0`);
  return `${hours}h ${minutes}m`;
};

const generateComment = () => {
  return {
    emoji: EMOJIS[getRandomNumber(EMOJIS.length - 1)],
    date: generateDate(),
    author: COMMENT_AUTHOR,
    message: COMMENT_MESSAGE,
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
  const maxNumberForSliceDescription = randomNumber + getRandomNumber(MAX_SENTENCES_IN_DESCRIPTION, 1);


  return {
    title: FILM_TITLE,
    originalTitle: FILM_ORIGINAL_TITLE,
    poster: POSTERS_SRC[getRandomNumber(POSTERS_SRC.length - 1)],
    director: FILM_DIRECTOR,
    writers: FILM_WRITERS,
    releaseDate: generateDate(),
    runtime: generateRunTime(),
    actors: FILM_ACTORS,
    description: DESCRIPTIONS_PHRASES.slice(randomNumber, maxNumberForSliceDescription).join(`.`),
    rating: getRandomRating(),
    country: FILM_COUNTRY,
    genres: FILM_GENRES,
    comments: generateArrayComments(getRandomNumber(5)),
    ageLimit: getRandomNumber(18),
    isAddedToWatchlist: getRandomNumber(),
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
