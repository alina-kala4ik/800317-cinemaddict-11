export default class FilmModel {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.releaseDate = new Date(data.film_info.release.date);
    this.runtime = data.film_info.runtime;
    this.actors = data.film_info.actors;
    this.description = data.film_info.description;
    this.rating = data.film_info.total_rating;
    this.country = data.film_info.release.release_country;
    this.genres = data.film_info.genre;
    this.ageLimit = data.film_info.age_rating;
    this.isAddedToWatchlist = data.user_details.watchlist;
    this.isMarkAsWatched = data.user_details.already_watched;
    this.isMarkAsFavorite = data.user_details.favorite;
    this.watchingDate = new Date(data.user_details.watching_date);
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "poster": this.poster,
        "director": this.director,
        "writers": this.writers,
        "release": {
          "date": this.releaseDate.toISOString(),
          "release_country": this.country,
        },
        "runtime": this.runtime,
        "actors": this.actors,
        "description": this.description,
        "total_rating": this.rating,
        "genre": this.genres,
        "age_rating": this.ageLimit,
      },
      "user_details": {
        "watchlist": this.isAddedToWatchlist,
        "already_watched": this.isMarkAsWatched,
        "favorite": this.isMarkAsFavorite,
        "watching_date": this.watchingDate.toISOString(),
      }
    };
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }

  static clone(data) {
    return new FilmModel(data.toRAW());
  }
}
