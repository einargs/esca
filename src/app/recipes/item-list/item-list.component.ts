import {
  Input, Output,
  EventEmitter,
  forwardRef,
  Component
} from "@angular/core";
import {
  FormGroupDirective,
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from "@angular/forms";

export const ITEM_LIST_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItemListComponent),
  multi: true
};

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: [ "./item-list.component.sass" ],
  providers: [ITEM_LIST_CONTROL_VALUE_ACCESSOR]
})
export class ItemListComponent implements ControlValueAccessor {
  @Input() placeholder: string = "Add item";
  @Input() disabled: boolean = false;

  listForm: FormGroup;
  get itemsArray(): FormArray {
    return this.listForm.get("items") as FormArray;
  }
  get itemValues(): string[] {
    return this.itemsArray.value;
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
    this.listForm.valueChanges.subscribe(val => {
      this.onChange(val.items);
    });
  }

  createForm(): void {
    this.listForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  loadItems(items: string[]): void {
    let itemControls = items.map(item => this.fb.control(item));
    let itemsArray = this.fb.array(itemControls);
    this.listForm.setControl("items", itemsArray);
  }

  deleteItem(itemIndex: number): void {
    this.itemsArray.removeAt(itemIndex);
  }

  addItem(item: string): void {
    this.itemsArray.push(this.fb.control(item));
  }


  itemErrorStateMatcher(control: FormControl, form: FormGroupDirective) {
    return Boolean(control && control.invalid);
  }


  // Implementation of ControlValueAccessor
  private onChange = (_:any)=>{};
  private onTouched = ()=>{};

  writeValue(val: any) {
    this.loadItems(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    fn(this.itemValues);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean) {
    this.disabled = state;
  }
}
