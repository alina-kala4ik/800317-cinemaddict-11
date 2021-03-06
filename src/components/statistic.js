import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {determinesUserRank} from "./../utils/rank.js";
import moment from "moment";
import SmartAbstractComponent from "./smart-abstract-component.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";
import {getTimeFromMins, StatisticsSortType} from "./../utils/common.js";

const BAR_HEIGHT = 50;

const calculatesCountOfWatchedMoviesByGenre = (films) => {
  const ratioOfGenreToCountOfRepetitions = {};
  films.forEach((genre) => {
    if (ratioOfGenreToCountOfRepetitions[genre]) {
      ratioOfGenreToCountOfRepetitions[genre] = ratioOfGenreToCountOfRepetitions[genre] + 1;
    } else {
      ratioOfGenreToCountOfRepetitions[genre] = 1;
    }
  });
  return ratioOfGenreToCountOfRepetitions;
};

const lookingTopGenreFromUser = (ratioOfGenreToCountViews) => {
  const topGenre = Object.keys(ratioOfGenreToCountViews).reduce((acc, genre) => ratioOfGenreToCountViews[acc] > ratioOfGenreToCountViews[genre] ? acc : genre);
  return topGenre;
};

const createStatisticInputsTemplate = (activeSortType) => {
  return Object.values(StatisticsSortType).map((sortType) =>
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${sortType}"
    value="${sortType}" ${sortType === activeSortType ? `checked=""` : `` } >
    <label for="statistic-${sortType}" class="statistic__filters-label">${sortType}</label>`
  ).join(``);
};

const createStatisticTemplate = (options) => {
  const {countFilmsWatched, totalDuration, topGenre, activeSortType, rank} = options;
  const formatedTotalDuration = getTimeFromMins(totalDuration).split(` `);
  const totalHours = formatedTotalDuration[0];
  const totalMinutes = formatedTotalDuration[1];

  const statisticInputs = createStatisticInputsTemplate(activeSortType);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${statisticInputs}
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countFilmsWatched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span
              class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
  </section>`
  );
};

const renderGenreCharts = (statisticCtx, ratioOfGenreToCountViews) => {
  const sortedRatioOfGenreToCountViews = Object.entries(ratioOfGenreToCountViews).sort((a, b) => b[1] - a[1]);
  const films = [];
  const countsOfViews = [];
  sortedRatioOfGenreToCountViews.forEach((ratio) => {
    films.push(ratio[0]);
    countsOfViews.push(ratio[1]);
  });

  statisticCtx.height = BAR_HEIGHT * Object.keys(ratioOfGenreToCountViews).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: films,
      datasets: [{
        data: countsOfViews,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Statistic extends SmartAbstractComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._statisticsData = {};
    this._activeSortType = StatisticsSortType.DEFAULT;
    this.setSortChangeHandler();
    this._genreCharts = null;
  }

  getTemplate() {
    this._generatesStatisticsData();
    return createStatisticTemplate(this._statisticsData);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
  }

  recoveryListeners() {
    this.setSortChangeHandler();
  }

  reRender() {
    super.reRender();
    this._renderCharts();
  }

  _generatesStatisticsData() {
    const films = this._filmsModel.getAllFilms();
    const filmsWatched = getFilteredFilms(FilterTypes.HISTORY, films);

    if (!filmsWatched.length) {
      this._statisticsData = {
        countFilmsWatched: 0,
        totalDuration: 0,
        topGenre: ``,
        activeSortType: this._activeSortType,
        rank: determinesUserRank(filmsWatched.length),
        ratioOfGenreToCountViews: {},
      };
      return;
    }

    let filmsViewedOverSelectedTime;
    switch (this._activeSortType) {
      case StatisticsSortType.DEFAULT:
        filmsViewedOverSelectedTime = filmsWatched;
        break;
      case StatisticsSortType.TODAY:
        filmsViewedOverSelectedTime = filmsWatched.filter((film) => moment(film.watchingDate).diff(moment(), `days`) === 0);
        break;
      case StatisticsSortType.WEEK:
        filmsViewedOverSelectedTime = filmsWatched.filter((film) => moment(film.watchingDate).diff(moment(), `weeks`) === 0);
        break;
      case StatisticsSortType.MONTH:
        filmsViewedOverSelectedTime = filmsWatched.filter((film) => moment(film.watchingDate).diff(moment(), `months`) === 0);
        break;
      case StatisticsSortType.YEAR:
        filmsViewedOverSelectedTime = filmsWatched.filter((film) => moment(film.watchingDate).diff(moment(), `years`) === 0);
        break;
    }

    const totalDuration = filmsViewedOverSelectedTime.reduce((acc, film) => acc + film.runtime, 0);
    let genresOfAllWatchedFilms = [];
    filmsViewedOverSelectedTime.forEach((film) => genresOfAllWatchedFilms.push(...film.genres));
    const ratioOfGenreToCountViews = calculatesCountOfWatchedMoviesByGenre(genresOfAllWatchedFilms);


    this._statisticsData = {
      countFilmsWatched: filmsViewedOverSelectedTime.length,
      totalDuration,
      activeSortType: this._activeSortType,
      rank: determinesUserRank(filmsWatched.length),
      ratioOfGenreToCountViews,
      topGenre: lookingTopGenreFromUser(ratioOfGenreToCountViews),
    };
  }

  _renderCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    if (this._genreCharts) {
      this._genreCharts.destroy();
      this._genreCharts = null;
    }

    this._genreCharts = renderGenreCharts(statisticCtx, this._statisticsData.ratioOfGenreToCountViews);
  }

  setSortChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      this._activeSortType = evt.target.value;
      this.reRender();
    });
  }
}
