import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ShoppingListService } from "../shopping-list.service";
import { ShoppingList } from "../shopping-list";

@Component({
  selector: 'shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.sass']
})
export class ShoppingListDetailComponent implements OnInit {
  @Input() listId: string;
  private listObservable: Observable<ShoppingList> = null;

  constructor(
    private listService: ShoppingListService
  ) { }

  ngOnInit() {
    this.listObservable = this.listService.getList(this.listId);
  }
}
