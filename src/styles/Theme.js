// src/styles/Theme.js
import { createTheme } from '@mui/material/styles';

export const gymTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff7eb9', // Розова
            light: '#ffb3d9',
            dark: '#ff4a97',
            contrastText: '#fff',
        },
        secondary: {
            main: '#a5d8ff', // Светло синя
            light: '#d0ebff',
            dark: '#74c0fc',
            contrastText: '#2b2b2b',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#2b2b2b',
            secondary: '#666666',
        },
        accent: {
            main: '#c8f0cc', // Светло зелена
            light: '#e6f7e8',
            dark: '#a8e6af',
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#ff7eb9',
        },
        h2: {
            fontWeight: 600,
            color: '#ff7eb9',
        },
        h3: {
            fontWeight: 600,
            color: '#a5d8ff',
        },
        h4: {
            fontWeight: 600,
            color: '#ff7eb9',
        },
        h5: {
            fontWeight: 500,
            color: '#a5d8ff',
        },
        h6: {
            fontWeight: 500,
            color: '#666666',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderBottom: '1px solid #e0e0e0',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 600,
                    textTransform: 'none',
                    padding: '10px 24px',
                    fontSize: '16px',
                },
                containedPrimary: {
                    backgroundColor: '#ff7eb9',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#ff4a97',
                        boxShadow: '0 4px 12px rgba(255, 126, 185, 0.3)',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#a5d8ff',
                    color: '#2b2b2b',
                    '&:hover': {
                        backgroundColor: '#74c0fc',
                        boxShadow: '0 4px 12px rgba(165, 216, 255, 0.3)',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#ff7eb9',
                    color: '#ff7eb9',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 126, 185, 0.1)',
                        borderColor: '#ff4a97',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    '&:hover': {
                        boxShadow: '0 6px 25px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '&:hover fieldset': {
                            borderColor: '#a5d8ff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ff7eb9',
                        },
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#fafafa',
                    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)',
                },
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 2px 10px rgba(0,0,0,0.05)',
        '0 4px 20px rgba(0,0,0,0.08)',
        '0 6px 25px rgba(0,0,0,0.1)',
        '0 8px 30px rgba(0,0,0,0.12)',
        '0 10px 35px rgba(0,0,0,0.14)',
        '0 12px 40px rgba(0,0,0,0.16)',
        '0 14px 45px rgba(0,0,0,0.18)',
        '0 16px 50px rgba(0,0,0,0.2)',
        '0 18px 55px rgba(0,0,0,0.22)',
        '0 20px 60px rgba(0,0,0,0.24)',
        '0 22px 65px rgba(0,0,0,0.26)',
        '0 24px 70px rgba(0,0,0,0.28)',
        '0 26px 75px rgba(0,0,0,0.3)',
        '0 28px 80px rgba(0,0,0,0.32)',
        '0 30px 85px rgba(0,0,0,0.34)',
        '0 32px 90px rgba(0,0,0,0.36)',
        '0 34px 95px rgba(0,0,0,0.38)',
        '0 36px 100px rgba(0,0,0,0.4)',
        '0 38px 105px rgba(0,0,0,0.42)',
        '0 40px 110px rgba(0,0,0,0.44)',
        '0 42px 115px rgba(0,0,0,0.46)',
        '0 44px 120px rgba(0,0,0,0.48)',
        '0 46px 125px rgba(0,0,0,0.5)',
        '0 48px 130px rgba(0,0,0,0.52)',
        '0 50px 135px rgba(0,0,0,0.54)'
    ],
});