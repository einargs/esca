import { Component, Output, EventEmitter }  from '@angular/core';

import { UserService }                      from "../user/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.sass']
})
export class AppNavComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(public userService: UserService) {}

  emitCloseSidenav() {
    this.closeSidenav.emit();
  }
}
