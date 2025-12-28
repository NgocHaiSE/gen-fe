import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import token from '../utils/token';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const auth = token.isAuthenticated();

    if (!auth) {
        return <Navigate to="/user/login" state={{ from: location }} replace />;
    }

    return children;
}
