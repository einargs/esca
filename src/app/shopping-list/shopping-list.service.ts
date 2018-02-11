import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument
} from "angularfire2/firestore";
import { firestore } from "firebase/app";
import { Observable } from "rxjs/Observable";

import { ShoppingList } from "./shopping-list";

@Injectable()
export class ShoppingListService {
  private listCollection: AngularFirestoreCollection<ShoppingList>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.listCollection = afs.collection<ShoppingList>("lists");
  }

  private getListRef(id: string): AngularFirestoreDocument<ShoppingList> {
    return this.listCollection.doc(id);
  }

  getList(id: string): Observable<ShoppingList> {
    return this.getListRef(id)
      .valueChanges();
  }

  private getUserViewableCollectionRef(
    userId: string
  ): AngularFirestoreCollection<ShoppingList> {
    return this.afs.collection<ShoppingList>("lists",
      (ref) => ref.where("meta.ownerId", "==", userId)
    );
  }

  getIdsOfViewableLists(userId: string): Observable<string[]> {
    return this.getUserViewableCollectionRef(userId)
      .snapshotChanges()
      .map(listChanges => listChanges.map(
        listChange => listChange.payload.doc.id
      ));
  }

  updateList(listId: string, list: ShoppingList): void {
    this.getListRef(listId).update(list);
  }

  deleteList(listId: string): void {
    this.getListRef(listId).delete();
  }

  newList(userId: string): void {
    this.listCollection.add({
      name: "",
      meta: {
        ownerId: userId
      },
      items: []
    });
  }
}
