// src/components/VideoForm.js - SO NOVATA SVETLA TEMA
import React, { useState } from 'react';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Typography
} from '@mui/material';
import { Close, Save, CloudUpload } from '@mui/icons-material';

const VideoForm = ({ initialData = null, onSave, onCancel, dayId = null }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('Насловот е задолжителен');
            return;
        }

        if (!videoFile && !initialData) {
            setError('Ве молиме изберете видео фајл');
            return;
        }

        setLoading(true);
        try {
            await onSave({ title, description }, videoFile);
        } catch (err) {
            setError(err.message || 'Грешка при зачувување на видеото');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Proverka dali e video fajl
            if (!file.type.startsWith('video/')) {
                setError('Ве молиме изберете видео фајл (mp4, avi, mov, etc.)');
                return;
            }

            // Proverka za golemina na fajlot (max 100MB)
            if (file.size > 100 * 1024 * 1024) {
                setError('Видео фајлот не смее да биде поголем од 100MB');
                return;
            }

            setVideoFile(file);
            setError('');
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setError('');
        onCancel();
    };

    return (
        <>
            <DialogTitle sx={{ color: '#ff7eb9', borderBottom: '1px solid #ff7eb9' }}>
                <Typography variant="h5" fontWeight="bold">
                    {initialData ? 'Измени Видео' : 'Додади Ново Видео'}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Наслов на видеото *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    {/* File upload section */}
                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<CloudUpload />}
                            sx={{
                                color: '#ff7eb9',
                                borderColor: '#ff7eb9',
                                mb: 1,
                                '&:hover': {
                                    borderColor: '#ff4a97',
                                    backgroundColor: 'rgba(255, 126, 185, 0.1)'
                                }
                            }}
                        >
                            Избери видео фајл *
                            <input
                                type="file"
                                hidden
                                accept="video/*"
                                onChange={handleFileSelect}
                            />
                        </Button>

                        {videoFile && (
                            <Typography variant="body2" sx={{ color: '#666666' }}>
                                ✅ Избран фајл: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}

                        {initialData && !videoFile && (
                            <Typography variant="body2" sx={{ color: '#666666' }}>
                                📹 Постоечко видео: {initialData.fileName || initialData.title}
                            </Typography>
                        )}

                        <Typography variant="caption" sx={{ color: '#999999', display: 'block', mt: 1 }}>
                            Поддржани формати: MP4, AVI, MOV, WMV (макс. 100MB)
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        label="Опис на видеото"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                        placeholder="Опишете го видеото..."
                    />
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255, 126, 185, 0.3)' }}>
                <Button
                    onClick={handleClose}
                    startIcon={<Close />}
                    sx={{
                        color: '#ff7eb9',
                        borderColor: '#ff7eb9',
                    }}
                    disabled={loading}
                >
                    Откажи
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    disabled={loading || !title.trim() || (!videoFile && !initialData)}
                    sx={{
                        bgcolor: '#ff7eb9',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#ff4a97'
                        },
                        '&:disabled': {
                            bgcolor: 'rgba(255, 126, 185, 0.3)',
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }}
                >
                    {loading ? 'Зачувува...' : initialData ? 'Зачувај промени' : 'Додади Видео'}
                </Button>
            </DialogActions>
        </>
    );
};

export default VideoForm;