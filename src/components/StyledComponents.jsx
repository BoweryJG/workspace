import React from 'react';
import { Box, useTheme, Avatar, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { glassmorphism, gradients } from '../theme';

// Animation definitions
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(167, 139, 250, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Premium Score Badge with animations
export const ScoreBadge = ({ score }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  let gradient = gradients.primary;
  let glow = 'rgba(99, 102, 241, 0.4)';
  
  if (score >= 90) {
    gradient = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
    glow = 'rgba(16, 185, 129, 0.4)';
  } else if (score >= 80) {
    gradient = gradients.secondary;
    glow = 'rgba(167, 139, 250, 0.4)';
  } else {
    gradient = 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)';
    glow = 'rgba(245, 158, 11, 0.4)';
  }

  return (
    <Box
      sx={{
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 800,
        background: gradient,
        color: '#FFFFFF',
        position: 'relative',
        animation: `${pulseAnimation} 2s ease-in-out infinite`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: `0 0 30px ${glow}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -2,
          borderRadius: '50%',
          background: gradient,
          opacity: 0.3,
          filter: 'blur(10px)',
          zIndex: -1,
        },
      }}
    >
      {score}
    </Box>
  );
};

// Glass morphism icon wrapper
export const IconWrapper = ({ color = 'primary', children, size = 'medium' }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const sizeMap = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
  };
  
  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
  };
  
  return (
    <Box
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...(isDark ? glassmorphism.dark : glassmorphism.light),
        color: colorMap[color],
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.05)',
          boxShadow: `0 8px 24px ${colorMap[color]}40`,
          '& .icon-glow': {
            opacity: 1,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colorMap[color]}20 0%, transparent 70%)`,
          opacity: 0.5,
        },
      }}
    >
      <Box
        className="icon-glow"
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colorMap[color]}40 0%, transparent 70%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

// Premium Badge with gradient
export const Badge = ({ variant = 'primary', children, animated = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const variantMap = {
    primary: {
      gradient: gradients.primary,
      color: '#FFFFFF',
    },
    success: {
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      color: '#FFFFFF',
    },
    warning: {
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      color: '#FFFFFF',
    },
    info: {
      gradient: gradients.secondary,
      color: '#FFFFFF',
    },
    error: {
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
      color: '#FFFFFF',
    },
  };
  
  const style = variantMap[variant] || variantMap.primary;
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.75,
        fontSize: '0.875rem',
        fontWeight: 600,
        borderRadius: '9999px',
        background: style.gradient,
        color: style.color,
        position: 'relative',
        overflow: 'hidden',
        letterSpacing: '0.025em',
        transition: 'all 0.3s ease',
        animation: animated ? `${floatAnimation} 3s ease-in-out infinite` : 'none',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        '&::after': animated ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-200%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
          animation: `${shimmerAnimation} 2s infinite`,
        } : {},
      }}
    >
      {children}
    </Box>
  );
};

// Premium Progress Bar with gradient animation
export const ProgressBar = ({ value, color = 'primary', animated = true }) => {
  const theme = useTheme();
  
  const colorMap = {
    primary: gradients.primary,
    secondary: gradients.secondary,
    success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    error: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        height: '12px',
        bgcolor: theme.palette.action.hover,
        borderRadius: '9999px',
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${value}%`,
          background: colorMap[color] || colorMap.primary,
          borderRadius: '9999px',
          position: 'relative',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::after': animated ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            animation: `${shimmerAnimation} 2s infinite`,
          } : {},
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '0.625rem',
          fontWeight: 700,
          color: value > 50 ? '#FFFFFF' : theme.palette.text.primary,
          textShadow: value > 50 ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        {value}%
      </Box>
    </Box>
  );
};

// Premium Avatar with gradient border
export const GradientAvatar = styled(Avatar)(({ theme, size = 40 }) => ({
  width: size,
  height: size,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -3,
    borderRadius: '50%',
    background: gradients.primary,
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    borderRadius: '50%',
    background: theme.palette.background.paper,
    zIndex: -1,
  },
}));

// Glass Card component
export const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  ...(theme.palette.mode === 'dark' ? glassmorphism.dark : glassmorphism.light),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
      : '0 20px 40px rgba(99, 102, 241, 0.15)',
  },
}));

// Gradient Button
export const GradientButton = styled(Box)(({ theme, variant = 'primary' }) => {
  const gradientMap = {
    primary: gradients.primary,
    secondary: gradients.secondary,
    aurora: gradients.aurora,
    sunset: gradients.sunset,
  };
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    borderRadius: '12px',
    background: gradientMap[variant] || gradientMap.primary,
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      '&::before': {
        transform: 'translateX(100%)',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.5s ease',
    },
  };
});

// Animated Background
export const AnimatedBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    top: '-50%',
    left: '-50%',
    background: theme.palette.mode === 'dark'
      ? `radial-gradient(circle at 20% 50%, ${theme.palette.primary.dark}20 0%, transparent 50%),
         radial-gradient(circle at 80% 80%, ${theme.palette.secondary.dark}20 0%, transparent 50%),
         radial-gradient(circle at 40% 20%, ${theme.palette.info.dark}20 0%, transparent 50%)`
      : `radial-gradient(circle at 20% 50%, ${theme.palette.primary.light}20 0%, transparent 50%),
         radial-gradient(circle at 80% 80%, ${theme.palette.secondary.light}20 0%, transparent 50%),
         radial-gradient(circle at 40% 20%, ${theme.palette.info.light}20 0%, transparent 50%)`,
    animation: `${floatAnimation} 20s ease-in-out infinite`,
  },
}));