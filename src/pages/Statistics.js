// src/pages/Statistics.js - SO ADMIN HEADER
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    CardContent
} from '@mui/material';
import { Analytics } from '@mui/icons-material';
import AdminHeader from '../components/AdminHeader'; // DODADENO

const Statistics = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
            {/* ADMIN HEADER - PRVO VO KONTEJNEROT */}
            <AdminHeader />

            {/* Potoa ostanatiot kod */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Analytics sx={{ color: '#2196f3', fontSize: 40, mr: 2 }} />
                <Box>
                    <Typography variant="h4" sx={{ color: '#2196f3', mb: 1 }}>
                        Статистики
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Преглед на статистики и анализи
                    </Typography>
                </Box>
            </Box>

            {/* Placeholder Content */}
            <Card sx={{ bgcolor: '#1a1a1a', border: '2px solid #2196f3', p: 4, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ color: '#2196f3', mb: 3 }}>
                        📊 Во развој
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
                        Оваа функција моментално е во развој и ќе биде достапна наскоро.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            bgcolor: '#2196f3',
                            color: '#000',
                            fontWeight: 'bold',
                            px: 4
                        }}
                    >
                        Назад кон Dashboard
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Statistics;