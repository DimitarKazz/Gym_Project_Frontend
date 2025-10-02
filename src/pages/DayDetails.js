// src/pages/DayDetails.js - SO CELA SIRINA
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
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4 }}>
                    <Typography sx={{ color: '#ffd700' }}>Вчитување...</Typography>
                </Box>
            </Box>
        );
    }

    if (!day) {
        return (
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4 }}>
                    <Typography sx={{ color: '#ffd700', mb: 2 }}>Денот не е пронајден</Typography>
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                        sx={{ color: '#ffd700', borderColor: '#ffd700' }}
                    >
                        Назад кон админ панел
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
            <Box sx={{ px: 4 }}>
                <AdminHeader />
            </Box>

            <Box sx={{ px: 4 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={handleBack} sx={{ color: '#ffd700', mr: 2 }}>
                        <ArrowBack />
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ color: '#ffd700', mb: 1 }}>
                            {day.title || day.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {day.description || 'Без опис'}
                        </Typography>
                    </Box>
                </Box>

                {/* Video List */}
                {!day.videos || day.videos.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                            Нема видеа во овој ден
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Додадете видеа преку админ панелот
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ffd700', mb: 3 }}>
                            Видеа ({day.videos.length})
                        </Typography>
                        {day.videos.map((video, index) => (
                            <Card key={video.id} sx={{ mb: 3, bgcolor: '#1a1a1a', border: '1px solid #ffd700' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Typography variant="h6" sx={{ color: '#ffd700' }}>
                                            {index + 1}. {video.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                onClick={() => handleEditVideo(video)}
                                                sx={{ color: '#ffd700' }}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteVideo(video.id)}
                                                sx={{ color: '#ff6b6b' }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    {/* Video Player */}
                                    <Box sx={{ mt: 2 }}>
                                        {video.url ? (
                                            <video
                                                controls
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '600px',
                                                    borderRadius: '8px',
                                                    backgroundColor: '#000'
                                                }}
                                            >
                                                <source src={video.url} type="video/mp4" />
                                                Вашиот прелистувач не поддржува видео елемент.
                                            </video>
                                        ) : (
                                            <Box sx={{
                                                width: '100%',
                                                maxWidth: '600px',
                                                height: '200px',
                                                backgroundColor: '#000',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#ffd700'
                                            }}>
                                                <Typography>Видеото нема URL</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DayDetails;