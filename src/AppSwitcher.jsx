import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  alpha,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  Visibility as ViewIcon,
  AutoAwesome as NewIcon,
  Code as CodeIcon,
  AutoAwesome
} from '@mui/icons-material';
import RepSpheresApp from './components/RepSpheresApp';
import ShowcaseDemo from './components/ShowcaseDemo';
import AppOriginal from './App-original';

const switcherTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A74F9',
    },
    background: {
      default: '#050511',
      paper: '#0A0A14',
    },
  },
});

function AppSwitcher() {
  const [mode, setMode] = useState('showcase'); // 'showcase', 'new', 'original'

  if (mode === 'new') {
    return <RepSpheresApp />;
  }

  if (mode === 'original') {
    return <AppOriginal />;
  }

  if (mode === 'showcase') {
    return <ShowcaseDemo />;
  }

  return (
    <ThemeProvider theme={switcherTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #050511 0%, #0A0A14 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Paper
          sx={{
            p: 6,
            maxWidth: 800,
            width: '100%',
            textAlign: 'center',
            backgroundColor: alpha('#0A0A14', 0.8),
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            RepSpheres Application
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            Choose which version of the application you'd like to view
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesome />}
              onClick={() => window.location.href = '/?mode=preview'}
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF5252 0%, #FF7043 100%)',
                }
              }}
            >
              View Preview
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              onClick={() => setMode('showcase')}
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #00D4FF 0%, #00A3CC 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00A3CC 0%, #007399 100%)',
                }
              }}
            >
              Component Showcase
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<NewIcon />}
              onClick={() => setMode('new')}
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #8A74F9 0%, #6B5ED6 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6B5ED6 0%, #5448B3 100%)',
                }
              }}
            >
              Full Application
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ViewIcon />}
              onClick={() => setMode('original')}
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Original App
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default AppSwitcher;