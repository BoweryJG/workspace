import React, { useContext, useState } from 'react';
import { 
  Fab, 
  Box, 
  Tooltip, 
  Zoom,
  useTheme
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { ThemeContext } from '../contexts/ThemeContext';
import { keyframes } from '@mui/material/styles';

// Rotation animation
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(167, 139, 250, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0);
  }
`;

export default function FloatingThemeToggle() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 1300,
      }}
    >
      <Tooltip 
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} 
        placement="right"
        arrow
        TransitionComponent={Zoom}
      >
        <Fab
          onClick={toggleTheme}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          sx={{
            background: isDarkMode
              ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            color: '#FFFFFF',
            width: 56,
            height: 56,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: `${pulseAnimation} 2s ease-in-out infinite`,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: isDarkMode
                ? '0 0 30px rgba(167, 139, 250, 0.6)'
                : '0 0 30px rgba(99, 102, 241, 0.6)',
              '& .theme-icon': {
                animation: `${rotateAnimation} 0.6s ease-in-out`,
              },
              '& .sparkle-icon': {
                opacity: 1,
                transform: 'scale(1) rotate(45deg)',
              }
            },
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDarkMode ? (
              <Brightness7Icon className="theme-icon" sx={{ fontSize: 28 }} />
            ) : (
              <Brightness4Icon className="theme-icon" sx={{ fontSize: 28 }} />
            )}
            <AutoAwesomeIcon 
              className="sparkle-icon"
              sx={{ 
                position: 'absolute',
                fontSize: 16,
                top: -8,
                right: -8,
                opacity: 0,
                transform: 'scale(0) rotate(0deg)',
                transition: 'all 0.3s ease',
              }} 
            />
          </Box>
        </Fab>
      </Tooltip>
    </Box>
  );
}