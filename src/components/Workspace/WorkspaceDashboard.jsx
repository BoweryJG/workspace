import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Menu,
  MenuItem,
  Divider,
  alpha,
  useTheme,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  TrendingUp as TrendingIcon,
  Campaign as CampaignIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Assignment as ReportIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CompleteIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  ViewKanban as KanbanIcon,
  ViewList as ListView,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const WorkspaceDashboard = () => {
  const theme = useTheme();
  const [view, setView] = useState('kanban');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock data for projects/campaigns
  const campaigns = {
    research: [
      {
        id: 1,
        title: 'Dr. Sarah Johnson - Cardiology',
        status: 'in_progress',
        priority: 'high',
        doctor: { name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
        product: 'CardioFlow Pro X1',
        lastActivity: '2 hours ago',
        progress: 65,
        dueDate: '2024-01-15',
        assignees: ['JD', 'MK'],
        insights: 12,
        engagement: 85
      },
      {
        id: 2,
        title: 'Mayo Clinic Neurology Department',
        status: 'pending',
        priority: 'medium',
        doctor: { name: 'Dr. Michael Chen', specialty: 'Neurology' },
        product: 'NeuroSync 3000',
        lastActivity: '1 day ago',
        progress: 20,
        dueDate: '2024-01-20',
        assignees: ['AS'],
        insights: 5,
        engagement: 0
      }
    ],
    outreach: [
      {
        id: 3,
        title: 'Johns Hopkins Oncology Campaign',
        status: 'active',
        priority: 'high',
        doctor: { name: 'Dr. Emily Rodriguez', specialty: 'Oncology' },
        product: 'OncoCare Suite',
        lastActivity: '30 minutes ago',
        progress: 80,
        dueDate: '2024-01-10',
        assignees: ['JD', 'MK', 'AS'],
        insights: 25,
        engagement: 92
      }
    ],
    nurturing: [
      {
        id: 4,
        title: 'Cleveland Clinic Follow-up',
        status: 'scheduled',
        priority: 'low',
        doctor: { name: 'Dr. James Wilson', specialty: 'Orthopedics' },
        product: 'OrthoFlex Titanium',
        lastActivity: '3 days ago',
        progress: 100,
        dueDate: '2024-01-25',
        assignees: ['MK'],
        insights: 18,
        engagement: 75
      }
    ],
    closed: [
      {
        id: 5,
        title: 'Mount Sinai Partnership',
        status: 'completed',
        priority: 'high',
        doctor: { name: 'Dr. Lisa Park', specialty: 'Radiology' },
        product: 'DiagnosticPro AI',
        lastActivity: '1 week ago',
        progress: 100,
        dueDate: '2024-01-05',
        assignees: ['JD', 'AS'],
        insights: 32,
        engagement: 98,
        revenue: '$125,000'
      }
    ]
  };

  const columns = [
    { id: 'research', title: 'Research Phase', color: designTokens.colors.primary[500], count: campaigns.research.length },
    { id: 'outreach', title: 'Active Outreach', color: designTokens.colors.accent[500], count: campaigns.outreach.length },
    { id: 'nurturing', title: 'Nurturing', color: designTokens.colors.success[500], count: campaigns.nurturing.length },
    { id: 'closed', title: 'Closed/Won', color: designTokens.colors.text.secondary, count: campaigns.closed.length }
  ];

  const stats = [
    { label: 'Active Campaigns', value: 8, change: '+12%', icon: <CampaignIcon /> },
    { label: 'Doctors Engaged', value: 156, change: '+23%', icon: <PersonIcon /> },
    { label: 'Reports Generated', value: 342, change: '+18%', icon: <ReportIcon /> },
    { label: 'Success Rate', value: '78%', change: '+5%', icon: <TrendingIcon /> }
  ];

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return designTokens.colors.accent[500];
      case 'medium': return designTokens.colors.primary[500];
      case 'low': return designTokens.colors.text.secondary;
      default: return designTokens.colors.text.secondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CompleteIcon sx={{ color: designTokens.colors.success[500] }} />;
      case 'active': return <TrendingIcon sx={{ color: designTokens.colors.accent[500] }} />;
      case 'scheduled': return <ScheduleIcon sx={{ color: designTokens.colors.primary[500] }} />;
      default: return <WarningIcon sx={{ color: designTokens.colors.text.secondary }} />;
    }
  };

  const renderCampaignCard = (campaign) => (
    <motion.div
      key={campaign.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          borderRadius: designTokens.borderRadius.xl,
          backgroundColor: alpha(designTokens.colors.background.card, 0.6),
          backdropFilter: `blur(${designTokens.blur.md})`,
          border: `1px solid ${designTokens.colors.border.light}`,
          cursor: 'pointer',
          transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
          '&:hover': {
            borderColor: designTokens.colors.border.medium,
            boxShadow: designTokens.shadow.lg,
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {getStatusIcon(campaign.status)}
                <Typography variant="h6" fontWeight="medium" sx={{ lineHeight: 1.2 }}>
                  {campaign.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  size="small"
                  label={campaign.priority}
                  sx={{
                    backgroundColor: alpha(getPriorityColor(campaign.priority), 0.1),
                    color: getPriorityColor(campaign.priority),
                    borderRadius: designTokens.borderRadius.md,
                    fontWeight: 'medium',
                    textTransform: 'capitalize'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {campaign.lastActivity}
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={(e) => handleMenuOpen(e, campaign)}>
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Doctor & Product Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PersonIcon sx={{ fontSize: 16, color: designTokens.colors.text.tertiary }} />
              <Typography variant="body2" color="text.secondary">
                {campaign.doctor.name} • {campaign.doctor.specialty}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HospitalIcon sx={{ fontSize: 16, color: designTokens.colors.text.tertiary }} />
              <Typography variant="body2" color="text.secondary">
                {campaign.product}
              </Typography>
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {campaign.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={campaign.progress}
              sx={{
                height: 6,
                borderRadius: designTokens.borderRadius.full,
                backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: designTokens.borderRadius.full,
                  backgroundColor: campaign.progress === 100 
                    ? designTokens.colors.success[500] 
                    : designTokens.colors.primary[500],
                }
              }}
            />
          </Box>

          {/* Metrics */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Insights
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {campaign.insights}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Engagement
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="secondary">
                {campaign.engagement}%
              </Typography>
            </Box>
            {campaign.revenue && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Revenue
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {campaign.revenue}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
              {campaign.assignees.map((assignee, index) => (
                <Avatar key={index} sx={{ bgcolor: designTokens.colors.primary[500] }}>
                  {assignee}
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="caption" color="text.secondary">
              Due: {new Date(campaign.dueDate).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Sales Intelligence Workspace
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your doctor outreach campaigns and track engagement
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ borderRadius: designTokens.borderRadius.lg }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: designTokens.borderRadius.lg,
                background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
              }}
            >
              New Campaign
            </Button>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: designTokens.borderRadius.lg,
                  backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                  backdropFilter: `blur(${designTokens.blur.md})`,
                  border: `1px solid ${designTokens.colors.border.light}`,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.change}
                        size="small"
                        sx={{
                          mt: 1,
                          backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                          color: designTokens.colors.success[500],
                          fontWeight: 'medium',
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: designTokens.borderRadius.lg,
                        backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: designTokens.colors.primary[500],
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => setView('kanban')}
            color={view === 'kanban' ? 'primary' : 'default'}
          >
            <KanbanIcon />
          </IconButton>
          <IconButton
            onClick={() => setView('list')}
            color={view === 'list' ? 'primary' : 'default'}
          >
            <ListView />
          </IconButton>
          <IconButton
            onClick={() => setView('calendar')}
            color={view === 'calendar' ? 'primary' : 'default'}
          >
            <CalendarIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Kanban Board */}
      {view === 'kanban' && (
        <Grid container spacing={3}>
          {columns.map((column) => (
            <Grid item xs={12} md={6} lg={3} key={column.id}>
              <Box
                sx={{
                  backgroundColor: alpha(designTokens.colors.background.card, 0.3),
                  borderRadius: designTokens.borderRadius.xl,
                  p: 2,
                  minHeight: 500,
                }}
              >
                {/* Column Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: column.color,
                      }}
                    />
                    <Typography variant="h6" fontWeight="medium">
                      {column.title}
                    </Typography>
                    <Chip
                      label={column.count}
                      size="small"
                      sx={{
                        backgroundColor: alpha(column.color, 0.1),
                        color: column.color,
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Campaign Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <AnimatePresence>
                    {campaigns[column.id]?.map(renderCampaignCard)}
                  </AnimatePresence>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
            backdropFilter: `blur(${designTokens.blur.xl})`,
            border: `1px solid ${designTokens.colors.border.light}`,
            borderRadius: designTokens.borderRadius.lg,
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Campaign</MenuItem>
        <MenuItem onClick={handleMenuClose}>Generate Report</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Send to CRM</MenuItem>
        <MenuItem onClick={handleMenuClose}>Schedule Follow-up</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Archive Campaign
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default WorkspaceDashboard;