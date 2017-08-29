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
}

// Collection of utility methods that ignore case
const IC = {
  // See if an array of strings is a subset of another array of strings
  // and ignore case for comparison
  isSubset(subset: string[], superset: string[]) {
    // Lower case arrays
    let lowerCaseSubset = subset.map(e => e.toLowerCase());
    let lowerCaseSuperset = superset.map(e => e.toLowerCase());

    return lowerCaseSubset.every(e => lowerCaseSuperset.includes(e));
  },

  // See if a string is a substring of another string
  // and ignore case for comparison
  isSubstring(subString: string, superString: string) {
    return superString.toLowerCase().includes(subString.toLowerCase());
  }
};

// Filter an array of recipe gists (or recipes)
function filterArray(
  filter: RecipeFilter,
  gists: RecipeGist[]
): RecipeGist[] {
  return gists.filter(gist => (
    !filter.nameIncludes || (IC.isSubstring(filter.nameIncludes, gist.name))
  ) && (
    !filter.hasTags || (gist.tags && IC.isSubset(filter.hasTags, gist.tags))
  ) && (
    !filter.hasIngredients || (gist.ingredients &&
      IC.isSubset(filter.hasIngredients, gist.ingredients)
    )
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
