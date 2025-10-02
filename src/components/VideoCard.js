// src/components/VideoCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const VideoCard = ({ video }) => {
    return (
        <Card sx={{
            border: '1px solid #ffd700',
            padding: '10px',
            margin: '5px',
            bgcolor: '#1a1a1a',
            color: 'white'
        }}>
            <CardContent>
                <Typography variant="h6" sx={{ color: '#ffd700', mb: 1 }}>
                    {video.title}
                </Typography>
                <video width="320" height="180" controls style={{ borderRadius: '4px' }}>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </CardContent>
        </Card>
    );
};

export default VideoCard;