import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
  Divider,
  Tooltip,
  Badge,
  Avatar,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Schedule as ScheduleIcon,
  Assignment as TaskIcon,
  TrendingUp as AnalyticsIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Timer as TimerIcon,
  Group as GroupIcon,
  AutoAwesome as AIIcon,
  Campaign as CampaignIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const CampaignOrchestrator = ({ campaign }) => {
  const [workflowSteps, setWorkflowSteps] = useState([
    {
      id: 1,
      type: 'trigger',
      name: 'Campaign Start',
      config: { triggerType: 'manual' },
      position: { x: 50, y: 50 },
      status: 'completed'
    },
    {
      id: 2,
      type: 'ai-research',
      name: 'Generate Doctor Report',
      config: { reportType: 'comprehensive', depth: 'deep' },
      position: { x: 50, y: 150 },
      status: 'active'
    },
    {
      id: 3,
      type: 'wait',
      name: 'Wait 2 Days',
      config: { duration: 2, unit: 'days' },
      position: { x: 50, y: 250 },
      status: 'pending'
    },
    {
      id: 4,
      type: 'email',
      name: 'Send Introduction Email',
      config: { template: 'intro_template', personalized: true },
      position: { x: 50, y: 350 },
      status: 'pending'
    },
    {
      id: 5,
      type: 'condition',
      name: 'Email Opened?',
      config: { condition: 'email_opened', branches: ['yes', 'no'] },
      position: { x: 50, y: 450 },
      status: 'pending'
    }
  ]);

  const [selectedStep, setSelectedStep] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const stepTypes = [
    { id: 'trigger', label: 'Trigger', icon: <PlayIcon />, color: designTokens.colors.success[500] },
    { id: 'ai-research', label: 'AI Research', icon: <AIIcon />, color: designTokens.colors.primary[500] },
    { id: 'email', label: 'Send Email', icon: <EmailIcon />, color: designTokens.colors.accent[500] },
    { id: 'phone', label: 'Phone Call', icon: <PhoneIcon />, color: designTokens.colors.primary[400] },
    { id: 'message', label: 'SMS/Message', icon: <MessageIcon />, color: designTokens.colors.accent[400] },
    { id: 'wait', label: 'Wait/Delay', icon: <TimerIcon />, color: designTokens.colors.text.secondary },
    { id: 'condition', label: 'Condition', icon: <ScheduleIcon />, color: designTokens.colors.success[400] },
    { id: 'task', label: 'Create Task', icon: <TaskIcon />, color: designTokens.colors.primary[600] },
    { id: 'analytics', label: 'Track Event', icon: <AnalyticsIcon />, color: designTokens.colors.accent[600] }
  ];

  const getStepIcon = (type) => {
    const stepType = stepTypes.find(st => st.id === type);
    return stepType ? stepType.icon : <TaskIcon />;
  };

  const getStepColor = (type) => {
    const stepType = stepTypes.find(st => st.id === type);
    return stepType ? stepType.color : designTokens.colors.text.secondary;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return designTokens.colors.success[500];
      case 'active': return designTokens.colors.accent[500];
      case 'pending': return designTokens.colors.text.tertiary;
      case 'error': return designTokens.colors.error?.main || '#f44336';
      default: return designTokens.colors.text.secondary;
    }
  };

  const addStep = (type) => {
    const newStep = {
      id: Date.now(),
      type: type.id,
      name: type.label,
      config: {},
      position: { x: 50, y: workflowSteps.length * 100 + 50 },
      status: 'pending'
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const deleteStep = (stepId) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
    setSelectedStep(null);
  };

  const renderStepConfig = (step) => {
    switch (step.type) {
      case 'email':
        return (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Email Template</InputLabel>
              <Select
                value={step.config.template || ''}
                label="Email Template"
                size="small"
              >
                <MenuItem value="intro_template">Introduction Template</MenuItem>
                <MenuItem value="followup_template">Follow-up Template</MenuItem>
                <MenuItem value="product_demo">Product Demo Invite</MenuItem>
                <MenuItem value="case_study">Case Study Share</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Subject Line"
                value={step.config.subject || ''}
                size="small"
                placeholder="Personalized subject with {doctor_name}"
              />
            </FormControl>
          </Box>
        );
      
      case 'wait':
        return (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Duration"
              type="number"
              value={step.config.duration || 1}
              size="small"
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Unit</InputLabel>
              <Select
                value={step.config.unit || 'days'}
                label="Unit"
                size="small"
              >
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="weeks">Weeks</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      
      case 'ai-research':
        return (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={step.config.reportType || 'comprehensive'}
                label="Report Type"
                size="small"
              >
                <MenuItem value="comprehensive">Comprehensive Analysis</MenuItem>
                <MenuItem value="quick">Quick Summary</MenuItem>
                <MenuItem value="competitive">Competitive Intel</MenuItem>
                <MenuItem value="opportunity">Opportunity Assessment</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Research Depth</InputLabel>
              <Select
                value={step.config.depth || 'deep'}
                label="Research Depth"
                size="small"
              >
                <MenuItem value="surface">Surface Level</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="deep">Deep Analysis</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      
      default:
        return (
          <Typography variant="body2" color="text.secondary">
            Configure {step.name} settings
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', gap: 3 }}>
      {/* Workflow Canvas */}
      <Box sx={{ flex: 1 }}>
        <Card
          sx={{
            height: '100%',
            borderRadius: designTokens.borderRadius.xl,
            backgroundColor: alpha(designTokens.colors.background.card, 0.6),
            backdropFilter: `blur(${designTokens.blur.md})`,
            border: `1px solid ${designTokens.colors.border.light}`,
          }}
        >
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Campaign Workflow Builder
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Design automated multi-touch campaigns with AI intelligence
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={isRunning ? 'outlined' : 'contained'}
                  startIcon={isRunning ? <PauseIcon /> : <PlayIcon />}
                  onClick={() => setIsRunning(!isRunning)}
                  sx={{
                    borderRadius: designTokens.borderRadius.lg,
                    background: !isRunning ? `linear-gradient(135deg, ${designTokens.colors.success[500]} 0%, ${designTokens.colors.success[600]} 100%)` : 'transparent',
                  }}
                >
                  {isRunning ? 'Pause' : 'Run Campaign'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<StopIcon />}
                  disabled={!isRunning}
                  sx={{ borderRadius: designTokens.borderRadius.lg }}
                >
                  Stop
                </Button>
              </Box>
            </Box>

            {/* Workflow Steps */}
            <Box
              sx={{
                flex: 1,
                backgroundColor: alpha(designTokens.colors.background.primary, 0.3),
                borderRadius: designTokens.borderRadius.lg,
                p: 3,
                position: 'relative',
                overflow: 'auto',
              }}
            >
              {/* Connection Lines */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {workflowSteps.map((step, index) => {
                  if (index === 0) return null;
                  const prevStep = workflowSteps[index - 1];
                  return (
                    <line
                      key={`line-${step.id}`}
                      x1={prevStep.position.x + 150}
                      y1={prevStep.position.y + 40}
                      x2={step.position.x + 150}
                      y2={step.position.y + 40}
                      stroke={alpha(designTokens.colors.primary[500], 0.3)}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })}
              </svg>

              {/* Workflow Steps */}
              <AnimatePresence>
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      position: 'absolute',
                      left: step.position.x,
                      top: step.position.y,
                    }}
                  >
                    <Paper
                      onClick={() => setSelectedStep(step)}
                      sx={{
                        width: 300,
                        p: 2,
                        borderRadius: designTokens.borderRadius.lg,
                        backgroundColor: selectedStep?.id === step.id
                          ? alpha(getStepColor(step.type), 0.1)
                          : alpha(designTokens.colors.background.card, 0.8),
                        border: `2px solid ${
                          selectedStep?.id === step.id
                            ? getStepColor(step.type)
                            : designTokens.colors.border.light
                        }`,
                        cursor: 'pointer',
                        transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: designTokens.shadow.lg,
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: designTokens.borderRadius.md,
                              backgroundColor: alpha(getStepColor(step.type), 0.2),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: getStepColor(step.type),
                            }}
                          >
                            {getStepIcon(step.type)}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="medium">
                              {step.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Step {index + 1}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(step.status),
                            animation: step.status === 'active' ? `pulse 2s ${designTokens.animation.easing.inOut} infinite` : 'none',
                            '@keyframes pulse': {
                              '0%, 100%': { opacity: 1 },
                              '50%': { opacity: 0.5 },
                            }
                          }}
                        />
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            {/* Step Types Palette */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Add Step:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {stepTypes.map(type => (
                  <Chip
                    key={type.id}
                    icon={type.icon}
                    label={type.label}
                    onClick={() => addStep(type)}
                    sx={{
                      backgroundColor: alpha(type.color, 0.1),
                      color: type.color,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: alpha(type.color, 0.2),
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Configuration Panel */}
      {selectedStep && (
        <Card
          sx={{
            width: 350,
            borderRadius: designTokens.borderRadius.xl,
            backgroundColor: alpha(designTokens.colors.background.card, 0.6),
            backdropFilter: `blur(${designTokens.blur.md})`,
            border: `1px solid ${designTokens.colors.border.light}`,
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Step Configuration
              </Typography>
              <IconButton onClick={() => setSelectedStep(null)} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Step Name"
                value={selectedStep.name}
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Chip
                  icon={getStepIcon(selectedStep.type)}
                  label={selectedStep.type}
                  size="small"
                  sx={{
                    backgroundColor: alpha(getStepColor(selectedStep.type), 0.1),
                    color: getStepColor(selectedStep.type),
                  }}
                />
                <Chip
                  label={selectedStep.status}
                  size="small"
                  sx={{
                    backgroundColor: alpha(getStatusColor(selectedStep.status), 0.1),
                    color: getStatusColor(selectedStep.status),
                    textTransform: 'capitalize',
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Step Settings
            </Typography>
            
            {renderStepConfig(selectedStep)}

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Advanced Options
            </Typography>
            
            <Stack spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Run Condition</InputLabel>
                <Select value="always" label="Run Condition">
                  <MenuItem value="always">Always Run</MenuItem>
                  <MenuItem value="business_hours">Business Hours Only</MenuItem>
                  <MenuItem value="weekdays">Weekdays Only</MenuItem>
                  <MenuItem value="custom">Custom Schedule</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>On Failure</InputLabel>
                <Select value="continue" label="On Failure">
                  <MenuItem value="continue">Continue Workflow</MenuItem>
                  <MenuItem value="retry">Retry (Max 3)</MenuItem>
                  <MenuItem value="stop">Stop Campaign</MenuItem>
                  <MenuItem value="notify">Notify & Pause</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: designTokens.borderRadius.lg,
                  background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
                }}
              >
                Save Changes
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => deleteStep(selectedStep.id)}
                sx={{
                  borderRadius: designTokens.borderRadius.lg,
                  color: designTokens.colors.error?.main || '#f44336',
                  borderColor: designTokens.colors.error?.main || '#f44336',
                }}
              >
                Delete Step
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CampaignOrchestrator;