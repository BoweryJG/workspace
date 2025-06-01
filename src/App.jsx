import React, { useState } from 'react';
import { Box, Container, Fade, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import AIModelsView from './components/AIModelsView';
import RepSpheresApp from './components/RepSpheresApp';
import { repSpheresTheme } from './theme/repSpheresTheme';

function App() {
  const [currentView, setCurrentView] = useState('models');

  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RepSpheres AI
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('models')}
              variant={currentView === 'models' ? 'outlined' : 'text'}
            >
              AI Models
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('dashboard')}
              variant={currentView === 'dashboard' ? 'outlined' : 'text'}
            >
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="xl">
          {currentView === 'models' && <AIModelsView />}
          {currentView === 'dashboard' && <RepSpheresApp />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;