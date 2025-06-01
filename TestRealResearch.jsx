import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  Alert,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
  Container,
  Stack
} from '@mui/material';
import { researchDoctor } from './services/RealResearchService';
import { validateOpenRouterConnection } from './validateOpenRouter';
import { repSpheresTheme } from './theme/repSpheresTheme';

function TestRealResearch() {
  const [doctorName, setDoctorName] = useState('Dr. Sarah Johnson');
  const [location, setLocation] = useState('Beverly Hills, CA');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleValidateAPI = async () => {
    setIsValidating(true);
    setValidationResult(null);
    
    try {
      console.log('🔍 Validating OpenRouter API connection...');
      const result = await validateOpenRouterConnection();
      setValidationResult(result);
    } catch (err) {
      setValidationResult({
        success: false,
        error: err.message
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 Testing real research service...');
      
      const testData = {
        doctorName: doctorName,
        location: location,
        procedure: {
          name: 'Botox Injections',
          specialty: 'Aesthetic Medicine',
          growth: 23.5,
          opportunity: 'very high'
        },
        timeline: 'Q1 2024',
        practiceType: 'Private Practice'
      };

      const research = await researchDoctor(testData);
      console.log('✅ Research completed:', research);
      
      setResults(research);
    } catch (err) {
      console.error('❌ Research failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              🧪 Real Research Service Test
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Test the real OpenRouter AI-powered research functionality
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                label="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                onClick={handleValidateAPI}
                disabled={isValidating}
                startIcon={isValidating ? <CircularProgress size={20} /> : null}
              >
                {isValidating ? 'Validating...' : 'Validate API'}
              </Button>
              
              <Button
                variant="contained"
                onClick={handleTest}
                disabled={isLoading || !doctorName || !location}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Researching...' : 'Test Real Research'}
              </Button>
            </Stack>

            {validationResult && (
              <Alert 
                severity={validationResult.success ? "success" : "error"} 
                sx={{ mb: 3 }}
              >
                {validationResult.success ? (
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      ✅ OpenRouter API Connection Successful!
                    </Typography>
                    <Typography variant="caption">
                      Models available: {validationResult.modelsAvailable} | 
                      Response length: {validationResult.testResponse?.length || 0} chars
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2">
                    ❌ API Validation Failed: {validationResult.error}
                  </Typography>
                )}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Error: {error}
              </Alert>
            )}

            {results && (
              <Card sx={{ backgroundColor: 'rgba(0,255,0,0.05)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    ✅ Research Results (Real AI Generated)
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Doctor Profile:
                    </Typography>
                    <Typography variant="body2">
                      {results.doctor?.name} - {results.doctor?.specialty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {results.doctor?.credentials} • {results.doctor?.experience}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Practice Information:
                    </Typography>
                    <Typography variant="body2">
                      {results.practice?.name} ({results.practice?.type})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {results.practice?.locations} location(s) • {results.practice?.staffSize} staff
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      AI Analysis:
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {results.aiAnalysis || results.insights?.analysis || 'No analysis available'}
                    </Typography>
                  </Box>

                  {results.recommendations && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Strategic Recommendations:
                      </Typography>
                      <Typography variant="body2">
                        {results.recommendations.approachStrategy}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="caption" color="text.secondary">
                    Generated at: {new Date(results.generatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default TestRealResearch;