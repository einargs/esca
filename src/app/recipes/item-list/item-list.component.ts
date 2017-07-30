import {
  Input, Output,
  EventEmitter,
  forwardRef,
  Component
} from "@angular/core";
import {
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
  @Input() items: string[] = [];
  @Output() itemsChange = new EventEmitter();

  @Input() placeholder: string = "Add item";
  @Input() disabled: boolean = false;

  // Listeners for ControlValueAccessor
  private onChange = (_:any)=>{};
  private onTouched = ()=>{};

  private notifyOfItemsChange(): void {
    this.onChange(this.items);
    this.itemsChange.emit(this.items);
  }

  deleteItem(itemIndex: number): void {
    this.items.splice(itemIndex, 1);
    this.notifyOfItemsChange();
  }

  addItem(item: string): void {
    this.items.push(item);
    this.notifyOfItemsChange();
  }


  // Implementation of ControlValueAccessor
  writeValue(val: any) {
    this.items = val;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    fn(this.items);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean) {
    this.disabled = state;
  }
}
