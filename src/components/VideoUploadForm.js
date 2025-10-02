// src/components/VideoUploadForm.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Paper,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import { videoAPI } from '../services/api';

const VideoUploadForm = ({ dayId, onUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return setError('Насловот е задолжителен');
        if (!file) return setError('Ве молиме изберете видео фајл');

        setLoading(true);
        setError('');
        try {
            // Koristete admin upload endpoint
            const newVideo = await videoAPI.admin.upload(file, title, description, 1, dayId);
            setTitle('');
            setDescription('');
            setFile(null);
            onUploadSuccess(newVideo);
        } catch (err) {
            setError(err.message || 'Грешка при прикачување');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#1a1a1a', border: '1px solid #ffd700' }}>
            <Typography variant="h6" mb={2} sx={{ color: '#ffd700' }}>
                Додади Видео
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Наслов"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        sx: { color: 'white', bgcolor: '#2a2a2a' }
                    }}
                    InputLabelProps={{
                        sx: { color: 'rgba(255,255,255,0.7)' }
                    }}
                />
                <TextField
                    fullWidth
                    label="Опис"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        sx: { color: 'white', bgcolor: '#2a2a2a' }
                    }}
                    InputLabelProps={{
                        sx: { color: 'rgba(255,255,255,0.7)' }
                    }}
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        mb: 2,
                        color: '#ffd700',
                        borderColor: '#ffd700',
                        '&:hover': {
                            borderColor: '#ffed4e'
                        }
                    }}
                >
                    Избери Видео
                    <input
                        type="file"
                        hidden
                        accept="video/*"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </Button>
                {file && (
                    <Typography variant="body2" mb={2} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Избран фајл: {file.name}
                    </Typography>
                )}
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            bgcolor: '#ffd700',
                            color: '#000',
                            '&:hover': {
                                bgcolor: '#ffed4e'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={20} /> : 'Прикачи'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default VideoUploadForm;