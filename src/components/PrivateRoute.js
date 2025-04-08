import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';

function PrivateRoute({ children }) {
  const { user, loading, authError } = useAuth();
  
  if (loading) {
    return <Loading />;
  }

  // If there's an auth error, redirect to login where the error will be displayed
  if (authError) {
    return <Navigate to="/login" />;
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute; 