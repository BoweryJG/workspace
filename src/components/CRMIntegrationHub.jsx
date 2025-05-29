import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  CloudSync,
  Settings,
  CheckCircle,
  Error,
  Warning,
  Sync,
  Storage,
  Api,
  Security,
  Schedule,
  TrendingUp,
  Person,
  Business,
  Phone,
  Email,
  Assignment,
  Close,
  Add,
  Edit,
  Delete
} from '@mui/icons-material';

const CRMIntegrationHub = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'salesforce',
      name: 'Salesforce',
      status: 'connected',
      lastSync: '2 minutes ago',
      records: 1247,
      icon: '🏢',
      color: '#00A1E0'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      status: 'connected',
      lastSync: '5 minutes ago',
      records: 892,
      icon: '🧡',
      color: '#FF7A59'
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      status: 'disconnected',
      lastSync: 'Never',
      records: 0,
      icon: '🟢',
      color: '#28A745'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      status: 'error',
      lastSync: '2 hours ago',
      records: 534,
      icon: '💚',
      color: '#17494D'
    }
  ]);

  const [automationRules, setAutomationRules] = useState([
    {
      id: 1,
      name: 'High-Value Lead Alert',
      trigger: 'Conversation score > 85',
      action: 'Create hot lead in CRM + Notify sales manager',
      active: true,
      executions: 23
    },
    {
      id: 2,
      name: 'Follow-up Reminder',
      trigger: 'Next best action identified',
      action: 'Create task in CRM with AI recommendations',
      active: true,
      executions: 156
    },
    {
      id: 3,
      name: 'Objection Pattern Alert',
      trigger: 'Price objection detected',
      action: 'Update opportunity stage + Add competitor note',
      active: false,
      executions: 42
    },
    {
      id: 4,
      name: 'Deal Risk Assessment',
      trigger: 'Risk score > 70',
      action: 'Alert account manager + Schedule intervention call',
      active: true,
      executions: 18
    }
  ]);

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncFrequency: '5',
    includeAnalysis: true,
    includeTranscripts: false,
    includeScores: true,
    includeRecommendations: true
  });

  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'disconnected': return <Error sx={{ color: '#9E9E9E' }} />;
      case 'error': return <Warning sx={{ color: '#f44336' }} />;
      default: return <Error sx={{ color: '#9E9E9E' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#4CAF50';
      case 'disconnected': return '#9E9E9E';
      case 'error': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const handleConnect = (integration) => {
    setSelectedIntegration(integration);
    setConfigDialogOpen(true);
  };

  const handleSync = async (integrationId) => {
    // Simulate sync process
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId 
        ? { ...int, lastSync: 'Syncing...', status: 'syncing' }
        : int
    ));

    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === integrationId 
          ? { ...int, lastSync: 'Just now', status: 'connected' }
          : int
      ));
    }, 2000);
  };

  const dataFlowItems = [
    {
      source: 'Conversation Analysis',
      destination: 'CRM Contact Record',
      data: 'AI Insights, Sentiment Score, Key Topics',
      status: 'active'
    },
    {
      source: 'MEDDIC Analysis',
      destination: 'Opportunity Pipeline',
      data: 'Qualification Score, Decision Criteria, Timeline',
      status: 'active'
    },
    {
      source: 'Risk Assessment',
      destination: 'Account Management',
      data: 'Risk Factors, Mitigation Strategies, Alerts',
      status: 'active'
    },
    {
      source: 'Next Best Actions',
      destination: 'Task Management',
      data: 'Follow-up Actions, Recommendations, Priorities',
      status: 'active'
    },
    {
      source: 'Competitive Intelligence',
      destination: 'Sales Intelligence',
      data: 'Competitor Mentions, Positioning, Threats',
      status: 'active'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        CRM Integration Hub
      </Typography>
      
      <Grid container spacing={4}>
        {/* Integration Status */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Connected Systems
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setConfigDialogOpen(true)}
                >
                  Add Integration
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {integrations.map((integration) => (
                  <Grid item xs={12} md={6} key={integration.id}>
                    <Paper sx={{ 
                      p: 3, 
                      border: '1px solid',
                      borderColor: getStatusColor(integration.status),
                      backgroundColor: `${getStatusColor(integration.status)}08`
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: integration.color, 
                          mr: 2,
                          width: 48,
                          height: 48
                        }}>
                          <Typography variant="h6">{integration.icon}</Typography>
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {integration.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(integration.status)}
                            <Typography variant="body2" color="text.secondary">
                              {integration.status === 'connected' ? 'Connected' : 
                               integration.status === 'error' ? 'Connection Error' : 'Disconnected'}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton 
                          onClick={() => handleSync(integration.id)}
                          disabled={integration.status === 'disconnected'}
                        >
                          <Sync />
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Last Sync: {integration.lastSync}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {integration.records} records
                        </Typography>
                      </Box>
                      
                      {integration.status === 'disconnected' && (
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleConnect(integration)}
                        >
                          Connect
                        </Button>
                      )}
                      
                      {integration.status === 'error' && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                          Authentication failed. Please reconnect.
                        </Alert>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Data Flow Mapping */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Data Flow Configuration
              </Typography>
              
              {dataFlowItems.map((flow, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.05)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {flow.source} → {flow.destination}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {flow.data}
                      </Typography>
                    </Box>
                    <Chip 
                      label={flow.status}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>

          {/* Automation Rules */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Automation Rules
                </Typography>
                <Button variant="outlined" startIcon={<Add />}>
                  Add Rule
                </Button>
              </Box>
              
              <List>
                {automationRules.map((rule, index) => (
                  <React.Fragment key={rule.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ 
                          bgcolor: rule.active ? '#4CAF50' : '#9E9E9E',
                          width: 32,
                          height: 32 
                        }}>
                          <Assignment sx={{ fontSize: 16 }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {rule.name}
                            </Typography>
                            <Chip 
                              label={`${rule.executions} executions`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              <strong>When:</strong> {rule.trigger}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Then:</strong> {rule.action}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={rule.active}
                                onChange={(e) => {
                                  setAutomationRules(prev => prev.map(r => 
                                    r.id === rule.id ? { ...r, active: e.target.checked } : r
                                  ));
                                }}
                              />
                            }
                            label=""
                          />
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < automationRules.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Sync Settings
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={syncSettings.autoSync}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, autoSync: e.target.checked }))}
                  />
                }
                label="Auto Sync"
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Sync Frequency</InputLabel>
                <Select
                  value={syncSettings.syncFrequency}
                  label="Sync Frequency"
                  onChange={(e) => setSyncSettings(prev => ({ ...prev, syncFrequency: e.target.value }))}
                >
                  <MenuItem value="1">Every minute</MenuItem>
                  <MenuItem value="5">Every 5 minutes</MenuItem>
                  <MenuItem value="15">Every 15 minutes</MenuItem>
                  <MenuItem value="60">Hourly</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Data to Sync
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={syncSettings.includeAnalysis}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, includeAnalysis: e.target.checked }))}
                  />
                }
                label="AI Analysis Results"
                sx={{ mb: 1, display: 'block' }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={syncSettings.includeTranscripts}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, includeTranscripts: e.target.checked }))}
                  />
                }
                label="Conversation Transcripts"
                sx={{ mb: 1, display: 'block' }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={syncSettings.includeScores}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, includeScores: e.target.checked }))}
                  />
                }
                label="Confidence Scores"
                sx={{ mb: 1, display: 'block' }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={syncSettings.includeRecommendations}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, includeRecommendations: e.target.checked }))}
                  />
                }
                label="AI Recommendations"
                sx={{ mb: 3, display: 'block' }}
              />
              
              <Button variant="contained" fullWidth>
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* Sync Statistics */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Integration Analytics
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Records Synced Today</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>2,147</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} sx={{ mb: 2 }} />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">API Calls Used</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1,856 / 5,000</Typography>
                </Box>
                <LinearProgress variant="determinate" value={37} sx={{ mb: 2 }} />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CloudSync sx={{ color: '#4CAF50' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Full Sync"
                    secondary="12:34 PM today"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp sx={{ color: '#2196F3' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Success Rate"
                    secondary="99.7% (last 30 days)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security sx={{ color: '#FF9800' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Security Status"
                    secondary="All connections secure"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Configuration Dialog */}
      <Dialog
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {selectedIntegration ? `Configure ${selectedIntegration.name}` : 'Add New Integration'}
            </Typography>
            <IconButton onClick={() => setConfigDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {selectedIntegration ? (
              <Box>
                <TextField
                  fullWidth
                  label="API Key"
                  type="password"
                  placeholder="Enter your API key"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Instance URL"
                  placeholder="https://your-instance.salesforce.com"
                  sx={{ mb: 3 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Default Owner</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="john.smith">John Smith</MenuItem>
                    <MenuItem value="jane.doe">Jane Doe</MenuItem>
                    <MenuItem value="auto">Auto-assign</MenuItem>
                  </Select>
                </FormControl>
                <Alert severity="info">
                  Make sure your API key has permissions for Leads, Opportunities, and Activities.
                </Alert>
              </Box>
            ) : (
              <Typography>Select an integration type to configure...</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            {selectedIntegration ? 'Connect' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CRMIntegrationHub;