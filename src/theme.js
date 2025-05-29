import { createTheme, alpha } from '@mui/material';

// Premium color palettes
const colors = {
  // Aurora-inspired gradient colors
  aurora: {
    violet: '#8B5CF6',
    purple: '#A78BFA',
    pink: '#EC4899',
    rose: '#F43F5E',
    cyan: '#06B6D4',
    blue: '#3B82F6',
    emerald: '#10B981',
  },
  // Neon accents for dark mode
  neon: {
    cyan: '#00F5FF',
    purple: '#BF40BF',
    pink: '#FF10F0',
    green: '#39FF14',
    yellow: '#FFFF00',
    orange: '#FF6700',
  },
  // Glassmorphism backgrounds
  glass: {
    light: 'rgba(255, 255, 255, 0.25)',
    medium: 'rgba(255, 255, 255, 0.45)',
    heavy: 'rgba(255, 255, 255, 0.65)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },
};

// Create premium light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    grey: {
      50: '#FAFBFF',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    background: {
      default: '#FAFBFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
      disabled: '#94A3B8',
    },
    divider: alpha('#94A3B8', 0.12),
    action: {
      hover: alpha('#6366F1', 0.04),
      selected: alpha('#6366F1', 0.08),
      disabled: alpha('#94A3B8', 0.26),
      disabledBackground: alpha('#94A3B8', 0.12),
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(30, 41, 59, 0.05)',
    '0px 4px 8px rgba(30, 41, 59, 0.08)',
    '0px 8px 16px rgba(30, 41, 59, 0.1)',
    '0px 12px 24px rgba(30, 41, 59, 0.12)',
    '0px 16px 32px rgba(30, 41, 59, 0.14)',
    '0px 20px 40px rgba(30, 41, 59, 0.16)',
    '0px 24px 48px rgba(30, 41, 59, 0.18)',
    '0px 32px 64px rgba(30, 41, 59, 0.2)',
    '0px 40px 80px rgba(30, 41, 59, 0.22)',
    '0px 48px 96px rgba(30, 41, 59, 0.24)',
    ...Array(14).fill('0px 48px 96px rgba(30, 41, 59, 0.24)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(30, 41, 59, 0.08)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(30, 41, 59, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#818CF8',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

// Create premium dark theme (Aurora-inspired)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#8B5CF6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#67E8F9',
      light: '#A5F3FC',
      dark: '#22D3EE',
      contrastText: '#0F172A',
    },
    success: {
      main: '#4ADE80',
      light: '#86EFAC',
      dark: '#22C55E',
    },
    warning: {
      main: '#FCD34D',
      light: '#FDE68A',
      dark: '#F59E0B',
    },
    error: {
      main: '#FB7185',
      light: '#FDA4AF',
      dark: '#F43F5E',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    background: {
      default: '#0B0E1F',
      paper: '#151827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      disabled: '#64748B',
    },
    divider: alpha('#94A3B8', 0.08),
    action: {
      hover: alpha('#A78BFA', 0.08),
      selected: alpha('#A78BFA', 0.12),
      disabled: alpha('#64748B', 0.26),
      disabledBackground: alpha('#64748B', 0.12),
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.4)',
    '0px 12px 24px rgba(0, 0, 0, 0.5)',
    '0px 16px 32px rgba(0, 0, 0, 0.6)',
    '0px 20px 40px rgba(0, 0, 0, 0.7)',
    '0px 24px 48px rgba(0, 0, 0, 0.8)',
    '0px 32px 64px rgba(0, 0, 0, 0.9)',
    '0 0 24px rgba(167, 139, 250, 0.3), 0px 32px 64px rgba(0, 0, 0, 0.9)',
    '0 0 32px rgba(167, 139, 250, 0.4), 0px 40px 80px rgba(0, 0, 0, 1)',
    ...Array(14).fill('0 0 32px rgba(167, 139, 250, 0.4), 0px 40px 80px rgba(0, 0, 0, 1)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderImage: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%) 1',
          '&:hover': {
            borderWidth: '2px',
            background: alpha('#A78BFA', 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(21, 24, 39, 0.9) 0%, rgba(11, 14, 31, 0.9) 100%)',
          border: '1px solid rgba(167, 139, 250, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 0 40px rgba(167, 139, 250, 0.3), 0 20px 40px rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(167, 139, 250, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(21, 24, 39, 0.8)',
          border: '1px solid rgba(167, 139, 250, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: alpha('#151827', 0.5),
            '&:hover fieldset': {
              borderColor: '#A78BFA',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#A78BFA',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          background: alpha('#A78BFA', 0.2),
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            background: alpha('#A78BFA', 0.3),
          },
        },
      },
    },
  },
});

// Export default theme as the light theme for backward compatibility
export default lightTheme;

// Export custom theme utilities
export const customColors = colors;

// Glassmorphism styles
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  dark: {
    background: 'rgba(17, 25, 40, 0.75)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.125)',
  },
};

// Gradient presets
export const gradients = {
  primary: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
  secondary: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
  aurora: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 50%, #67E8F9 100%)',
  sunset: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
  ocean: 'linear-gradient(135deg, #0EA5E9 0%, #67E8F9 50%, #A78BFA 100%)',
  neon: 'linear-gradient(135deg, #39FF14 0%, #00F5FF 50%, #FF10F0 100%)',
};