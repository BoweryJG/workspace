import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Alert,
  alpha,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Download as DownloadIcon,
  Description as PDFIcon,
  TableChart as ExcelIcon,
  Code as JSONIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Cloud as CloudIcon,
  Share as ShareIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  Settings as SettingsIcon,
  Preview as PreviewIcon,
  SaveAlt as SaveIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

const ExportManager = ({ data, reportType = 'doctor-report' }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportOptions, setExportOptions] = useState({
    includeGraphs: true,
    includeRawData: false,
    includeMetadata: true,
    customBranding: true,
    watermark: false,
    password: false
  });
  const [emailOptions, setEmailOptions] = useState({
    recipients: '',
    subject: `Sales Intelligence Report - ${new Date().toLocaleDateString()}`,
    message: 'Please find attached the latest sales intelligence report.',
    sendCopy: true
  });
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const exportFormats = [
    { id: 'pdf', label: 'PDF', icon: <PDFIcon />, description: 'Professional report format' },
    { id: 'excel', label: 'Excel', icon: <ExcelIcon />, description: 'Spreadsheet with data tables' },
    { id: 'json', label: 'JSON', icon: <JSONIcon />, description: 'Raw data for integrations' },
    { id: 'email', label: 'Email', icon: <EmailIcon />, description: 'Send via email' },
    { id: 'print', label: 'Print', icon: <PrintIcon />, description: 'Print-optimized layout' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate actual export
    setTimeout(() => {
      if (exportFormat === 'email') {
        // Handle email sending
        console.log('Sending email to:', emailOptions.recipients);
      } else if (exportFormat === 'print') {
        window.print();
      } else {
        // Handle file download
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `repspheres-report-${Date.now()}.${exportFormat}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 3000);
  };

  const handleShare = () => {
    const link = `https://repspheres.com/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderExportOptions = () => {
    switch (exportFormat) {
      case 'pdf':
        return (
          <Box>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              PDF Options
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeGraphs}
                    onChange={(e) => setExportOptions({ ...exportOptions, includeGraphs: e.target.checked })}
                  />
                }
                label="Include visualizations and graphs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.customBranding}
                    onChange={(e) => setExportOptions({ ...exportOptions, customBranding: e.target.checked })}
                  />
                }
                label="Add company branding"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.watermark}
                    onChange={(e) => setExportOptions({ ...exportOptions, watermark: e.target.checked })}
                  />
                }
                label="Add confidential watermark"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.password}
                    onChange={(e) => setExportOptions({ ...exportOptions, password: e.target.checked })}
                  />
                }
                label="Password protect PDF"
              />
            </FormGroup>
          </Box>
        );

      case 'excel':
        return (
          <Box>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Excel Options
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeRawData}
                    onChange={(e) => setExportOptions({ ...exportOptions, includeRawData: e.target.checked })}
                  />
                }
                label="Include raw data tables"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeMetadata}
                    onChange={(e) => setExportOptions({ ...exportOptions, includeMetadata: e.target.checked })}
                  />
                }
                label="Include metadata and sources"
              />
            </FormGroup>
            <FormControl fullWidth sx={{ mt: 2 }} size="small">
              <InputLabel>Sheet Organization</InputLabel>
              <Select defaultValue="category" label="Sheet Organization">
                <MenuItem value="category">By Category</MenuItem>
                <MenuItem value="timeline">By Timeline</MenuItem>
                <MenuItem value="product">By Product</MenuItem>
                <MenuItem value="single">Single Sheet</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 'email':
        return (
          <Box>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Email Settings
            </Typography>
            <TextField
              fullWidth
              label="Recipients (comma separated)"
              value={emailOptions.recipients}
              onChange={(e) => setEmailOptions({ ...emailOptions, recipients: e.target.value })}
              placeholder="john@example.com, jane@example.com"
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Subject"
              value={emailOptions.subject}
              onChange={(e) => setEmailOptions({ ...emailOptions, subject: e.target.value })}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              value={emailOptions.message}
              onChange={(e) => setEmailOptions({ ...emailOptions, message: e.target.value })}
              multiline
              rows={3}
              size="small"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={emailOptions.sendCopy}
                  onChange={(e) => setEmailOptions({ ...emailOptions, sendCopy: e.target.checked })}
                />
              }
              label="Send me a copy"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: designTokens.borderRadius.xl,
        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
        backdropFilter: `blur(${designTokens.blur.md})`,
        border: `1px solid ${designTokens.colors.border.light}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Export Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose format and options for your report
            </Typography>
          </Box>
          <IconButton size="small">
            <SettingsIcon />
          </IconButton>
        </Box>

        {/* Format Selection */}
        <ToggleButtonGroup
          value={exportFormat}
          exclusive
          onChange={(e, value) => value && setExportFormat(value)}
          sx={{ mb: 3, width: '100%' }}
        >
          {exportFormats.map(format => (
            <ToggleButton
              key={format.id}
              value={format.id}
              sx={{
                flex: 1,
                flexDirection: 'column',
                gap: 1,
                py: 2,
                borderRadius: designTokens.borderRadius.lg,
                '&.Mui-selected': {
                  backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                  borderColor: designTokens.colors.primary[500],
                }
              }}
            >
              <Box sx={{ color: exportFormat === format.id ? designTokens.colors.primary[500] : 'inherit' }}>
                {format.icon}
              </Box>
              <Typography variant="caption" fontWeight="medium">
                {format.label}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Format-specific Options */}
        <Box sx={{ mb: 3 }}>
          {renderExportOptions()}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Quick Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<SaveIcon />}
              label="Save to Workspace"
              onClick={() => {}}
              clickable
              sx={{
                backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                '&:hover': {
                  backgroundColor: alpha(designTokens.colors.primary[500], 0.2),
                }
              }}
            />
            <Chip
              icon={<CloudIcon />}
              label="Save to Cloud"
              onClick={() => {}}
              clickable
              sx={{
                backgroundColor: alpha(designTokens.colors.accent[500], 0.1),
                '&:hover': {
                  backgroundColor: alpha(designTokens.colors.accent[500], 0.2),
                }
              }}
            />
            <Chip
              icon={<ShareIcon />}
              label="Generate Share Link"
              onClick={handleShare}
              clickable
              sx={{
                backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                '&:hover': {
                  backgroundColor: alpha(designTokens.colors.success[500], 0.2),
                }
              }}
            />
          </Box>
        </Box>

        {/* Share Link */}
        {shareLink && (
          <Alert
            severity="success"
            action={
              <IconButton size="small" onClick={handleCopyLink}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              Share link: {shareLink}
            </Typography>
          </Alert>
        )}

        {/* Export Progress */}
        {isExporting && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                {exportFormat === 'email' ? 'Sending email...' : 'Generating export...'}
              </Typography>
              <Typography variant="body2" color="primary">
                {exportProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={exportProgress}
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
        )}

        {/* Export Button */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={isExporting || (exportFormat === 'email' && !emailOptions.recipients)}
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              background: !isExporting 
                ? `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`
                : 'transparent',
              py: 1.5,
            }}
          >
            {exportFormat === 'email' ? 'Send Email' : 
             exportFormat === 'print' ? 'Print Report' : 
             'Export Report'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            sx={{
              borderRadius: designTokens.borderRadius.lg,
              py: 1.5,
            }}
          >
            Preview
          </Button>
        </Box>

        {/* Export History */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Last exported: Never • Total exports: 0
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExportManager;