import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography, Button, Box } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DayListItem = ({ day, onEdit, onDelete, onView }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: day.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
        marginBottom: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'default',
    };

    return (
        <Paper ref={setNodeRef} style={style} elevation={3}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                {/* 🚨 Драг Хендл */}
                <div
                    {...listeners}
                    {...attributes}
                    style={{ cursor: 'grab', marginRight: '16px', padding: '8px' }}
                >
                    <DragHandleIcon color="action" />
                </div>
                <Typography variant="body1">
                    **Ден {day.orderIndex}:** {day.title}
                </Typography>
            </Box>
            <Box>
                <Button size="small" onClick={onView} startIcon={<VisibilityIcon />}>
                    Види
                </Button>
                <Button size="small" onClick={onEdit} startIcon={<EditIcon />}>
                    Измени
                </Button>
                <Button size="small" color="error" onClick={onDelete} startIcon={<DeleteIcon />}>
                    Избриши
                </Button>
            </Box>
        </Paper>
    );
};

export default DayListItem;