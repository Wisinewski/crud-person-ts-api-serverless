import { makeDbLoadPersonByFilter } from './../../usecases/load-person-by-filter/db-load-person-by-filter';
import { LoadPersonByFilterController } from './../../../../presentation/controllers/load-person-by-filter/load-person-by-filter-controller';

export const makeLoadPersonByFilterController = (): LoadPersonByFilterController => {
  const loadPersonByFilterController = new LoadPersonByFilterController(makeDbLoadPersonByFilter())
  return loadPersonByFilterController
}