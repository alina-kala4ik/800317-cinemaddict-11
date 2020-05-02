export default class FilmModel {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.releaseDate = data.film_info.release.date ? new Date(data.film_info.release.date) : null;
    this.runtime = data.film_info.runtime;
    this.actors = data.film_info.actors;
    this.description = data.film_info.actors;
    this.rating = data.film_info.total_rating;
    this.country = data.film_info.release.release_country;
    this.genres = data.film_info.genre;
    this.ageLimit = data.film_info.age_rating;
    this.isAddedToWatchlist = data.user_details.watchlist;
    this.isMarkAsWatched = data.user_details.already_watched;
    this.isMarkAsFavorite = data.user_details.favorite;
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }
}
