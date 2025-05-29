import React from 'react';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography,
  Chip 
} from '@mui/material';
import { 
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon 
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: '8px',
  '& .MuiToggleButton-root': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
    borderRadius: '12px',
    padding: '12px 16px',
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      borderColor: alpha(theme.palette.primary.main, 0.5),
      transform: 'translateY(-2px)',
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
      },
    },
  },
}));

const reportTypes = [
  {
    id: 'pre-call',
    name: 'Pre-Call Intelligence',
    description: 'Provider insights & preparation',
    icon: <SearchIcon />,
    color: '#3B82F6'
  },
  {
    id: 'territory',
    name: 'Territory Expansion', 
    description: 'Growth opportunities & networks',
    icon: <TrendingUpIcon />,
    color: '#10B981'
  },
  {
    id: 'implementation',
    name: 'Implementation & Success',
    description: 'Training, adoption & ROI tracking',
    icon: <CheckCircleIcon />,
    color: '#8B5CF6'
  }
];

const ReportTypeToggle = ({ value, onChange, promptCounts = {} }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Select Report Type
      </Typography>
      
      <StyledToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        orientation="horizontal"
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center'
        }}
      >
        {reportTypes.map((type) => (
          <ToggleButton 
            key={type.id} 
            value={type.id}
            sx={{
              '&.Mui-selected': {
                borderColor: type.color,
                color: type.color,
                backgroundColor: alpha(type.color, 0.1),
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 1
            }}>
              <Box sx={{ 
                color: 'inherit',
                fontSize: '1.5rem'
              }}>
                {type.icon}
              </Box>
              
              <Typography variant="subtitle2" fontWeight={600}>
                {type.name}
              </Typography>
              
              <Typography 
                variant="caption" 
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: '180px' }}
              >
                {type.description}
              </Typography>
              
              {promptCounts[type.id] && (
                <Chip 
                  label={`${promptCounts[type.id]} prompts`}
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(type.color, 0.2),
                    color: type.color,
                    fontWeight: 500
                  }}
                />
              )}
            </Box>
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default ReportTypeToggle;