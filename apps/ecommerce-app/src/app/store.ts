import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';


// Create the Redux store with the root reducer
export const store = configureStore({
  reducer: rootReducer ,
});
