import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { ShoppingListService } from "../shopping-list.service";
import { UserService } from "app/user/user.service";

@Component({
  selector: 'shopping-list-master',
  templateUrl: './shopping-list-master.component.html',
  styleUrls: ['./shopping-list-master.component.sass']
})
export class ShoppingListMasterComponent implements OnInit {
  listIds: Observable<string[]>;

  constructor(
    private listService: ShoppingListService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.listIds = this.userService.userIdSubject.pipe(
      switchMap(userId => this.listService.getIdsOfViewableLists(userId))
    );
  }

  newList() {
    this.listService.newList(this.userService.userId);
  }

}
