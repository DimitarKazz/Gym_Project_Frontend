// src/theme.js
import { createTheme } from '@mui/material/styles';

export const gymTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffd700', // Жолта
            light: '#ffed4e',
            dark: '#e6c200',
            contrastText: '#000',
        },
        secondary: {
            main: '#000000', // Црна
            light: '#333333',
            dark: '#000000',
            contrastText: '#ffd700',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffd700',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#ffd700',
        },
        h2: {
            fontWeight: 600,
            color: '#ffd700',
        },
        h3: {
            fontWeight: 600,
            color: '#ffd700',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                    textTransform: 'none',
                },
                containedPrimary: {
                    backgroundColor: '#ffd700',
                    color: '#000',
                    '&:hover': {
                        backgroundColor: '#ffed4e',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #ffd700',
                    borderRadius: 12,
                },
            },
        },
    },
});