import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  useTheme,
  alpha,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  Rating
} from '@mui/material';
import {
  Search,
  Star,
  TrendingUp,
  Speed,
  Memory,
  Category,
  FilterList,
  Launch,
  Favorite,
  FavoriteBorder,
  Share,
  Settings,
  ModelTraining,
  Psychology,
  Code,
  AutoAwesome,
  ChatBubbleOutline,
  Image,
  DataObject,
  SmartToy,
  Lightbulb,
  Security,
  MonetizationOn,
  AccessTime
} from '@mui/icons-material';
import { getAvailableModels } from '../utils/openRouterClient';

const AIModelsView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [speedFilter, setSpeedFilter] = useState('all');

  // Model categories with icons and colors
  const categories = [
    { id: 'all', label: 'All Models', icon: <ModelTraining />, color: '#A78BFA' },
    { id: 'gpt', label: 'GPT Series', icon: <ChatBubbleOutline />, color: '#10B981' },
    { id: 'claude', label: 'Claude', icon: <Psychology />, color: '#F59E0B' },
    { id: 'gemini', label: 'Gemini', icon: <AutoAwesome />, color: '#3B82F6' },
    { id: 'coding', label: 'Coding', icon: <Code />, color: '#8B5CF6' },
    { id: 'creative', label: 'Creative', icon: <Lightbulb />, color: '#EC4899' },
    { id: 'vision', label: 'Vision', icon: <Image />, color: '#06B6D4' },
    { id: 'reasoning', label: 'Reasoning', icon: <SmartToy />, color: '#EF4444' }
  ];

  // Mock enhanced model data (this would come from OpenRouter API)
  const mockModels = [
    {
      id: 'gpt-4o',
      name: 'GPT-4 Omni',
      provider: 'OpenAI',
      category: 'gpt',
      description: 'Most capable GPT-4 model with multimodal capabilities including vision, audio, and text',
      context_length: 128000,
      pricing: {
        prompt: 5.00,
        completion: 15.00
      },
      speed: 'fast',
      capabilities: ['text', 'vision', 'audio', 'reasoning'],
      performance_score: 9.8,
      popularity: 95,
      featured: true,
      trending: true,
      strengths: [
        'Exceptional reasoning capabilities',
        'Multimodal understanding',
        'High accuracy on complex tasks',
        'Strong coding abilities'
      ],
      use_cases: [
        'Complex analysis and reasoning',
        'Multimodal content understanding',
        'Advanced coding assistance',
        'Research and writing'
      ],
      limitations: [
        'Higher cost per token',
        'Rate limits on high usage'
      ]
    },
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      category: 'claude',
      description: 'Latest Claude model with improved reasoning, coding, and creative capabilities',
      context_length: 200000,
      pricing: {
        prompt: 3.00,
        completion: 15.00
      },
      speed: 'fast',
      capabilities: ['text', 'vision', 'reasoning', 'creative'],
      performance_score: 9.6,
      popularity: 88,
      featured: true,
      trending: false,
      strengths: [
        'Excellent creative writing',
        'Strong analytical thinking',
        'Large context window',
        'Helpful and harmless responses'
      ],
      use_cases: [
        'Creative writing and content',
        'Complex document analysis',
        'Research assistance',
        'Educational content'
      ],
      limitations: [
        'Less coding-focused than GPT-4',
        'Newer model with limited track record'
      ]
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4 Omni Mini',
      provider: 'OpenAI',
      category: 'gpt',
      description: 'Faster, more cost-effective version of GPT-4 Omni with excellent performance',
      context_length: 128000,
      pricing: {
        prompt: 0.15,
        completion: 0.60
      },
      speed: 'very_fast',
      capabilities: ['text', 'vision', 'reasoning'],
      performance_score: 9.0,
      popularity: 92,
      featured: false,
      trending: true,
      strengths: [
        'Excellent price-performance ratio',
        'Fast response times',
        'Good reasoning capabilities',
        'Multimodal support'
      ],
      use_cases: [
        'High-volume applications',
        'Real-time chat applications',
        'Educational tools',
        'Content moderation'
      ],
      limitations: [
        'Slightly lower capability than full GPT-4',
        'Limited audio processing'
      ]
    },
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      category: 'gemini',
      description: 'Google\'s most advanced model with huge context and multimodal capabilities',
      context_length: 2000000,
      pricing: {
        prompt: 3.50,
        completion: 10.50
      },
      speed: 'medium',
      capabilities: ['text', 'vision', 'audio', 'video', 'reasoning'],
      performance_score: 9.3,
      popularity: 76,
      featured: true,
      trending: false,
      strengths: [
        'Massive context window (2M tokens)',
        'Strong multimodal capabilities',
        'Excellent for long documents',
        'Good reasoning performance'
      ],
      use_cases: [
        'Long document analysis',
        'Video content understanding',
        'Large-scale data processing',
        'Research applications'
      ],
      limitations: [
        'Slower response times',
        'Higher latency for complex tasks'
      ]
    },
    {
      id: 'deepseek-coder-v2',
      name: 'DeepSeek Coder V2',
      provider: 'DeepSeek',
      category: 'coding',
      description: 'Specialized coding model with exceptional programming capabilities',
      context_length: 128000,
      pricing: {
        prompt: 0.14,
        completion: 0.28
      },
      speed: 'fast',
      capabilities: ['text', 'coding', 'reasoning'],
      performance_score: 8.9,
      popularity: 67,
      featured: false,
      trending: true,
      strengths: [
        'Exceptional coding performance',
        'Very cost-effective',
        'Good at code explanation',
        'Multiple programming languages'
      ],
      use_cases: [
        'Code generation and review',
        'Programming assistance',
        'Technical documentation',
        'Algorithm development'
      ],
      limitations: [
        'Less capable for general tasks',
        'Focused primarily on coding'
      ]
    }
  ];

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    filterModels();
  }, [models, searchTerm, selectedCategory, priceRange, speedFilter]);

  const loadModels = async () => {
    setLoading(true);
    try {
      // Try to fetch real models from OpenRouter
      const data = await getAvailableModels();
      if (data && data.length > 0) {
        // Process OpenRouter data into our format
        const processedModels = data.slice(0, 20).map(model => ({
          id: model.id,
          name: model.name || model.id,
          provider: model.id.split('/')[0] || 'Unknown',
          category: determineCategory(model.id),
          description: model.description || 'AI model for various tasks',
          context_length: model.context_length || 4096,
          pricing: {
            prompt: parseFloat(model.pricing?.prompt || '0') * 1000000,
            completion: parseFloat(model.pricing?.completion || '0') * 1000000
          },
          speed: 'fast',
          capabilities: ['text', 'reasoning'],
          performance_score: Math.random() * 2 + 8, // Random score between 8-10
          popularity: Math.floor(Math.random() * 40) + 60, // Random popularity 60-100
          featured: Math.random() > 0.8,
          trending: Math.random() > 0.7,
          strengths: ['High performance', 'Reliable responses', 'Good accuracy'],
          use_cases: ['General tasks', 'Content generation', 'Analysis'],
          limitations: ['Rate limits may apply']
        }));
        setModels([...processedModels, ...mockModels]);
      } else {
        // Use mock data as fallback
        setModels(mockModels);
      }
    } catch (error) {
      console.error('Error loading models:', error);
      // Use mock data as fallback
      setModels(mockModels);
    } finally {
      setLoading(false);
    }
  };

  const determineCategory = (modelId) => {
    if (modelId.includes('gpt')) return 'gpt';
    if (modelId.includes('claude')) return 'claude';
    if (modelId.includes('gemini')) return 'gemini';
    if (modelId.includes('code') || modelId.includes('coder')) return 'coding';
    if (modelId.includes('creative') || modelId.includes('art')) return 'creative';
    if (modelId.includes('vision') || modelId.includes('image')) return 'vision';
    return 'reasoning';
  };

  const filterModels = () => {
    let filtered = models;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(model => model.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(model =>
      model.pricing.prompt >= priceRange[0] && model.pricing.prompt <= priceRange[1]
    );

    // Filter by speed
    if (speedFilter !== 'all') {
      filtered = filtered.filter(model => model.speed === speedFilter);
    }

    setFilteredModels(filtered);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setDialogOpen(true);
  };

  const toggleFavorite = (modelId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(modelId)) {
        newFavorites.delete(modelId);
      } else {
        newFavorites.add(modelId);
      }
      return newFavorites;
    });
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : <ModelTraining />;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#A78BFA';
  };

  const getSpeedColor = (speed) => {
    switch (speed) {
      case 'very_fast': return '#10B981';
      case 'fast': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'slow': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSpeedLabel = (speed) => {
    switch (speed) {
      case 'very_fast': return 'Very Fast';
      case 'fast': return 'Fast';
      case 'medium': return 'Medium';
      case 'slow': return 'Slow';
      default: return 'Unknown';
    }
  };

  const ModelCard = ({ model }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(21, 24, 39, 0.9) 0%, rgba(11, 14, 31, 0.9) 100%)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(getCategoryColor(model.category), 0.2)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${alpha(getCategoryColor(model.category), 0.15)}`,
          borderColor: alpha(getCategoryColor(model.category), 0.4)
        }
      }}
    >
      {/* Featured/Trending Badges */}
      {(model.featured || model.trending) && (
        <Box sx={{ position: 'absolute', top: -8, right: 12, zIndex: 1 }}>
          {model.featured && (
            <Chip
              icon={<Star sx={{ fontSize: 14 }} />}
              label="Featured"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                color: 'white',
                fontWeight: 600,
                mr: 1
              }}
            />
          )}
          {model.trending && (
            <Chip
              icon={<TrendingUp sx={{ fontSize: 14 }} />}
              label="Trending"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                fontWeight: 600
              }}
            />
          )}
        </Box>
      )}

      <CardContent sx={{ flex: 1, pt: model.featured || model.trending ? 3 : 2 }}>
        {/* Provider & Model Name */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${getCategoryColor(model.category)} 0%, ${alpha(getCategoryColor(model.category), 0.7)} 100%)`,
              mr: 2,
              mt: 0.5
            }}
          >
            {getCategoryIcon(model.category)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                lineHeight: 1.3,
                mb: 0.5,
                color: theme.palette.text.primary
              }}
            >
              {model.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: getCategoryColor(model.category),
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {model.provider}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.5,
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {model.description}
            </Typography>
          </Box>
        </Box>

        {/* Capabilities */}
        <Box sx={{ mb: 2 }}>
          {model.capabilities.slice(0, 4).map((capability, index) => (
            <Chip
              key={index}
              label={capability}
              size="small"
              sx={{
                mr: 0.5,
                mb: 0.5,
                fontSize: '0.7rem',
                height: 20,
                background: alpha(getCategoryColor(model.category), 0.1),
                color: getCategoryColor(model.category),
                border: `1px solid ${alpha(getCategoryColor(model.category), 0.2)}`
              }}
            />
          ))}
        </Box>

        {/* Key Metrics */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: '#F59E0B' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {model.performance_score}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Speed sx={{ fontSize: 16, color: getSpeedColor(model.speed) }} />
              <Typography variant="body2" sx={{ color: getSpeedColor(model.speed), fontWeight: 600 }}>
                {getSpeedLabel(model.speed)}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Memory sx={{ fontSize: 16, color: '#6B7280' }} />
              <Typography variant="body2" color="text.secondary">
                {(model.context_length / 1000).toFixed(0)}K
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MonetizationOn sx={{ fontSize: 16, color: '#6B7280' }} />
              <Typography variant="body2" color="text.secondary">
                ${model.pricing.prompt}/1M
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Performance Bar */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Performance Score
          </Typography>
          <LinearProgress
            variant="determinate"
            value={model.performance_score * 10}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(getCategoryColor(model.category), 0.1),
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${getCategoryColor(model.category)} 0%, ${alpha(getCategoryColor(model.category), 0.7)} 100%)`,
                borderRadius: 3
              }
            }}
          />
        </Box>

        {/* Popularity */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Community Popularity
          </Typography>
          <LinearProgress
            variant="determinate"
            value={model.popularity}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: alpha('#6B7280', 0.1),
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                borderRadius: 2
              }
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleModelSelect(model)}
          sx={{
            background: `linear-gradient(135deg, ${getCategoryColor(model.category)} 0%, ${alpha(getCategoryColor(model.category), 0.8)} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(getCategoryColor(model.category), 0.9)} 0%, ${alpha(getCategoryColor(model.category), 0.7)} 100%)`,
            }
          }}
        >
          View Details
        </Button>
        <IconButton
          onClick={() => toggleFavorite(model.id)}
          sx={{ color: favorites.has(model.id) ? '#EF4444' : '#6B7280' }}
        >
          {favorites.has(model.id) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          AI Models Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          300+ cutting-edge AI models at your fingertips
        </Typography>

        {/* Search and Advanced Toggle */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 3
        }}>
          <TextField
            placeholder="Search models, providers, or capabilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ flex: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
              />
            }
            label="Advanced Filters"
          />
        </Box>

        {/* Advanced Filters */}
        {showAdvanced && (
          <Card sx={{ p: 3, mb: 3, background: alpha(theme.palette.background.paper, 0.5) }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Price Range ($/1M tokens)
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={20}
                  step={0.5}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Speed Filter
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['all', 'very_fast', 'fast', 'medium', 'slow'].map((speed) => (
                    <Chip
                      key={speed}
                      label={speed === 'all' ? 'All' : getSpeedLabel(speed)}
                      onClick={() => setSpeedFilter(speed)}
                      variant={speedFilter === speed ? 'filled' : 'outlined'}
                      sx={{
                        ...(speedFilter === speed && {
                          background: speed === 'all' ? '#A78BFA' : getSpeedColor(speed),
                          color: 'white'
                        })
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}

        {/* Category Filters */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 3
        }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              sx={{
                ...(selectedCategory === category.id ? {
                  background: `linear-gradient(135deg, ${category.color} 0%, ${alpha(category.color, 0.8)} 100%)`,
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                } : {
                  borderColor: alpha(category.color, 0.3),
                  color: category.color,
                  '&:hover': {
                    backgroundColor: alpha(category.color, 0.1)
                  }
                })
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Models Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <LinearProgress sx={{ width: 200 }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredModels.map((model) => (
            <Grid item xs={12} sm={6} lg={4} key={model.id}>
              <Fade in timeout={300}>
                <Box>
                  <ModelCard model={model} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Model Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark'
              ? 'rgba(11, 14, 31, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(selectedModel ? getCategoryColor(selectedModel.category) : '#A78BFA', 0.2)}`
          }
        }}
      >
        {selectedModel && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: `linear-gradient(135deg, ${getCategoryColor(selectedModel.category)} 0%, ${alpha(getCategoryColor(selectedModel.category), 0.7)} 100%)`
                  }}
                >
                  {getCategoryIcon(selectedModel.category)}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {selectedModel.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    by {selectedModel.provider}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Overview
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {selectedModel.description}
                  </Typography>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Strengths
                  </Typography>
                  <List dense>
                    {selectedModel.strengths.map((strength, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Star sx={{ fontSize: 16, color: '#10B981' }} />
                        </ListItemIcon>
                        <ListItemText primary={strength} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Specifications
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Context Length:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedModel.context_length.toLocaleString()} tokens
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Input Price:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${selectedModel.pricing.prompt}/1M tokens
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Output Price:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${selectedModel.pricing.completion}/1M tokens
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Speed:</Typography>
                      <Chip
                        label={getSpeedLabel(selectedModel.speed)}
                        size="small"
                        sx={{
                          background: getSpeedColor(selectedModel.speed),
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Use Cases
                  </Typography>
                  <List dense>
                    {selectedModel.use_cases.map((useCase, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Lightbulb sx={{ fontSize: 16, color: getCategoryColor(selectedModel.category) }} />
                        </ListItemIcon>
                        <ListItemText primary={useCase} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${getCategoryColor(selectedModel.category)} 0%, ${alpha(getCategoryColor(selectedModel.category), 0.8)} 100%)`
                }}
              >
                Select Model
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AIModelsView;