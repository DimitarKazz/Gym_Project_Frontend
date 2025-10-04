// src/pages/DayList.js - POPRAVEN BEZ DUPLI DIALOG
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Snackbar, Alert
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
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: day.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
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
                showSnackbar('Денот е успешно променет 🎉');
            } else {
                const newDay = await dayAPI.admin.create(dataToSend);
                setDays(prev => [...prev, newDay]);
                showSnackbar('Денот е успешно додаден 🎉');
            }
            handleCloseDialog();
        } catch (err) {
            console.error('Error saving day:', err);
            showSnackbar('Грешка при зачувување на денот', 'error');
        }
    };

    const handleDeleteDay = async (day) => {
        if (window.confirm(`Дали сте сигурни дека сакате да го избришете денот "${day.title || day.name}"?\nОваа акција е неповратна!`)) {
            try {
                await dayAPI.admin.delete(day.id);
                setDays(prev => prev.filter(d => d.id !== day.id));
                showSnackbar('Денот е успешно избришан 🗑️');
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
            showSnackbar('Редоследот е зачуван! ✅');
        } catch (err) {
            console.error('Error saving order:', err);
            showSnackbar('Грешка при зачувување на редоследот', 'error');
        }
    };

    if (loading) {
        return (
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%', backgroundColor: '#fafafa' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>
                <Box sx={{
                    px: 4,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh'
                }}>
                    <Typography variant="h4" sx={{
                        color: '#ff7eb9',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Box sx={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                            ⏳
                        </Box>
                        Вчитување на денови...
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ py: 4, minHeight: '100vh', width: '100%', backgroundColor: '#fafafa' }}>
                <Box sx={{ px: 4 }}>
                    <AdminHeader />
                </Box>

                <Box sx={{ px: 4 }}>
                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box>
                            <Typography variant="h3" sx={{
                                color: '#ff7eb9',
                                fontWeight: 'bold',
                                textShadow: '0 2px 4px rgba(255, 126, 185, 0.3)'
                            }}>
                                📅 Листа на Денови
                            </Typography>
                            <Typography variant="h6" sx={{
                                color: '#666666',
                                mt: 1
                            }}>
                                Управувајте со деновите и нивните видеа
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                                    borderRadius: '12px',
                                    '&:hover': {
                                        borderColor: '#74c0fc',
                                        backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
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
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 15px rgba(255, 126, 185, 0.3)',
                                    '&:hover': {
                                        bgcolor: '#ff4a97',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(255, 126, 185, 0.4)',
                                    },
                                    transition: 'all 0.3s ease'
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
                            backgroundColor: 'rgba(255, 126, 185, 0.05)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Typography variant="h4" sx={{
                                color: '#ff7eb9',
                                mb: 2,
                                fontWeight: 'bold',
                                textShadow: '0 2px 4px rgba(255, 126, 185, 0.3)'
                            }}>
                                🏋️‍♂️ Нема денови
                            </Typography>
                            <Typography variant="h6" sx={{
                                color: '#666666',
                                mb: 4,
                                maxWidth: '500px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}>
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
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 15px rgba(255, 126, 185, 0.3)',
                                    '&:hover': {
                                        bgcolor: '#ff4a97',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(255, 126, 185, 0.4)',
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
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 126, 185, 0.2)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Box>
                                    <Typography variant="h5" sx={{
                                        color: '#ff7eb9',
                                        fontWeight: 'bold',
                                        mb: 1
                                    }}>
                                        📊 Вкупно денови: {days.length}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: '#666666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        🎯 Вкупно видеа: {days.reduce((total, day) => total + (day.videos?.length || 0), 0)}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{
                                    color: '#666666',
                                    backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '8px',
                                    border: '1px solid rgba(165, 216, 255, 0.3)'
                                }}>
                                    👆 Влечете и спуштајте за да го промените редоследот
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
                                borderRadius: '16px',
                                border: '1px solid rgba(165, 216, 255, 0.2)',
                                textAlign: 'center',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Typography variant="h6" sx={{
                                    color: '#a5d8ff',
                                    mb: 2,
                                    fontWeight: 'bold',
                                    textShadow: '0 2px 4px rgba(165, 216, 255, 0.3)'
                                }}>
                                    📈 Статистика за денови
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                                    <Typography variant="body2" sx={{
                                        color: '#666666',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        px: 2,
                                        py: 1,
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 126, 185, 0.2)'
                                    }}>
                                        📅 Вкупно денови: {days.length}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: '#666666',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        px: 2,
                                        py: 1,
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 126, 185, 0.2)'
                                    }}>
                                        🎬 Вкупно видеа: {days.reduce((total, day) => total + (day.videos?.length || 0), 0)}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: '#666666',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        px: 2,
                                        py: 1,
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 126, 185, 0.2)'
                                    }}>
                                        📊 Просечно видеа по ден: {(days.reduce((total, day) => total + (day.videos?.length || 0), 0) / days.length).toFixed(1)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Day Form Dialog - OVA E SAMO AKO addDayDialog e true */}
                {addDayDialog && (
                    <DayForm
                        initialData={selectedDay}
                        onSave={handleSaveDay}
                        onCancel={handleCloseDialog}
                    />
                )}
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
        </>
    );
};

export default DayList;