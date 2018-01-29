export interface ShoppingListItem {
  name: string;
  checked: boolean;
}

export interface ShoppingListMeta {
  ownerId: string;
}

export interface ShoppingList {
  meta: ShoppingListMeta;
  name: string;
  items: ShoppingListItem[];
}
