import { useState, useEffect } from 'react';

const STORAGE_KEY = 'repSpheres-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addSearch = (query, type = 'general', data = {}) => {
    if (!query || query.trim() === '') return;
    
    setRecentSearches(prev => {
      // Remove duplicates
      const filtered = prev.filter(search => 
        search.query.toLowerCase() !== query.toLowerCase()
      );
      
      // Add new search at the beginning
      const newSearch = {
        id: Date.now(),
        query,
        type,
        data,
        timestamp: new Date().toISOString()
      };
      
      // Keep only the most recent searches
      return [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeSearch = (searchId) => {
    setRecentSearches(prev => prev.filter(search => search.id !== searchId));
  };

  const getFormattedTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return {
    recentSearches: recentSearches.map(search => ({
      ...search,
      formattedTimestamp: getFormattedTimestamp(search.timestamp)
    })),
    addSearch,
    clearRecentSearches,
    removeSearch
  };
};