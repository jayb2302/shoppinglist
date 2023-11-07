
import { UserInfo } from 'firebase/auth';

export interface CombinedUser  {
  uid: string;
  email: UserInfo['email'];
  username: string | null; 
  shoppingLists: string[];
  // Add the username property
}
// User structure (for authentication)
export interface User extends UserInfo {
  uid: string;
  email: string;
  username: string | null ; // Add the username property
  shoppingLists: string[]; // Add other properties you need
}
// Shopping item structure
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
}

// Shopping list template structure


// Pantry item structure
export interface PantryItem {
  id: string;
  name: string;
  category: 'Fridge' | 'Cabinet';
}


