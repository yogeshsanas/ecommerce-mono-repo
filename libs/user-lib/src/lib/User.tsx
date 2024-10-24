// Use.tsx or UserComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser, initializeUserFromStorage, selectCurrentUser, selectIsAuthenticated } from './userSlice';

const UserComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Initialize user from localStorage when the component mounts
  useEffect(() => {
    dispatch(initializeUserFromStorage());
  }, [dispatch]);

  const handleLogin = () => {
    // For demonstration, mock login with hardcoded user data
    const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    dispatch(setUser(mockUser));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {currentUser?.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
