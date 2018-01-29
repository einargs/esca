import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'shopping-list-master',
  templateUrl: './shopping-list-master.component.html',
  styleUrls: ['./shopping-list-master.component.sass']
})
export class ShoppingListMasterComponent implements OnInit {
  listIds: Observable<string[]>;

  constructor(
    private listService: ShoppingListService
  ) { }

  ngOnInit() {
    this.listIds = this.listService.getIdsOfViewableLists();
  }

  newList() {
    this.listService.newList();
  }

}
