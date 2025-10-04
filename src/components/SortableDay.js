// src/components/SortableDay.js - POPRAVEN SO AKCII
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Chip
} from '@mui/material';
import {
    DragIndicator,
    Visibility,
    Edit,
    Delete
} from '@mui/icons-material';

const SortableDay = ({ day, onView, onEdit, onDelete }) => {
    return (
        <Card sx={{
            mb: 2,
            border: '2px solid #ff7eb9',
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 126, 185, 0.3)',
                borderColor: '#ff4a97'
            }
        }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {/* Drag Handle */}
                    <IconButton
                        sx={{
                            color: '#ff7eb9',
                            cursor: 'grab',
                            mt: 0.5,
                            '&:active': { cursor: 'grabbing' },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 126, 185, 0.1)'
                            }
                        }}
                    >
                        <DragIndicator />
                    </IconButton>

                    {/* Day Info */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{
                            color: '#ff7eb9',
                            fontWeight: 'bold',
                            mb: 1,
                            textShadow: '0 2px 4px rgba(255, 126, 185, 0.2)'
                        }}>
                            📅 {day.title || day.name}
                        </Typography>

                        <Typography variant="body1" sx={{
                            color: '#666666',
                            mb: 2,
                            lineHeight: 1.6
                        }}>
                            {day.description || 'Нема опис'}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={`Ден ${day.orderIndex}`}
                                sx={{
                                    bgcolor: '#a5d8ff',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Chip
                                label={`${day.videos?.length || 0} видеа`}
                                sx={{
                                    bgcolor: '#c8f0cc',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                        {/* Види копче - за видеа */}
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onView(day);
                            }}
                            sx={{
                                color: '#c8f0cc',
                                '&:hover': {
                                    backgroundColor: 'rgba(200, 240, 204, 0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                            title="Види видеа"
                        >
                            <Visibility />
                        </IconButton>

                        {/* Промени копче */}
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(day);
                            }}
                            sx={{
                                color: '#a5d8ff',
                                '&:hover': {
                                    backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                            title="Промени ден"
                        >
                            <Edit />
                        </IconButton>

                        {/* Избриши копче */}
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(day);
                            }}
                            sx={{
                                color: '#ff6b6b',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                            title="Избриши ден"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SortableDay;