import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  alpha,
  Fade,
  Skeleton,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  NewReleases as NewIcon,
  LocalOffer as OfferIcon,
  Clear as ClearIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const ProductSelector = ({ value, onChange, onSelect, category = 'medical-devices' }) => {
  const [selectedProduct, setSelectedProduct] = useState(value || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock product data - replace with actual API
  const mockProducts = [
    {
      id: 1,
      name: 'CardioFlow Pro X1',
      category: 'Cardiac Devices',
      manufacturer: 'MedTech Solutions',
      description: 'Advanced cardiac monitoring system with AI-powered analytics',
      image: null,
      price: '$45,000',
      trending: true,
      newRelease: true,
      rating: 4.8,
      features: ['AI Analytics', 'Real-time Monitoring', 'Cloud Connected'],
      approvals: ['FDA', 'CE Mark'],
      targetSpecialties: ['Cardiology', 'Critical Care']
    },
    {
      id: 2,
      name: 'NeuroSync 3000',
      category: 'Neurological Devices',
      manufacturer: 'BrainTech Industries',
      description: 'Precision neurostimulation device for chronic pain management',
      image: null,
      price: '$78,000',
      trending: true,
      newRelease: false,
      rating: 4.6,
      features: ['Wireless Control', 'Adaptive Therapy', 'Patient App'],
      approvals: ['FDA', 'CE Mark', 'Health Canada'],
      targetSpecialties: ['Neurology', 'Pain Management']
    },
    {
      id: 3,
      name: 'OrthoFlex Titanium',
      category: 'Orthopedic Implants',
      manufacturer: 'Joint Innovations',
      description: 'Next-generation hip replacement system with enhanced durability',
      image: null,
      price: '$12,000',
      trending: false,
      newRelease: true,
      rating: 4.9,
      features: ['Titanium Alloy', '30-Year Warranty', 'Minimal Invasive'],
      approvals: ['FDA', 'CE Mark'],
      targetSpecialties: ['Orthopedics', 'Sports Medicine']
    },
    {
      id: 4,
      name: 'DiagnosticPro AI',
      category: 'Diagnostic Equipment',
      manufacturer: 'MedScan Corp',
      description: 'AI-powered diagnostic imaging platform with enhanced accuracy',
      image: null,
      price: '$125,000',
      trending: true,
      newRelease: true,
      rating: 4.7,
      features: ['AI Diagnosis', 'Multi-Modal Imaging', 'PACS Integration'],
      approvals: ['FDA', 'CE Mark'],
      targetSpecialties: ['Radiology', 'Emergency Medicine']
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <CategoryIcon /> },
    { id: 'cardiac', name: 'Cardiac Devices', icon: <CategoryIcon /> },
    { id: 'neuro', name: 'Neurological', icon: <CategoryIcon /> },
    { id: 'ortho', name: 'Orthopedic', icon: <CategoryIcon /> },
    { id: 'diagnostic', name: 'Diagnostic', icon: <CategoryIcon /> },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    onChange(product.name);
    if (onSelect) {
      onSelect(product);
    }
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    onChange('');
    if (onSelect) {
      onSelect(null);
    }
  };

  return (
    <Box>
      {/* Search and Filter Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by name, category, or manufacturer..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: designTokens.colors.text.tertiary }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              backgroundColor: alpha(designTokens.colors.background.card, 0.8),
              backdropFilter: `blur(${designTokens.blur.lg})`,
              borderRadius: designTokens.borderRadius.xl,
            }
          }}
        />

        {/* Category Filter */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.name}
              icon={cat.icon}
              onClick={() => setSelectedCategory(cat.id)}
              color={selectedCategory === cat.id ? 'primary' : 'default'}
              variant={selectedCategory === cat.id ? 'filled' : 'outlined'}
              sx={{
                borderRadius: designTokens.borderRadius.lg,
                transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.inOut}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: designTokens.shadow.md,
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Selected Product Display */}
      {selectedProduct && (
        <Fade in={true}>
          <Card
            sx={{
              mb: 3,
              backgroundColor: alpha(designTokens.colors.success[500], 0.05),
              border: `2px solid ${designTokens.colors.success[500]}`,
              borderRadius: designTokens.borderRadius.xl,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: designTokens.borderRadius.lg,
                      backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon sx={{ color: designTokens.colors.success[500], fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedProduct.manufacturer} • {selectedProduct.price}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleClearSelection} size="small">
                  <ClearIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {loading ? (
          [...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: designTokens.borderRadius.xl }} />
            </Grid>
          ))
        ) : (
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    onClick={() => handleSelectProduct(product)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: designTokens.borderRadius.xl,
                      backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                      backdropFilter: `blur(${designTokens.blur.md})`,
                      border: `1px solid ${
                        selectedProduct?.id === product.id 
                          ? designTokens.colors.success[500] 
                          : designTokens.colors.border.light
                      }`,
                      borderWidth: selectedProduct?.id === product.id ? 2 : 1,
                      transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        borderColor: designTokens.colors.primary[400],
                        boxShadow: designTokens.shadow.lg,
                        backgroundColor: alpha(designTokens.colors.background.card, 0.8),
                      }
                    }}
                  >
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
                      {product.trending && (
                        <Tooltip title="Trending Product">
                          <Badge>
                            <TrendingIcon sx={{ color: designTokens.colors.accent[500], fontSize: 24 }} />
                          </Badge>
                        </Tooltip>
                      )}
                      {product.newRelease && (
                        <Tooltip title="New Release">
                          <Badge>
                            <NewIcon sx={{ color: designTokens.colors.success[500], fontSize: 24 }} />
                          </Badge>
                        </Tooltip>
                      )}
                    </Box>

                    <CardContent>
                      {/* Product Icon Placeholder */}
                      <Box
                        sx={{
                          width: '100%',
                          height: 120,
                          borderRadius: designTokens.borderRadius.lg,
                          backgroundColor: alpha(designTokens.colors.primary[500], 0.05),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          border: `1px solid ${designTokens.colors.border.light}`,
                        }}
                      >
                        <OfferIcon sx={{ fontSize: 48, color: designTokens.colors.primary[300], opacity: 0.5 }} />
                      </Box>

                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {product.name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.category}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
                        {product.description}
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                        <StarIcon sx={{ color: designTokens.colors.accent[500], fontSize: 18 }} />
                        <Typography variant="body2" fontWeight="medium">
                          {product.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 5.0
                        </Typography>
                      </Box>

                      {/* Features */}
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                              color: designTokens.colors.primary[300],
                              fontSize: '0.7rem',
                            }}
                          />
                        ))}
                        {product.features.length > 2 && (
                          <Chip
                            label={`+${product.features.length - 2}`}
                            size="small"
                            sx={{
                              backgroundColor: alpha(designTokens.colors.text.secondary, 0.1),
                              color: designTokens.colors.text.secondary,
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </Box>

                      {/* Price */}
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        )}
      </Grid>
    </Box>
  );
};

export default ProductSelector;