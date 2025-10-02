import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
    IconButton
} from '@mui/material';
import { ArrowBack, PlayArrow, Delete, Edit } from '@mui/icons-material';

const DayVideoList = ({ day, onBack, updateDayVideos }) => {
    const [videos, setVideos] = useState(day?.videos || []);

    const handleDeleteVideo = (videoId) => {
        if (window.confirm('Дали сте сигурни дека сакате да го избришете видеото?')) {
            const newVideos = videos.filter(v => v.id !== videoId);
            setVideos(newVideos);
            if (updateDayVideos) {
                updateDayVideos(newVideos);
            }
        }
    };

    const handleEditVideo = (video) => {
        const newTitle = prompt('Внесете нов наслов за видеото:', video.title);
        if (newTitle && newTitle !== video.title) {
            const newVideos = videos.map(v =>
                v.id === video.id ? { ...v, title: newTitle } : v
            );
            setVideos(newVideos);
            if (updateDayVideos) {
                updateDayVideos(newVideos);
            }
        }
    };

    if (!day) {
        return (
            <Container sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
                <Typography sx={{ color: '#ffd700' }}>Нема податоци за денот</Typography>
                <Button onClick={onBack} startIcon={<ArrowBack />} sx={{ mt: 2, color: '#ffd700' }}>
                    Назад
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton onClick={onBack} sx={{ color: '#ffd700', mr: 2 }}>
                    <ArrowBack />
                </IconButton>
                <Box>
                    <Typography variant="h4" sx={{ color: '#ffd700', mb: 1 }}>
                        {day.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {day.description || 'Без опис'}
                    </Typography>
                </Box>
            </Box>

            {/* Video List */}
            {videos.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                        Нема видеа во овој ден
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Додадете видеа преку "Промени" во админ панелот
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h5" sx={{ color: '#ffd700', mb: 3 }}>
                        Видеа ({videos.length})
                    </Typography>
                    {videos.map((video, index) => (
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
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default DayVideoList;