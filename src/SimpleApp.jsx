import React from 'react';

function SimpleApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A14', 
      color: 'white', 
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>RepSpheres AI Platform</h1>
      <p>If this stays visible, the app is stable!</p>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Quick Links:</h2>
        <ul>
          <li><a href="/?mode=preview" style={{ color: '#8A74F9' }}>Preview Mode</a></li>
          <li><a href="/?mode=new" style={{ color: '#00D4FF' }}>New App</a></li>
          <li><a href="/?mode=original" style={{ color: '#10B981' }}>Original App</a></li>
        </ul>
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: '8px' 
      }}>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <p>URL: {window.location.href}</p>
      </div>
    </div>
  );
}

export default SimpleApp;