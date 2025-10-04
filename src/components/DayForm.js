// src/components/DayForm.js - POPRAVEN ZA RESETIRANJE NA POLINJA
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [orderIndex, setOrderIndex] = useState(1);
    const [error, setError] = useState('');

    // Reset form when initialData changes
    useEffect(() => {
        if (initialData) {
            // Ако има initialData, пополни ги полињата со постоечките податоци
            setTitle(initialData.title || initialData.name || '');
            setDescription(initialData.description || '');
            setOrderIndex(initialData.orderIndex || 1);
        } else {
            // Ако нема initialData (нов ден), ресетирај ги полињата
            setTitle('');
            setDescription('');
            setOrderIndex(1);
        }
        setError('');
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Внесете наслов на денот');
            return;
        }

        setError('');

        onSave({
            id: initialData?.id,
            name: title.trim(),
            description: description.trim(),
            orderIndex: orderIndex,
            videos: initialData?.videos || []
        });
    };

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(255, 126, 185, 0.2)',
                    border: '2px solid #ff7eb9'
                }
            }}
        >
            <DialogTitle sx={{
                bgcolor: '#ff7eb9',
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <FitnessCenter />
                    {initialData ? '✏️ Промени Ден' : '🏋️‍♂️ Додади Нов Ден'}
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#ff7eb9', mb: 2, fontWeight: 'bold' }}>
                            📝 Основни информации
                        </Typography>

                        <TextField
                            fullWidth
                            label="Наслов на Денот *"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={!!error}
                            placeholder="Внесете наслов на денот..."
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Опис на денот"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                            placeholder="Опишете ги вежбите или целите за овој ден..."
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>🔢 Редослед на денот</InputLabel>
                            <Select
                                value={orderIndex}
                                onChange={(e) => setOrderIndex(e.target.value)}
                                label="🔢 Редослед на денот"
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                    <MenuItem key={num} value={num}>
                                        Ден {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {initialData && initialData.videos && initialData.videos.length > 0 && (
                        <Alert severity="info" sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                🎬 Информација за видеа
                            </Typography>
                            Овој ден има {initialData.videos.length} видеа.
                            За да управувате со видеата, користете ја опцијата "Види" на картата на денот.
                        </Alert>
                    )}

                    {/* Summary */}
                    <Box sx={{
                        p: 2,
                        backgroundColor: 'rgba(165, 216, 255, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(165, 216, 255, 0.3)'
                    }}>
                        <Typography variant="subtitle2" sx={{ color: '#a5d8ff', mb: 1, fontWeight: 'bold' }}>
                            📋 Резиме
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                            <strong>Наслов:</strong> {title || 'Не внесено'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                            <strong>Редослед:</strong> Ден {orderIndex}
                        </Typography>
                        {description && (
                            <Typography variant="body2" sx={{ color: '#666666', mt: 1 }}>
                                <strong>Опис:</strong> {description.length > 50 ? `${description.substring(0, 50)}...` : description}
                            </Typography>
                        )}
                    </Box>
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    startIcon={<Close />}
                    sx={{
                        color: '#ff6b6b',
                        borderColor: '#ff6b6b',
                        fontWeight: 'bold',
                        px: 3,
                        '&:hover': {
                            borderColor: '#ff5252',
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        }
                    }}
                >
                    Откажи
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    startIcon={<Save />}
                    sx={{
                        bgcolor: '#ff7eb9',
                        color: '#fff',
                        fontWeight: 'bold',
                        px: 4,
                        '&:hover': {
                            bgcolor: '#ff4a97'
                        }
                    }}
                >
                    {initialData ? '💾 Зачувај промени' : '🚀 Додади ден'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DayForm;