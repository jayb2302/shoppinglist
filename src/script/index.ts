
import { UserInfo } from 'firebase/auth';

export interface CombinedUser  {
  uid: string;
  email: UserInfo['email'];
  username: string | null; 
  shoppingLists: string[];
}
// User structure (for authentication)
export interface User extends UserInfo {
  uid: string;
  email: string;
  username: string | null ; // Add the username property
  shoppingLists: string[]; 
}
// Shopping item structure
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
  timestamp: string;
  unit: string;
  notes: string;
  store: string;
}

// Shopping list template structure
export interface ShoppingListTemplate {
  id: string;
  name: string;
  items: ShoppingItem[]; // Each template has an array of items
}

// Pantry item structure
export interface PantryItem {
  id: string;
  name: string;
  category: 'Fridge' | 'Cabinet';
}


