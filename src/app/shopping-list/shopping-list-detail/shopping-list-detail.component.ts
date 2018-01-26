import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl
} from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { takeUntil, debounceTime } from "rxjs/operators";

import { ShoppingListService } from "../shopping-list.service";
import { ShoppingList } from "../shopping-list";


const sendDataOutDelay: number = 500;

@Component({
  selector: 'shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.sass']
})
export class ShoppingListDetailComponent implements OnInit, OnDestroy {
  @Input() listId: string;
  private listObservable: Observable<ShoppingList> = null;
  /* per: https://stackoverflow.com/questions/38008334/ */
  private ngUnsubscribe = new Subject();

  private listForm: FormGroup;

  constructor(
    private listService: ShoppingListService,
    private fb: FormBuilder
  ) {
    this.listForm = this.createListForm();
  }

  createListForm(): FormGroup {
    return this.fb.group({
      name: [""]
    });
  }

  updateFormModel(list: ShoppingList): void {
    this.listForm.reset({
      name: list.name
    });
  }

  setupDataIn() {
    this.listObservable = this.listService.getList(this.listId);
    this.listObservable
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .forEach((list: ShoppingList) => {
        this.updateFormModel(list);
      });
  }

  setupDataOut() {
    this.listForm.get("name").valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(sendDataOutDelay)
      )
      .forEach(
        (newName:string) => this.updateName(newName)
      );
  }

  ngOnInit() {
    this.setupDataIn();
    this.setupDataOut();
  }

  ngOnDestroy() {
    // Causes all oberservables with takeUntil(this.ngUnsubscribe)
    // to complete.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateName(newName: string) {
    console.log("[placeholder][detail] update name to", newName);
    this.listService.updateListName(this.listId, newName);
  }
}
