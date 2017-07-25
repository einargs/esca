import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/BehaviorSubject";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";

import { Injectable }       from "@angular/core";
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                           from '@angular/router';

import { Recipe }           from "../recipe";
import { RecipeService }    from "../recipe.service";
import { UserService }      from "../../user/user.service";

@Injectable()
export class RecipeDetailResolver implements Resolve<BehaviorSubject<Recipe>> {
  constructor(
    private rs: RecipeService,
    private router: Router
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<BehaviorSubject<Recipe>> {
    try {
      let obs = this.rs.getRecipe(route.paramMap.get("id"));
      let init = await obs.first().toPromise();
      let sub = new BehaviorSubject(init);
      obs.multicast(sub).connect();
      return sub;
    } catch (e) {
      this.router.navigate(["/recipe"]);
      return null;
    }
  }
}
