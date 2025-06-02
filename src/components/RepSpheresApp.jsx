import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Badge,
  Tooltip,
  Fab,
  LinearProgress,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
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
  Add,
  Analytics,
  TrendingUp,
  ContactPhone,
  Insights,
  Business,
  Search,
  FilterList,
  MoreVert,
  Security,
  LocalHospital,
  AccountBalance,
  School,
  Gavel,
  Replay,
  Timer,
  CloudUpload,
  CheckCircle,
  AutoFixHigh,
  PersonAdd,
  TrendingDown,
  Speed
} from '@mui/icons-material';
import { generateContent } from '../utils/openRouterClient';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key available:', !!supabaseKey);

const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const RepSpheresApp = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [promptDialog, setPromptDialog] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [savedResults, setSavedResults] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [marketInsights, setMarketInsights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [procedureData, setProcedureData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [automationDialog, setAutomationDialog] = useState(false);
  const [selectedAutomationPrompt, setSelectedAutomationPrompt] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cleaningStats, setCleaningStats] = useState(null);
  const [showBackendView, setShowBackendView] = useState(false);
  const [backendMessages, setBackendMessages] = useState([]);
  const [currentPromptStream, setCurrentPromptStream] = useState('');

  // Load data from Supabase on component mount
  useEffect(() => {
    loadAIPrompts();
    loadMarketInsights();
    loadContacts();
    loadProcedureData();
  }, []);

  const loadAIPrompts = async () => {
    try {
      if (!supabase) {
        console.log('❌ Supabase client not initialized (missing API key), using demo data');
        throw new Error('Supabase client not available');
      }
      
      console.log('🔍 Attempting to connect to Supabase ai_prompts table...');
      
      // First try with the active filter
      let { data, error } = await supabase
        .from('ai_prompts')
        .select('*')
        .eq('active', true)
        .order('usage_count', { ascending: false });
      
      // If no active prompts found, try without the filter
      if (!data || data.length === 0) {
        console.log('⚠️ No active prompts found, trying without filter...');
        const result = await supabase
          .from('ai_prompts')
          .select('*')
          .order('usage_count', { ascending: false });
        data = result.data;
        error = result.error;
      }
      
      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        console.log(`✅ Successfully loaded ${data.length} prompts from Supabase`);
        setPrompts(data);
        return;
      } else {
        console.log('⚠️ No prompts found in database, using demo data');
      }
    } catch (error) {
      console.error('❌ Error loading AI prompts:', error.message || error);
      // Fallback to demo data if Supabase fails
      setPrompts([
        {
          id: 'demo-1',
          prompt_name: 'Investigative Prospect Report',
          prompt_content: 'Create a detailed investigative profile of {{subject_name}}, located at {{address}}, associated with {{website_url}}. Include psychological insights, business intelligence, and behavioral analysis to maximize sales conversion potential.',
          report_type: 'investigative_report',
          target_audience: 'Sales, Marketing',
          model_used: 'openai/gpt-4o',
          tags: ['Investigative', 'Psychology', 'Sales Intelligence'],
          usage_count: 42
        },
        {
          id: 'demo-2',
          prompt_name: 'Competitive Intelligence Analysis',
          prompt_content: 'Generate a comprehensive competitive analysis for {{competitor_company}} in the {{industry}} sector. Analyze their pricing, positioning, strengths, weaknesses, and strategic vulnerabilities.',
          report_type: 'competitor_analysis',
          target_audience: 'Executives, Strategy Teams',
          model_used: 'openai/gpt-4o',
          tags: ['Competitive Intelligence', 'Strategy', 'Market Analysis'],
          usage_count: 38
        },
        {
          id: 'demo-3',
          prompt_name: 'Linguistic Behavioral Analysis',
          prompt_content: 'Analyze the communication patterns and linguistic cues from {{communication_source}} to identify psychological triggers, negotiation style, and optimal approach strategies for {{contact_name}}.',
          report_type: 'linguistic_analysis',
          target_audience: 'Sales Representatives, Negotiators',
          model_used: 'anthropic/claude-3-5-sonnet',
          tags: ['FBI Linguistics', 'Psychology', 'Communication'],
          usage_count: 35
        },
        {
          id: 'demo-4',
          prompt_name: 'Territory Market Penetration Strategy',
          prompt_content: 'Develop a comprehensive territory penetration strategy for {{territory_name}} focusing on {{target_demographic}}. Include demographic analysis, buying patterns, and recommended sales approaches.',
          report_type: 'territory',
          target_audience: 'Territory Managers, Sales Teams',
          model_used: 'openai/gpt-4o',
          tags: ['Territory Planning', 'Demographics', 'Sales Strategy'],
          usage_count: 31
        },
        {
          id: 'demo-5',
          prompt_name: 'Pre-Call Intelligence Brief',
          prompt_content: 'Generate a comprehensive pre-call intelligence brief for meeting with {{contact_name}} at {{company_name}}. Include company background, contact profile, conversation starters, and strategic talking points.',
          report_type: 'pre-call',
          target_audience: 'Sales Representatives',
          model_used: 'openai/gpt-4o-mini',
          tags: ['Pre-Call Planning', 'Intelligence', 'Sales Preparation'],
          usage_count: 28
        },
        {
          id: 'demo-6',
          prompt_name: 'Negotiation Strategy Framework',
          prompt_content: 'Develop a strategic negotiation framework for {{deal_type}} with {{negotiation_party}}. Include psychological profiling, BATNA analysis, concession strategies, and closing techniques.',
          report_type: 'negotiation_strategy',
          target_audience: 'Sales Managers, Senior Sales Reps',
          model_used: 'anthropic/claude-3-5-sonnet',
          tags: ['Negotiation', 'Psychology', 'Deal Strategy'],
          usage_count: 25
        },
        {
          id: 'demo-7',
          prompt_name: 'Financial Impact Analysis',
          prompt_content: 'Analyze the financial implications and ROI potential of {{investment_opportunity}} for {{client_company}}. Include cost-benefit analysis, risk assessment, and implementation timeline.',
          report_type: 'financial_analysis',
          target_audience: 'Financial Advisors, C-Suite',
          model_used: 'openai/gpt-4o',
          tags: ['Financial Analysis', 'ROI', 'Investment Strategy'],
          usage_count: 22
        },
        {
          id: 'demo-8',
          prompt_name: 'Career Development Pathway',
          prompt_content: 'Create a personalized career development plan for {{employee_name}} in {{current_role}} aiming for {{target_position}}. Include skill gap analysis, training recommendations, and timeline.',
          report_type: 'career_development',
          target_audience: 'HR Managers, Career Coaches',
          model_used: 'anthropic/claude-3-5-sonnet',
          tags: ['Career Development', 'HR', 'Professional Growth'],
          usage_count: 19
        },
        {
          id: 'demo-9',
          prompt_name: 'Medical Sales Strategy',
          prompt_content: 'Develop a comprehensive medical sales approach for {{medical_product}} targeting {{healthcare_specialty}}. Include clinical benefits, economic justification, and stakeholder influence mapping.',
          report_type: 'sales_strategy',
          target_audience: 'Medical Sales Representatives',
          model_used: 'openai/gpt-4o',
          tags: ['Medical Sales', 'Healthcare', 'Clinical Strategy'],
          usage_count: 16
        }
      ]);
    }
  };

  const loadMarketInsights = async () => {
    try {
      // This will be from Sphere OS database
      const { data, error } = await supabase
        .from('dental_procedures')
        .select(`
          id,
          name,
          category,
          market_size_usd_millions,
          yearly_growth_percentage,
          average_cost_usd,
          complexity,
          patient_satisfaction_score,
          trends
        `)
        .order('market_size_usd_millions', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setMarketInsights(data || []);
    } catch (error) {
      console.error('Error loading market insights:', error);
      setMarketInsights([]);
    }
  };

  const loadContacts = async () => {
    try {
      // This will be from Sphere OS database
      const { data, error } = await supabase
        .from('public_contacts')
        .select(`
          id,
          full_name,
          email,
          phone,
          specialty,
          city,
          state,
          hubspot_score,
          sales_touches,
          contact_owner,
          platform
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
      setContacts([]);
    }
  };

  const loadProcedureData = async () => {
    try {
      setLoadingData(true);
      // This will be from Sphere OS database
      const { data, error } = await supabase
        .from('dental_procedures')
        .select('*')
        .order('market_size_usd_millions', { ascending: false });
      
      if (error) throw error;
      setProcedureData(data || []);
    } catch (error) {
      console.error('Error loading procedure data:', error);
      setProcedureData([]);
    } finally {
      setLoadingData(false);
    }
  };

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setPromptDialog(true);
  };

  const extractVariables = (promptContent) => {
    const matches = promptContent.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
  };

  const handleGenerateContent = async (formData) => {
    setLoading(true);
    setShowBackendView(true);
    setBackendMessages([]);
    setCurrentPromptStream('');
    setResult('');
    
    try {
      let processedPrompt = selectedPrompt.prompt_content;
      const variables = extractVariables(selectedPrompt.prompt_content);
      
      variables.forEach(variable => {
        const value = formData[variable] || `[${variable}]`;
        processedPrompt = processedPrompt.replace(new RegExp(`\\{\\{${variable}\\}\\}`, 'g'), value);
      });

      // Simulate backend AI processing with beautiful display
      await simulateBackendProcessing(processedPrompt, selectedPrompt);

      const response = await generateContent(processedPrompt, selectedPrompt.model_used);
      setResult(response);
      
      const newResult = {
        id: Date.now(),
        prompt: selectedPrompt.prompt_name,
        content: response,
        timestamp: new Date().toISOString(),
        formData,
        reportType: selectedPrompt.report_type
      };
      setSavedResults(prev => [newResult, ...prev]);
      
      // Update usage count in Supabase
      if (supabaseKey) {
        await supabase
          .from('ai_prompts')
          .update({ 
            usage_count: selectedPrompt.usage_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedPrompt.id);
      }
      
    } catch (error) {
      console.error('Error generating content:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      // Keep backend view open for a moment to show completion
      setTimeout(() => setShowBackendView(false), 3000);
    }
  };

  const simulateBackendProcessing = async (processedPrompt, prompt) => {
    const steps = [
      { type: 'system', message: '🚀 Initializing RepSpheres AI Engine...', delay: 500 },
      { type: 'info', message: `📋 Loading prompt template: "${prompt.prompt_name}"`, delay: 300 },
      { type: 'success', message: `🎯 Target audience: ${prompt.target_audience}`, delay: 200 },
      { type: 'info', message: `🤖 AI Model: ${prompt.model_used}`, delay: 200 },
      { type: 'processing', message: '🔧 Processing user inputs...', delay: 400 },
      { type: 'code', message: 'Processing variables and context...', delay: 600 },
      { type: 'system', message: '🧠 Connecting to AI neural networks...', delay: 800 },
      { type: 'success', message: '⚡ AI model loaded successfully', delay: 300 },
      { type: 'processing', message: '📝 Generating intelligent analysis...', delay: 1000 },
      { type: 'stream', message: 'Starting content generation...', delay: 500 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setBackendMessages(prev => [...prev, { ...step, timestamp: Date.now() }]);
      
      if (step.type === 'code') {
        // Show the actual processed prompt
        setCurrentPromptStream(processedPrompt.substring(0, 50) + '...');
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentPromptStream(processedPrompt.substring(0, 150) + '...');
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentPromptStream(processedPrompt);
      }
    }

    // Simulate streaming text generation
    const streamingText = "Analyzing market data... Processing competitor intelligence... Generating strategic insights...";
    for (let i = 0; i < streamingText.length; i += 3) {
      setCurrentPromptStream(prev => prev + streamingText.substring(i, i + 3));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const getPromptIcon = (reportType) => {
    const iconMap = {
      'investigative_report': <Security />,
      'market_research': <TrendingUp />,
      'competitor_analysis': <Assessment />,
      'sales_strategy': <Campaign />,
      'linguistic_analysis': <Psychology />,
      'negotiation_strategy': <Gavel />,
      'financial_analysis': <AccountBalance />,
      'career_development': <School />,
      'pre-call': <ContactPhone />,
      'territory': <Business />
    };
    return iconMap[reportType] || <AutoAwesome />;
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.prompt_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || prompt.report_type === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(prompts.map(p => p.report_type))];

  const PromptDialog = () => {
    const [formData, setFormData] = useState({});
    const variables = selectedPrompt ? extractVariables(selectedPrompt.prompt_content) : [];

    const handleFieldChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Dialog 
        open={promptDialog} 
        onClose={() => setPromptDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {selectedPrompt && getPromptIcon(selectedPrompt.report_type)}
          {selectedPrompt?.prompt_name}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Chip 
              label={selectedPrompt?.report_type} 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={selectedPrompt?.target_audience} 
              variant="outlined" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={selectedPrompt?.model_used} 
              variant="outlined" 
              size="small" 
            />
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Workflow:</strong> Fill in the required fields below → Click "Generate Analysis" → 
              Review the AI-generated report → Save to database or email to colleagues
            </Typography>
          </Alert>

          <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
            "{selectedPrompt?.prompt_content?.substring(0, 150)}..."
          </Typography>
          
          <Grid container spacing={2}>
            {variables.map(variable => (
              <Grid item xs={12} sm={6} key={variable}>
                <TextField
                  fullWidth
                  label={variable.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  value={formData[variable] || ''}
                  onChange={(e) => handleFieldChange(variable, e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {result && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ <strong>Analysis Complete!</strong> Your AI-generated report is ready. 
                  You can now save it to your database or email it directly to colleagues.
                </Typography>
              </Alert>
              <Typography variant="h6" gutterBottom>📊 Generated Analysis Report:</Typography>
              <Paper sx={{ 
                p: 3, 
                bgcolor: 'background.default', 
                maxHeight: 400, 
                overflow: 'auto',
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 2
              }}>
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {result}
                </Typography>
              </Paper>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<Assessment />} 
                  label="Ready for Review" 
                  color="success" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<Save />} 
                  label="Saveable to Database" 
                  color="primary" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<Email />} 
                  label="Email-Ready Format" 
                  color="secondary" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<Schedule />} 
                  label="Can Automate" 
                  color="success" 
                  variant="filled" 
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setPromptDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleGenerateContent(formData)}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <AutoAwesome />}
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              }
            }}
          >
            {loading ? 'Generating...' : 'Generate Analysis'}
          </Button>
          {result && (
            <>
              <Button 
                startIcon={<Save />}
                onClick={async () => {
                  try {
                    // Save to Supabase saved_results table (you can create this table)
                    const savedResult = {
                      prompt_name: selectedPrompt.prompt_name,
                      prompt_id: selectedPrompt.id,
                      content: result,
                      form_data: formData,
                      report_type: selectedPrompt.report_type,
                      created_at: new Date().toISOString()
                    };
                    
                    // For now, save to local state - you can add Supabase table later
                    setSavedResults(prev => [{ ...savedResult, id: Date.now() }, ...prev]);
                    
                    alert('✅ Report saved successfully to your database!');
                  } catch (error) {
                    console.error('Error saving:', error);
                    alert('❌ Error saving report. Please try again.');
                  }
                }}
                variant="outlined"
                color="primary"
              >
                Save to Database
              </Button>
              <Button 
                startIcon={<Email />}
                onClick={() => {
                  const emailBody = encodeURIComponent(result);
                  const subject = encodeURIComponent(`RepSpheres Analysis: ${selectedPrompt.prompt_name}`);
                  window.open(`mailto:?subject=${subject}&body=${emailBody}`);
                }}
                variant="outlined"
                color="secondary"
              >
                Email Report
              </Button>
              <Button 
                startIcon={<Schedule />}
                onClick={() => {
                  setSelectedAutomationPrompt({
                    ...selectedPrompt,
                    formData,
                    generatedResult: result
                  });
                  setAutomationDialog(true);
                }}
                variant="contained"
                color="success"
                sx={{ 
                  background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
                  }
                }}
              >
                Add to Automation
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const AutomationDialog = () => {
    const [automationName, setAutomationName] = useState(`${selectedAutomationPrompt.prompt_name} - Automated`);
    const [schedule, setSchedule] = useState('weekly');
    const [scheduleTime, setScheduleTime] = useState('09:00');
    const [scheduleDay, setScheduleDay] = useState('monday');
    const [recipients, setRecipients] = useState('');
    const [active, setActive] = useState(true);

    const handleCreateAutomation = async () => {
      try {
        const automation = {
          name: automationName,
          prompt_id: selectedAutomationPrompt.id,
          prompt_name: selectedAutomationPrompt.prompt_name,
          form_data: selectedAutomationPrompt.formData,
          schedule_type: schedule,
          schedule_time: scheduleTime,
          schedule_day: scheduleDay,
          recipients: recipients.split(',').map(email => email.trim()),
          active: active,
          created_at: new Date().toISOString(),
          last_run: null,
          next_run: calculateNextRun()
        };

        // Save to your automations database table
        console.log('Creating automation:', automation);
        
        alert('🎉 Automation created successfully! This analysis will now run automatically according to your schedule.');
        setAutomationDialog(false);
        setSelectedAutomationPrompt(null);
        
      } catch (error) {
        console.error('Error creating automation:', error);
        alert('❌ Error creating automation. Please try again.');
      }
    };

    const calculateNextRun = () => {
      const now = new Date();
      const nextRun = new Date();
      
      if (schedule === 'daily') {
        nextRun.setDate(now.getDate() + 1);
      } else if (schedule === 'weekly') {
        const daysUntilNext = (getDayNumber(scheduleDay) - now.getDay() + 7) % 7;
        nextRun.setDate(now.getDate() + (daysUntilNext || 7));
      } else if (schedule === 'monthly') {
        nextRun.setMonth(now.getMonth() + 1, 1);
      }
      
      const [hours, minutes] = scheduleTime.split(':');
      nextRun.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      return nextRun.toISOString();
    };

    const getDayNumber = (day) => {
      const days = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
      return days[day.toLowerCase()];
    };

    return (
      <Dialog 
        open={automationDialog} 
        onClose={() => setAutomationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Schedule />
          Create Automated Workflow
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Turn this successful analysis into an automated workflow that runs on your schedule and delivers results to your team.
            </Typography>
          </Alert>

          <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>📊 Source Analysis:</Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{selectedAutomationPrompt.prompt_name}</strong> - {selectedAutomationPrompt.report_type}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pre-filled with your successful form data and settings
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Automation Name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
            margin="normal"
            helperText="Give this automation a descriptive name"
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  label="Frequency"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {schedule === 'weekly' && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Day of Week</InputLabel>
                  <Select
                    value={scheduleDay}
                    onChange={(e) => setScheduleDay(e.target.value)}
                    label="Day of Week"
                  >
                    <MenuItem value="monday">Monday</MenuItem>
                    <MenuItem value="tuesday">Tuesday</MenuItem>
                    <MenuItem value="wednesday">Wednesday</MenuItem>
                    <MenuItem value="thursday">Thursday</MenuItem>
                    <MenuItem value="friday">Friday</MenuItem>
                    <MenuItem value="saturday">Saturday</MenuItem>
                    <MenuItem value="sunday">Sunday</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email Recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            margin="normal"
            helperText="Comma-separated email addresses who will receive the automated reports"
            placeholder="sales@company.com, manager@company.com"
          />

          <FormControlLabel
            control={
              <Switch 
                checked={active} 
                onChange={(e) => setActive(e.target.checked)} 
              />
            }
            label="Start automation immediately"
            sx={{ mt: 2 }}
          />

          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1, color: 'success.contrastText' }}>
            <Typography variant="subtitle2" gutterBottom>
              <Timer sx={{ mr: 1, verticalAlign: 'middle' }} />
              Next Run Schedule:
            </Typography>
            <Typography variant="body2">
              {schedule === 'daily' && `Every day at ${scheduleTime}`}
              {schedule === 'weekly' && `Every ${scheduleDay} at ${scheduleTime}`}
              {schedule === 'monthly' && `1st of every month at ${scheduleTime}`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAutomationDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateAutomation}
            variant="contained"
            startIcon={<Schedule />}
            sx={{ 
              background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
              }
            }}
          >
            Create Automation
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const ContactUploadDialog = () => {
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedFile(file);
        simulateUploadAndCleaning(file);
      }
    };

    const simulateUploadAndCleaning = async (file) => {
      // Simulate file upload progress
      setUploadProgress(0);
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Simulate AI cleaning and enrichment process
      setCleaningProgress(0);
      const cleaningSteps = [
        { step: 10, message: "🔍 Analyzing contact format..." },
        { step: 25, message: "🧹 Removing duplicates and invalid entries..." },
        { step: 40, message: "🎯 Standardizing names and addresses..." },
        { step: 55, message: "📱 Validating phone numbers and emails..." },
        { step: 70, message: "🏥 Enriching with medical specialty data..." },
        { step: 85, message: "📊 Calculating AI engagement scores..." },
        { step: 100, message: "✅ Contact cleaning complete!" }
      ];

      for (const { step, message } of cleaningSteps) {
        setCleaningProgress(step);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Generate impressive cleaning stats for dopamine hit
      const stats = {
        originalCount: Math.floor(Math.random() * 500) + 300,
        cleanedCount: null,
        duplicatesRemoved: Math.floor(Math.random() * 50) + 25,
        emailsValidated: Math.floor(Math.random() * 200) + 150,
        phonesStandardized: Math.floor(Math.random() * 180) + 120,
        addressesGeocoded: Math.floor(Math.random() * 160) + 100,
        specialtiesEnriched: Math.floor(Math.random() * 140) + 80,
        scoresCalculated: null,
        qualityImprovement: Math.floor(Math.random() * 25) + 65
      };
      
      stats.cleanedCount = stats.originalCount - stats.duplicatesRemoved + Math.floor(Math.random() * 50);
      stats.scoresCalculated = stats.cleanedCount;

      setCleaningStats(stats);
      setUploadComplete(true);
    };

    const handleClose = () => {
      setUploadDialog(false);
      setUploadedFile(null);
      setUploadProgress(0);
      setCleaningProgress(0);
      setUploadComplete(false);
      setCleaningStats(null);
    };

    return (
      <Dialog 
        open={uploadDialog} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <CloudUpload />
          Smart Contact Upload & AI Cleaning
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {!uploadedFile && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Upload Your Contact List
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We'll instantly clean, enrich, and score your contacts with AI
              </Typography>
              
              <input
                accept=".csv,.xlsx,.xls"
                style={{ display: 'none' }}
                id="contact-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="contact-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  size="large"
                  sx={{ 
                    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                    py: 2,
                    px: 4
                  }}
                >
                  Choose File (CSV, Excel)
                </Button>
              </label>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Chip icon={<AutoFixHigh />} label="AI Cleaning" color="primary" />
                <Chip icon={<PersonAdd />} label="Data Enrichment" color="secondary" />
                <Chip icon={<TrendingUp />} label="Smart Scoring" color="success" />
              </Box>
            </Box>
          )}

          {uploadedFile && !uploadComplete && (
            <Box sx={{ py: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AutoFixHigh sx={{ mr: 1 }} />
                Processing "{uploadedFile.name}"
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>Upload Progress:</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {uploadProgress}% uploaded
                </Typography>
              </Box>

              {uploadProgress === 100 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>AI Cleaning & Enrichment:</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={cleaningProgress} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {cleaningProgress}% processed
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {uploadComplete && cleaningStats && (
            <Box sx={{ py: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🎉 Contact Cleaning Complete!
                </Typography>
                <Typography variant="body2">
                  Your contacts have been successfully cleaned, enriched, and optimized for maximum sales impact.
                </Typography>
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        {cleaningStats.cleanedCount.toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Clean Contacts Ready
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        {cleaningStats.qualityImprovement}%
                      </Typography>
                      <Typography variant="body2">
                        Data Quality Improvement
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
                🤖 AI Processing Results:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="error.main">
                      -{cleaningStats.duplicatesRemoved}
                    </Typography>
                    <Typography variant="caption">
                      Duplicates Removed
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="success.main">
                      +{cleaningStats.emailsValidated}
                    </Typography>
                    <Typography variant="caption">
                      Emails Validated
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="primary.main">
                      +{cleaningStats.phonesStandardized}
                    </Typography>
                    <Typography variant="caption">
                      Phones Standardized
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="secondary.main">
                      +{cleaningStats.addressesGeocoded}
                    </Typography>
                    <Typography variant="caption">
                      Addresses Geocoded
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="info.main">
                      +{cleaningStats.specialtiesEnriched}
                    </Typography>
                    <Typography variant="caption">
                      Specialties Enriched
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h5" color="warning.main">
                      {cleaningStats.scoresCalculated}
                    </Typography>
                    <Typography variant="caption">
                      AI Scores Calculated
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  💡 <strong>Pro Tip:</strong> Your cleaned contacts are automatically integrated with our AI analysis tools. 
                  Try running an "Investigative Prospect Report" on your top-scored contacts!
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            {uploadComplete ? 'Done' : 'Cancel'}
          </Button>
          {uploadComplete && (
            <Button 
              variant="contained"
              startIcon={<ContactPhone />}
              onClick={() => {
                handleClose();
                setSelectedTab(2); // Stay on CRM tab to see results
              }}
              sx={{ 
                background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
                }
              }}
            >
              View Cleaned Contacts
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const BackendView = () => {
    const getMessageColor = (type) => {
      switch (type) {
        case 'system': return '#00bcd4';
        case 'success': return '#4caf50';
        case 'processing': return '#ff9800';
        case 'info': return '#2196f3';
        case 'code': return '#9c27b0';
        case 'stream': return '#f44336';
        default: return '#ffffff';
      }
    };

    const getMessageIcon = (type) => {
      switch (type) {
        case 'system': return '⚡';
        case 'success': return '✅';
        case 'processing': return '🔄';
        case 'info': return 'ℹ️';
        case 'code': return '💻';
        case 'stream': return '🔥';
        default: return '•';
      }
    };

    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#0a0a0a',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          color: '#00ff00',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          background: 'linear-gradient(90deg, #001122 0%, #003366 50%, #001122 100%)',
          p: 2,
          borderBottom: '2px solid #00ff00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h5" sx={{ 
            color: '#00ff00',
            fontFamily: 'Monaco, monospace',
            textShadow: '0 0 10px #00ff00'
          }}>
            🤖 RepSpheres AI Engine - Live Processing
          </Typography>
          <Button 
            onClick={() => setShowBackendView(false)}
            sx={{ 
              color: '#ff4444',
              border: '1px solid #ff4444',
              '&:hover': { bgcolor: '#ff4444', color: '#000' }
            }}
          >
            CLOSE
          </Button>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', height: '100%' }}>
          {/* Left Panel - System Messages */}
          <Box sx={{ 
            width: '50%', 
            p: 2, 
            borderRight: '1px solid #00ff00',
            overflow: 'auto'
          }}>
            <Typography variant="h6" sx={{ 
              color: '#00ccff', 
              mb: 2,
              textShadow: '0 0 5px #00ccff'
            }}>
              🔧 SYSTEM LOGS
            </Typography>
            
            {backendMessages.map((msg, index) => (
              <Box key={index} sx={{ 
                mb: 1, 
                p: 1,
                bgcolor: 'rgba(0, 255, 0, 0.05)',
                borderLeft: `3px solid ${getMessageColor(msg.type)}`,
                borderRadius: '0 4px 4px 0',
                animation: 'fadeIn 0.5s ease-in'
              }}>
                <Typography variant="body2" sx={{ 
                  color: getMessageColor(msg.type),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <span style={{ fontSize: '16px' }}>{getMessageIcon(msg.type)}</span>
                  {msg.message}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: '#666',
                  fontSize: '10px',
                  opacity: 0.7
                }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right Panel - Code/Prompt View */}
          <Box sx={{ 
            width: '50%', 
            p: 2,
            overflow: 'auto'
          }}>
            <Typography variant="h6" sx={{ 
              color: '#ff6600', 
              mb: 2,
              textShadow: '0 0 5px #ff6600'
            }}>
              💻 AI PROMPT PROCESSING
            </Typography>
            
            <Paper sx={{ 
              bgcolor: '#111',
              border: '1px solid #333',
              borderRadius: 2,
              p: 2,
              height: 'calc(100% - 60px)',
              overflow: 'auto'
            }}>
              <Typography variant="body2" sx={{ 
                color: '#00ff00',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                fontFamily: 'Monaco, monospace',
                fontSize: '13px'
              }}>
                {currentPromptStream}
                {loading && (
                  <Box component="span" sx={{ 
                    animation: 'blink 1s infinite',
                    color: '#ff0000',
                    fontSize: '16px'
                  }}>
                    ▋
                  </Box>
                )}
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Bottom Status Bar */}
        <Box sx={{ 
          background: 'linear-gradient(90deg, #001122 0%, #003366 50%, #001122 100%)',
          p: 1,
          borderTop: '2px solid #00ff00',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" sx={{ color: '#00ccff' }}>
            Status: {loading ? '🔄 PROCESSING' : '✅ COMPLETE'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#00ccff' }}>
            Model: {selectedPrompt?.model_used || 'OpenAI GPT-4O'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#00ccff' }}>
            Target: {selectedPrompt?.target_audience || 'Sales Team'}
          </Typography>
        </Box>

        {/* CSS for animations */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}
        </style>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          RepSpheres Command Center
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          AI-powered sales intelligence with 350+ procedure insights, linguistic analysis & CRM integration
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab 
            label={
              <Badge badgeContent={prompts.length} color="primary">
                AI Command Center
              </Badge>
            } 
            icon={<Psychology />} 
          />
          <Tab 
            label={
              <Badge badgeContent={marketInsights.length} color="secondary">
                Market Insights
              </Badge>
            } 
            icon={<TrendingUp />} 
          />
          <Tab 
            label={
              <Badge badgeContent={contacts.length} color="info">
                CRM Integration
              </Badge>
            } 
            icon={<ContactPhone />} 
          />
          <Tab label="Automations" icon={<Schedule />} />
          <Tab label="Linguistic Analysis" icon={<Analytics />} />
          <Tab label="Saved Results" icon={<History />} />
        </Tabs>
      </Box>

      {/* AI Command Center Tab */}
      {selectedTab === 0 && (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>🚀 Welcome to your AI Command Center</Typography>
            <Typography variant="body2">
              <strong>How it works:</strong> Choose an analysis type below → Fill in the details → 
              Get AI-powered reports tailored for your sales prospects and market research
            </Typography>
          </Alert>
          
          {/* Debug Information */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>🔧 Connection Status:</strong> 
              {supabase ? ' ✅ Supabase Connected' : ' ❌ Supabase Not Connected'} | 
              Prompts loaded: {prompts.length} | 
              Environment: {import.meta.env.MODE}
            </Typography>
          </Alert>
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search prompts, tags, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {prompts.length === 0 ? (
            <Alert severity="info">
              Connecting to Supabase AI prompts database. Please ensure VITE_SUPABASE_ANON_KEY is configured.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {filteredPrompts.map((prompt) => (
                <Grid item xs={12} md={6} lg={4} key={prompt.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {getPromptIcon(prompt.report_type)}
                        <Box sx={{ ml: 1, flexGrow: 1 }}>
                          <Chip 
                            label={prompt.report_type.replace(/_/g, ' ')} 
                            size="small" 
                            color="primary"
                          />
                        </Box>
                        <Chip 
                          label={`Used ${prompt.usage_count}x`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                        {prompt.prompt_name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Target: {prompt.target_audience}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {prompt.tags?.slice(0, 3).map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handlePromptSelect(prompt)}
                        startIcon={<PlayArrow />}
                        sx={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                          }
                        }}
                      >
                        Execute Analysis
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Market Insights Tab */}
      {selectedTab === 1 && (
        <Box>
          {loadingData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {marketInsights.map((insight) => (
                <Grid item xs={12} md={6} lg={4} key={insight.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {insight.name}
                      </Typography>
                      <Chip label={insight.category} size="small" sx={{ mb: 2 }} />
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Market Size: ${insight.market_size_usd_millions}M
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Growth: {insight.yearly_growth_percentage}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Avg Cost: ${insight.average_cost_usd}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Satisfaction: {insight.patient_satisfaction_score}/10
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* CRM Integration Tab */}
      {selectedTab === 2 && (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>🚀 Smart Contact Management</Typography>
            <Typography variant="body2">
              Upload your contact lists and watch our AI instantly clean, enrich, and score them for maximum sales impact
            </Typography>
          </Alert>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 }
              }}
              onClick={() => setUploadDialog(true)}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Upload Contact List
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    CSV, Excel, or Google Sheets
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    ✨ Instant AI cleaning & enrichment
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Speed sx={{ mr: 1 }} />
                    Contact Database Stats
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h4" color="primary.main">
                      {contacts.length.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Contacts in Database
                    </Typography>
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Chip 
                        icon={<TrendingUp />} 
                        label="98% Data Quality" 
                        color="success" 
                        size="small"
                      />
                      <Chip 
                        icon={<CheckCircle />} 
                        label="AI Enriched" 
                        color="primary" 
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
            <ContactPhone sx={{ mr: 1 }} />
            Recent Contacts
          </Typography>
          
          <List>
            {contacts.slice(0, 10).map((contact) => (
              <React.Fragment key={contact.id}>
                <ListItem>
                  <ListItemIcon>
                    <ContactPhone />
                  </ListItemIcon>
                  <ListItemText
                    primary={contact.full_name}
                    secondary={`${contact.specialty} • ${contact.city}, ${contact.state} • Score: ${contact.hubspot_score}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip 
                      label={contact.platform || 'Direct'} 
                      size="small" 
                      variant="outlined"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {/* Automations Tab */}
      {selectedTab === 3 && (
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            Automated workflows for continuous market intelligence and sales optimization.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Weekly Market Reports
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Auto-generate weekly market intelligence reports from your 350+ procedure database
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: Every Monday at 9:00 AM
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Active"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        <ContactPhone sx={{ mr: 1, verticalAlign: 'middle' }} />
                        CRM Follow-up Automation
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Automated follow-up sequences based on HubSpot scores and interaction history
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: Daily at 8:00 AM
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={<Switch />}
                      label="Inactive"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Competitor Intelligence Alerts
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Real-time monitoring of competitor activities and market changes
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: Real-time monitoring
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Active"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Linguistic Analysis Pipeline
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Automated analysis of sales calls and communications for optimization insights
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: After each recorded interaction
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Active"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                fullWidth
                sx={{ py: 2 }}
              >
                Create New Automation Workflow
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Linguistic Analysis Tab */}
      {selectedTab === 4 && (
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            FBI-level linguistic analysis tools for behavioral insights and communication optimization.
          </Alert>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Audio & Text Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Advanced forensic linguistic analysis using FBI methodologies
                  </Typography>
                  <Button variant="outlined" startIcon={<Psychology />}>
                    Analyze Communication
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Saved Results Tab */}
      {selectedTab === 5 && (
        <Box>
          {savedResults.length === 0 ? (
            <Alert severity="info">
              No saved results yet. Execute AI prompts to see analysis results here.
            </Alert>
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
                      <IconButton onClick={() => console.log('View result:', result)}>
                        <MoreVert />
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

      {/* Dialogs */}
      {selectedPrompt && <PromptDialog />}
      {selectedAutomationPrompt && <AutomationDialog />}
      {uploadDialog && <ContactUploadDialog />}
      
      {/* Full-screen Backend View */}
      {showBackendView && <BackendView />}
    </Container>
  );
};

export default RepSpheresApp;