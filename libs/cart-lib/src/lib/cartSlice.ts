import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define quantity and price structure
export interface QuantityOption {
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number; // This keeps track of the quantity in the cart
  price: number; // Price of a single item
  selectedQuantity: string; // If you're using this for the selected quantity
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
        // If item exists, just update the quantity
        existingItem.quantity += newItem.quantity; // Update quantity
        state.total += newItem.price * newItem.quantity; // Adjust total price based on the new quantity
      } else {
        // If item doesn't exist, add it and update total price
        state.items.push(newItem);
        state.total += newItem.price * newItem.quantity; // Add price based on quantity
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload);

      if (index !== -1) {
        const itemToRemove = state.items[index];

        // Adjust total price based on the quantity
        const itemPrice = itemToRemove.price * itemToRemove.quantity;
        state.total -= itemPrice; // Subtract from total
        state.items.splice(index, 1); // Remove the item
      }
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: string }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        const newQuantity = parseInt(quantity, 10); // Convert the string to a number
        const previousQuantity = item.quantity;

        // Ensure new quantity is valid and update the item quantity
        if (newQuantity >= 0) {
          item.quantity = newQuantity; // Update to new quantity

          // Update total price based on the quantity change
          const priceDifference = item.price * (newQuantity - previousQuantity);
          state.total += priceDifference;
        }

        // Optional: If new quantity is 0, remove the item from the cart
        if (newQuantity === 0) {
          state.items = state.items.filter((item) => item.id !== id); // Remove the item from cart
        }
      }
    },


  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity); // Calculate total based on price and quantity
  }, 0);
// Export actions and reducer
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
