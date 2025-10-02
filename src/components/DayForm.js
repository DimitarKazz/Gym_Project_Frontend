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
                    bgcolor: '#1a1a1a',
                    border: '2px solid #ffd700',
                    borderRadius: 3
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FitnessCenter sx={{ color: '#ffd700', mr: 2, fontSize: 32 }} />
                    <Typography variant="h4" sx={{ color: '#ffd700' }}>
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
                        InputProps={{
                            sx: {
                                color: 'white',
                                bgcolor: '#2a2a2a',
                                borderRadius: 1
                            }
                        }}
                        InputLabelProps={{
                            sx: { color: 'rgba(255,255,255,0.7)' }
                        }}
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
                        InputProps={{
                            sx: {
                                color: 'white',
                                bgcolor: '#2a2a2a',
                                borderRadius: 1
                            }
                        }}
                        InputLabelProps={{
                            sx: { color: 'rgba(255,255,255,0.7)' }
                        }}
                    />

                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Редослед
                        </InputLabel>
                        <Select
                            value={orderIndex}
                            onChange={(e) => setOrderIndex(e.target.value)}
                            sx={{
                                color: 'white',
                                bgcolor: '#2a2a2a',
                                '& .MuiSelect-icon': { color: '#ffd700' }
                            }}
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
                                color: '#ffd700',
                                borderColor: '#ffd700',
                                '&:hover': {
                                    borderColor: '#ffed4e',
                                    bgcolor: 'rgba(255, 215, 0, 0.1)'
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
                                bgcolor: '#ffd700',
                                color: '#000',
                                '&:hover': {
                                    bgcolor: '#ffed4e'
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