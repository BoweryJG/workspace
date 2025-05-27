import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  InputAdornment,
  CircularProgress,
  Chip,
  IconButton,
  Fade,
  alpha
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Person as PersonIcon,
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
  Verified as VerifiedIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const DoctorSearchInput = ({ value, onChange, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const searchTimeout = useRef(null);
  const inputRef = useRef(null);

  // Mock doctor data - replace with actual API call
  const mockSearchDoctors = async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockDoctors = [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            hospital: 'Mount Sinai Hospital',
            location: 'New York, NY',
            verified: true,
            image: null,
            npi: '1234567890',
            rating: 4.8,
            patients: 1250
          },
          {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Neurology',
            hospital: 'Mayo Clinic',
            location: 'Rochester, MN',
            verified: true,
            image: null,
            npi: '0987654321',
            rating: 4.9,
            patients: 890
          },
          {
            id: 3,
            name: 'Dr. Emily Rodriguez',
            specialty: 'Oncology',
            hospital: 'Johns Hopkins',
            location: 'Baltimore, MD',
            verified: false,
            image: null,
            npi: '5432167890',
            rating: 4.7,
            patients: 1100
          },
        ].filter(doc => 
          doc.name.toLowerCase().includes(query.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(query.toLowerCase()) ||
          doc.hospital.toLowerCase().includes(query.toLowerCase())
        );
        resolve(mockDoctors);
      }, 500);
    });
  };

  const handleSearch = useCallback(async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await mockSearchDoctors(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [searchTerm, handleSearch]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSearchTerm(doctor.name);
    setShowSuggestions(false);
    onChange(doctor.name);
    if (onSelect) {
      onSelect(doctor);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedDoctor(null);
    setSuggestions([]);
    setShowSuggestions(false);
    onChange('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
    if (selectedDoctor && value !== selectedDoctor.name) {
      setSelectedDoctor(null);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        ref={inputRef}
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search for a doctor by name, specialty, or hospital..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: designTokens.colors.text.tertiary }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading && <CircularProgress size={20} />}
              {searchTerm && !loading && (
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
          sx: {
            backgroundColor: alpha(designTokens.colors.background.card, 0.8),
            backdropFilter: `blur(${designTokens.blur.lg})`,
            borderRadius: designTokens.borderRadius.xl,
            '& fieldset': {
              borderColor: selectedDoctor 
                ? designTokens.colors.success[500] 
                : designTokens.colors.border.light,
              borderWidth: selectedDoctor ? 2 : 1,
            },
            '&:hover fieldset': {
              borderColor: selectedDoctor 
                ? designTokens.colors.success[400] 
                : designTokens.colors.border.medium,
            },
          }
        }}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: designTokens.typography.fontSize.lg,
            fontWeight: selectedDoctor ? designTokens.typography.fontWeight.medium : 'normal',
          }
        }}
      />

      {selectedDoctor && (
        <Fade in={true}>
          <Box sx={{ 
            mt: 1, 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            animation: `pulse 2s ${designTokens.animation.easing.inOut} infinite`,
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.8 },
            }
          }}>
            <Chip
              icon={<PersonIcon />}
              label={selectedDoctor.specialty}
              size="small"
              sx={{ 
                backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                borderColor: designTokens.colors.primary[500],
                color: designTokens.colors.primary[300]
              }}
              variant="outlined"
            />
            <Chip
              icon={<HospitalIcon />}
              label={selectedDoctor.hospital}
              size="small"
              sx={{ 
                backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                borderColor: designTokens.colors.accent[500],
                color: designTokens.colors.accent[300]
              }}
              variant="outlined"
            />
            {selectedDoctor.verified && (
              <Chip
                icon={<VerifiedIcon />}
                label="Verified"
                size="small"
                sx={{ 
                  backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                  borderColor: designTokens.colors.success[500],
                  color: designTokens.colors.success[300]
                }}
                variant="outlined"
              />
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
                {suggestions.map((doctor, index) => (
                  <ListItem
                    key={doctor.id}
                    button
                    onClick={() => handleSelectDoctor(doctor)}
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
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: alpha(designTokens.colors.primary[500], 0.2),
                          color: designTokens.colors.primary[300],
                          border: `2px solid ${designTokens.colors.primary[500]}`,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {doctor.name}
                          </Typography>
                          {doctor.verified && (
                            <VerifiedIcon 
                              sx={{ 
                                fontSize: 16, 
                                color: designTokens.colors.success[500] 
                              }} 
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.specialty} • {doctor.hospital}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <LocationIcon sx={{ fontSize: 14, color: designTokens.colors.text.tertiary }} />
                            <Typography variant="caption" color="text.tertiary">
                              {doctor.location}
                            </Typography>
                            <Typography variant="caption" color="text.tertiary">
                              • {doctor.patients} patients • {doctor.rating} ★
                            </Typography>
                          </Box>
                        </Box>
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

export default DoctorSearchInput;