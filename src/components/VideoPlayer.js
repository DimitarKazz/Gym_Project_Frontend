// src/components/VideoPlayer.js - SAMO LOKALNI VIDEO
import React from 'react';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';

const VideoPlayer = ({ video }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    // Za lokalni videа, koristi direkt URL do backend-ot
    const getVideoSource = () => {
        if (video?.id) {
            return `http://localhost:8080/api/videos/file/${video.id}`;
        }
        if (video?.url && video.url.includes('/api/videos/file/')) {
            return video.url;
        }
        return null;
    };

    const videoSource = getVideoSource();

    console.log('🎬 VideoPlayer debug:', {
        videoTitle: video?.title,
        videoId: video?.id,
        videoSource,
        videoUrl: video?.url
    });

    const handleVideoLoad = () => {
        setLoading(false);
        setError('');
    };

    const handleVideoError = () => {
        setLoading(false);
        setError('Грешка при вчитување на видеото');
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 2, bgcolor: '#1a1a1a', border: '2px solid #ffd700' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#ffd700', textAlign: 'center' }}>
                {video?.title || 'Видео'}
            </Typography>

            {video?.description && (
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, textAlign: 'center' }}>
                    {video.description}
                </Typography>
            )}

            <Box sx={{
                width: '100%',
                height: { xs: 300, md: 500 },
                backgroundColor: '#000',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {loading && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000'
                    }}>
                        <CircularProgress sx={{ color: '#ffd700' }} />
                        <Typography sx={{ color: '#ffd700', ml: 2 }}>
                            Вчитување на видео...
                        </Typography>
                    </Box>
                )}

                {error && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000'
                    }}>
                        <Alert severity="error" sx={{ width: '80%' }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {videoSource ? (
                    <video
                        controls
                        style={{
                            width: '100%',
                            height: '100%',
                            display: loading ? 'none' : 'block'
                        }}
                        title={video.title}
                        onLoadedData={handleVideoLoad}
                        onError={handleVideoError}
                        preload="metadata"
                    >
                        <source src={videoSource} type="video/mp4" />
                        <source src={videoSource} type="video/avi" />
                        <source src={videoSource} type="video/mov" />
                        <source src={videoSource} type="video/wmv" />
                        Вашиот прелистувач не поддржува видео елемент.
                    </video>
                ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%" color="white">
                        <Alert severity="warning">
                            Видеото не е достапно
                        </Alert>
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    📹 Локално Видео
                </Typography>

                {video?.fileName && (
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Фајл: {video.fileName}
                    </Typography>
                )}

                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {video?.day ? `Ден ${video.day.orderIndex}` : 'Сите денови'}
                </Typography>
            </Box>
        </Paper>
    );
};

export default VideoPlayer;