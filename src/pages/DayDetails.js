// src/pages/DayDetails.js - SO CELA SIRINA BEZ BELI PRAVOAGOLNICI
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { dayAPI, videoAPI } from '../services/api';
import AdminHeader from '../components/AdminHeader';

const DayDetails = () => {
    const { dayId } = useParams();
    const navigate = useNavigate();
    const [day, setDay] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔄 DayDetails mounted with dayId:', dayId);
        fetchDayDetails();
    }, [dayId]);

    const fetchDayDetails = async () => {
        setLoading(true);
        try {
            console.log('📡 Fetching day details for ID:', dayId);
            const dayData = await dayAPI.getById(dayId);
            console.log('✅ Day details received:', dayData);
            setDay(dayData);
        } catch (err) {
            console.error('❌ Error fetching day details:', err);
            const mockDay = {
                id: dayId,
                title: `Ден ${dayId}`,
                description: 'Опис на денот',
                videos: []
            };
            setDay(mockDay);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        console.log('🔙 Navigating back to admin');
        navigate('/admin');
    };

    const handleEditVideo = async (video) => {
        console.log('✏️ Editing video:', video.title);
        const newTitle = prompt('Внесете нов наслов за видеото:', video.title);
        if (newTitle && newTitle !== video.title) {
            try {
                await videoAPI.update(video.id, { ...video, title: newTitle });
                console.log('✅ Video updated successfully');
                fetchDayDetails();
            } catch (err) {
                console.error('❌ Error updating video:', err);
                alert('Грешка при промена на видеото');
            }
        }
    };

    const handleDeleteVideo = async (videoId) => {
        console.log('🗑️ Deleting video ID:', videoId);
        if (window.confirm('Дали сте сигурни дека сакате да го избришете видеото?')) {
            try {
                await videoAPI.delete(videoId);
                console.log('✅ Video deleted successfully');
                fetchDayDetails();
            } catch (err) {
                console.error('❌ Error deleting video:', err);
                alert('Грешка при бришење на видеото');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 0 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 0 }}>
                    <Typography sx={{ color: '#ff7eb9' }}>Вчитување...</Typography>
                </Box>
            </Box>
        );
    }

    if (!day) {
        return (
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 0 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 0 }}>
                    <Typography sx={{ color: '#ff7eb9', mb: 2 }}>Денот не е пронајден</Typography>
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                        sx={{
                            color: '#ff7eb9',
                            borderColor: '#ff7eb9',
                            '&:hover': {
                                borderColor: '#ff4a97',
                                backgroundColor: 'rgba(255, 126, 185, 0.1)',
                            }
                        }}
                    >
                        Назад кон админ панел
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, minHeight: '100vh', width: '100%' }}>
            <Box sx={{ px: 0 }}>
                <AdminHeader />
            </Box>

            <Box sx={{ px: 0 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 4 }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: '#ff7eb9',
                            mr: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 126, 185, 0.1)',
                            }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ color: '#ff7eb9', mb: 1, fontWeight: 'bold' }}>
                            {day.title || day.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666666' }}>
                            {day.description || 'Без опис'}
                        </Typography>
                    </Box>
                </Box>

                {/* Video List */}
                {!day.videos || day.videos.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8, px: 4 }}>
                        <Typography variant="h6" sx={{ color: '#ff7eb9', mb: 2, fontWeight: 'bold' }}>
                            Нема видеа во овој ден
                        </Typography>
                        <Typography sx={{ color: '#666666' }}>
                            Додадете видеа преку админ панелот
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ff7eb9', mb: 3, fontWeight: 'bold', px: 4 }}>
                            🎬 Видеа ({day.videos.length})
                        </Typography>
                        {day.videos.map((video, index) => (
                            <Box key={video.id} sx={{ mb: 3 }}>
                                {/* Video Container - CELA SIRINA BEZ PADDING */}
                                <Box sx={{
                                    width: '100%',
                                    backgroundColor: '#f5f5f5',
                                    borderTop: '2px solid #ff7eb9',
                                    borderBottom: '2px solid #ff7eb9',
                                    py: 3
                                }}>
                                    {/* Video Info - SO PADDING */}
                                    <Box sx={{ px: 4, mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Typography variant="h6" sx={{ color: '#ff7eb9', fontWeight: 'bold' }}>
                                                {index + 1}. {video.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    onClick={() => handleEditVideo(video)}
                                                    sx={{
                                                        color: '#a5d8ff',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                                        }
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteVideo(video.id)}
                                                    sx={{
                                                        color: '#ff6b6b',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                                        }
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Video Player - CELA SIRINA BEZ PADDING */}
                                    <Box>
                                        {video.url ? (
                                            <video
                                                controls
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block'
                                                }}
                                            >
                                                <source src={video.url} type="video/mp4" />
                                                Вашиот прелистувач не поддржува видео елемент.
                                            </video>
                                        ) : (
                                            <Box sx={{
                                                width: '100%',
                                                height: '300px',
                                                backgroundColor: '#e0e0e0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#ff7eb9',
                                            }}>
                                                <Typography variant="h6">Видеото нема URL</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DayDetails;