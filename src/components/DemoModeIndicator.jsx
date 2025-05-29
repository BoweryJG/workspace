import React from 'react';
import { 
  Box, 
  Chip,
  Typography,
  useTheme,
  Fade
} from '@mui/material';
import { 
  AutoAwesome,
  PlayCircleOutline 
} from '@mui/icons-material';
import { useDemo } from '../contexts/DemoContext';

export default function DemoModeIndicator() {
  const theme = useTheme();
  const { isDemoMode } = useDemo();
  
  if (!isDemoMode) return null;
  
  return (
    <Fade in={isDemoMode}>
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 24,
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Chip
          icon={<AutoAwesome />}
          label="Demo Mode"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            animation: 'pulse 2s ease-in-out infinite',
            '& .MuiChip-icon': {
              color: '#FFFFFF',
            },
          }}
        />
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Live data simulation
        </Typography>
      </Box>
    </Fade>
  );
}