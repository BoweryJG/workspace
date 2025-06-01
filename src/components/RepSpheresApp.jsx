import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Email,
  Save,
  PlayArrow,
  Edit,
  Delete,
  Schedule,
  Psychology,
  Assessment,
  Campaign,
  AutoAwesome,
  Send,
  History,
  Settings,
  Add
} from '@mui/icons-material';
import { generateContent } from '../utils/openRouterClient';

const RepSpheresApp = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [promptDialog, setPromptDialog] = useState(false);
  const [automationDialog, setAutomationDialog] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [savedResults, setSavedResults] = useState([]);

  // Pre-configured prompts for different sales scenarios
  const promptTemplates = [
    {
      id: 'doctor-outreach',
      title: 'Doctor Outreach Email',
      category: 'Email',
      description: 'Personalized email for healthcare professionals',
      template: `Write a professional outreach email to Dr. {doctor_name} who specializes in {specialty} at {hospital}. 

Key points to include:
- Introduction of {product_name} and its benefits for {specialty} patients
- Relevant clinical data or studies
- Invitation for a brief meeting or product demonstration
- Professional and respectful tone

Doctor Details:
- Name: {doctor_name}
- Specialty: {specialty}
- Hospital: {hospital}
- Location: {location}

Product: {product_name}
`,
      fields: ['doctor_name', 'specialty', 'hospital', 'location', 'product_name']
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis Report',
      category: 'Analysis',
      description: 'Comprehensive market analysis for a specific therapeutic area',
      template: `Generate a comprehensive market analysis report for {therapeutic_area} in {region}.

Include the following sections:
1. Market Size and Growth Projections
2. Key Players and Competitive Landscape
3. Regulatory Environment
4. Unmet Medical Needs
5. Market Access Considerations
6. Strategic Recommendations

Focus on: {focus_areas}
Time frame: {time_frame}
Target audience: {target_audience}
`,
      fields: ['therapeutic_area', 'region', 'focus_areas', 'time_frame', 'target_audience']
    },
    {
      id: 'sales-follow-up',
      title: 'Sales Follow-up',
      category: 'Sales',
      description: 'Follow-up communication after sales meetings',
      template: `Create a follow-up message for {contact_name} after our meeting on {meeting_date}.

Meeting Summary:
- Product discussed: {product_name}
- Key interests: {key_interests}
- Concerns raised: {concerns}
- Next steps discussed: {next_steps}

Tone: {tone}
Include: Thank you, key takeaways, next steps, contact information
`,
      fields: ['contact_name', 'meeting_date', 'product_name', 'key_interests', 'concerns', 'next_steps', 'tone']
    },
    {
      id: 'competitive-intel',
      title: 'Competitive Intelligence Brief',
      category: 'Analysis',
      description: 'Analysis of competitor activities and positioning',
      template: `Create a competitive intelligence brief comparing {our_product} with {competitor_product}.

Analysis Framework:
1. Product Features Comparison
2. Pricing Strategy
3. Market Positioning
4. Clinical Evidence
5. Sales Strategy
6. Strengths and Weaknesses
7. Strategic Recommendations

Market: {market_segment}
Time frame: {analysis_period}
Key focus: {focus_areas}
`,
      fields: ['our_product', 'competitor_product', 'market_segment', 'analysis_period', 'focus_areas']
    }
  ];

  const automationOptions = [
    {
      id: 'weekly-reports',
      title: 'Weekly Market Reports',
      description: 'Auto-generate weekly market intelligence reports',
      schedule: 'Every Monday at 9:00 AM',
      active: true
    },
    {
      id: 'follow-up-reminders',
      title: 'Follow-up Reminders',
      description: 'Automated reminders for sales follow-ups',
      schedule: 'Daily at 8:00 AM',
      active: false
    },
    {
      id: 'competitor-alerts',
      title: 'Competitor Activity Alerts',
      description: 'Monitor and alert on competitor news',
      schedule: 'Real-time monitoring',
      active: true
    }
  ];

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setPromptDialog(true);
  };

  const handleGenerateContent = async (formData) => {
    setLoading(true);
    try {
      // Replace template variables with form data
      let processedPrompt = selectedPrompt.template;
      selectedPrompt.fields.forEach(field => {
        const value = formData[field] || `[${field}]`;
        processedPrompt = processedPrompt.replace(new RegExp(`{${field}}`, 'g'), value);
      });

      const response = await generateContent(processedPrompt, 'openai/gpt-4o');
      setResult(response);
      
      // Save to results
      const newResult = {
        id: Date.now(),
        prompt: selectedPrompt.title,
        content: response,
        timestamp: new Date().toISOString(),
        formData
      };
      setSavedResults(prev => [newResult, ...prev]);
      
    } catch (error) {
      console.error('Error generating content:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = (result) => {
    // In a real app, this would save to backend/database
    console.log('Saving result:', result);
    alert('Result saved successfully!');
  };

  const handleEmailResult = (result) => {
    // In a real app, this would integrate with email service
    const emailBody = encodeURIComponent(result.content);
    const subject = encodeURIComponent(`RepSpheres AI: ${result.prompt}`);
    window.open(`mailto:?subject=${subject}&body=${emailBody}`);
  };

  const PromptDialog = () => {
    const [formData, setFormData] = useState({});

    const handleFieldChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Dialog 
        open={promptDialog} 
        onClose={() => setPromptDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedPrompt?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {selectedPrompt?.description}
          </Typography>
          
          <Grid container spacing={2}>
            {selectedPrompt?.fields.map(field => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  value={formData[field] || ''}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>

          {result && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Generated Content:</Typography>
              <Paper sx={{ p: 2, bgcolor: 'background.default', maxHeight: 300, overflow: 'auto' }}>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                  {result}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPromptDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleGenerateContent(formData)}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <AutoAwesome />}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
          {result && (
            <>
              <Button 
                onClick={() => handleSaveResult({ prompt: selectedPrompt.title, content: result, formData })}
                startIcon={<Save />}
              >
                Save
              </Button>
              <Button 
                onClick={() => handleEmailResult({ prompt: selectedPrompt.title, content: result })}
                startIcon={<Email />}
              >
                Email
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          RepSpheres Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          AI-powered sales intelligence and automation
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Smart Prompts" icon={<Psychology />} />
          <Tab label="Saved Results" icon={<History />} />
          <Tab label="Automation" icon={<Schedule />} />
          <Tab label="Settings" icon={<Settings />} />
        </Tabs>
      </Box>

      {/* Smart Prompts Tab */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          {promptTemplates.map((prompt) => (
            <Grid item xs={12} md={6} lg={4} key={prompt.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip label={prompt.category} size="small" sx={{ mr: 1 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {prompt.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prompt.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handlePromptSelect(prompt)}
                    startIcon={<PlayArrow />}
                  >
                    Use Template
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Saved Results Tab */}
      {selectedTab === 1 && (
        <Box>
          {savedResults.length === 0 ? (
            <Alert severity="info">No saved results yet. Generate content using Smart Prompts to see results here.</Alert>
          ) : (
            <List>
              {savedResults.map((result) => (
                <React.Fragment key={result.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText
                      primary={result.prompt}
                      secondary={new Date(result.timestamp).toLocaleString()}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEmailResult(result)}>
                        <Email />
                      </IconButton>
                      <IconButton onClick={() => handleSaveResult(result)}>
                        <Save />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      )}

      {/* Automation Tab */}
      {selectedTab === 2 && (
        <Grid container spacing={3}>
          {automationOptions.map((automation) => (
            <Grid item xs={12} key={automation.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {automation.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {automation.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: {automation.schedule}
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={<Switch checked={automation.active} />}
                      label={automation.active ? 'Active' : 'Inactive'}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setAutomationDialog(true)}
              fullWidth
              sx={{ py: 2 }}
            >
              Create New Automation
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Settings Tab */}
      {selectedTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Email Integration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Configure email settings for automated reports
                </Typography>
                <Button variant="outlined" startIcon={<Settings />}>
                  Configure Email
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  API Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Manage OpenRouter and other API configurations
                </Typography>
                <Button variant="outlined" startIcon={<Settings />}>
                  Manage APIs
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Dialogs */}
      {selectedPrompt && <PromptDialog />}
    </Container>
  );
};

export default RepSpheresApp;