import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Alert,
  Fade,
  Stack,
  Button,
  Divider,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Send as SendIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  LocalHospital as SpecialtyIcon,
  Compare as CompareIcon,
  History as HistoryIcon,
  Lightbulb as SuggestionIcon,
  Clear as ClearIcon,
  Mic as MicIcon
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { useAIQuery } from '../hooks/useAIQuery';
import { designTokens } from '../styles/designTokens';

const QueryContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: `blur(${designTokens.blur.lg})`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
  '&:hover': {
    boxShadow: theme.shadows[8],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
  }
}));

const SuggestionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  cursor: 'pointer',
  transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.inOut}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2]
  }
}));

const IntentIcon = ({ intent }) => {
  const iconMap = {
    SEARCH_DOCTOR: <SearchIcon />,
    FILTER_SPECIALTY: <SpecialtyIcon />,
    FILTER_LOCATION: <LocationIcon />,
    COMPARE: <CompareIcon />
  };
  
  return iconMap[intent] || <AIIcon />;
};

export const AIQueryBar = ({ onQueryResult, onVoiceInput }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  
  const {
    processQuery,
    isProcessing,
    lastQuery,
    queryHistory,
    getSuggestions
  } = useAIQuery();

  useEffect(() => {
    if (query.length > 1) {
      const newSuggestions = getSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, getSuggestions]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!query.trim() || isProcessing) return;
    
    const result = await processQuery(query);
    if (onQueryResult) {
      onQueryResult(result);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleHistoryClick = (historicalQuery) => {
    setQuery(historicalQuery.query);
    setShowHistory(false);
    inputRef.current?.focus();
  };

  const handleVoiceInput = () => {
    if (onVoiceInput) {
      onVoiceInput((text) => {
        setQuery(text);
        // Auto-submit voice queries
        setTimeout(() => handleSubmit(), 500);
      });
    }
  };

  const exampleQueries = [
    "Find cardiologists in New York",
    "Show verified doctors with highest ratings",
    "Compare Dr. Chen and Dr. Roberts",
    "Search pediatric specialists near Mayo Clinic"
  ];

  return (
    <Box position="relative" mb={3}>
      <QueryContainer elevation={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            ref={inputRef}
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about doctors, specialties, or locations..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AIIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Stack direction="row" spacing={1}>
                    {query && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setQuery('');
                          setShowSuggestions(false);
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={handleVoiceInput}
                      color="primary"
                    >
                      <MicIcon />
                    </IconButton>
                    <Tooltip title="Show history">
                      <IconButton
                        size="small"
                        onClick={() => setShowHistory(!showHistory)}
                        color={showHistory ? 'primary' : 'default'}
                      >
                        <HistoryIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      type="submit"
                      color="primary"
                      disabled={!query.trim() || isProcessing}
                    >
                      {isProcessing ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SendIcon />
                      )}
                    </IconButton>
                  </Stack>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: alpha(theme => theme.palette.background.default, 0.5),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme => theme.palette.primary.main, 0.3)
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme => theme.palette.primary.main
                }
              }
            }}
          />
        </form>

        {/* Example Queries */}
        {!query && !showHistory && (
          <Box mt={2}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Try asking:
            </Typography>
            <Box mt={1}>
              {exampleQueries.map((example, index) => (
                <SuggestionChip
                  key={index}
                  label={example}
                  size="small"
                  icon={<SuggestionIcon />}
                  onClick={() => handleSuggestionClick(example)}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Last Query Result */}
        {lastQuery && !showHistory && (
          <Fade in>
            <Box mt={2}>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IntentIcon intent={lastQuery.parsed.intent} />
                  <Typography variant="body2" fontWeight={500}>
                    {lastQuery.response.message}
                  </Typography>
                </Stack>
                {lastQuery.parsed.confidence < 0.5 && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <Typography variant="caption">
                      Not sure what you meant. {lastQuery.parsed.suggestions[0]}
                    </Typography>
                  </Alert>
                )}
              </Stack>
            </Box>
          </Fade>
        )}
      </QueryContainer>

      {/* Suggestions Dropdown */}
      <Collapse in={showSuggestions}>
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 300,
            overflow: 'auto',
            zIndex: 1000,
            backgroundColor: theme => alpha(theme.palette.background.paper, 0.95),
            backdropFilter: `blur(${designTokens.blur.base})`
          }}
        >
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <ListItemIcon>
                  <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Collapse>

      {/* History Dropdown */}
      <Collapse in={showHistory}>
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 400,
            overflow: 'auto',
            zIndex: 1000,
            backgroundColor: theme => alpha(theme.palette.background.paper, 0.95),
            backdropFilter: `blur(${designTokens.blur.base})`
          }}
        >
          <Box p={2}>
            <Typography variant="subtitle2" gutterBottom>
              Recent Queries
            </Typography>
            <List>
              {queryHistory.slice(-5).reverse().map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleHistoryClick(item)}
                >
                  <ListItemIcon>
                    <IntentIcon intent={item.parsed.intent} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.query}
                    secondary={new Date(item.timestamp).toLocaleTimeString()}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};