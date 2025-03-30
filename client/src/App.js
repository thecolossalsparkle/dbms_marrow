import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// Layouts
import DoctorLayout from './components/layouts/DoctorLayout';
import PatientLayout from './components/layouts/PatientLayout';

// Pages
import Home from './pages/Home';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientList from './pages/doctor/PatientList';
import PatientDetails from './pages/doctor/PatientDetails';
import DoctorAppointments from './pages/doctor/Appointments';
import Prescriptions from './pages/doctor/Prescriptions';
import DoctorProfile from './pages/doctor/Profile';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import DoctorList from './pages/patient/DoctorList';
import DoctorDetails from './pages/patient/DoctorDetails';
import PatientAppointments from './pages/patient/Appointments';
import PatientRecords from './pages/patient/MedicalRecords';
import PatientProfile from './pages/patient/Profile';
import Messaging from './pages/Messaging';

// Create enhanced theme with beautiful aesthetics
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Refined blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f43f5e', // Vibrant rose
      light: '#fb7185',
      dark: '#be123c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#b91c1c',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    divider: 'rgba(15, 23, 42, 0.06)',
    gradients: {
      primary: 'linear-gradient(135deg, #2563eb, #60a5fa)',
      secondary: 'linear-gradient(135deg, #f43f5e, #fb7185)',
      success: 'linear-gradient(135deg, #059669, #10b981)',
      warning: 'linear-gradient(135deg, #d97706, #f59e0b)',
      error: 'linear-gradient(135deg, #b91c1c, #ef4444)',
      info: 'linear-gradient(135deg, #2563eb, #60a5fa)',
      dark: 'linear-gradient(135deg, #0f172a, #334155)',
      light: 'linear-gradient(135deg, #f1f5f9, #ffffff)',
      glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
    },
    // New: Glass effect colors
    glass: {
      light: 'rgba(255, 255, 255, 0.7)',
      medium: 'rgba(255, 255, 255, 0.5)',
      dark: 'rgba(15, 23, 42, 0.3)',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '0.95rem',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#64748b',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 1px 2px rgba(0, 0, 0, 0.04)', // elevation 1
    '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04)', // elevation 2
    '0px 8px 16px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.04)', // elevation 3
    '0px 12px 24px rgba(0, 0, 0, 0.05), 0px 8px 16px rgba(0, 0, 0, 0.04)', // elevation 4
    '0px 16px 32px rgba(0, 0, 0, 0.06), 0px 12px 24px rgba(0, 0, 0, 0.05)', // elevation 5
    '0px 20px 40px rgba(0, 0, 0, 0.07), 0px 16px 32px rgba(0, 0, 0, 0.06)', // elevation 6
    ...Array(18).fill('none'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--shadow-color': '220 3% 15%',
          '--shadow-strength': '1%',
        },
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          minHeight: '100vh',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          backgroundImage: 'none',
          backgroundColor: '#f8fafc',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.15)',
            },
          },
        },
        'a, button': {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '@keyframes pulse': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.5)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(37, 99, 235, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
          },
        },
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes fadeInRight': {
          '0%': {
            opacity: 0,
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        '@keyframes fadeInLeft': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(0)',
            opacity: 0.1,
          },
          '50%': {
            transform: 'scale(1)',
            opacity: 0.3,
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: 0,
          },
        },
        '@keyframes float': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        '@keyframes breathe': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.03)',
          },
        },
        '@keyframes rotate': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        '@keyframes slideIn': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        '@keyframes gradientShift': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        '.fadeIn': {
          animation: 'fadeIn 0.5s ease-out forwards',
        },
        '.fadeInUp': {
          animation: 'fadeInUp 0.5s ease-out forwards',
        },
        '.fadeInLeft': {
          animation: 'fadeInLeft 0.5s ease-out forwards',
        },
        '.fadeInRight': {
          animation: 'fadeInRight 0.5s ease-out forwards',
        },
        '.delay-100': {
          animationDelay: '100ms',
        },
        '.delay-200': {
          animationDelay: '200ms',
        },
        '.delay-300': {
          animationDelay: '300ms',
        },
        '.delay-400': {
          animationDelay: '400ms',
        },
        '.delay-500': {
          animationDelay: '500ms',
        },
        '.glass-effect': {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        },
        '.gradient-text': {
          backgroundClip: 'text',
          textFillColor: 'transparent',
          backgroundImage: 'linear-gradient(135deg, #2563eb, #60a5fa)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 3s ease infinite',
        },
        '.floating': {
          animation: 'float 3s ease-in-out infinite',
        },
        '.breathing': {
          animation: 'breathe 4s ease-in-out infinite',
        },
        '.rotating': {
          animation: 'rotate 10s linear infinite',
        },
        '.loading-state': {
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transform: 'translateX(-100%)',
            backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
            animation: 'shimmer 2s infinite',
          },
        },
        '.highlight-hover': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          fontWeight: 600,
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)',
            transform: 'translateX(-100%)',
            transition: 'all 0.6s ease',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
            '&:before': {
              transform: 'translateX(100%)',
            },
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '5px',
            height: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            opacity: 0,
            borderRadius: '100%',
            transform: 'scale(1, 1) translate(-50%)',
            transformOrigin: '50% 50%',
          },
          '&:active::after': {
            animation: 'ripple 0.6s ease-out',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 5s ease infinite',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e40af, #2563eb)',
            backgroundSize: '200% 200%',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 5s ease infinite',
          '&:hover': {
            background: 'linear-gradient(135deg, #be123c, #f43f5e)',
            backgroundSize: '200% 200%',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          },
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-4px)',
            '&:before': {
              opacity: 1,
            },
          },
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.6s ease-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        root: {
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 28,
          transition: 'all 0.3s ease',
          '& .MuiChip-label': {
            padding: '0 10px',
          },
          '&.MuiChip-sizeSmall': {
            height: 24,
            fontSize: '0.7rem',
            '& .MuiChip-label': {
              padding: '0 8px',
            },
          },
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
            boxShadow: '0 2px 4px rgba(244, 63, 94, 0.2)',
          },
          '&.MuiChip-colorSuccess': {
            background: 'linear-gradient(135deg, #059669, #10b981)',
            boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)',
          },
          '&.MuiChip-colorError': {
            background: 'linear-gradient(135deg, #b91c1c, #ef4444)',
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
          },
          '&.MuiChip-colorWarning': {
            background: 'linear-gradient(135deg, #d97706, #f59e0b)',
            boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
          },
          '&.MuiChip-colorInfo': {
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '2px solid #ffffff',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderColor: 'rgba(0, 0, 0, 0.04)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f8fafc',
          borderBottom: '2px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, transform 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&.Mui-selected': {
            color: '#2563eb',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0%',
            height: '3px',
            borderRadius: '3px 3px 0 0',
            background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
            transition: 'width 0.3s ease',
          },
          '&.Mui-selected::before': {
            width: '80%',
          },
          '&:hover::before': {
            width: '40%',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 16px',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.5s ease-out',
        },
        standardSuccess: {
          borderLeft: '4px solid #059669',
          backgroundColor: 'rgba(5, 150, 105, 0.08)',
        },
        standardError: {
          borderLeft: '4px solid #b91c1c',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
        },
        standardWarning: {
          borderLeft: '4px solid #d97706',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
        },
        standardInfo: {
          borderLeft: '4px solid #2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 8,
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
          backgroundRepeat: 'no-repeat',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.95rem',
          borderRadius: 10,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&.Mui-focused': {
            boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563eb',
            borderWidth: '1.5px',
            boxShadow: '0 0 8px rgba(37, 99, 235, 0.15)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
          }
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.15s ease-out',
        },
        arrow: {
          color: 'rgba(15, 23, 42, 0.9)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
          animation: 'pulse 2s infinite',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        switchBase: {
          '&.Mui-checked': {
            '& + .MuiSwitch-track': {
              backgroundColor: '#2563eb',
              opacity: 0.9,
            },
          },
        },
        thumb: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        track: {
          borderRadius: 22 / 2,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: 1,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.05))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          '&.MuiSkeleton-text': {
            transform: 'scale(1, 0.8)',
            marginTop: '4px',
            marginBottom: '4px',
          },
          '&.MuiSkeleton-circular': {
            borderRadius: '50%',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          animation: 'fadeIn 0.5s ease-out',
          position: 'relative',
          zIndex: 1,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          borderRadius: 8,
          margin: '2px 0',
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&.Mui-expanded': {
            margin: 0,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          },
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.02)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 16px 16px 0',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
          backdropFilter: 'blur(10px)',
          animation: 'fadeInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          boxShadow: '0 6px 16px rgba(37, 99, 235, 0.2)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader': {
            borderBottom: '2px solid rgba(0, 0, 0, 0.06)',
            backgroundColor: '#f8fafc',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
          '& .MuiDataGrid-row': {
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              transform: 'translateY(-1px)',
            },
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
            },
          },
        },
      },
    },
    MuiTimeline: {
      styleOverrides: {
        root: {
          padding: '0 16px',
        },
      },
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          width: '2px',
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          margin: '10px 0',
        },
        primary: {
          backgroundImage: 'linear-gradient(135deg, #2563eb, #3b82f6)',
        },
        secondary: {
          backgroundImage: 'linear-gradient(135deg, #f43f5e, #fb7185)',
        },
      },
    },
  },
});

// ParticlesBackground component
const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1000
            }
          },
          color: {
            value: ["#2563eb", "#60a5fa", "#f43f5e", "#10b981", "#7c3aed"],
            animation: {
              enable: true,
              speed: 15,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.2,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#c7d2fe",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outMode: "bounce",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8
              }
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            repulse: {
              distance: 150,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        detectRetina: true,
        background: {
          color: "#f8fafc",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover"
        }
      }}
    />
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParticlesBackground />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />
              <Route path="patients" element={<PatientList />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="messages" element={<Messaging userType="doctor" />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
            
            {/* Patient Routes */}
            <Route path="/patient" element={<PatientLayout />}>
              <Route index element={<PatientDashboard />} />
              <Route path="doctors" element={<DoctorList />} />
              <Route path="doctors/:id" element={<DoctorDetails />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="records" element={<PatientRecords />} />
              <Route path="messages" element={<Messaging userType="patient" />} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
