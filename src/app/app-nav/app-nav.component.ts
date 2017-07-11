import { Component }    from '@angular/core';

import { UserService }  from "../user/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.sass']
})
export class AppNavComponent {
  constructor(private userService: UserService) {}
}
