// src/context/AuthContext.js - POPRAVEN LOGOUT
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData, authToken) => {
        try {
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Failed to save authentication data');
        }
    };

    const logout = () => {
        try {
            console.log('🔐 Logging out user...');

            // Gi brisi podatocite od state
            setUser(null);
            setToken(null);

            // Gi brisi podatocite od localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Dodadeno: Brisi i drugi mozni auth podatoci
            localStorage.clear();

            console.log('✅ User logged out successfully');
        } catch (error) {
            console.error('❌ Error during logout:', error);
        }
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'ADMIN',
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};