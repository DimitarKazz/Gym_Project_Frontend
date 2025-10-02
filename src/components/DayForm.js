// src/components/DayForm.js - SO NOVATA SVETLA TEMA
import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Close,
    FitnessCenter,
    Save
} from '@mui/icons-material';

const DayForm = ({ initialData, onSave, onCancel }) => {
    // Koristi 'title' od backend, no frontend koristi 'name' za konzistentnost
    const [title, setTitle] = useState(initialData?.title || initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [orderIndex, setOrderIndex] = useState(initialData?.orderIndex || 1);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Внесете наслов на денот');
            return;
        }

        setError('');

        // Podatoci za backend: title, description, orderIndex
        // No za frontend konzistentnost, gi cuvame kako name
        onSave({
            id: initialData?.id,
            name: title.trim(), // Frontend koristi 'name'
            description: description.trim(),
            orderIndex: orderIndex,
            videos: initialData?.videos || []
        });
    };

    return (
        <Container maxWidth="md" sx={{ p: 0 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    border: '2px solid #ff7eb9',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(255, 126, 185, 0.2)'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FitnessCenter sx={{ color: '#ff7eb9', mr: 2, fontSize: 32 }} />
                    <Typography variant="h4" sx={{ color: '#ff7eb9', fontWeight: 'bold' }}>
                        {initialData ? 'Измени Ден' : 'Додади Нов Ден'}
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Наслов на Денот *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 3 }}
                        error={!!error}
                        helperText={error}
                    />

                    <TextField
                        fullWidth
                        label="Опис"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />

                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel>
                            Редослед
                        </InputLabel>
                        <Select
                            value={orderIndex}
                            onChange={(e) => setOrderIndex(e.target.value)}
                            label="Редослед"
                        >
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {initialData && initialData.videos && initialData.videos.length > 0 && (
                        <Alert severity="info" sx={{ mb: 3 }}>
                            Овој ден има {initialData.videos.length} видеа.
                            За да управувате со видеата, користете ја опцијата "Види".
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            startIcon={<Close />}
                            sx={{
                                color: '#ff7eb9',
                                borderColor: '#ff7eb9',
                                '&:hover': {
                                    borderColor: '#ff4a97',
                                    backgroundColor: 'rgba(255, 126, 185, 0.1)'
                                }
                            }}
                        >
                            Откажи
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Save />}
                            sx={{
                                bgcolor: '#ff7eb9',
                                color: '#fff',
                                '&:hover': {
                                    bgcolor: '#ff4a97'
                                }
                            }}
                        >
                            {initialData ? 'Зачувај Промени' : 'Додади Ден'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default DayForm;