import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
  Collapse,
  Fade,
  Stack,
  Button,
  alpha,
  Divider,
  CircularProgress,
  Tooltip,
  Grid
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  ExpandMore as ExpandIcon,
  Check as CheckIcon,
  AutoAwesome as AIIcon,
  Analytics as AnalyticsIcon,
  Psychology as InsightIcon,
  Source as SourceIcon,
  Speed as SpeedIcon,
  HighQuality as QualityIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const ReportGenerationUI = ({ 
  isGenerating, 
  onStart, 
  onPause, 
  onStop,
  reportData,
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [qualityScore, setQualityScore] = useState(0);
  const [sources, setSources] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const generationPhases = [
    {
      id: 'research',
      name: 'Deep Research',
      description: 'Analyzing medical databases and publications',
      icon: <AnalyticsIcon />,
      duration: 3000,
      color: designTokens.colors.primary[500]
    },
    {
      id: 'analysis',
      name: 'AI Analysis',
      description: 'Processing data with advanced AI models',
      icon: <AIIcon />,
      duration: 4000,
      color: designTokens.colors.accent[500]
    },
    {
      id: 'insights',
      name: 'Extracting Insights',
      description: 'Identifying key patterns and opportunities',
      icon: <InsightIcon />,
      duration: 3000,
      color: designTokens.colors.success[500]
    },
    {
      id: 'compilation',
      name: 'Report Compilation',
      description: 'Assembling comprehensive report',
      icon: <SourceIcon />,
      duration: 2000,
      color: designTokens.colors.primary[400]
    }
  ];

  // Simulate generation progress
  useEffect(() => {
    if (!isGenerating || isPaused) return;

    const totalDuration = generationPhases.reduce((acc, phase) => acc + phase.duration, 0);
    const increment = 100 / (totalDuration / 100);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);
        
        // Update current phase based on progress
        let accumulatedProgress = 0;
        for (let i = 0; i < generationPhases.length; i++) {
          const phaseProgress = (generationPhases[i].duration / totalDuration) * 100;
          accumulatedProgress += phaseProgress;
          if (newProgress <= accumulatedProgress) {
            setCurrentPhase(i);
            break;
          }
        }

        // Simulate quality score increase
        setQualityScore(Math.floor(newProgress * 0.95));

        // Add mock sources periodically
        if (newProgress % 20 < increment) {
          setSources(prev => [...prev, {
            id: Date.now(),
            title: `Medical Research Paper ${Math.floor(newProgress / 20)}`,
            relevance: Math.floor(Math.random() * 20) + 80
          }]);
        }

        // Add insights periodically
        if (newProgress % 30 < increment) {
          setInsights(prev => [...prev, {
            id: Date.now(),
            text: `Key insight discovered: Pattern ${Math.floor(newProgress / 30)}`,
            importance: Math.random() > 0.5 ? 'high' : 'medium'
          }]);
        }

        if (newProgress >= 100 && onComplete) {
          onComplete();
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating, isPaused, generationPhases, onComplete]);

  const handleToggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (onPause) onPause();
  };

  const getPhaseProgress = (phaseIndex) => {
    if (phaseIndex < currentPhase) return 100;
    if (phaseIndex > currentPhase) return 0;
    
    const phasesCompleted = generationPhases.slice(0, currentPhase).reduce((acc, phase) => acc + phase.duration, 0);
    const totalDuration = generationPhases.reduce((acc, phase) => acc + phase.duration, 0);
    const phaseStartProgress = (phasesCompleted / totalDuration) * 100;
    const phaseEndProgress = ((phasesCompleted + generationPhases[currentPhase].duration) / totalDuration) * 100;
    
    return ((progress - phaseStartProgress) / (phaseEndProgress - phaseStartProgress)) * 100;
  };

  return (
    <Box>
      {/* Main Progress Card */}
      <Card
        sx={{
          borderRadius: designTokens.borderRadius.xl,
          backgroundColor: alpha(designTokens.colors.background.card, 0.6),
          backdropFilter: `blur(${designTokens.blur.lg})`,
          border: `1px solid ${designTokens.colors.border.light}`,
          overflow: 'visible',
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                AI Report Generation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Creating comprehensive medical sales intelligence report
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {!isGenerating ? (
                <Button
                  variant="contained"
                  startIcon={<PlayIcon />}
                  onClick={onStart}
                  sx={{
                    borderRadius: designTokens.borderRadius.lg,
                    background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
                  }}
                >
                  Start Generation
                </Button>
              ) : (
                <>
                  <IconButton onClick={handlePause} color="primary">
                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                  </IconButton>
                  <IconButton onClick={onStop} color="error">
                    <StopIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          {/* Overall Progress */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                Overall Progress
              </Typography>
              <Typography variant="body2" color="primary" fontWeight="bold">
                {Math.floor(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: designTokens.borderRadius.full,
                backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: designTokens.borderRadius.full,
                  background: `linear-gradient(90deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.accent[500]} 100%)`,
                }
              }}
            />
          </Box>

          {/* Phase Progress */}
          <Stack spacing={2}>
            {generationPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: designTokens.borderRadius.lg,
                    backgroundColor: currentPhase === index 
                      ? alpha(phase.color, 0.1) 
                      : alpha(designTokens.colors.background.card, 0.4),
                    border: `1px solid ${
                      currentPhase === index 
                        ? phase.color 
                        : designTokens.colors.border.light
                    }`,
                    transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: designTokens.borderRadius.md,
                        backgroundColor: alpha(phase.color, 0.2),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: phase.color,
                      }}
                    >
                      {index < currentPhase ? (
                        <CheckIcon />
                      ) : index === currentPhase && isGenerating && !isPaused ? (
                        <CircularProgress size={20} sx={{ color: phase.color }} />
                      ) : (
                        phase.icon
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {phase.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {phase.description}
                      </Typography>
                      {index === currentPhase && isGenerating && (
                        <LinearProgress
                          variant="determinate"
                          value={getPhaseProgress(index)}
                          sx={{
                            mt: 1,
                            height: 4,
                            borderRadius: designTokens.borderRadius.full,
                            backgroundColor: alpha(phase.color, 0.1),
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: phase.color,
                            }
                          }}
                        />
                      )}
                    </Box>
                    {index < currentPhase && (
                      <Chip
                        label="Complete"
                        size="small"
                        color="success"
                        sx={{ borderRadius: designTokens.borderRadius.md }}
                      />
                    )}
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Live Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: designTokens.borderRadius.md,
                    backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QualityIcon sx={{ color: designTokens.colors.success[500] }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Quality Score
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {qualityScore}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: designTokens.borderRadius.md,
                    backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SourceIcon sx={{ color: designTokens.colors.accent[500] }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sources Analyzed
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {sources.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: designTokens.borderRadius.md,
                    backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InsightIcon sx={{ color: designTokens.colors.primary[500] }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Key Insights
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {insights.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Live Insights Feed */}
      <Card
        sx={{
          borderRadius: designTokens.borderRadius.xl,
          backgroundColor: alpha(designTokens.colors.background.card, 0.6),
          backdropFilter: `blur(${designTokens.blur.lg})`,
          border: `1px solid ${designTokens.colors.border.light}`,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Live Intelligence Feed
            </Typography>
            <Chip
              icon={<SpeedIcon />}
              label="Real-time"
              size="small"
              color="success"
              sx={{ borderRadius: designTokens.borderRadius.md }}
            />
          </Box>

          <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
            <AnimatePresence>
              {insights.slice(-5).reverse().map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: designTokens.borderRadius.md,
                      backgroundColor: alpha(
                        insight.importance === 'high' 
                          ? designTokens.colors.accent[500] 
                          : designTokens.colors.primary[500],
                        0.05
                      ),
                      border: `1px solid ${alpha(
                        insight.importance === 'high' 
                          ? designTokens.colors.accent[500] 
                          : designTokens.colors.primary[500],
                        0.2
                      )}`,
                    }}
                  >
                    <Typography variant="body2">
                      {insight.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportGenerationUI;