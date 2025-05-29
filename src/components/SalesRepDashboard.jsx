import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Slide,
  Zoom,
  Paper,
  Chip,
  LinearProgress,
  Avatar,
  Tooltip,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab
} from '@mui/material';
import {
  Assessment,
  Favorite,
  Psychology,
  Gavel,
  Shield,
  EmojiEvents,
  GraphicEq,
  AutoAwesome,
  Person,
  Warning,
  Close,
  TrendingUp,
  Speed,
  Timer,
  PlayCircle,
  Insights,
  Analytics
} from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';
import { AI_ANALYSIS_TYPES, generateAnalysisForType } from '../utils/aiAnalysisTypes';
import { generateMockConversation } from '../utils/mockDataGenerator';

// Animated background component
const AnimatedBackground = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
          animation: 'float 20s ease-in-out infinite',
        }
      }}
    />
  );
};

// Icon mapping
const iconMap = {
  Assessment,
  Favorite,
  Psychology,
  Gavel,
  Shield,
  EmojiEvents,
  GraphicEq,
  AutoAwesome,
  Person,
  Warning
};

// Analysis Card Component
const AnalysisCard = ({ analysis, onClick, delay }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[analysis.icon] || Assessment;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={() => onClick(analysis)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'visible',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(analysis.color, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
            : `linear-gradient(135deg, ${alpha(analysis.color, 0.05)} 0%, rgba(255, 255, 255, 0.9) 100%)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(analysis.color, 0.2)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 20px 40px ${alpha(analysis.color, 0.2)}`,
            borderColor: analysis.color,
            '&::before': {
              opacity: 1,
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: analysis.gradient,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: -1,
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: isHovered ? analysis.gradient : alpha(analysis.color, 0.1),
                color: isHovered ? '#FFFFFF' : analysis.color,
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? `0 8px 24px ${alpha(analysis.color, 0.4)}` : 'none',
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Avatar>
            {analysis.persona && (
              <Chip
                label={analysis.persona}
                size="small"
                sx={{
                  ml: 'auto',
                  background: alpha(analysis.color, 0.1),
                  color: analysis.color,
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              color: isHovered ? analysis.color : 'text.primary',
              transition: 'color 0.3s ease'
            }}
          >
            {analysis.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, minHeight: 48 }}
          >
            {analysis.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {analysis.insights.slice(0, 3).map((insight, index) => (
              <Chip
                key={index}
                label={insight}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  bgcolor: alpha(analysis.color, 0.08),
                  color: analysis.color,
                  border: `1px solid ${alpha(analysis.color, 0.2)}`,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Quick Stats Card
const QuickStatCard = ({ title, value, change, icon, color, delay }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : '#FFFFFF',
          border: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: color,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5 }}>
              {value}
            </Typography>
            {change && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: change.includes('+') ? 'success.main' : 'error.main',
                  fontWeight: 600 
                }}
              >
                {change} from last week
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Analysis Dialog
const AnalysisDialog = ({ open, onClose, analysisType, data }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  if (!analysisType || !data) return null;
  
  const Icon = iconMap[analysisType.icon] || Assessment;
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          background: theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: analysisType.color, width: 48, height: 48 }}>
              <Icon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analysisType.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-Powered Analysis Results
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ minHeight: 400, p: 2 }}>
          {/* Dynamic content based on analysis type */}
          <Typography variant="body1">
            Detailed {analysisType.name} analysis would appear here with rich visualizations and insights.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const SalesRepDashboard = () => {
  const theme = useTheme();
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  
  useEffect(() => {
    // Load mock conversation data
    const mockConv = generateMockConversation();
    setCurrentConversation(mockConv);
  }, []);
  
  const handleAnalysisClick = (analysis) => {
    const data = generateAnalysisForType(analysis.id, currentConversation);
    setSelectedAnalysis(analysis);
    setAnalysisData(data);
    setDialogOpen(true);
  };
  
  const quickStats = [
    { title: 'Conversations Today', value: '12', change: '+20%', icon: <Analytics />, color: '#4CAF50' },
    { title: 'Avg Score', value: '87%', change: '+5%', icon: <TrendingUp />, color: '#2196F3' },
    { title: 'Pipeline Added', value: '$450K', change: '+32%', icon: <Speed />, color: '#FF9800' },
    { title: 'Time Saved', value: '3.5h', change: '+15%', icon: <Timer />, color: '#9C27B0' },
  ];
  
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatedBackground />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900,
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)'
                  : 'linear-gradient(135deg, #1A237E 0%, #3949AB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              AI Sales Intelligence Hub
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Choose your AI analysis perspective to unlock conversation insights
            </Typography>
          </Box>
        </motion.div>
        
        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.title}>
              <QuickStatCard {...stat} delay={index * 0.1} />
            </Grid>
          ))}
        </Grid>
        
        {/* Current Conversation */}
        {currentConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {currentConversation.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentConversation.dateString} • {currentConversation.duration} minutes • Score: {currentConversation.score}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<PlayCircle />}
                  sx={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                    }
                  }}
                >
                  Play Recording
                </Button>
              </Box>
            </Paper>
          </motion.div>
        )}
        
        {/* AI Analysis Grid */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Choose Your Analysis Lens
        </Typography>
        
        <Grid container spacing={3}>
          {Object.values(AI_ANALYSIS_TYPES).map((analysis, index) => (
            <Grid item xs={12} sm={6} md={4} key={analysis.id}>
              <AnalysisCard 
                analysis={analysis} 
                onClick={handleAnalysisClick}
                delay={index * 0.05}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Analysis Dialog */}
      <AnalysisDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        analysisType={selectedAnalysis}
        data={analysisData}
      />
    </Box>
  );
};

export default SalesRepDashboard;