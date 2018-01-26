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
      items: ["t1","t2"]
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

  updateListName(listId: string, name: string): void {
    console.log(`[placeholder] update list id ${listId} name to ${name}`);
  }

  deleteList(listId: string): void {
    console.log("[placeholder] delete list id", listId);
  }

  newList(): Promise<string> {
    console.log("[placeholder] make new list");
    return Promise.resolve("[placeholder] new list id");
  }
}
