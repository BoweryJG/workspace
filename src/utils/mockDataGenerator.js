import { 
  generateCompleteAnalysis,
  generateParticipantAnalysis 
} from './advancedMockData';

// Mock data generator for demo purposes
export const generateMockConversation = () => {
  const companies = [
    'TechCorp Solutions', 'Bright Smile Dental', 'Growth Partners Inc', 
    'Digital Innovations', 'CloudFirst Systems', 'DataDrive Analytics',
    'NextGen Software', 'Pioneer Consulting', 'Velocity Marketing'
  ];
  
  const callTypes = ['Discovery Call', 'Product Demo', 'Strategy Session', 'Follow-up Call', 'Closing Call'];
  
  const insights = [
    'Strong interest in automation features',
    'Budget concerns need addressing',
    'Decision maker engaged throughout',
    'Timeline: Q2 implementation',
    'Competitor comparison requested',
    'Technical requirements discussed',
    'ROI calculations needed',
    'Team buy-in achieved'
  ];
  
  const psychologyProfiles = [
    { type: 'Analytical', percentage: 42 },
    { type: 'Collaborative', percentage: 68 },
    { type: 'Decisive', percentage: 35 },
    { type: 'Innovative', percentage: 55 }
  ];
  
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  const randomCallType = callTypes[Math.floor(Math.random() * callTypes.length)];
  const randomScore = Math.floor(Math.random() * 20) + 75; // 75-95 range
  const randomInsights = insights
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 3); // 3-6 insights
  
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 7);
  const conversationDate = new Date(now.setDate(now.getDate() - randomDaysAgo));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: `${randomCallType} - ${randomCompany}`,
    score: randomScore,
    date: conversationDate,
    dateString: formatDate(conversationDate),
    insights: randomInsights,
    duration: Math.floor(Math.random() * 30) + 15, // 15-45 minutes
    psychology: psychologyProfiles[Math.floor(Math.random() * psychologyProfiles.length)],
    transcript: generateMockTranscript(),
    analysis: generateMockAnalysis(randomScore, randomInsights)
  };
};

export const generateMockTranscript = () => {
  const speakers = ['Sales Rep', 'Prospect'];
  const topics = [
    'product features', 'pricing structure', 'implementation timeline',
    'team requirements', 'integration capabilities', 'support options',
    'security compliance', 'customization options', 'training resources'
  ];
  
  const segments = [];
  const segmentCount = Math.floor(Math.random() * 5) + 10; // 10-15 segments
  
  for (let i = 0; i < segmentCount; i++) {
    const speaker = speakers[i % 2];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    segments.push({
      speaker,
      timestamp: `${Math.floor(i * 2)}:${(i * 30) % 60 < 10 ? '0' : ''}${(i * 30) % 60}`,
      text: `Discussion about ${topic} and how it relates to the prospect's needs.`
    });
  }
  
  return segments;
};

export const generateMockAnalysis = (score, insights) => {
  // Get advanced analysis
  const advancedAnalysis = generateCompleteAnalysis();
  
  return {
    overallScore: score,
    strengths: [
      'Clear value proposition presented',
      'Good rapport building',
      'Effective objection handling'
    ].filter(() => Math.random() > 0.3),
    improvements: [
      'Could probe deeper on pain points',
      'More specific ROI examples needed',
      'Follow-up timeline not clearly established'
    ].filter(() => Math.random() > 0.5),
    keyMoments: advancedAnalysis.key_moments.slice(0, 3),
    nextSteps: advancedAnalysis.next_steps.slice(0, 3),
    // Add advanced analysis data
    behavioralAnalysis: advancedAnalysis.behavioral_indicators,
    psychologicalProfile: advancedAnalysis.psychological_profiles,
    strategicAdvice: advancedAnalysis.strategic_advice,
    socraticAnalysis: advancedAnalysis.socratic_questions,
    overallAssessment: advancedAnalysis.overall_assessment,
    participants: [
      { 
        role: 'sales_rep', 
        name: 'Alex Johnson',
        analysis: generateParticipantAnalysis('sales_rep')
      },
      { 
        role: 'prospect', 
        name: generateProspectName(),
        analysis: generateParticipantAnalysis('prospect')
      }
    ]
  };
};

// Helper function to generate prospect names
const generateProspectName = () => {
  const firstNames = ['Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'Robert', 'Emma', 'James'];
  const lastNames = ['Williams', 'Chen', 'Martinez', 'Thompson', 'Anderson', 'Taylor', 'Johnson', 'Brown'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

export const formatDate = (date) => {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  } else if (diffDays === 1) {
    return `Yesterday at ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

// Generate initial set of conversations
export const generateInitialConversations = (count = 10) => {
  const conversations = [];
  for (let i = 0; i < count; i++) {
    conversations.push(generateMockConversation());
  }
  return conversations.sort((a, b) => b.date - a.date); // Sort by most recent
};

// Performance metrics generator
export const generatePerformanceMetrics = () => {
  const baseScore = Math.floor(Math.random() * 15) + 80; // 80-95
  const callsThisWeek = Math.floor(Math.random() * 10) + 8; // 8-18
  const avgScore = baseScore + (Math.random() * 5).toFixed(1);
  const insightsGenerated = callsThisWeek * Math.floor(Math.random() * 3 + 3); // 3-6 per call
  
  return {
    strategyScore: {
      value: baseScore + (Math.random() * 5).toFixed(1),
      change: `+${(Math.random() * 15 + 5).toFixed(0)}%`,
      trend: 'up'
    },
    callsAnalyzed: {
      value: callsThisWeek,
      change: 'This Week',
      trend: 'neutral'
    },
    avgCallScore: {
      value: avgScore,
      change: `+${(Math.random() * 10).toFixed(1)}%`,
      trend: 'up'
    },
    insightsGenerated: {
      value: insightsGenerated,
      change: `+${(Math.random() * 30 + 10).toFixed(0)}%`,
      trend: 'up'
    }
  };
};

// Team performance generator
export const generateTeamPerformance = () => {
  const teamMembers = [
    'Sarah Johnson', 'Mike Chen', 'Emma Davis', 
    'James Wilson', 'Lisa Anderson', 'David Martinez'
  ];
  
  return teamMembers.map(member => ({
    name: member,
    score: Math.floor(Math.random() * 20) + 75,
    calls: Math.floor(Math.random() * 15) + 5,
    improvement: Math.random() > 0.5 ? 
      `+${(Math.random() * 20).toFixed(0)}%` : 
      `-${(Math.random() * 10).toFixed(0)}%`
  })).sort((a, b) => b.score - a.score);
};