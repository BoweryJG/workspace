import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, alpha } from '@mui/material/styles';
import { designTokens } from '../styles/designTokens';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('repSpheres-theme-mode');
    return savedMode || 'dark';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('repSpheres-theme-mode', newMode);
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: designTokens.colors.primary[500],
        light: designTokens.colors.primary[400],
        dark: designTokens.colors.primary[600],
      },
      secondary: {
        main: designTokens.colors.accent[500],
        light: designTokens.colors.accent[400],
        dark: designTokens.colors.accent[600],
      },
      success: {
        main: designTokens.colors.success[500],
      },
      background: {
        default: mode === 'dark' 
          ? designTokens.colors.background.primary 
          : '#FAFBFC',
        paper: mode === 'dark' 
          ? designTokens.colors.background.secondary 
          : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' 
          ? designTokens.colors.text.primary 
          : '#1A1A1A',
        secondary: mode === 'dark' 
          ? designTokens.colors.text.secondary 
          : '#6B7280',
      }
    },
    typography: {
      fontFamily: designTokens.typography.fontFamily.body,
      h1: { fontSize: designTokens.typography.fontSize['5xl'], fontWeight: designTokens.typography.fontWeight.bold },
      h2: { fontSize: designTokens.typography.fontSize['4xl'], fontWeight: designTokens.typography.fontWeight.semibold },
      h3: { fontSize: designTokens.typography.fontSize['3xl'], fontWeight: designTokens.typography.fontWeight.semibold },
      h4: { fontSize: designTokens.typography.fontSize['2xl'], fontWeight: designTokens.typography.fontWeight.medium },
    },
    shape: {
      borderRadius: parseInt(designTokens.borderRadius.md),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: designTokens.typography.fontWeight.medium,
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: mode === 'dark' 
              ? `linear-gradient(135deg, ${alpha(designTokens.colors.primary[500], 0.1)} 0%, ${alpha(designTokens.colors.accent[500], 0.05)} 100%)`
              : 'none',
            backdropFilter: mode === 'dark' ? `blur(${designTokens.blur.lg})` : 'none',
            border: `1px solid ${mode === 'dark' ? designTokens.colors.border.light : '#E5E7EB'}`,
          }
        }
      }
    }
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};