// Advanced mock data matching Supabase schema structure

// FBI-level behavioral indicators
export const generateBehavioralIndicators = () => {
  const indicators = [
    {
      type: 'verbal_cues',
      title: 'Verbal Pattern Analysis',
      findings: [
        {
          indicator: 'Hedging Language',
          frequency: 'Moderate',
          examples: ['I think', 'maybe', 'possibly'],
          significance: 'Indicates uncertainty or lack of confidence in stated position',
          timestamp: '2:34'
        },
        {
          indicator: 'Power Words',
          frequency: 'High',
          examples: ['definitely', 'absolutely', 'guaranteed'],
          significance: 'Shows strong conviction and persuasive intent',
          timestamp: '5:12'
        },
        {
          indicator: 'Mirroring Speech Patterns',
          frequency: 'Consistent',
          examples: ['Adopting prospect terminology', 'Matching pace'],
          significance: 'Building rapport through linguistic alignment',
          timestamp: '8:45'
        }
      ]
    },
    {
      type: 'psychological_triggers',
      title: 'Psychological Response Patterns',
      findings: [
        {
          trigger: 'Loss Aversion',
          response: 'Heightened engagement',
          description: 'Prospect showed increased interest when discussing missed opportunities',
          effectiveness: 'High'
        },
        {
          trigger: 'Social Proof',
          response: 'Validation seeking',
          description: 'Multiple references to competitor adoption',
          effectiveness: 'Moderate'
        },
        {
          trigger: 'Authority Bias',
          response: 'Deference',
          description: 'Positive response to industry expert citations',
          effectiveness: 'High'
        }
      ]
    },
    {
      type: 'micro_expressions',
      title: 'Non-Verbal Communication Analysis',
      findings: [
        {
          expression: 'Genuine Interest',
          indicators: ['Leaning forward', 'Maintained eye contact', 'Open posture'],
          duration: '15+ seconds',
          context: 'During ROI discussion'
        },
        {
          expression: 'Skepticism',
          indicators: ['Raised eyebrow', 'Slight head tilt', 'Arms crossing'],
          duration: '3-5 seconds',
          context: 'When discussing implementation timeline'
        }
      ]
    }
  ];

  return indicators[Math.floor(Math.random() * indicators.length)];
};

// Psychological profiles based on behavioral psychology
export const generatePsychologicalProfiles = () => {
  const profiles = [
    {
      primary_type: 'Analytical Decision Maker',
      traits: {
        dominant: ['Data-driven', 'Risk-averse', 'Detail-oriented'],
        secondary: ['Process-focused', 'Skeptical', 'Thorough'],
        hidden: ['Perfectionist tendencies', 'Fear of making wrong decision']
      },
      communication_style: {
        preferred: 'Facts and figures',
        avoid: 'Emotional appeals',
        pace: 'Slow and methodical'
      },
      decision_factors: [
        'ROI calculations',
        'Risk mitigation',
        'Proven track record',
        'Detailed implementation plan'
      ],
      influence_strategy: 'Present comprehensive data, case studies, and step-by-step process',
      buying_signals: [
        'Asks for specific metrics',
        'Requests references',
        'Discusses implementation details'
      ]
    },
    {
      primary_type: 'Visionary Leader',
      traits: {
        dominant: ['Big-picture thinker', 'Innovation-focused', 'Risk-tolerant'],
        secondary: ['Charismatic', 'Optimistic', 'Future-oriented'],
        hidden: ['Impatient with details', 'May overlook practical constraints']
      },
      communication_style: {
        preferred: 'Vision and possibilities',
        avoid: 'Excessive detail',
        pace: 'Fast and dynamic'
      },
      decision_factors: [
        'Competitive advantage',
        'Innovation potential',
        'Market leadership',
        'Transformation opportunity'
      ],
      influence_strategy: 'Paint a picture of future success and market dominance',
      buying_signals: [
        'Talks about transformation',
        'Asks about future features',
        'Discusses competitive positioning'
      ]
    },
    {
      primary_type: 'Consensus Builder',
      traits: {
        dominant: ['Team-oriented', 'Diplomatic', 'Inclusive'],
        secondary: ['Cautious', 'Relationship-focused', 'Collaborative'],
        hidden: ['Conflict-avoidant', 'May delay decisions for consensus']
      },
      communication_style: {
        preferred: 'Team benefits and harmony',
        avoid: 'Pressure tactics',
        pace: 'Moderate and inclusive'
      },
      decision_factors: [
        'Team buy-in',
        'Cultural fit',
        'Support and training',
        'Stakeholder approval'
      ],
      influence_strategy: 'Emphasize team success, support systems, and smooth adoption',
      buying_signals: [
        'Mentions team members',
        'Asks about training',
        'Discusses change management'
      ]
    }
  ];

  return profiles[Math.floor(Math.random() * profiles.length)];
};

// Harvey Specter style strategic advice
export const generateStrategicAdvice = () => {
  const advice = [
    {
      opening_move: "You're playing checkers while they're playing chess. Time to flip the board.",
      key_insights: [
        {
          observation: "They're using price as a smokescreen",
          reality: "This isn't about money - it's about control. They've already decided they need this.",
          action: "Stop defending your price. Start selling the cost of inaction."
        },
        {
          observation: "The decision maker is absent",
          reality: "You're negotiating with someone who can't say yes, only no.",
          action: "Politely end this meeting and get a meeting with someone who signs checks."
        },
        {
          observation: "They keep mentioning competitors",
          reality: "They're testing your confidence. Winners don't compare themselves to losers.",
          action: "Acknowledge once, then pivot to your unique value. Make them defend their status quo."
        }
      ],
      power_moves: [
        "Create urgency without desperation - mention your capacity constraints",
        "Use strategic silence after your strongest points",
        "Make them sell you on why they deserve your solution"
      ],
      closing_strategy: "Don't ask for the sale. Assume it and discuss implementation.",
      mindset: "You're not a vendor begging for business. You're a advisor choosing clients."
    },
    {
      opening_move: "They want to win. Show them what losing looks like.",
      key_insights: [
        {
          observation: "Heavy focus on features",
          reality: "They're stuck in the weeds because they can't see the forest.",
          action: "Elevate the conversation to business outcomes. Features are for engineers, not executives."
        },
        {
          observation: "Multiple stakeholders with conflicting priorities",
          reality: "This is a political battlefield, not a sales call.",
          action: "Identify the real power broker and align with their agenda."
        },
        {
          observation: "Constant budget concerns",
          reality: "Budget is never the real issue for things that matter.",
          action: "Shift from cost to ROI. Make staying the same more expensive than changing."
        }
      ],
      power_moves: [
        "Challenge their assumptions with market data",
        "Create FOMO by mentioning their competitors' moves",
        "Position yourself as the expert, not the salesperson"
      ],
      closing_strategy: "Give them two options, both of which result in moving forward.",
      mindset: "You don't get paid to take orders. You get paid to win."
    }
  ];

  return advice[Math.floor(Math.random() * advice.length)];
};

// Socratic questioning analysis
export const generateSocraticQuestions = () => {
  return {
    questions_asked: [
      {
        question: "What would success look like for your team in 12 months?",
        type: "Clarification",
        effectiveness: "High",
        response_quality: "Detailed and thoughtful",
        insights_gained: "Clear vision of desired future state"
      },
      {
        question: "Help me understand - what's preventing you from achieving that today?",
        type: "Assumption probe",
        effectiveness: "Very High",
        response_quality: "Revealed hidden constraints",
        insights_gained: "Identified technical debt and process bottlenecks"
      },
      {
        question: "How do you think your competitors are solving this problem?",
        type: "Perspective shift",
        effectiveness: "Moderate",
        response_quality: "Defensive initially, then opened up",
        insights_gained: "Competitive pressure is a key motivator"
      },
      {
        question: "What would happen if you did nothing?",
        type: "Consequence exploration",
        effectiveness: "Very High",
        response_quality: "Created urgency",
        insights_gained: "Status quo is not sustainable"
      }
    ],
    missed_opportunities: [
      {
        context: "When they mentioned budget constraints",
        missed_question: "What's the cost of not solving this problem?",
        impact: "Failed to reframe from cost to investment"
      },
      {
        context: "During technical requirements discussion",
        missed_question: "Who else needs to be involved in this decision?",
        impact: "May have missed key stakeholders"
      }
    ],
    questioning_pattern: {
      style: "Consultative with Socratic elements",
      depth: "Surface to mid-level",
      recommendation: "Go deeper on business impact questions"
    }
  };
};

// Key moments in conversation
export const generateKeyMoments = () => {
  return [
    {
      timestamp: "3:45",
      type: "Breakthrough",
      description: "Prospect revealed true budget authority",
      significance: "High",
      quote: "I need to be honest - I can approve up to $50K without committee",
      action_taken: "Adjusted proposal to fit within authority"
    },
    {
      timestamp: "8:23",
      type: "Objection",
      description: "Concerns about implementation timeline",
      significance: "Medium",
      quote: "Six weeks seems aggressive given our current workload",
      action_taken: "Offered phased approach with flexible timeline"
    },
    {
      timestamp: "15:12",
      type: "Buying Signal",
      description: "Asked about contract terms",
      significance: "Very High",
      quote: "What kind of terms do you typically offer?",
      action_taken: "Moved to closing discussion"
    },
    {
      timestamp: "22:34",
      type: "Rapport Building",
      description: "Personal connection over shared interest",
      significance: "Medium",
      quote: "You're a Bulls fan too? Those 90s teams were something else",
      action_taken: "Built personal connection before returning to business"
    }
  ];
};

// Next steps generator
export const generateNextSteps = () => {
  return [
    {
      action: "Send customized ROI calculator",
      owner: "Sales Rep",
      deadline: "Within 24 hours",
      priority: "High",
      impact: "Addresses analytical buyer's need for data"
    },
    {
      action: "Schedule technical deep-dive with their IT team",
      owner: "Sales Engineer",
      deadline: "Next week",
      priority: "High",
      impact: "Overcome technical objections"
    },
    {
      action: "Provide 3 customer references in similar industry",
      owner: "Sales Rep",
      deadline: "Within 48 hours",
      priority: "Medium",
      impact: "Build trust through social proof"
    },
    {
      action: "Follow up with decision maker directly",
      owner: "Sales Rep",
      deadline: "Within 3 days",
      priority: "Critical",
      impact: "Ensure buy-in from budget holder"
    }
  ];
};

// Participant analysis
export const generateParticipantAnalysis = (role) => {
  const analyses = {
    sales_rep: {
      performance_metrics: {
        talk_ratio: 35,
        question_ratio: 25,
        listening_score: 85,
        interruption_count: 2
      },
      strengths: [
        "Strong rapport building",
        "Effective use of social proof",
        "Good discovery questions"
      ],
      improvement_areas: [
        "Talked too much during technical discussion",
        "Missed opportunity to probe budget further",
        "Could have challenged assumptions more"
      ],
      communication_style: "Consultative with advisory elements"
    },
    prospect: {
      engagement_level: "High",
      personality_indicators: {
        disc_profile: "C/D (Analytical Driver)",
        communication_preference: "Data and logic",
        decision_style: "Methodical and cautious"
      },
      concerns_expressed: [
        "Implementation complexity",
        "Team adoption",
        "Integration with existing systems"
      ],
      buying_readiness: 7.5
    },
    decision_maker: {
      influence_level: "Ultimate",
      focus_areas: [
        "ROI and payback period",
        "Competitive advantage",
        "Risk mitigation"
      ],
      objections: [
        "Timing with other initiatives",
        "Resource allocation"
      ],
      commitment_level: "Interested but cautious"
    }
  };

  return analyses[role] || analyses.prospect;
};

// Complete conversation analysis
export const generateCompleteAnalysis = () => {
  return {
    behavioral_indicators: generateBehavioralIndicators(),
    psychological_profiles: generatePsychologicalProfiles(),
    strategic_advice: generateStrategicAdvice(),
    socratic_questions: generateSocraticQuestions(),
    key_moments: generateKeyMoments(),
    next_steps: generateNextSteps(),
    overall_assessment: {
      deal_probability: 72,
      momentum: "Positive with caution flags",
      critical_factors: [
        "Technical validation required",
        "Budget approval process",
        "Competitor evaluation ongoing"
      ],
      recommended_strategy: "Accelerate technical proof while building executive champion"
    }
  };
};