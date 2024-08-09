import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateToken } from '../api/auth';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await validateToken();

                if (response.data.status === 'success') {
                    login(response.data.token); // עדכן את הסטטוס באפליקציה
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                console.error('Token validation failed', error);
                setIsValidToken(false);
            }

            setIsLoading(false);
        };

        checkToken();
    }, [login]);

    if (isLoading) {
        return <div>Loading...</div>; // תוכל להציג ספינר כאן אם תרצה
    }

    if (!isValidToken || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
