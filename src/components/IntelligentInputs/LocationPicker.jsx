import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Fade,
  alpha,
  CircularProgress
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  MyLocation as MyLocationIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Place as PlaceIcon,
  LocalHospital as HospitalIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const LocationPicker = ({ value, onChange, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const searchTimeout = useRef(null);

  // Mock location data - replace with actual geocoding API
  const mockSearchLocations = async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockLocations = [
          {
            id: 1,
            name: 'New York, NY',
            fullAddress: 'New York, NY, United States',
            type: 'city',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            population: '8.3M',
            medicalFacilities: 152
          },
          {
            id: 2,
            name: 'Mount Sinai Hospital',
            fullAddress: '1 Gustave L. Levy Pl, New York, NY 10029',
            type: 'hospital',
            coordinates: { lat: 40.7899, lng: -73.9526 },
            beds: 1134,
            specialties: ['Cardiology', 'Oncology', 'Neurology']
          },
          {
            id: 3,
            name: 'Manhattan Medical District',
            fullAddress: 'Upper East Side, Manhattan, NY',
            type: 'district',
            coordinates: { lat: 40.7735, lng: -73.9566 },
            facilities: 23,
            coverage: '2.5 sq mi'
          },
        ].filter(loc => 
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.fullAddress.toLowerCase().includes(query.toLowerCase())
        );
        resolve(mockLocations);
      }, 500);
    });
  };

  const handleGetUserLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Mock reverse geocoding
          const userLoc = {
            id: 'user',
            name: 'Current Location',
            fullAddress: 'Your current location',
            type: 'current',
            coordinates: { lat: latitude, lng: longitude }
          };
          setUserLocation(userLoc);
          handleSelectLocation(userLoc);
          setLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          setLoading(false);
        }
      );
    }
  };

  const handleSearch = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await mockSearchLocations(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setShowSuggestions(false);
    onChange(location.name);
    if (onSelect) {
      onSelect(location);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedLocation(null);
    setSuggestions([]);
    setShowSuggestions(false);
    onChange('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
    if (selectedLocation && value !== selectedLocation.name) {
      setSelectedLocation(null);
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <HospitalIcon />;
      case 'district':
        return <BusinessIcon />;
      case 'current':
        return <MyLocationIcon />;
      default:
        return <LocationIcon />;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'hospital':
        return designTokens.colors.accent[500];
      case 'district':
        return designTokens.colors.primary[500];
      case 'current':
        return designTokens.colors.success[500];
      default:
        return designTokens.colors.text.secondary;
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search for a city, hospital, or medical district..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationIcon sx={{ color: designTokens.colors.text.tertiary }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading && <CircularProgress size={20} />}
              {!loading && (
                <>
                  <IconButton 
                    onClick={handleGetUserLocation} 
                    size="small"
                    sx={{ 
                      mr: 1,
                      color: designTokens.colors.accent[500],
                      '&:hover': {
                        backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                      }
                    }}
                  >
                    <MyLocationIcon />
                  </IconButton>
                  {searchTerm && (
                    <IconButton onClick={handleClear} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                </>
              )}
            </InputAdornment>
          ),
          sx: {
            backgroundColor: alpha(designTokens.colors.background.card, 0.8),
            backdropFilter: `blur(${designTokens.blur.lg})`,
            borderRadius: designTokens.borderRadius.xl,
            '& fieldset': {
              borderColor: selectedLocation 
                ? designTokens.colors.success[500] 
                : designTokens.colors.border.light,
              borderWidth: selectedLocation ? 2 : 1,
            },
            '&:hover fieldset': {
              borderColor: selectedLocation 
                ? designTokens.colors.success[400] 
                : designTokens.colors.border.medium,
            },
          }
        }}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: designTokens.typography.fontSize.lg,
            fontWeight: selectedLocation ? designTokens.typography.fontWeight.medium : 'normal',
          }
        }}
      />

      {selectedLocation && (
        <Fade in={true}>
          <Box 
            sx={{ 
              mt: 2, 
              p: 2,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              borderRadius: designTokens.borderRadius.lg,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: designTokens.borderRadius.lg,
                  backgroundColor: alpha(getLocationColor(selectedLocation.type), 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${getLocationColor(selectedLocation.type)}`,
                }}
              >
                {React.cloneElement(getLocationIcon(selectedLocation.type), {
                  sx: { color: getLocationColor(selectedLocation.type) }
                })}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="medium">
                  {selectedLocation.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedLocation.fullAddress}
                </Typography>
              </Box>
            </Box>

            {selectedLocation.type === 'city' && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Chip
                  size="small"
                  label={`Population: ${selectedLocation.population}`}
                  sx={{ 
                    backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                    color: designTokens.colors.primary[300]
                  }}
                />
                <Chip
                  size="small"
                  label={`${selectedLocation.medicalFacilities} Medical Facilities`}
                  sx={{ 
                    backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                    color: designTokens.colors.accent[300]
                  }}
                />
              </Box>
            )}

            {selectedLocation.type === 'hospital' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Specialties:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedLocation.specialties?.map((specialty, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={specialty}
                      sx={{ 
                        backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                        color: designTokens.colors.accent[300]
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      )}

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: designTokens.spacing[2],
              zIndex: designTokens.zIndex.dropdown,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                backdropFilter: `blur(${designTokens.blur.xl})`,
                border: `1px solid ${designTokens.colors.border.light}`,
                borderRadius: designTokens.borderRadius.xl,
                overflow: 'hidden',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              <List sx={{ p: 0 }}>
                {suggestions.map((location, index) => (
                  <ListItem
                    key={location.id}
                    button
                    onClick={() => handleSelectLocation(location)}
                    sx={{
                      py: 2,
                      px: 3,
                      borderBottom: index < suggestions.length - 1 
                        ? `1px solid ${designTokens.colors.border.light}` 
                        : 'none',
                      transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.inOut}`,
                      '&:hover': {
                        backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: designTokens.borderRadius.md,
                          backgroundColor: alpha(getLocationColor(location.type), 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${getLocationColor(location.type)}`,
                        }}
                      >
                        {React.cloneElement(getLocationIcon(location.type), {
                          sx: { color: getLocationColor(location.type), fontSize: 20 }
                        })}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {location.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {location.fullAddress}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LocationPicker;