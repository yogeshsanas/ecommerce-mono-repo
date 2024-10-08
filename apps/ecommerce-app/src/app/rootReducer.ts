import { combineReducers } from "@reduxjs/toolkit";
import authReducer ,{AuthState}from '../../../../libs/auth-lib/src/lib/authSlice'
import cartReducer ,{CartState}from '../../../../libs/cart-lib/src/lib/cartSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
  cart: cartReducer,
})

export type RootState = {
    auth: AuthState; // Include the specific slice type
    cart: CartState; // Include the specific slice type
  }
  