import React from 'react';
import { logoutUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout(); // נקה את המצב ב-Context
            navigate('/login'); // נווט חזרה למסך ההתחברות
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
