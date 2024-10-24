import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './userSlice';

const UserProfile: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      {/* Add more user details here as needed */}
    </div>
  );
};

export default UserProfile;
