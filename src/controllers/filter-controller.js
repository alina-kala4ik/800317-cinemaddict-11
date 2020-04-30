import MenuAndFilterComponent from "./../components/menu-and-filter.js";
import {render} from "./../utils/render.js";
import {getFilteredTasks, FilterTypes} from "./../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._films = this._filmsModel.getAllFilms();
    this._activeFilter = FilterTypes.ALL;

    this._menuAndStatsComponent = null;
  }

  render() {
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: getFilteredTasks(filter, this._films).length,
        isChecked: filter === this._activeFilter,
      };
    });

    this._menuAndStatsComponent = new MenuAndFilterComponent(filterData);
    render(this._container, this._menuAndStatsComponent);
  }
}
