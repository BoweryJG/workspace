import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  generateMockConversation, 
  generateInitialConversations,
  generatePerformanceMetrics,
  generateTeamPerformance 
} from '../utils/mockDataGenerator';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Initialize demo data
  useEffect(() => {
    if (isDemoMode) {
      setConversations(generateInitialConversations(15));
      setMetrics(generatePerformanceMetrics());
      setTeamData(generateTeamPerformance());
    }
  }, [isDemoMode]);
  
  // Function to simulate real-time updates
  const startRealtimeUpdates = () => {
    const interval = setInterval(() => {
      if (isDemoMode && Math.random() > 0.8) { // 20% chance every 5 seconds
        addNewConversation();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  };
  
  // Add a new conversation
  const addNewConversation = () => {
    const newConversation = generateMockConversation();
    setConversations(prev => [newConversation, ...prev].slice(0, 20));
    
    // Update metrics
    setMetrics(generatePerformanceMetrics());
    
    // Show notification
    showNotification(`New conversation analyzed: ${newConversation.title}`);
  };
  
  // Show notification (you can enhance this with a proper notification system)
  const showNotification = (message) => {
    console.log('Demo notification:', message);
    // You could integrate with a toast library here
  };
  
  // Simulate conversation analysis
  const analyzeConversation = async (file) => {
    setIsGenerating(true);
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newConversation = generateMockConversation();
    newConversation.title = `Analysis - ${file.name}`;
    newConversation.date = new Date();
    newConversation.dateString = 'Just now';
    
    setConversations(prev => [newConversation, ...prev]);
    setIsGenerating(false);
    
    return newConversation;
  };
  
  // Get conversation by ID
  const getConversationById = (id) => {
    return conversations.find(conv => conv.id === id);
  };
  
  // Toggle demo mode
  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };
  
  const value = {
    isDemoMode,
    conversations,
    metrics,
    teamData,
    isGenerating,
    toggleDemoMode,
    addNewConversation,
    analyzeConversation,
    getConversationById,
    startRealtimeUpdates
  };
  
  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};