import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  alpha,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  AvatarGroup,
  Tab,
  Tabs,
  Grid
} from '@mui/material';
import {
  Cloud as CloudIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Sync as SyncIcon,
  Settings as SettingsIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
  Assignment as TaskIcon,
  Campaign as CampaignIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  AutoAwesome as AIIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

// CRM Logos/Icons
const crmSystems = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '☁️',
    color: '#00A1E0',
    status: 'connected',
    lastSync: '2 minutes ago',
    records: { doctors: 1250, campaigns: 45, opportunities: 320 }
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    logo: '🟠',
    color: '#FF7A59',
    status: 'disconnected',
    lastSync: null,
    records: { doctors: 0, campaigns: 0, opportunities: 0 }
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    logo: '🎯',
    color: '#2D2D2D',
    status: 'syncing',
    lastSync: 'In progress...',
    records: { doctors: 890, campaigns: 32, opportunities: 178 }
  },
  {
    id: 'dynamics',
    name: 'Microsoft Dynamics',
    logo: '🔷',
    color: '#002050',
    status: 'error',
    lastSync: 'Failed - 1 hour ago',
    records: { doctors: 0, campaigns: 0, opportunities: 0 }
  }
];

const CRMIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCRM, setSelectedCRM] = useState('salesforce');
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncInterval: '15',
    syncDoctors: true,
    syncCampaigns: true,
    syncReports: true,
    conflictResolution: 'newest'
  });
  const [fieldMapping, setFieldMapping] = useState({
    doctor_name: 'Contact.Name',
    specialty: 'Contact.Specialty__c',
    hospital: 'Account.Name',
    influence_score: 'Contact.Influence_Score__c'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return designTokens.colors.success[500];
      case 'syncing': return designTokens.colors.accent[500];
      case 'error': return designTokens.colors.error?.main || '#f44336';
      default: return designTokens.colors.text.tertiary;
    }
  };

  const renderConnectionCard = (crm) => (
    <Card
      key={crm.id}
      sx={{
        borderRadius: designTokens.borderRadius.xl,
        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
        backdropFilter: `blur(${designTokens.blur.md})`,
        border: `2px solid ${
          selectedCRM === crm.id
            ? crm.color
            : designTokens.colors.border.light
        }`,
        cursor: 'pointer',
        transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: designTokens.shadow.lg,
        }
      }}
      onClick={() => setSelectedCRM(crm.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: designTokens.borderRadius.lg,
                backgroundColor: alpha(crm.color, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              {crm.logo}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {crm.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(crm.status),
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {crm.status === 'connected' ? 'Connected' :
                   crm.status === 'syncing' ? 'Syncing...' :
                   crm.status === 'error' ? 'Error' : 'Not Connected'}
                </Typography>
              </Box>
            </Box>
          </Box>
          {crm.status === 'connected' ? (
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <LinkOffIcon />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // Handle connection
              }}
              sx={{ borderRadius: designTokens.borderRadius.lg }}
            >
              Connect
            </Button>
          )}
        </Box>

        {crm.status === 'connected' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Last sync: {crm.lastSync}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Chip
                  size="small"
                  icon={<GroupIcon sx={{ fontSize: 16 }} />}
                  label={`${crm.records.doctors} Doctors`}
                  sx={{ backgroundColor: alpha(crm.color, 0.1) }}
                />
                <Chip
                  size="small"
                  icon={<CampaignIcon sx={{ fontSize: 16 }} />}
                  label={`${crm.records.campaigns} Campaigns`}
                  sx={{ backgroundColor: alpha(crm.color, 0.1) }}
                />
              </Box>
            </Box>
          </>
        )}

        {crm.status === 'syncing' && (
          <LinearProgress sx={{ mt: 2, borderRadius: designTokens.borderRadius.full }} />
        )}

        {crm.status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Sync failed. Check credentials.
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  const renderSyncSettings = () => (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Sync Settings
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={syncSettings.autoSync}
              onChange={(e) => setSyncSettings({ ...syncSettings, autoSync: e.target.checked })}
            />
          }
          label="Enable Automatic Sync"
        />
        
        {syncSettings.autoSync && (
          <FormControl fullWidth sx={{ mt: 2, mb: 3 }} size="small">
            <InputLabel>Sync Interval</InputLabel>
            <Select
              value={syncSettings.syncInterval}
              onChange={(e) => setSyncSettings({ ...syncSettings, syncInterval: e.target.value })}
              label="Sync Interval"
            >
              <MenuItem value="5">Every 5 minutes</MenuItem>
              <MenuItem value="15">Every 15 minutes</MenuItem>
              <MenuItem value="30">Every 30 minutes</MenuItem>
              <MenuItem value="60">Every hour</MenuItem>
              <MenuItem value="1440">Daily</MenuItem>
            </Select>
          </FormControl>
        )}

        <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
          Data Types to Sync
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={syncSettings.syncDoctors}
                onChange={(e) => setSyncSettings({ ...syncSettings, syncDoctors: e.target.checked })}
              />
            }
            label="Doctors & Contacts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={syncSettings.syncCampaigns}
                onChange={(e) => setSyncSettings({ ...syncSettings, syncCampaigns: e.target.checked })}
              />
            }
            label="Campaigns & Activities"
          />
          <FormControlLabel
            control={
              <Switch
                checked={syncSettings.syncReports}
                onChange={(e) => setSyncSettings({ ...syncSettings, syncReports: e.target.checked })}
              />
            }
            label="AI Reports & Insights"
          />
        </Box>

        <FormControl fullWidth size="small">
          <InputLabel>Conflict Resolution</InputLabel>
          <Select
            value={syncSettings.conflictResolution}
            onChange={(e) => setSyncSettings({ ...syncSettings, conflictResolution: e.target.value })}
            label="Conflict Resolution"
          >
            <MenuItem value="newest">Keep Newest Data</MenuItem>
            <MenuItem value="crm">CRM Data Wins</MenuItem>
            <MenuItem value="repspheres">RepSpheres Data Wins</MenuItem>
            <MenuItem value="manual">Manual Review</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<SyncIcon />}
          sx={{
            borderRadius: designTokens.borderRadius.lg,
            background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
          }}
        >
          Sync Now
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: designTokens.borderRadius.lg }}
        >
          View Sync History
        </Button>
      </Box>
    </Box>
  );

  const renderFieldMapping = () => (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Field Mapping
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Map RepSpheres fields to your CRM fields
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: 'transparent' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>RepSpheres Field</TableCell>
              <TableCell>CRM Field</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(fieldMapping).map(([repField, crmField]) => (
              <TableRow key={repField}>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {repField.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={crmField}
                    onChange={(e) => setFieldMapping({
                      ...fieldMapping,
                      [repField]: e.target.value
                    })}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: designTokens.borderRadius.md,
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {crmField ? (
                    <CheckIcon sx={{ color: designTokens.colors.success[500] }} />
                  ) : (
                    <ErrorIcon sx={{ color: designTokens.colors.text.tertiary }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AIIcon />}
          sx={{ borderRadius: designTokens.borderRadius.lg }}
        >
          Auto-Map Fields
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: designTokens.borderRadius.lg }}
        >
          Add Custom Field
        </Button>
      </Box>
    </Box>
  );

  const renderDataFlow = () => (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Data Flow & Automation
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(designTokens.colors.primary[500], 0.05),
              border: `1px solid ${designTokens.colors.primary[500]}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <UploadIcon sx={{ color: designTokens.colors.primary[500] }} />
                <Typography variant="subtitle1" fontWeight="medium">
                  RepSpheres → CRM
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Automatically push to CRM:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Chip label="New doctor contacts" size="small" />
                <Chip label="AI-generated reports" size="small" />
                <Chip label="Campaign activities" size="small" />
                <Chip label="Engagement scores" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(designTokens.colors.accent[500], 0.05),
              border: `1px solid ${designTokens.colors.accent[500]}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <DownloadIcon sx={{ color: designTokens.colors.accent[500] }} />
                <Typography variant="subtitle1" fontWeight="medium">
                  CRM → RepSpheres
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pull from CRM:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Chip label="Contact updates" size="small" />
                <Chip label="Meeting notes" size="small" />
                <Chip label="Deal progress" size="small" />
                <Chip label="Custom fields" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> Set up webhook notifications in your CRM to enable real-time data sync
        </Typography>
      </Alert>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          CRM Integration Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect your CRM to sync doctor data, campaigns, and AI insights
        </Typography>
      </Box>

      {/* CRM Systems Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {crmSystems.map(crm => (
          <Grid item xs={12} sm={6} md={3} key={crm.id}>
            {renderConnectionCard(crm)}
          </Grid>
        ))}
      </Grid>

      {/* Selected CRM Configuration */}
      {selectedCRM && (
        <Card
          sx={{
            borderRadius: designTokens.borderRadius.xl,
            backgroundColor: alpha(designTokens.colors.background.card, 0.6),
            backdropFilter: `blur(${designTokens.blur.md})`,
            border: `1px solid ${designTokens.colors.border.light}`,
          }}
        >
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                <Tab label="Sync Settings" />
                <Tab label="Field Mapping" />
                <Tab label="Data Flow" />
              </Tabs>
            </Box>

            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && renderSyncSettings()}
              {activeTab === 1 && renderFieldMapping()}
              {activeTab === 2 && renderDataFlow()}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CRMIntegration;