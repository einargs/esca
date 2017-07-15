import { Injectable }   from "@angular/core";
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                       from "@angular/router";

import { UserService }  from "./user.service";

@Injectable()
export class RequireUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Prompt the user to sign in; on success redirect them to the requested page
  private async promptSignInAndRedirect(redirectUrl: string) {
    await this.userService.authLoaded();

    if (!this.userService.signedIn) await this.userService.signInPopup();

    await this.router.navigateByUrl(redirectUrl);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.signedIn) {
      return true;
    } else {
      this.promptSignInAndRedirect(state.url);
      return false;
    }
  }
}
