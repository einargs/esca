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

  listForm: FormGroup;
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

  private createItemGroup(dataModel) {
    return this.fb.group({
      name: [dataModel.name, { updateOn:"blur" }],
      checked: dataModel.checked
    });
  }

  deleteThisList() {
    this.listService.deleteList(this.listId);
  }

  deleteItemField(index: number): void {
    this.items.removeAt(index);
  }

  addItemField(): void {
    this.items.push(this.createItemGroup({
      name: "",
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
    this.listForm.reset({
      name: list.name
    });
    // Because the items array is a form control
    this.listForm.setControl("items", this.fb.array(
      list.items.map(item => this.createItemGroup(item))
    ));
  }

  //TODO: There seem to be optimization possibilities that involve
  // updating only 1 field at a time. As things are, everytime the
  // server updates (which is frequently) the item controls, which
  // are in a `FormArray`, are re-created. This causes the user to
  // lose focus on an item field (hence the updateOn="blur" hack).
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
    this.listService.updateList(this.listId, list);
  }
}
