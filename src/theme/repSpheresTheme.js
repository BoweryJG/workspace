import { createTheme } from '@mui/material/styles';
import { designTokens } from '../styles/designTokens';

export const repSpheresTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: designTokens.colors.primary[500],
      light: designTokens.colors.primary[400],
      dark: designTokens.colors.primary[600],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: designTokens.colors.accent[500],
      light: designTokens.colors.accent[400],
      dark: designTokens.colors.accent[600],
      contrastText: '#FFFFFF',
    },
    success: {
      main: designTokens.colors.success[500],
      light: designTokens.colors.success[400],
      dark: designTokens.colors.success[600],
      contrastText: '#FFFFFF',
    },
    background: {
      default: designTokens.colors.background.primary,
      paper: designTokens.colors.background.secondary,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
      disabled: designTokens.colors.text.disabled,
    },
    divider: designTokens.colors.border.light,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.body,
    h1: {
      fontFamily: designTokens.typography.fontFamily.display,
      fontSize: designTokens.typography.fontSize['5xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: designTokens.typography.fontFamily.display,
      fontSize: designTokens.typography.fontSize['4xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: designTokens.typography.fontFamily.display,
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.snug,
    },
    h4: {
      fontFamily: designTokens.typography.fontFamily.display,
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.snug,
    },
    h5: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.medium,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h6: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.medium,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      lineHeight: designTokens.typography.lineHeight.relaxed,
    },
    button: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.lg),
  },
  spacing: (factor) => {
    const spacingMap = {
      0: designTokens.spacing[0],
      1: designTokens.spacing[1],
      2: designTokens.spacing[2],
      3: designTokens.spacing[3],
      4: designTokens.spacing[4],
      5: designTokens.spacing[5],
      6: designTokens.spacing[6],
      8: designTokens.spacing[8],
      10: designTokens.spacing[10],
      12: designTokens.spacing[12],
      16: designTokens.spacing[16],
      20: designTokens.spacing[20],
      24: designTokens.spacing[24],
    };
    return spacingMap[factor] || `${factor * 8}px`;
  },
  shadows: [
    'none',
    designTokens.shadow.sm,
    designTokens.shadow.base,
    designTokens.shadow.md,
    designTokens.shadow.lg,
    designTokens.shadow.xl,
    designTokens.shadow['2xl'],
    designTokens.shadow.glow,
    designTokens.shadow.glowLg,
    ...Array(16).fill(designTokens.shadow.xl),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          padding: `${designTokens.spacing[2]} ${designTokens.spacing[6]}`,
          transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: designTokens.shadow.lg,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.colors.primary[400]} 0%, ${designTokens.colors.primary[500]} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.colors.accent[400]} 0%, ${designTokens.colors.accent[500]} 100%)`,
            boxShadow: designTokens.shadow.glow,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: designTokens.colors.background.card,
          backdropFilter: `blur(${designTokens.blur.lg})`,
          border: `1px solid ${designTokens.colors.border.light}`,
          transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.lg,
            backgroundColor: designTokens.colors.background.card,
            backdropFilter: `blur(${designTokens.blur.base})`,
            '& fieldset': {
              borderColor: designTokens.colors.border.light,
              transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.inOut}`,
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.border.medium,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.accent[500],
              borderWidth: '2px',
              boxShadow: `0 0 0 3px ${designTokens.colors.accent[500]}33`,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.xl,
          backgroundColor: designTokens.colors.background.card,
          backdropFilter: `blur(${designTokens.blur.lg})`,
          border: `1px solid ${designTokens.colors.border.light}`,
          transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: designTokens.shadow.xl,
            borderColor: designTokens.colors.border.medium,
          },
        },
      },
    },
  },
});

export default repSpheresTheme;