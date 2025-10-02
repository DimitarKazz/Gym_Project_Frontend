// src/components/AdminHeader.js - SO NOVATA SVETLA TEMA
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Box,
    Button
} from '@mui/material';
import {
    Dashboard,
    FitnessCenter,
    Logout
} from '@mui/icons-material';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/subscription-plans');
    };

    const handleAdminPanel = () => {
        navigate('/');
    };

    const handleDenovi = () => {
        navigate('/admin');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                mb: 4,
                p: 2,
                backgroundColor: 'rgba(255, 126, 185, 0.1)',
                borderRadius: '12px',
                border: '2px solid #ff7eb9'
            }}
        >
            <Button
                variant="outlined"
                startIcon={<Dashboard />}
                onClick={handleAdminPanel}
                sx={{
                    color: '#ff7eb9',
                    borderColor: '#ff7eb9',
                    fontWeight: 'bold',
                    '&:hover': {
                        borderColor: '#ff4a97',
                        backgroundColor: 'rgba(255, 126, 185, 0.1)',
                    }
                }}
            >
                Админ Панел
            </Button>

            <Button
                variant="outlined"
                startIcon={<FitnessCenter />}
                onClick={handleDenovi}
                sx={{
                    color: '#a5d8ff',
                    borderColor: '#a5d8ff',
                    fontWeight: 'bold',
                    '&:hover': {
                        borderColor: '#74c0fc',
                        backgroundColor: 'rgba(165, 216, 255, 0.1)',
                    }
                }}
            >
                Денови
            </Button>

            <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                    color: '#ff6b6b',
                    borderColor: '#ff6b6b',
                    fontWeight: 'bold',
                    '&:hover': {
                        borderColor: '#ff5252',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    }
                }}
            >
                Одјави се
            </Button>
        </Box>
    );
};

export default AdminHeader;