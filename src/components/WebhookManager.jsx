import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Tooltip,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  LinearProgress,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as TestIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Webhook as WebhookIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Schedule as PendingIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { useWebhooks } from '../hooks/useWebhooks';
import { designTokens } from '../styles/designTokens';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: `blur(${designTokens.blur.base})`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  const colors = {
    active: theme.palette.success,
    inactive: theme.palette.grey,
    error: theme.palette.error
  };
  
  const color = colors[status] || theme.palette.grey;
  
  return {
    backgroundColor: alpha(color.main, 0.1),
    color: color.main,
    borderColor: color.main,
    fontWeight: 500
  };
});

const EventChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main
}));

export const WebhookManager = () => {
  const {
    webhooks,
    eventLog,
    isLoading,
    registerWebhook,
    unregisterWebhook,
    updateWebhook,
    testWebhook,
    WEBHOOK_EVENTS
  } = useWebhooks();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [expandedWebhook, setExpandedWebhook] = useState(null);
  const [showEventLog, setShowEventLog] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: [],
    headers: {},
    secret: ''
  });

  const handleOpenDialog = (webhook = null) => {
    if (webhook) {
      setEditingWebhook(webhook);
      setFormData({
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        headers: webhook.headers || {},
        secret: webhook.secret || ''
      });
    } else {
      setEditingWebhook(null);
      setFormData({
        name: '',
        url: '',
        events: [],
        headers: {},
        secret: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingWebhook(null);
  };

  const handleSave = async () => {
    if (editingWebhook) {
      await updateWebhook(editingWebhook.id, formData);
    } else {
      await registerWebhook(formData);
    }
    handleCloseDialog();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this webhook?')) {
      await unregisterWebhook(id);
    }
  };

  const handleTest = async (id) => {
    const result = await testWebhook(id);
    if (result.success) {
      alert('Webhook test successful!');
    } else {
      alert(`Webhook test failed: ${result.error}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <StyledPaper elevation={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Webhook Integrations
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant={showEventLog ? 'contained' : 'outlined'}
            onClick={() => setShowEventLog(!showEventLog)}
            startIcon={<WebhookIcon />}
          >
            Event Log ({eventLog.length})
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog()}
            startIcon={<AddIcon />}
          >
            Add Webhook
          </Button>
        </Stack>
      </Box>

      {/* Webhooks Table */}
      {!showEventLog && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Events</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Deliveries</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {webhooks.map((webhook) => (
                <React.Fragment key={webhook.id}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {webhook.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {webhook.url.length > 40 
                            ? `${webhook.url.substring(0, 40)}...` 
                            : webhook.url}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(webhook.url)}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {webhook.events.slice(0, 2).map(event => (
                        <EventChip
                          key={event}
                          label={event.split('.')[1]}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {webhook.events.length > 2 && (
                        <Chip
                          label={`+${webhook.events.length - 2}`}
                          size="small"
                          sx={{ ml: 0.5 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={webhook.status}
                        status={webhook.status}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2">
                          {webhook.deliveryCount}
                        </Typography>
                        {webhook.lastDelivery && (
                          webhook.lastDelivery.success ? (
                            <SuccessIcon fontSize="small" color="success" />
                          ) : (
                            <ErrorIcon fontSize="small" color="error" />
                          )
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Test webhook">
                          <IconButton
                            size="small"
                            onClick={() => handleTest(webhook.id)}
                            disabled={isLoading}
                          >
                            <TestIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit webhook">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(webhook)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete webhook">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(webhook.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={() => setExpandedWebhook(
                            expandedWebhook === webhook.id ? null : webhook.id
                          )}
                        >
                          {expandedWebhook === webhook.id ? 
                            <CollapseIcon /> : <ExpandIcon />}
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded Details */}
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 0 }}>
                      <Collapse in={expandedWebhook === webhook.id}>
                        <Box p={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Configuration
                              </Typography>
                              <List dense>
                                <ListItem>
                                  <ListItemText
                                    primary="Created"
                                    secondary={new Date(webhook.createdAt).toLocaleString()}
                                  />
                                </ListItem>
                                {webhook.secret && (
                                  <ListItem>
                                    <ListItemText
                                      primary="Secret"
                                      secondary="••••••••"
                                    />
                                  </ListItem>
                                )}
                                {Object.keys(webhook.headers || {}).length > 0 && (
                                  <ListItem>
                                    <ListItemText
                                      primary="Headers"
                                      secondary={Object.keys(webhook.headers).join(', ')}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              {webhook.lastDelivery && (
                                <>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Last Delivery
                                  </Typography>
                                  <Card variant="outlined">
                                    <CardContent>
                                      <Stack spacing={1}>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography variant="caption" color="text.secondary">
                                            Status
                                          </Typography>
                                          <Chip
                                            label={webhook.lastDelivery.statusCode}
                                            size="small"
                                            color={webhook.lastDelivery.success ? 'success' : 'error'}
                                          />
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography variant="caption" color="text.secondary">
                                            Response Time
                                          </Typography>
                                          <Typography variant="caption">
                                            {Math.round(webhook.lastDelivery.responseTime)}ms
                                          </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography variant="caption" color="text.secondary">
                                            Timestamp
                                          </Typography>
                                          <Typography variant="caption">
                                            {new Date(webhook.lastDelivery.timestamp).toLocaleTimeString()}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </CardContent>
                                  </Card>
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              
              {webhooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" py={4}>
                      No webhooks configured. Click "Add Webhook" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Event Log */}
      {showEventLog && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Recent Events
          </Typography>
          <List>
            {eventLog.slice(-10).reverse().map((event) => (
              <ListItem key={event.id} divider>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventChip
                        label={event.event}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="body2">
                        {new Date(event.timestamp).toLocaleString()}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Box mt={1}>
                      <Typography variant="caption" color="text.secondary">
                        Triggered {event.webhooksTriggered} webhook(s)
                      </Typography>
                      {event.results.map((result, idx) => (
                        <Box key={idx} display="flex" alignItems="center" gap={1} mt={0.5}>
                          {result.success ? (
                            <SuccessIcon fontSize="small" color="success" />
                          ) : (
                            <ErrorIcon fontSize="small" color="error" />
                          )}
                          <Typography variant="caption">
                            {result.success ? `Success (${result.statusCode})` : result.error}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingWebhook ? 'Edit Webhook' : 'Add New Webhook'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Webhook Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            
            <TextField
              label="Webhook URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              fullWidth
              required
              placeholder="https://api.example.com/webhooks"
              type="url"
            />
            
            <FormControl fullWidth>
              <InputLabel>Events</InputLabel>
              <Select
                multiple
                value={formData.events}
                onChange={(e) => setFormData({ ...formData, events: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value.split('.')[1]} size="small" />
                    ))}
                  </Box>
                )}
              >
                {Object.values(WEBHOOK_EVENTS).map((event) => (
                  <MenuItem key={event} value={event}>
                    <Checkbox checked={formData.events.indexOf(event) > -1} />
                    <ListItemText primary={event} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Secret (optional)"
              value={formData.secret}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              fullWidth
              type="password"
              helperText="Used to sign webhook payloads"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name || !formData.url || formData.events.length === 0}
          >
            {editingWebhook ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading overlay */}
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor={alpha(theme => theme.palette.background.paper, 0.8)}
        >
          <CircularProgress />
        </Box>
      )}
    </StyledPaper>
  );
};