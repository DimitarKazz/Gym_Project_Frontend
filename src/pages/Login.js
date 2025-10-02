// src/pages/Login.js - SO NOVATA SVETLA TEMA
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Card,
    CardContent
} from '@mui/material';
import {
    FitnessCenter,
    Lock,
    Email,
    SettingsInputAntenna
} from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('admin@gym.com');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('🔐 Attempting login with:', email, password);

            const response = await authAPI.login(email, password);
            console.log('✅ Login successful:', response);

            if (response.token) {
                login({ email, role: 'ADMIN' }, response.token);
                console.log('🔑 Token saved to localStorage');
                navigate('/');
            } else {
                setError('❌ No token in response');
            }
        } catch (err) {
            console.error('❌ Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Check backend connection.');
        } finally {
            setLoading(false);
        }
    };

    const testBackendConnection = async () => {
        try {
            console.log('🔗 Testing backend connection...');
            const response = await fetch('http://localhost:8080/api/videos');
            console.log('✅ Backend response status:', response.status);

            if (response.status === 200) {
                setError('');
                alert('✅ Backend connection: OK');
            } else {
                alert('❌ Backend connection: ERROR');
            }
        } catch (error) {
            console.error('❌ Backend connection failed:', error);
            alert('❌ Backend connection FAILED');
        }
    };

    return (
        <Box sx={{
            py: 8,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            width: '100%'
        }}>
            <Box sx={{ width: '100%', maxWidth: '500px', px: 2 }}>
                <Card
                    sx={{
                        width: '100%',
                        border: '2px solid #ff7eb9',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(255, 126, 185, 0.2)'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <FitnessCenter
                                sx={{
                                    fontSize: 60,
                                    color: '#ff7eb9',
                                    mb: 2
                                }}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#ff7eb9',
                                    fontWeight: 'bold',
                                    mb: 1
                                }}
                            >
                                Фитнес Апликација
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#666666'
                                }}
                            >
                                Админ Панел
                            </Typography>
                        </Box>

                        {/* Test Connection Button */}
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<SettingsInputAntenna />}
                            onClick={testBackendConnection}
                            sx={{
                                mb: 3,
                                color: '#a5d8ff',
                                borderColor: '#a5d8ff',
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': {
                                    borderColor: '#74c0fc',
                                    backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                }
                            }}
                        >
                            Тестирај Backend Connection
                        </Button>

                        {/* Error Alert */}
                        {error && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    bgcolor: 'rgba(211, 47, 47, 0.1)',
                                    border: '1px solid #d32f2f',
                                    color: '#d32f2f'
                                }}
                            >
                                <strong>Грешка:</strong> {error}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                                InputProps={{
                                    startAdornment: <Email sx={{ color: '#ff7eb9', mr: 1 }} />,
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Лозинка"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ mb: 4 }}
                                InputProps={{
                                    startAdornment: <Lock sx={{ color: '#ff7eb9', mr: 1 }} />,
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
                                sx={{
                                    bgcolor: '#ff7eb9',
                                    color: '#fff',
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        bgcolor: '#ff4a97',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:disabled': {
                                        bgcolor: 'rgba(255, 126, 185, 0.5)',
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {loading ? '🔄 Се најавува...' : '🔐 Најави се'}
                            </Button>
                        </form>

                        {/* Footer Info */}
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#999999',
                                    display: 'block'
                                }}
                            >
                                <strong>Отвори Console (F12)</strong> за да ги видиш деталите за комуникацијата
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#cccccc',
                                    display: 'block',
                                    mt: 1
                                }}
                            >
                                Default credentials: admin@gym.com / admin123
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Login;