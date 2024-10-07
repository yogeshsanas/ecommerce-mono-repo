import { combineReducers } from '@reduxjs/toolkit';
import authReducer,{AuthState} from '../../../auth-lib/src/lib/authSlice';
import cartReducer, {CartState}from '../../../cart-lib/src/lib/cartSlice';
import productReducer ,{ProductState}from '../../../product-lib/src/lib/productSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
});

export type RootState = {
  auth: AuthState; // Include the specific slice type
  cart: CartState; // Include the specific slice type
  product: ProductState;
}
