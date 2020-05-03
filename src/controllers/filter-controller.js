import MenuAndFilterComponent from "./../components/menu-and-filter.js";
import {render, replace} from "./../utils/render.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilter = FilterTypes.ALL;

    this._menuAndStatsComponent = null;

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
    this._menuAndStatsComponent = new MenuAndFilterComponent(filterData);
    render(this._container, this._menuAndStatsComponent);
  }

  render() {
    const films = this._filmsModel.getAllFilms();
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: getFilteredFilms(filter, films).length,
        isChecked: filter === this._activeFilter,
      };
    });

    if (!this._menuAndStatsComponent) {
      this._menuAndStatsComponent = new MenuAndFilterComponent(filterData);
      render(this._container, this._menuAndStatsComponent);
    } else {
      const newComponent = new MenuAndFilterComponent(filterData);
      replace(this._container, newComponent.getElement(), this._menuAndStatsComponent.getElement());
      this._menuAndStatsComponent = newComponent;
    }
    this._menuAndStatsComponent.setFilterChangeClickHandler(this.onFilterChange);
  }

  onFilterChange(filterType) {
    this._activeFilter = filterType;
    this._filmsModel.setFilter(filterType);
  }

  onDataChange() {
    this.render();
  }
}
