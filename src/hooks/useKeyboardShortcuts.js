import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Cmd (Mac) or Ctrl (Windows/Linux)
      const modifier = event.metaKey || event.ctrlKey;
      
      shortcuts.forEach(({ key, callback, requiresModifier = true }) => {
        if (requiresModifier && !modifier) return;
        if (!requiresModifier && modifier) return;
        
        if (event.key.toLowerCase() === key.toLowerCase()) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Global shortcuts hook
export const useGlobalShortcuts = (onSearch, onNewReport) => {
  useKeyboardShortcuts([
    {
      key: 'k',
      callback: () => onSearch(),
      requiresModifier: true
    },
    {
      key: 'n', 
      callback: () => onNewReport(),
      requiresModifier: true
    },
    {
      key: 'Escape',
      callback: () => {
        // Close any open modals or reset focus
        document.activeElement?.blur();
      },
      requiresModifier: false
    }
  ]);
};