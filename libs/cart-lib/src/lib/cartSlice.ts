import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define quantity and price structure
export interface QuantityOption {
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  image: string; // For item images
  selectedQuantity: string; // Refers to the currently selected quantity (e.g., '0.5', '1')
  quantities: Record<string, QuantityOption>; // Maps quantity (e.g., '0.5', '1') to price
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a new item or update an existing one
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If item exists, just update the selected quantity
        const previousPrice = existingItem.quantities[existingItem.selectedQuantity].price;
        existingItem.selectedQuantity = newItem.selectedQuantity;
        const newPrice = existingItem.quantities[newItem.selectedQuantity].price;

        // Adjust total price
        state.total += newPrice - previousPrice;
      } else {
        // If item doesn't exist, add it and update total price
        state.items.push(newItem);
        state.total += newItem.quantities[newItem.selectedQuantity].price;
      }
    },

    // Remove an item from the cart
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload);

      if (index !== -1) {
        const itemToRemove = state.items[index];
        const itemPrice = itemToRemove.quantities[itemToRemove.selectedQuantity].price;

        // Subtract from total and remove the item
        state.total -= itemPrice;
        state.items.splice(index, 1);
      }
    },

    // Update quantity of an existing item
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: string }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item && item.quantities[quantity]) {
        const previousPrice = item.quantities[item.selectedQuantity].price;
        item.selectedQuantity = quantity;
        const newPrice = item.quantities[quantity].price;

        // Adjust the total based on the new price
        state.total += newPrice - previousPrice;
      }
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    return total + item.quantities[item.selectedQuantity].price;
  }, 0);

// Export actions and reducer
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
