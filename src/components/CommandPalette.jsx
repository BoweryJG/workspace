import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Typography,
  Box,
  Chip,
  Fade,
  IconButton,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Close as CloseIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '90%',
    maxWidth: 600,
    maxHeight: '70vh',
    borderRadius: theme.shape.borderRadius * 2,
    background: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    marginTop: '-20vh',
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '1.125rem',
    '& fieldset': {
      border: 'none',
    },
  }
}));

const ResultItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 0),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
  },
  '&.Mui-selected': {
    background: alpha(theme.palette.primary.main, 0.2),
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.3),
    }
  }
}));

const CommandPalette = ({ open, onClose, onSelect, recentSearches = [], favorites = [] }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    // Build results based on query
    const buildResults = () => {
      const items = [];
      
      if (!query) {
        // Show quick actions
        items.push({
          type: 'action',
          icon: <PersonIcon />,
          primary: 'New Doctor Report',
          secondary: 'Start a new intelligence report',
          action: 'new-report'
        });
        
        // Show recent searches
        if (recentSearches.length > 0) {
          items.push({
            type: 'section',
            label: 'Recent Searches'
          });
          recentSearches.slice(0, 3).forEach(search => {
            items.push({
              type: 'recent',
              icon: <HistoryIcon />,
              primary: search.query,
              secondary: search.timestamp,
              action: 'search',
              data: search
            });
          });
        }
        
        // Show favorites
        if (favorites.length > 0) {
          items.push({
            type: 'section',
            label: 'Favorite Doctors'
          });
          favorites.slice(0, 3).forEach(doctor => {
            items.push({
              type: 'favorite',
              icon: <StarIcon sx={{ color: 'warning.main' }} />,
              primary: doctor.name,
              secondary: `${doctor.specialty} at ${doctor.hospital}`,
              action: 'select-doctor',
              data: doctor
            });
          });
        }
      } else {
        // Search results
        items.push({
          type: 'search',
          icon: <SearchIcon />,
          primary: `Search for "${query}"`,
          secondary: 'Search all doctors',
          action: 'search',
          data: { query }
        });
        
        // Mock search suggestions
        if (query.length > 2) {
          items.push({
            type: 'section',
            label: 'Suggestions'
          });
          items.push({
            type: 'doctor',
            icon: <PersonIcon />,
            primary: `Dr. ${query} Smith`,
            secondary: 'Cardiology at Mayo Clinic',
            action: 'select-doctor',
            data: { name: `Dr. ${query} Smith` }
          });
        }
      }
      
      setResults(items);
    };
    
    buildResults();
  }, [query, recentSearches, favorites]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => {
          const actionableItems = results.filter(r => r.type !== 'section');
          return Math.min(prev + 1, actionableItems.length - 1);
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        const actionableItems = results.filter(r => r.type !== 'section');
        if (actionableItems[selectedIndex]) {
          handleSelect(actionableItems[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    onClose();
  };

  let actionableIndex = -1;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
    >
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <SearchField
            fullWidth
            placeholder="Search doctors, locations, or actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <List sx={{ maxHeight: 400, overflow: 'auto', p: 2 }}>
          {results.map((item, index) => {
            if (item.type === 'section') {
              return (
                <Typography
                  key={index}
                  variant="caption"
                  color="text.secondary"
                  sx={{ px: 2, py: 1, display: 'block' }}
                >
                  {item.label}
                </Typography>
              );
            }
            
            actionableIndex++;
            const isSelected = actionableIndex === selectedIndex;
            
            return (
              <ResultItem
                key={index}
                selected={isSelected}
                onClick={() => handleSelect(item)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                />
                {isSelected && (
                  <ArrowIcon sx={{ color: 'text.secondary', ml: 'auto' }} />
                )}
              </ResultItem>
            );
          })}
        </List>
        
        <Box sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          gap: 2,
          justifyContent: 'center'
        }}>
          <Chip
            size="small"
            label="↑↓ Navigate"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
          <Chip
            size="small"
            label="↵ Select"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
          <Chip
            size="small"
            label="ESC Close"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default CommandPalette;