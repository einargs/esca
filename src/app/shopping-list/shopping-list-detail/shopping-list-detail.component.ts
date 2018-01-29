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

//TODO: add a spinner that waits for data to load
//TODO: create generic `await-data-load` component
// that handles errors, etc.
@Component({
  selector: 'shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.sass']
})
export class ShoppingListDetailComponent implements OnInit, OnDestroy {
  //TODO: react to listId changes
  @Input() listId: string;
  private listObservable: Observable<ShoppingList> = null;
  /* per: https://stackoverflow.com/questions/38008334/ */
  private ngUnsubscribe = new Subject();

  private listForm: FormGroup;
  get name(): FormControl {
    return this.listForm.controls.name as FormControl;
  }
  get items(): FormArray {
    return this.listForm.controls.items as FormArray;
  }

  constructor(
    private listService: ShoppingListService,
    private fb: FormBuilder
  ) {
    this.listForm = this.createListForm();
  }

  deleteThisList() {
    this.listService.deleteList(this.listId);
  }

  deleteItemField(index: number): void {
    this.items.removeAt(index);
  }

  addItemField(): void {
    this.items.push(this.fb.group({
      name:"",
      checked: false
    }));
  }

  createListForm(): FormGroup {
    return this.fb.group({
      name: [""],
      items: this.fb.array([])
    });
  }

  updateFormModel(list: ShoppingList): void {
    console.log(`[debug] new data model`, list);
    this.listForm.reset({
      name: list.name
    });
    // Because the items array is a form control
    this.listForm.setControl("items", this.fb.array(
      list.items.map(item => this.fb.group(item))
    ));
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
    this.listForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(sendDataOutDelay)
      )
      .forEach((list: ShoppingList) => {
         this.updateExternal(list);
      });
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

  // Update the server
  updateExternal(list: ShoppingList) {
    console.log("[placeholder][detail] update list to", list);
    this.listService.updateList(this.listId, list);
  }
}
