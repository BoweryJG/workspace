import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Dashboard,
  Analytics,
  Assessment,
  CloudSync,
  Settings,
  AccountCircle,
  MoreVert
} from '@mui/icons-material';

const LocalNavBar = ({ currentView, onViewChange }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { key: 'analyze', label: 'Analyze', icon: <Analytics /> },
    { key: 'insights', label: 'Insights', icon: <Assessment /> },
    { key: 'crm', label: 'CRM Hub', icon: <CloudSync /> }
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'rgba(24, 24, 43, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        color: theme.palette.text.primary
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Avatar sx={{ 
            width: 32, 
            height: 32, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            mr: 2 
          }}>
            AI
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Linguistics
          </Typography>
          <Chip 
            label="JG" 
            size="small" 
            sx={{ 
              ml: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main
            }} 
          />
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              startIcon={item.icon}
              variant={currentView === item.key ? 'contained' : 'text'}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                ...(currentView === item.key ? {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                } : {
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                })
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label="Demo Mode" 
            size="small" 
            color="success" 
            variant="outlined" 
          />
          
          <IconButton onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 1 }} />
              Profile
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LocalNavBar;