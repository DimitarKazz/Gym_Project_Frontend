// src/App.js - POPRAVENO
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { gymTheme } from './styles/Theme';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import на сите компоненти
import ProgramDays from './pages/ProgramDays';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DayList from './pages/DayList';
import ProgramList from './pages/ProgramList'; // 👈 ДОДАДЕН IMPORT
import VideoList from './pages/VideoList';
import Users from './pages/Users';
import Statistics from './pages/Statistics';
import SubscriptionPlans from './pages/SubscriptionPlans';

// Protected Route компонента
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
                        {/* Login рута */}
                        <Route path="/login" element={<Login />} />

                        {/* Subscription Plans (јавна страна) */}
                        <Route path="/subscription-plans" element={<SubscriptionPlans />} />

                        {/* AdminDashboard (главна страна) */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin DayList (листа на денови) */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <DayList />
                                </ProtectedRoute>
                            }
                        />

                        {/* 👈 ДОДАДЕНА РУТА ЗА ПРОГРАМИ */}
                        <Route
                            path="/admin/programs"
                            element={
                                <ProtectedRoute>
                                    <ProgramList />
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
                        <Route
                            path="/admin/programs/:programId/days"
                            element={
                                <ProtectedRoute>
                                    <ProgramDays />
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