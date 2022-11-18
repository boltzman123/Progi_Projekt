import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute ({
    user,
    redirectPath = '/login',
    children,
}) {
    user = JSON.parse(window.localStorage.getItem('user'))

    if (user == null) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default ProtectedRoute