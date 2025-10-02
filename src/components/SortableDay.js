// src/components/SortableDay.js - SO NOVATA SVETLA TEMA
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip
} from '@mui/material';
import {
    Visibility,
    Edit,
    Delete,
    FitnessCenter,
    VideoLibrary,
    DragHandle
} from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableDay = ({ day, onView, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: day.id });

    const [isHovered, setIsHovered] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleView = (event) => {
        event.stopPropagation();
        console.log('👁️ Види clicked for:', day.title);

        if (onView && typeof onView === 'function') {
            onView(day);
        }
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        console.log('✏️ Промени clicked for:', day.title);

        if (onEdit && typeof onEdit === 'function') {
            onEdit(day);
        }
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        console.log('🗑️ Избриши clicked for:', day.title);

        if (window.confirm(`Дали сте сигурни дека сакате да го избришете денот "${day.title}"?`)) {
            if (onDelete && typeof onDelete === 'function') {
                onDelete(day);
            }
        }
    };

    const videoCount = day.videos?.length || 0;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                border: isHovered ? '2px solid #ff4a97' : '2px solid #ff7eb9',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease',
                marginBottom: '16px',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 8px 25px rgba(255, 126, 185, 0.2)',
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                {/* Header so drag handle levo, isto kako kaj videata */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    {/* Drag Handle - crti kako kaj videata */}
                    <Box
                        {...attributes}
                        {...listeners}
                        sx={{
                            cursor: isDragging ? 'grabbing' : 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 126, 185, 0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 126, 185, 0.2)',
                            },
                            flexShrink: 0
                        }}
                    >
                        <DragHandle sx={{ color: '#ff7eb9' }} />
                    </Box>

                    {/* Ikonka i informacii */}
                    <FitnessCenter sx={{
                        color: '#ff7eb9',
                        fontSize: 40,
                        flexShrink: 0
                    }} />

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{
                            color: '#ff7eb9',
                            mb: 1,
                            fontWeight: 'bold'
                        }}>
                            {day.title || day.name}
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#666666',
                            mb: 1
                        }}>
                            {day.description || 'Нема опис'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Chip
                                icon={<VideoLibrary />}
                                label={`${videoCount} видеа`}
                                variant="outlined"
                                sx={{
                                    borderColor: '#ff7eb9',
                                    color: '#ff7eb9',
                                    backgroundColor: videoCount > 0 ? 'rgba(255, 126, 185, 0.15)' : 'rgba(0,0,0,0.05)',
                                    fontWeight: '600'
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Action kopchinja */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    borderTop: '1px solid rgba(255, 126, 185, 0.3)',
                    pt: 2
                }}>
                    <Button
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={handleView}
                        sx={{
                            bgcolor: '#ff7eb9',
                            color: '#fff',
                            fontWeight: 'bold',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            '&:hover': {
                                bgcolor: '#ff4a97',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(255, 126, 185, 0.3)'
                        }}
                    >
                        Види Видеа
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={handleEdit}
                        sx={{
                            color: '#a5d8ff',
                            borderColor: '#a5d8ff',
                            borderWidth: '2px',
                            fontWeight: 'bold',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: '#74c0fc',
                                backgroundColor: 'rgba(165, 216, 255, 0.1)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Промени
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                        sx={{
                            color: '#ff6b6b',
                            borderColor: '#ff6b6b',
                            borderWidth: '2px',
                            fontWeight: 'bold',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: '#ff5252',
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Избриши
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SortableDay;