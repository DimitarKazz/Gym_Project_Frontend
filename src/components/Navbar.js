// components/Navbar.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Navbar = () => {
    const { isAuthenticated, isAdmin, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/subscriptions');
    };

    // Не прикажувај navbar ако корисникот не е најавен
    if (!isAuthenticated) {
        return null;
    }

    return (
        <AppBar position="static" elevation={4}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <FitnessCenterIcon sx={{ mr: 1 }} />
                    GYM POWER
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="primary.main">
                        Здраво, {user?.email}
                    </Typography>

                    {isAdmin && (
                        <Button
                            component={Link}
                            to="/admin"
                            color="primary"
                            variant="outlined"
                            sx={{
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                '&:hover': {
                                    borderColor: 'primary.light',
                                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                },
                            }}
                        >
                            👑 Админ Панел
                        </Button>
                    )}

                    <Button
                        onClick={handleLogout}
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        🔓 Одјави се
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;