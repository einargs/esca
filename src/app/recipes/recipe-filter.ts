import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { Recipe }     from "./recipe";
import { RecipeGist } from "./recipe-gist";

// The recipe filter interface
export interface RecipeFilter {
  nameIncludes?: string;
  hasTags?: string[];
  hasIngredients?: string[];
  timeLessThan?: number;
  timeMoreThan?: number;
}

// Filter an array of recipe gists (or recipes)
function filterArray(
  filter: RecipeFilter,
  gists: RecipeGist[]
): RecipeGist[] {
  return gists.filter(gist => (
    !filter.timeMoreThan || (+gist.time > filter.timeMoreThan)
  ) && (
    !filter.timeLessThan || (+gist.time < filter.timeLessThan)
  ) && (
    !filter.nameIncludes || (gist.name.includes(filter.nameIncludes))
  ) && (
    !filter.hasTags || (gist.tags &&
      filter.hasTags.every(tag => gist.tags.includes(tag)))
  ) && (
    !filter.hasIngredients || (gist.ingredients &&
      filter.hasIngredients.every(ing => gist.ingredients.includes(ing)))
  ));
}

// Filter the recipe array of a passed observable
function filterObservable(
  filter: RecipeFilter,
  gistObservable: Observable<RecipeGist[]>
): Observable<RecipeGist[]> {
  return gistObservable.map(gists => filterArray(filter, gists));
}

// Filter the recipe array of a passed observable by tags
function filterObservableByTags(
  tags: string[],
  gistObservable: Observable<RecipeGist[]>
): Observable<RecipeGist[]> {
  return filterObservable({ hasTags: tags }, gistObservable);
}

// Filter an observable based on a filter observable
function makeFilteredObservable(
  recipeFilterObservable: Observable<RecipeFilter>,
  gistObservable: Observable<RecipeGist[]>
): Observable<RecipeGist[]> {
  return recipeFilterObservable
    .switchMap(filter => filterObservable(filter, gistObservable));
}

//TODO:Figure out a better place to put these
export const filterUtil = {
  filterArray,
  filterObservable, filterObservableByTags,
  makeFilteredObservable
};
