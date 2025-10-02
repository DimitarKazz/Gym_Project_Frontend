// src/pages/VideoList.js - SO CELA SIRINA
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Dialog,
    Snackbar
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from '@dnd-kit/sortable';
import { videoAPI, dayAPI } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import VideoForm from '../components/VideoForm';
import SortableVideoItem from '../components/SortableVideoItem';
import AdminHeader from '../components/AdminHeader';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

const VideoList = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dayId = searchParams.get('day');

    const [videos, setVideos] = useState([]);
    const [day, setDay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoDialog, setVideoDialog] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError('');

            let videosData = [];

            if (dayId) {
                console.log('📡 Fetching videos for day:', dayId);
                videosData = await videoAPI.getByDay(dayId);
                try {
                    const dayData = await dayAPI.getById(dayId);
                    setDay(dayData);
                } catch (err) {
                    console.warn('⚠️ Could not fetch day details:', err);
                }
            } else {
                console.log('📡 Fetching all videos');
                videosData = await videoAPI.getAll();
                setDay(null);
            }

            console.log('✅ Videos loaded:', videosData.length);
            setVideos(videosData);
        } catch (err) {
            console.error('❌ Error fetching videos:', err);
            setError('Грешка при вчитување на видеата: ' + (err.response?.data?.message || err.message));
            setVideos([]);
            setDay(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [dayId]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = videos.findIndex(v => v.id === active.id);
            const newIndex = videos.findIndex(v => v.id === over.id);
            const newVideos = arrayMove(videos, oldIndex, newIndex);
            setVideos(newVideos);

            try {
                const videoIds = newVideos.map(video => video.id);
                await videoAPI.admin.reorder(videoIds);
                showSnackbar('Редоследот на видеата е успешно зачуван');
            } catch (err) {
                console.error('Error saving video order:', err);
                showSnackbar('Грешка при зачувување на редоследот', 'error');
                fetchVideos();
            }
        }
    };

    const handleOpenAddVideo = () => {
        setEditingVideo(null);
        setVideoDialog(true);
    };

    const handleOpenEditVideo = (video) => {
        setEditingVideo(video);
        setVideoDialog(true);
    };

    const handleCloseVideoDialog = () => {
        setVideoDialog(false);
        setEditingVideo(null);
    };

    const handleSaveVideo = async (videoData, file = null) => {
        try {
            console.log('📤 Saving video data:', videoData);
            console.log('📁 File selected:', file ? file.name : 'No file');

            let newVideo;

            if (editingVideo) {
                console.log('🔄 Updating existing video:', editingVideo.id);
                newVideo = await videoAPI.admin.update(editingVideo.id, {
                    ...videoData,
                    day: dayId ? { id: parseInt(dayId) } : null
                });
                console.log('✅ Video updated:', newVideo);
            } else {
                if (!file) {
                    throw new Error('Ве молиме изберете видео фајл');
                }

                console.log('🆕 Creating new video with file upload');
                newVideo = await videoAPI.admin.upload(
                    file,
                    videoData.title,
                    videoData.description,
                    videos.length + 1,
                    dayId ? parseInt(dayId) : null
                );
                console.log('✅ Video created:', newVideo);
            }

            await fetchVideos();
            handleCloseVideoDialog();
            showSnackbar(editingVideo ? 'Видеото е успешно променето' : 'Видеото е успешно додадено');

        } catch (err) {
            console.error('❌ Error saving video:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Грешка при зачувување на видеото';
            throw new Error(errorMessage);
        }
    };

    const handleDeleteVideo = async (video) => {
        if (window.confirm(`Дали сте сигурни дека сакате да го избришете видеото "${video.title}"?`)) {
            try {
                await videoAPI.admin.delete(video.id);
                console.log('✅ Video deleted:', video.id);
                await fetchVideos();
                showSnackbar('Видеото е успешно избришано');
            } catch (err) {
                console.error('❌ Error deleting video:', err);
                showSnackbar('Грешка при бришење на видеото', 'error');
            }
        }
    };

    const handlePlayVideo = async (video) => {
        try {
            console.log('🎬 Playing video:', video.title);
            setSelectedVideo(video);
        } catch (err) {
            console.error('❌ Error preparing video:', err);
            showSnackbar('Грешка при вчитување на видеото', 'error');
        }
    };

    const saveVideoOrder = async () => {
        try {
            const videoIds = videos.map(video => video.id);
            await videoAPI.admin.reorder(videoIds);
            showSnackbar('Редоследот на видеата е зачуван!');
        } catch (err) {
            console.error('Error saving video order:', err);
            showSnackbar('Грешка при зачувување на редоследот', 'error');
        }
    };

    if (selectedVideo) {
        return (
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setSelectedVideo(null)}
                        startIcon={<RefreshIcon />}
                        sx={{ mb: 2, color: '#ffd700', borderColor: '#ffd700' }}
                    >
                        Назад кон видеата
                    </Button>
                    <VideoPlayer video={selectedVideo} />
                </Box>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress sx={{ color: '#ffd700' }} />
                    <Typography sx={{ color: '#ffd700', ml: 2 }}>
                        Вчитување на видеа...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4 }}>
                    <Alert
                        severity="error"
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={fetchVideos}
                                startIcon={<RefreshIcon />}
                            >
                                Обиди се повторно
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>

                <Box sx={{ px: 4 }}>
                    {/* Header so kopcinja */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography
                                variant="h3"
                                sx={{ color: '#ffd700', fontWeight: 'bold' }}
                            >
                                🎬 Фитнес Видеа
                                {day && (
                                    <Typography variant="h5" sx={{ color: '#ffed4e', mt: 1 }}>
                                        Ден: {day.title}
                                    </Typography>
                                )}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={saveVideoOrder}
                                    sx={{
                                        color: '#ffd700',
                                        borderColor: '#ffd700',
                                        '&:hover': {
                                            borderColor: '#ffed4e',
                                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                        }
                                    }}
                                >
                                    Зачувај редослед
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenAddVideo}
                                    sx={{
                                        bgcolor: '#ffd700',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        px: 3,
                                        '&:hover': {
                                            bgcolor: '#ffed4e',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Додади Видео
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    {!videos.length ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                                {dayId ? 'Нема видеа во овој ден' : 'Нема видеа во моментов'}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                                Користете го "Додади Видео" за да додадете прво видео
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleOpenAddVideo}
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: '#ffd700',
                                    color: '#000',
                                    '&:hover': {
                                        bgcolor: '#ffed4e',
                                        transform: 'translateY(-2px)',
                                    }
                                }}
                            >
                                Додади Видео
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h5" sx={{ color: '#ffd700' }}>
                                    {dayId ? `Видеа за денот (${videos.length})` : `Сите видеа (${videos.length})`}
                                </Typography>
                                <Button
                                    startIcon={<RefreshIcon />}
                                    onClick={fetchVideos}
                                    sx={{
                                        color: '#ffd700',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                        }
                                    }}
                                >
                                    Освежи
                                </Button>
                            </Box>

                            {/* Drag & Drop Video List */}
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={videos.map(v => v.id)} strategy={verticalListSortingStrategy}>
                                    {videos.map((video, index) => (
                                        <SortableVideoItem
                                            key={video.id}
                                            video={video}
                                            index={index}
                                            onPlay={handlePlayVideo}
                                            onEdit={handleOpenEditVideo}
                                            onDelete={handleDeleteVideo}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Dialog za dodavanje/edit na video */}
            <Dialog
                open={videoDialog}
                onClose={handleCloseVideoDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: '#1a1a1a',
                        border: '2px solid #ffd700',
                        borderRadius: '12px'
                    }
                }}
            >
                <VideoForm
                    initialData={editingVideo}
                    onSave={handleSaveVideo}
                    onCancel={handleCloseVideoDialog}
                    dayId={dayId}
                />
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{
                        bgcolor: snackbar.severity === 'error' ? '#d32f2f' :
                            snackbar.severity === 'warning' ? '#ed6c02' : '#2e7d32'
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default VideoList;