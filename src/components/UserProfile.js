import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

function UserProfile() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        {user?.user_metadata?.avatar_url && (
          <img 
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            className="user-avatar"
          />
        )}
        <div className="user-details">
          <h3>{user?.user_metadata?.full_name || 'User'}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default UserProfile; 