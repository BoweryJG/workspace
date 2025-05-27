import { useState, useCallback } from 'react';

// AI Query Parser - simulates natural language understanding
class AIQueryParser {
  constructor() {
    this.intents = {
      SEARCH_DOCTOR: ['find', 'search', 'look for', 'show', 'get', 'doctor', 'physician', 'dr'],
      FILTER_SPECIALTY: ['cardiology', 'neurology', 'oncology', 'pediatrics', 'orthopedics', 'specialty'],
      FILTER_LOCATION: ['in', 'at', 'near', 'location', 'city', 'hospital', 'clinic'],
      FILTER_VERIFIED: ['verified', 'certified', 'trusted', 'validated'],
      SORT_RATING: ['highest rated', 'best rated', 'top rated', 'rating'],
      SORT_PATIENTS: ['most patients', 'popular', 'busiest'],
      RECENT: ['recent', 'latest', 'last', 'previous'],
      FAVORITES: ['favorite', 'starred', 'saved', 'bookmarked'],
      EXPORT: ['export', 'download', 'pdf', 'save as'],
      COMPARE: ['compare', 'versus', 'vs', 'difference between']
    };
  }

  parseQuery(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const results = {
      intent: null,
      entities: {},
      confidence: 0,
      suggestions: []
    };

    // Determine primary intent
    for (const [intent, keywords] of Object.entries(this.intents)) {
      const matchCount = keywords.filter(keyword => 
        normalizedQuery.includes(keyword)
      ).length;
      
      if (matchCount > 0) {
        const confidence = matchCount / keywords.length;
        if (confidence > results.confidence) {
          results.intent = intent;
          results.confidence = confidence;
        }
      }
    }

    // Extract entities based on intent
    switch (results.intent) {
      case 'SEARCH_DOCTOR':
        // Extract doctor name
        const nameMatch = normalizedQuery.match(/(?:doctor|dr\.?)\s+(\w+(?:\s+\w+)*)/i);
        if (nameMatch) {
          results.entities.doctorName = nameMatch[1];
        }
        break;

      case 'FILTER_SPECIALTY':
        // Extract specialty
        const specialties = ['cardiology', 'neurology', 'oncology', 'pediatrics', 'orthopedics'];
        const foundSpecialty = specialties.find(s => normalizedQuery.includes(s));
        if (foundSpecialty) {
          results.entities.specialty = foundSpecialty;
        }
        break;

      case 'FILTER_LOCATION':
        // Extract location
        const locationMatch = normalizedQuery.match(/(?:in|at|near)\s+([^,]+)/i);
        if (locationMatch) {
          results.entities.location = locationMatch[1].trim();
        }
        break;

      case 'COMPARE':
        // Extract comparison entities
        const compareMatch = normalizedQuery.match(/compare\s+(.+?)\s+(?:and|vs|versus|with)\s+(.+)/i);
        if (compareMatch) {
          results.entities.compareItems = [
            compareMatch[1].trim(),
            compareMatch[2].trim()
          ];
        }
        break;
    }

    // Generate suggestions
    if (results.confidence < 0.5) {
      results.suggestions = this.generateSuggestions(normalizedQuery);
    }

    return results;
  }

  generateSuggestions(query) {
    const suggestions = [];
    
    if (query.length < 3) {
      suggestions.push(
        'Try: "Find cardiologists in New York"',
        'Try: "Show verified doctors near me"',
        'Try: "Compare Dr. Smith and Dr. Johnson"'
      );
    } else {
      suggestions.push(
        `Did you mean: "Find doctors ${query}"?`,
        `Did you mean: "Search ${query} specialty"?`,
        `Did you mean: "Show ${query} in my area"?`
      );
    }
    
    return suggestions;
  }

  generateResponse(parsedQuery, data) {
    const { intent, entities } = parsedQuery;
    
    switch (intent) {
      case 'SEARCH_DOCTOR':
        if (entities.doctorName && data.results.length > 0) {
          return {
            message: `Found ${data.results.length} doctor(s) matching "${entities.doctorName}"`,
            action: 'display_results'
          };
        } else if (entities.doctorName) {
          return {
            message: `No doctors found matching "${entities.doctorName}". Try a different search.`,
            action: 'suggest_alternatives'
          };
        }
        break;

      case 'FILTER_SPECIALTY':
        return {
          message: `Showing ${data.results.length} ${entities.specialty} specialists`,
          action: 'apply_filter'
        };

      case 'FILTER_LOCATION':
        return {
          message: `Found ${data.results.length} doctors in ${entities.location}`,
          action: 'apply_filter'
        };

      case 'COMPARE':
        return {
          message: `Comparing ${entities.compareItems.join(' and ')}`,
          action: 'show_comparison'
        };

      default:
        return {
          message: "I can help you find doctors, filter by specialty or location, compare doctors, and more. What would you like to do?",
          action: 'show_help'
        };
    }
  }
}

export const useAIQuery = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastQuery, setLastQuery] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const parser = new AIQueryParser();

  const processQuery = useCallback(async (query, context = {}) => {
    setIsProcessing(true);
    
    try {
      // Parse the natural language query
      const parsed = parser.parseQuery(query);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock results based on intent
      const mockData = generateMockData(parsed, context);
      
      // Generate response
      const response = parser.generateResponse(parsed, mockData);
      
      const result = {
        query,
        parsed,
        response,
        data: mockData,
        timestamp: new Date().toISOString()
      };
      
      setLastQuery(result);
      setQueryHistory(prev => [...prev, result]);
      
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setQueryHistory([]);
    setLastQuery(null);
  }, []);

  const getSuggestions = useCallback((partialQuery) => {
    if (!partialQuery || partialQuery.length < 2) return [];
    
    const suggestions = [
      'Find cardiologists in New York',
      'Show verified doctors near Mayo Clinic',
      'Search for Dr. Sarah Chen',
      'Find top rated neurologists',
      'Show doctors with most patients',
      'Compare cardiology specialists',
      'Export recent search results',
      'Show my favorite doctors'
    ];
    
    return suggestions.filter(s => 
      s.toLowerCase().includes(partialQuery.toLowerCase())
    ).slice(0, 5);
  }, []);

  return {
    processQuery,
    isProcessing,
    lastQuery,
    queryHistory,
    clearHistory,
    getSuggestions
  };
};

// Helper function to generate mock data
function generateMockData(parsed, context) {
  const { intent, entities } = parsed;
  
  switch (intent) {
    case 'SEARCH_DOCTOR':
      return {
        results: [
          {
            id: 1,
            name: `Dr. ${entities.doctorName || 'Sarah Chen'}`,
            specialty: 'Cardiology',
            hospital: 'Mayo Clinic',
            rating: 4.9
          }
        ]
      };
      
    case 'FILTER_SPECIALTY':
      return {
        results: Array(5).fill(null).map((_, i) => ({
          id: i + 1,
          name: `Dr. Example ${i + 1}`,
          specialty: entities.specialty,
          hospital: 'Various Hospitals',
          rating: 4.5 + Math.random() * 0.5
        }))
      };
      
    case 'COMPARE':
      return {
        comparison: {
          items: entities.compareItems || ['Item 1', 'Item 2'],
          metrics: {
            rating: [4.8, 4.9],
            patients: [1200, 1500],
            experience: ['15 years', '12 years']
          }
        }
      };
      
    default:
      return { results: [] };
  }
}