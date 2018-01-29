import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

import { ShoppingList } from "./shopping-list";

@Injectable()
export class ShoppingListService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getList(id: string): Observable<ShoppingList> {
    return Observable.of({
      name: "test",
      items: [
        { name:"t1", checked: false },
        { name:"t2", checked: true }
      ]
    });
  }

  getIdsOfViewableLists(/*user: User*/): Observable<string[]> {
    return Observable.of([
      "id1",
      "id2",
      "id3",
      "id4"
    ]);
  }

  updateList(listId: string, list: ShoppingList): void {
    console.log(`[placeholder] update list id ${listId} to`, list);
  }

  deleteList(listId: string): void {
    console.log("[placeholder] delete list id", listId);
  }

  newList(): Promise<string> {
    console.log("[placeholder] make new list");
    return Promise.resolve("[placeholder] new list id");
  }
}
