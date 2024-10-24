// libs/user-lib/src/lib/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../state-management/src/lib/rootReducer'; // Ensure this is correct in your project

// User state definition
export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface User {
  id?: string;
  name: string;
  email: string;
}

// Initial state of the user
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Create the user slice with actions and reducers
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    initializeUserFromStorage: (state) => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
    }
  }
});

// Export actions to be used in components
export const { setLoading, setError, setUser, logoutUser, initializeUserFromStorage } = userSlice.actions;

// Selectors to get data from the state
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Export the reducer to include in the store
export default userSlice.reducer;
