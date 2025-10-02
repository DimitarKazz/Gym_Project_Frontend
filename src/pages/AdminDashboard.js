// src/pages/AdminDashboard.js - SO ADMIN HEADER
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Button, Box, Dialog, Snackbar, Alert
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
import AdminHeader from '../components/AdminHeader'; // DODADENO
import { dayAPI } from '../services/api';

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

const AdminDashboard = () => {
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
            <Container sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
                <Typography sx={{ color: '#ffd700' }}>Вчитување...</Typography>
            </Container>
        );
    }

    return (
        <>
            <Container sx={{ py: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
                {/* DODADEN ADMIN HEADER */}
                <AdminHeader />

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" sx={{ color: '#ffd700' }}>Листа на Денови</Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={saveOrder}
                            sx={{ mr: 2, color: '#ffd700', borderColor: '#ffd700' }}
                        >
                            Зачувај редослед
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddDay}
                            sx={{ bgcolor: '#ffd700', color: '#000' }}
                        >
                            Додај ден
                        </Button>
                    </Box>
                </Box>

                {days.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                            Нема денови
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                            Додајте прв ден за да започнете
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleAddDay}
                            sx={{ bgcolor: '#ffd700', color: '#000' }}
                        >
                            Додај прв ден
                        </Button>
                    </Box>
                ) : (
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
                )}

                <Dialog
                    open={addDayDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            bgcolor: '#1a1a1a',
                            border: '2px solid #ffd700'
                        }
                    }}
                >
                    <DayForm
                        initialData={selectedDay}
                        onSave={handleSaveDay}
                        onCancel={handleCloseDialog}
                    />
                </Dialog>
            </Container>

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

export default AdminDashboard;