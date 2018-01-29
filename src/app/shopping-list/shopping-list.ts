export interface ShoppingListItem {
  name: string;
  checked: boolean;
}

export interface ShoppingList {
  name: string;
  items: ShoppingListItem[];
}
