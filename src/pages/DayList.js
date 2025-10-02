// src/pages/DayList.js - SO CELA SIRINA I POUBAV DIZAJN
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Dialog, Snackbar, Alert
} from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableDay from '../components/SortableDay';
import DayForm from '../components/DayForm';
import AdminHeader from '../components/AdminHeader';
import { dayAPI } from '../services/api';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const SortableDayWrapper = ({ day, onView, onEdit, onDelete }) => {
    const {
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: day.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <SortableDay
                day={day}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    );
};

const DayList = () => {
    const navigate = useNavigate();
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addDayDialog, setAddDayDialog] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchDays();
    }, []);

    const fetchDays = async () => {
        setLoading(true);
        try {
            const data = await dayAPI.admin.getAll();
            setDays(data);
        } catch (err) {
            console.error('Error fetching days:', err);
            showSnackbar('Грешка при вчитување на деновите', 'error');
            setDays([]);
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = days.findIndex(d => d.id === active.id);
            const newIndex = days.findIndex(d => d.id === over.id);
            const newDays = arrayMove(days, oldIndex, newIndex);
            setDays(newDays);

            try {
                const dayIds = newDays.map(day => day.id);
                await dayAPI.admin.reorder(dayIds);
                showSnackbar('Редоследот е успешно зачуван');
            } catch (err) {
                console.error('Error saving order:', err);
                showSnackbar('Грешка при зачувување на редоследот', 'error');
            }
        }
    };

    const handleAddDay = () => {
        setSelectedDay(null);
        setAddDayDialog(true);
    };

    const handleCloseDialog = () => {
        setAddDayDialog(false);
        setSelectedDay(null);
    };

    const handleSaveDay = async (dayData) => {
        try {
            const dataToSend = {
                title: dayData.name,
                description: dayData.description || '',
                orderIndex: dayData.orderIndex || 1
            };

            if (dayData.id) {
                const updatedDay = await dayAPI.admin.update(dayData.id, dataToSend);
                setDays(prev => prev.map(day => day.id === dayData.id ? updatedDay : day));
                showSnackbar('Денот е успешно променет');
            } else {
                const newDay = await dayAPI.admin.create(dataToSend);
                setDays(prev => [...prev, newDay]);
                showSnackbar('Денот е успешно додаден');
            }
            handleCloseDialog();
        } catch (err) {
            console.error('Error saving day:', err);
            showSnackbar('Грешка при зачувување на денот', 'error');
        }
    };

    const handleDeleteDay = async (day) => {
        if (window.confirm(`Дали сте сигурни дека сакате да го избришете денот "${day.title}"?`)) {
            try {
                await dayAPI.admin.delete(day.id);
                setDays(prev => prev.filter(d => d.id !== day.id));
                showSnackbar('Денот е успешно избришан');
            } catch (err) {
                console.error('Error deleting day:', err);
                showSnackbar('Грешка при бришење на денот', 'error');
            }
        }
    };

    const handleEditDay = (day) => {
        setSelectedDay(day);
        setAddDayDialog(true);
    };

    const handleViewDay = (day) => {
        navigate(`/videos?day=${day.id}`);
    };

    const saveOrder = async () => {
        try {
            const dayIds = days.map(day => day.id);
            await dayAPI.admin.reorder(dayIds);
            showSnackbar('Редоследот е зачуван!');
        } catch (err) {
            console.error('Error saving order:', err);
            showSnackbar('Грешка при зачувување на редоследот', 'error');
        }
    };

    if (loading) {
        return (
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{ px: 4 }}>
                    <Typography sx={{ color: '#ff7eb9' }}>Вчитување...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>

                <Box sx={{ px: 4 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h3" sx={{ color: '#ff7eb9', fontWeight: 'bold' }}>
                            📅 Листа на Денови
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={saveOrder}
                                startIcon={<SaveIcon />}
                                sx={{
                                    color: '#a5d8ff',
                                    borderColor: '#a5d8ff',
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1.5,
                                    '&:hover': {
                                        borderColor: '#74c0fc',
                                        backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                    }
                                }}
                            >
                                Зачувај редослед
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleAddDay}
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: '#ff7eb9',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: '#ff4a97',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Додај ден
                            </Button>
                        </Box>
                    </Box>

                    {/* Days List */}
                    {days.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center',
                            py: 12,
                            border: '2px dashed #ff7eb9',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(255, 126, 185, 0.05)'
                        }}>
                            <Typography variant="h4" sx={{ color: '#ff7eb9', mb: 2, fontWeight: 'bold' }}>
                                🏋️‍♂️ Нема денови
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#666666', mb: 4 }}>
                                Додајте прв ден за да започнете со вашата фитнес програма
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleAddDay}
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: '#ff7eb9',
                                    color: '#fff',
                                    fontSize: '18px',
                                    px: 4,
                                    py: 2,
                                    '&:hover': {
                                        bgcolor: '#ff4a97',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(255, 126, 185, 0.3)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Додај прв ден
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                                p: 3,
                                backgroundColor: 'rgba(255, 126, 185, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 126, 185, 0.2)'
                            }}>
                                <Typography variant="h5" sx={{ color: '#ff7eb9', fontWeight: 'bold' }}>
                                    Вкупно денови: {days.length}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666666' }}>
                                    Влечете и спуштајте за да го промените редоследот
                                </Typography>
                            </Box>

                            {/* Drag & Drop Days List */}
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={days.map(d => d.id)} strategy={verticalListSortingStrategy}>
                                    {days.map(day => (
                                        <SortableDayWrapper
                                            key={day.id}
                                            day={day}
                                            onView={handleViewDay}
                                            onEdit={handleEditDay}
                                            onDelete={handleDeleteDay}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>

                            {/* Stats Footer */}
                            <Box sx={{
                                mt: 4,
                                p: 3,
                                backgroundColor: 'rgba(165, 216, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(165, 216, 255, 0.2)',
                                textAlign: 'center'
                            }}>
                                <Typography variant="h6" sx={{ color: '#a5d8ff', mb: 1, fontWeight: 'bold' }}>
                                    📊 Статистика
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666666' }}>
                                    Вкупно видеа: {days.reduce((total, day) => total + (day.videos?.length || 0), 0)} |
                                    Просечно видеа по ден: {(days.reduce((total, day) => total + (day.videos?.length || 0), 0) / days.length).toFixed(1)}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Dialog
                    open={addDayDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(255, 126, 185, 0.2)'
                        }
                    }}
                >
                    <DayForm
                        initialData={selectedDay}
                        onSave={handleSaveDay}
                        onCancel={handleCloseDialog}
                    />
                </Dialog>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default DayList;