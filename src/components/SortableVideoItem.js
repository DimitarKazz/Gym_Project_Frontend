// src/components/SortableVideoItem.js - NOVA KOMPONENTA ZA DRAG & DROP VIDEO
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SortableVideoItem = ({ video, index, onPlay, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: video.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    };

    // Funkcija za preview slikica od videoto
    const getVideoPreview = (video) => {
        // Ako videoto ima thumbnail URL, koristi go toa
        if (video.thumbnailUrl) {
            return (
                <Box
                    sx={{
                        width: 120,
                        height: 80,
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid #ffd700',
                        flexShrink: 0,
                        backgroundImage: `url(${video.thumbnailUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <PlayArrowIcon sx={{ color: '#ffd700', fontSize: 32, opacity: 0.8 }} />
                </Box>
            );
        }

        // Ako nema thumbnail, koristi default video preview so play ikona
        return (
            <Box
                sx={{
                    width: 120,
                    height: 80,
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffd700',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b00 100%)',
                    opacity: 0.3
                }} />
                <PlayArrowIcon sx={{
                    color: '#ffd700',
                    fontSize: 32,
                    position: 'relative',
                    zIndex: 1
                }} />
            </Box>
        );
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            sx={{
                bgcolor: '#1a1a1a',
                border: '2px solid #ffd700',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)',
                    border: '2px solid #ffed4e'
                },
                mb: 2
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Levo: Drag Handle + Preview + Naslov + Opis */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                        {/* Drag Handle */}
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
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                }
                            }}
                        >
                            <DragHandleIcon sx={{ color: '#ffd700' }} />
                        </Box>

                        {/* Preview slichka */}
                        {getVideoPreview(video)}

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" sx={{
                                color: '#ffd700',
                                mb: 1,
                                fontWeight: 'bold'
                            }}>
                                {index + 1}. {video.title}
                            </Typography>
                            <Typography variant="body1" sx={{
                                color: 'rgba(255,255,255,0.8)',
                                mb: 1
                            }}>
                                {video.description || 'Нема опис'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
                                {video.day && (
                                    <Typography variant="caption" sx={{
                                        color: 'rgba(255,255,255,0.6)',
                                        fontStyle: 'italic'
                                    }}>
                                        Ден: {video.day.title}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    {/* Desno: Action kopchinja */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            onClick={() => onPlay(video)}
                            sx={{
                                color: '#ffd700',
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                }
                            }}
                            title="Пушти видео"
                        >
                            <PlayArrowIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => onEdit(video)}
                            sx={{
                                color: '#ffd700',
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                }
                            }}
                            title="Измени видео"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => onDelete(video)}
                            sx={{
                                color: '#ff6b6b',
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                                }
                            }}
                            title="Избриши видео"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SortableVideoItem;