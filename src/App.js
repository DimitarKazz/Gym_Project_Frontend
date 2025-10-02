// src/App.js - POPRAVEN IMPORT
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { gymTheme } from './styles/Theme'; // POPRAVEN IMPORT - Theme.js
import { AuthProvider, useAuth } from './context/AuthContext';

// Import na site komponenti
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DayList from './pages/DayList';
import VideoList from './pages/VideoList';
import Users from './pages/Users';
import Statistics from './pages/Statistics';
import SubscriptionPlans from './pages/SubscriptionPlans';

// Protected Route komponenta
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Вчитување...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={gymTheme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Login ruta */}
                        <Route path="/login" element={<Login />} />

                        {/* Subscription Plans (javna strana) */}
                        <Route path="/subscription-plans" element={<SubscriptionPlans />} />

                        {/* AdminDashboard (glavna strana) */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin AdminDashboard (lista na denovi) */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <DayList />
                                </ProtectedRoute>
                            }
                        />

                        {/* Video List */}
                        <Route
                            path="/videos"
                            element={
                                <ProtectedRoute>
                                    <VideoList />
                                </ProtectedRoute>
                            }
                        />

                        {/* Users */}
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute>
                                    <Users />
                                </ProtectedRoute>
                            }
                        />

                        {/* Statistics */}
                        <Route
                            path="/statistics"
                            element={
                                <ProtectedRoute>
                                    <Statistics />
                                </ProtectedRoute>
                            }
                        />

                        {/* Default redirect */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;