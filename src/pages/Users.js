// src/pages/Users.js - SO NOVATA SVETLA TEMA
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
import { People } from '@mui/icons-material';
import AdminHeader from '../components/AdminHeader';

const Users = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 4, minHeight: '100vh' }}>
            <AdminHeader />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <People sx={{ color: '#a5d8ff', fontSize: 40, mr: 2 }} />
                <Box>
                    <Typography variant="h4" sx={{ color: '#a5d8ff', mb: 1, fontWeight: 'bold' }}>
                        👥 Корисници
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666' }}>
                        Управувај со корисници и нивните претплати
                    </Typography>
                </Box>
            </Box>

            {/* Placeholder Content */}
            <Card sx={{ border: '2px solid #a5d8ff', p: 4, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ color: '#a5d8ff', mb: 3, fontWeight: 'bold' }}>
                        👥 Во развој
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666', mb: 3 }}>
                        Оваа функција моментално е во развој и ќе биде достапна наскоро.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            bgcolor: '#a5d8ff',
                            color: '#2b2b2b',
                            fontWeight: 'bold',
                            px: 4,
                            '&:hover': {
                                bgcolor: '#74c0fc',
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

export default Users;