// src/components/AdminHeader.js - NOVA KOMPONENTA ZA SITE STRANI
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                border: '1px solid #ffd700'
            }}
        >
            <Button
                variant="outlined"
                startIcon={<Dashboard />}
                onClick={handleAdminPanel}
                sx={{
                    color: '#ffd700',
                    borderColor: '#ffd700',
                    fontWeight: 'bold',
                    '&:hover': {
                        borderColor: '#ffed4e',
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
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
                    color: '#4caf50',
                    borderColor: '#4caf50',
                    fontWeight: 'bold',
                    '&:hover': {
                        borderColor: '#66bb6a',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
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