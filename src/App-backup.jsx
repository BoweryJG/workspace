import React, { useState, useEffect } from 'react';
import AppSwitcher from './AppSwitcher';

function App() {
  const [currentApp, setCurrentApp] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appMode = urlParams.get('mode');
    
    if (appMode === 'preview') {
      import('./WorkingPreview').then(module => {
        setCurrentApp(() => module.default);
        setLoading(false);
      }).catch(err => {
        console.error('Error loading preview:', err);
        setLoading(false);
      });
    } else if (appMode === 'original') {
      import('./App-original').then(module => {
        setCurrentApp(() => module.default);
        setLoading(false);
      }).catch(err => {
        console.error('Error loading original:', err);
        setLoading(false);
      });
    } else if (appMode === 'new') {
      import('./components/RepSpheresApp').then(module => {
        setCurrentApp(() => module.default);
        setLoading(false);
      }).catch(err => {
        console.error('Error loading new app:', err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        backgroundColor: '#0A0A14',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }
  
  if (currentApp) {
    const Component = currentApp;
    return <Component />;
  }
  
  return <AppSwitcher />;
}

export default App;