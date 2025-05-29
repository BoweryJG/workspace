// AI-Powered Analysis Types for Sales Conversations

export const AI_ANALYSIS_TYPES = {
  MEDDIC: {
    id: 'meddic',
    name: 'MEDDIC Qualification',
    icon: 'Assessment',
    color: '#4CAF50',
    description: 'Evaluate deal qualification using MEDDIC methodology',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    insights: [
      'Metrics alignment',
      'Economic buyer identification',
      'Decision criteria mapping',
      'Champion strength'
    ]
  },
  
  EMOTIONAL_INTELLIGENCE: {
    id: 'emotional',
    name: 'Emotional Intelligence',
    icon: 'Favorite',
    color: '#E91E63',
    description: 'Analyze emotional dynamics and rapport building',
    gradient: 'linear-gradient(135deg, #E91E63 0%, #F06292 100%)',
    insights: [
      'Sentiment progression',
      'Emotional triggers',
      'Trust indicators',
      'Engagement levels'
    ]
  },
  
  SPIN_ANALYSIS: {
    id: 'spin',
    name: 'SPIN Selling',
    icon: 'Psychology',
    color: '#9C27B0',
    description: 'Evaluate questioning technique effectiveness',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
    insights: [
      'Question types distribution',
      'Problem uncovering',
      'Implication development',
      'Need-payoff articulation'
    ]
  },
  
  NEGOTIATION_MASTER: {
    id: 'negotiation',
    name: 'Negotiation Strategy',
    icon: 'Gavel',
    color: '#FF9800',
    description: 'Harvey Specter-style power negotiation tactics',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
    persona: 'Harvey Specter',
    insights: [
      'Power dynamics',
      'Leverage points',
      'Closing tactics',
      'Win-win opportunities'
    ]
  },
  
  OBJECTION_HANDLING: {
    id: 'objections',
    name: 'Objection Analysis',
    icon: 'Shield',
    color: '#F44336',
    description: 'Identify and overcome sales objections',
    gradient: 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)',
    insights: [
      'Common objections',
      'Response effectiveness',
      'Unresolved concerns',
      'Objection patterns'
    ]
  },
  
  COMPETITIVE_INTEL: {
    id: 'competitive',
    name: 'Competitive Intelligence',
    icon: 'EmojiEvents',
    color: '#2196F3',
    description: 'Analyze competitive positioning and differentiation',
    gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
    insights: [
      'Competitor mentions',
      'Differentiation effectiveness',
      'Value proposition clarity',
      'Competitive advantages'
    ]
  },
  
  TALK_ANALYTICS: {
    id: 'talk',
    name: 'Conversation Dynamics',
    icon: 'GraphicEq',
    color: '#00BCD4',
    description: 'Analyze speaking patterns and engagement',
    gradient: 'linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%)',
    insights: [
      'Talk-to-listen ratio',
      'Monologue detection',
      'Interruption patterns',
      'Engagement scoring'
    ]
  },
  
  NEXT_BEST_ACTION: {
    id: 'nextaction',
    name: 'AI Recommendations',
    icon: 'AutoAwesome',
    color: '#795548',
    description: 'Real-time AI-powered next best actions',
    gradient: 'linear-gradient(135deg, #795548 0%, #A1887F 100%)',
    insights: [
      'Immediate actions',
      'Follow-up strategy',
      'Risk mitigation',
      'Opportunity maximization'
    ]
  },
  
  PERSONALITY_INSIGHTS: {
    id: 'personality',
    name: 'Buyer Personality',
    icon: 'Person',
    color: '#607D8B',
    description: 'DISC and communication style analysis',
    gradient: 'linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)',
    insights: [
      'DISC profile',
      'Communication preferences',
      'Decision-making style',
      'Influence strategies'
    ]
  },
  
  RISK_ASSESSMENT: {
    id: 'risk',
    name: 'Deal Risk Analysis',
    icon: 'Warning',
    color: '#FF5722',
    description: 'Identify deal risks and red flags',
    gradient: 'linear-gradient(135deg, #FF5722 0%, #FF7043 100%)',
    insights: [
      'Risk factors',
      'Deal blockers',
      'Timeline threats',
      'Mitigation strategies'
    ]
  }
};

// Generate analysis based on type
export const generateAnalysisForType = (type, conversationData) => {
  switch (type) {
    case 'MEDDIC':
      return generateMEDDICAnalysis(conversationData);
    case 'EMOTIONAL_INTELLIGENCE':
      return generateEmotionalAnalysis(conversationData);
    case 'SPIN_ANALYSIS':
      return generateSPINAnalysis(conversationData);
    case 'NEGOTIATION_MASTER':
      return generateNegotiationAnalysis(conversationData);
    case 'OBJECTION_HANDLING':
      return generateObjectionAnalysis(conversationData);
    case 'COMPETITIVE_INTEL':
      return generateCompetitiveAnalysis(conversationData);
    case 'TALK_ANALYTICS':
      return generateTalkAnalytics(conversationData);
    case 'NEXT_BEST_ACTION':
      return generateNextBestActions(conversationData);
    case 'PERSONALITY_INSIGHTS':
      return generatePersonalityInsights(conversationData);
    case 'RISK_ASSESSMENT':
      return generateRiskAssessment(conversationData);
    default:
      return null;
  }
};

// MEDDIC Analysis
const generateMEDDICAnalysis = (data) => ({
  score: 78,
  breakdown: {
    metrics: { score: 85, finding: "Clear ROI metrics discussed, 3.2x return projected" },
    economicBuyer: { score: 70, finding: "CFO mentioned but not directly engaged" },
    decisionCriteria: { score: 90, finding: "Well-defined: integration, scalability, support" },
    decisionProcess: { score: 75, finding: "Timeline clear, approval process needs clarification" },
    identifyPain: { score: 80, finding: "Manual processes costing 15 hours/week identified" },
    champion: { score: 65, finding: "VP Sales supportive but needs more conviction" },
    competition: { score: 80, finding: "Differentiated well against CompetitorX" }
  },
  recommendations: [
    "Schedule CFO meeting within next 5 days",
    "Strengthen champion with success stories from similar companies",
    "Document decision process with specific milestones"
  ]
});

// Emotional Intelligence Analysis
const generateEmotionalAnalysis = (data) => ({
  sentimentJourney: [
    { time: "0-5min", sentiment: "Cautious", score: 45 },
    { time: "5-15min", sentiment: "Interested", score: 65 },
    { time: "15-25min", sentiment: "Excited", score: 80 },
    { time: "25-30min", sentiment: "Committed", score: 85 }
  ],
  emotionalTriggers: [
    { trigger: "Team productivity mention", impact: "High", response: "Leaned in, asked follow-up questions" },
    { trigger: "Cost savings example", impact: "Very High", response: "Shared similar pain point" },
    { trigger: "Implementation timeline", impact: "Medium", response: "Slight hesitation, needs reassurance" }
  ],
  rapportIndicators: {
    mirroring: "High - adopted your terminology",
    engagement: "Active - asked 12 clarifying questions",
    openness: "Progressive - shared internal challenges"
  }
});

// SPIN Analysis
const generateSPINAnalysis = (data) => ({
  questionBreakdown: {
    situation: { count: 8, quality: "Good", examples: ["Current process?", "Team size?"] },
    problem: { count: 5, quality: "Excellent", examples: ["Cost of delays?", "Impact on team?"] },
    implication: { count: 3, quality: "Good", examples: ["If this continues?", "Effect on growth?"] },
    needPayoff: { count: 2, quality: "Fair", examples: ["Value of solving?", "ROI impact?"] }
  },
  effectiveness: 75,
  recommendations: [
    "Increase need-payoff questions to build value",
    "Dig deeper into business implications",
    "Connect problems to strategic initiatives"
  ]
});

// Negotiation Analysis (Harvey Specter Style)
const generateNegotiationAnalysis = (data) => ({
  powerDynamics: {
    currentPosition: "Neutral",
    leverage: ["Unique integration capabilities", "Time pressure on their side", "No strong competitor"],
    weaknesses: ["Price sensitivity expressed", "Multiple stakeholders to convince"]
  },
  tacticalInsights: [
    {
      observation: "They keep mentioning budget constraints",
      reality: "Using price as a negotiation tactic - they've already allocated budget",
      action: "Shift conversation from cost to cost of inaction"
    },
    {
      observation: "Decision maker absent from call",
      reality: "Testing the waters before bringing in the boss",
      action: "Position this as exclusive executive briefing opportunity"
    }
  ],
  closingStrategy: "Create urgency with limited-time implementation slots",
  powerMove: "Mention you're evaluating if they're the right fit as a customer"
});

// Talk Analytics
const generateTalkAnalytics = (data) => ({
  talkRatio: {
    rep: 35,
    prospect: 65,
    optimal: "Perfect - prospect should talk 60-70%"
  },
  longestMonologue: {
    speaker: "Rep",
    duration: "2:45",
    topic: "Feature explanation",
    impact: "Slight disengagement detected"
  },
  interruptionAnalysis: {
    repInterruptions: 1,
    prospectInterruptions: 3,
    interpretation: "Healthy - shows high engagement"
  },
  engagementScore: 87,
  silenceMoments: [
    { timestamp: "15:30", duration: "8s", following: "Pricing question", outcome: "Positive - processing information" }
  ]
});

// Next Best Actions
const generateNextBestActions = (data) => ({
  immediate: [
    {
      action: "Send personalized ROI calculator",
      priority: "Critical",
      timing: "Within 2 hours",
      template: "Include their specific metrics discussed at 12:30"
    },
    {
      action: "Connect on LinkedIn",
      priority: "High",
      timing: "Today",
      template: "Reference shared interest in digital transformation"
    }
  ],
  shortTerm: [
    {
      action: "Schedule technical deep-dive",
      priority: "High",
      timing: "This week",
      participants: "Include their IT director"
    },
    {
      action: "Share customer success story",
      priority: "Medium",
      timing: "Within 48 hours",
      relevance: "Similar industry and company size"
    }
  ],
  strategic: [
    {
      action: "Executive alignment meeting",
      priority: "Critical",
      timing: "Next 10 days",
      approach: "Position as strategic partnership discussion"
    }
  ]
});