import FilterComponent from "../components/filter.js";
import {render, replace} from "./../utils/render.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilter = FilterTypes.ALL;

    this._filterComponent = null;

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this._filmsModel.setFilmsChangeHandlers(this.onDataChange);
  }

  onLoading() {
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: 0,
        isChecked: filter === this._activeFilter,
      };
    });
    this._filterComponent = new FilterComponent(filterData);
    render(this._container, this._filterComponent, `afterbegin`);
  }

  _generateFilterData() {
    const films = this._filmsModel.getAllFilms();
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: getFilteredFilms(filter, films).length,
        isChecked: filter === this._activeFilter,
      };
    });
    return filterData;
  }

  render() {
    const filterData = this._generateFilterData();

    if (!this._filterComponent) {
      this._filterComponent = new FilterComponent(filterData);
      render(this._container, this._filterComponent, `afterbegin`);
    } else {
      const newComponent = new FilterComponent(filterData);
      replace(this._container, newComponent.getElement(), this._filterComponent.getElement());
      this._filterComponent = newComponent;
    }
    this._filterComponent.setFilterChangeHandler(this.onFilterChange);
  }

  onFilterChange(filterType) {
    this._activeFilter = filterType;
    this._filmsModel.setFilter(filterType);
  }

  onDataChange() {
    const filterData = this._generateFilterData();
    this._filterComponent.rerender(filterData);
  }

  setFilterClickHandler(handler) {
    this._filterComponent.setFilterClickHandler(handler);
  }

  removeActiveFilter() {
    this._filterComponent.removeActiveFilter();
  }

  setFilterClickHandler(handler) {
    this._filterComponent.setFilterClickHandler(handler);
  }

  removeActiveFilter() {
    this._filterComponent.removeActiveFilter();
  }
}
