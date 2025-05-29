import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Collapse,
  useTheme,
  Grid,
  List,
  ListItem
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Storage,
  Code,
  Psychology,
  Timeline
} from '@mui/icons-material';
import { GlassCard } from './StyledComponents';

const tableSchemas = {
  conversations: {
    name: 'repspheres_conversations',
    description: 'Central table for call/meeting recordings and analysis',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique identifier' },
      { name: 'user_id', type: 'UUID', description: 'User who uploaded the recording' },
      { name: 'team_id', type: 'UUID', description: 'Team association' },
      { name: 'title', type: 'TEXT', description: 'Conversation title' },
      { name: 'file_url', type: 'TEXT', description: 'Recording file URL' },
      { name: 'file_size', type: 'INTEGER', description: 'File size in bytes' },
      { name: 'duration', type: 'INTEGER', description: 'Duration in seconds' },
      { name: 'meeting_type', type: 'ENUM', description: 'discovery/demo/followup/closing' },
      { name: 'sales_approach', type: 'ENUM', description: 'socratic/consultative/spin' },
      { name: 'status', type: 'TEXT', description: 'analyzing/completed/error' },
      { name: 'created_at', type: 'TIMESTAMP', description: 'Upload timestamp' }
    ]
  },
  behavioral_analysis: {
    name: 'repspheres_behavioral_analysis',
    description: 'Advanced linguistic and behavioral analysis results',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique identifier' },
      { name: 'conversation_id', type: 'UUID', description: 'Link to conversation' },
      { name: 'behavioral_indicators', type: 'JSONB', description: 'FBI-level behavioral patterns' },
      { name: 'psychological_profiles', type: 'JSONB', description: 'Personality assessments' },
      { name: 'strategic_advice', type: 'JSONB', description: 'Harvey Specter style coaching' },
      { name: 'socratic_questions', type: 'JSONB', description: 'Question analysis' },
      { name: 'key_moments', type: 'JSONB', description: 'Important timestamps' },
      { name: 'next_steps', type: 'JSONB', description: 'Recommended actions' }
    ]
  },
  participants: {
    name: 'repspheres_participants',
    description: 'People involved in conversations',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique identifier' },
      { name: 'conversation_id', type: 'UUID', description: 'Link to conversation' },
      { name: 'name', type: 'TEXT', description: 'Participant name' },
      { name: 'role', type: 'ENUM', description: 'sales_rep/prospect/decision_maker' },
      { name: 'speaking_time', type: 'INTEGER', description: 'Total speaking seconds' },
      { name: 'speaking_percentage', type: 'FLOAT', description: 'Percentage of conversation' },
      { name: 'interruption_count', type: 'INTEGER', description: 'Number of interruptions' },
      { name: 'question_count', type: 'INTEGER', description: 'Questions asked' }
    ]
  }
};

const sampleData = {
  behavioral_indicators: {
    type: 'verbal_cues',
    findings: [
      {
        indicator: 'Hedging Language',
        frequency: 'Moderate',
        examples: ['I think', 'maybe', 'possibly'],
        significance: 'Indicates uncertainty'
      }
    ]
  },
  psychological_profile: {
    primary_type: 'Analytical Decision Maker',
    traits: {
      dominant: ['Data-driven', 'Risk-averse'],
      communication_style: 'Facts and figures'
    }
  },
  strategic_advice: {
    opening_move: "You're playing checkers while they're playing chess.",
    key_insights: [
      {
        observation: "They're using price as a smokescreen",
        action: "Stop defending your price. Start selling the cost of inaction."
      }
    ]
  }
};

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DataStructureViewer() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [expandedRow, setExpandedRow] = useState({});

  const handleRowExpand = (table, column) => {
    const key = `${table}-${column}`;
    setExpandedRow(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <GlassCard>
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontWeight: 700,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Supabase Data Structure
        </Typography>
        
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab icon={<Storage />} label="Schema" />
          <Tab icon={<Code />} label="Sample Data" />
          <Tab icon={<Psychology />} label="Analysis Types" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {Object.entries(tableSchemas).map(([key, schema]) => (
            <Paper key={key} sx={{ mb: 3, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {schema.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {schema.description}
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Column</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schema.columns.map((column) => (
                      <TableRow key={column.name}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {column.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={column.type} 
                            size="small" 
                            color={column.type === 'JSONB' ? 'secondary' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {column.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Sample JSONB Data Structures
          </Typography>
          
          {Object.entries(sampleData).map(([key, data]) => (
            <Paper key={key} sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}
              </Typography>
              <Box
                sx={{
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  overflow: 'auto'
                }}
              >
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </Box>
            </Paper>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Behavioral Analysis</Typography>
                </Box>
                <List>
                  <ListItem>• Verbal pattern analysis</ListItem>
                  <ListItem>• Psychological triggers</ListItem>
                  <ListItem>• Micro-expressions</ListItem>
                  <ListItem>• Communication styles</ListItem>
                  <ListItem>• Influence patterns</ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Timeline sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="h6">Strategic Insights</Typography>
                </Box>
                <List>
                  <ListItem>• Harvey Specter coaching</ListItem>
                  <ListItem>• Socratic questioning</ListItem>
                  <ListItem>• Key moment detection</ListItem>
                  <ListItem>• Next step recommendations</ListItem>
                  <ListItem>• Deal probability scoring</ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </GlassCard>
  );
}