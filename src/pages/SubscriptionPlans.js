// pages/SubscriptionPlans.js - SO NOVATA SVETLA TEMA
import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const SubscriptionPlans = () => {
    const plans = [
        {
            name: 'BASIC',
            price: '0 ден.',
            description: 'Започни со твоето фитнес патување',
            features: [
                'Пристап до основни вежби',
                'Ограничен број на видеа',
                'Поддршка преку е-маил'
            ],
            color: '#ff7eb9',
            popular: false
        },
        {
            name: 'PREMIUM',
            price: '999 ден./месечно',
            description: 'Најпопуларна претплата',
            features: [
                'Пристап до сите видеа',
                'Персонализирани тренинг програми',
                'Приоритетна поддршка',
                'Напредни вежби'
            ],
            color: '#a5d8ff',
            popular: true
        },
        {
            name: 'VIP',
            price: '1,999 ден./месечно',
            description: 'Целосен фитнес опыт',
            features: [
                'Се што е во Premium плус:',
                'Личен тренер преку видео повик',
                'Диететски планови',
                'Ексклузивни видеа',
                '24/7 поддршка'
            ],
            color: '#c8f0cc',
            popular: false
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom align="center" color="#ff7eb9" fontWeight="bold">
                🏋️‍♂️ Избери Ја Твојата Претплата
            </Typography>

            <Typography variant="h6" align="center" color="#666666" sx={{ mb: 6 }}>
                Започни го твоето фитнес патување денес!
            </Typography>

            <Grid container spacing={4}>
                {plans.map((plan, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                border: plan.popular ? '2px solid' : '1px solid',
                                borderColor: plan.popular ? plan.color : '#e0e0e0',
                                position: 'relative',
                                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)',
                                }
                            }}
                        >
                            {plan.popular && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -10,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: plan.color,
                                        color: plan.color === '#a5d8ff' ? '#2b2b2b' : '#fff',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 2,
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    НАЈПОПУЛАРНА
                                </Box>
                            )}

                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                <FitnessCenterIcon sx={{ fontSize: 40, color: plan.color, mb: 2 }} />

                                <Typography variant="h4" component="h3" gutterBottom color={plan.color} fontWeight="bold">
                                    {plan.name}
                                </Typography>

                                <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
                                    {plan.price}
                                </Typography>

                                <Typography variant="body2" color="#666666" sx={{ mb: 3 }}>
                                    {plan.description}
                                </Typography>

                                <List dense sx={{ mb: 3 }}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <ListItem key={featureIndex} sx={{ px: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 30 }}>
                                                <CheckIcon sx={{ color: plan.color, fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} sx={{ color: '#666666' }} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Button
                                    variant={plan.popular ? "contained" : "outlined"}
                                    fullWidth
                                    size="large"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: plan.popular ? plan.color : 'transparent',
                                        color: plan.popular ?
                                            (plan.color === '#a5d8ff' ? '#2b2b2b' : '#fff') :
                                            plan.color,
                                        borderColor: plan.color,
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: plan.popular ? plan.color : `${plan.color}20`,
                                        }
                                    }}
                                    onClick={() => {
                                        alert(`Избравте ${plan.name} претплата!`);
                                    }}
                                >
                                    {plan.name === 'BASIC' ? 'Започни Безплатно' : 'Претплати Се'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                    variant="text"
                    size="large"
                    sx={{ color: '#ff7eb9' }}
                    onClick={() => {
                        window.location.href = '/login';
                    }}
                >
                    Веќе имаш профил? Најави се
                </Button>
            </Box>
        </Container>
    );
};

export default SubscriptionPlans;