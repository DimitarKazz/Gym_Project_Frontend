// src/pages/Statistics.js - SO NOVATA SVETLA TEMA
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
import AdminHeader from '../components/AdminHeader';

const Statistics = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 4, minHeight: '100vh' }}>
            <AdminHeader />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Analytics sx={{ color: '#c8f0cc', fontSize: 40, mr: 2 }} />
                <Box>
                    <Typography variant="h4" sx={{ color: '#c8f0cc', mb: 1, fontWeight: 'bold' }}>
                        📊 Статистики
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666' }}>
                        Преглед на статистики и анализи
                    </Typography>
                </Box>
            </Box>

            {/* Placeholder Content */}
            <Card sx={{ border: '2px solid #c8f0cc', p: 4, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ color: '#c8f0cc', mb: 3, fontWeight: 'bold' }}>
                        📊 Во развој
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666', mb: 3 }}>
                        Оваа функција моментално е во развој и ќе биде достапна наскоро.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            bgcolor: '#c8f0cc',
                            color: '#2b2b2b',
                            fontWeight: 'bold',
                            px: 4,
                            '&:hover': {
                                bgcolor: '#a8e6af',
                            }
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