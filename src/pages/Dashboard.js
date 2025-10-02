// src/pages/Dashboard.js - POPRAVENO SO CELA SIRINA
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button
} from '@mui/material';
import {
    FitnessCenter,
    People,
    Analytics,
    ArrowForward
} from '@mui/icons-material';
import AdminHeader from '../components/AdminHeader';

const Dashboard = () => {
    const navigate = useNavigate();

    const dashboardItems = [
        {
            id: 1,
            title: 'Денови',
            description: 'Управувај со денови и нивните видеа',
            icon: <FitnessCenter sx={{ fontSize: 60, color: '#ffd700' }} />,
            path: '/admin',
            color: '#ffd700'
        },
        {
            id: 2,
            title: 'Корисници',
            description: 'Управувај со корисници и нивните претплати',
            icon: <People sx={{ fontSize: 60, color: '#4caf50' }} />,
            path: '/users',
            color: '#4caf50'
        },
        {
            id: 3,
            title: 'Статистики',
            description: 'Преглед на статистики и анализи',
            icon: <Analytics sx={{ fontSize: 60, color: '#2196f3' }} />,
            path: '/statistics',
            color: '#2196f3'
        }
    ];

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
            {/* ADMIN HEADER */}
            <Box sx={{ px: 4 }}>
                <AdminHeader />
            </Box>

            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6, px: 4 }}>
                <Typography variant="h3" sx={{ color: '#ffd700', mb: 2, fontWeight: 'bold' }}>
                    🏋️ Админ Панел
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Управувај со фитнес апликацијата
                </Typography>
            </Box>

            {/* Dashboard Grid */}
            <Box sx={{ px: 4 }}>
                <Grid container spacing={4} justifyContent="center">
                    {dashboardItems.map((item) => (
                        <Grid item xs={12} md={4} key={item.id}>
                            <Card
                                onClick={() => handleCardClick(item.path)}
                                sx={{
                                    bgcolor: '#1a1a1a',
                                    border: `2px solid ${item.color}`,
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    height: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 35px ${item.color}40`,
                                        border: `2px solid ${item.color}`,
                                        '& .hover-effect': {
                                            opacity: 1,
                                            transform: 'scale(1)',
                                        },
                                        '& .action-button': {
                                            transform: 'translateY(0)',
                                            opacity: 1,
                                        }
                                    }
                                }}
                            >
                                {/* Hover Background Effect */}
                                <Box
                                    className="hover-effect"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: `linear-gradient(135deg, ${item.color}15 0%, transparent 50%)`,
                                        opacity: 0,
                                        transform: 'scale(0.8)',
                                        transition: 'all 0.3s ease',
                                        zIndex: 1
                                    }}
                                />

                                <CardContent sx={{
                                    p: 4,
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    {/* Icon */}
                                    <Box
                                        sx={{
                                            mb: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            }
                                        }}
                                    >
                                        {item.icon}
                                    </Box>

                                    {/* Title */}
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: item.color,
                                            mb: 2,
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                textShadow: `0 0 20px ${item.color}`
                                            }
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255,255,255,0.8)',
                                            mb: 3,
                                            flex: 1,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    {/* Action Button */}
                                    <Button
                                        className="action-button"
                                        variant="contained"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            bgcolor: item.color,
                                            color: '#000',
                                            fontWeight: 'bold',
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: '12px',
                                            transform: 'translateY(10px)',
                                            opacity: 0.9,
                                            transition: 'all 0.3s ease 0.1s',
                                            '&:hover': {
                                                bgcolor: `${item.color}dd`,
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 6px 20px ${item.color}60`,
                                            },
                                        }}
                                    >
                                        Отвори
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Footer Info */}
            <Box sx={{ textAlign: 'center', mt: 6, px: 4 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    Изберете една од опциите за да продолжите
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;