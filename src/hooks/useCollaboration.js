import { useState, useEffect, useCallback, useRef } from 'react';

// Simulated WebSocket for real-time collaboration
class CollaborationService {
  constructor() {
    this.listeners = new Map();
    this.users = new Map();
    this.cursors = new Map();
    this.selections = new Map();
    this.documentState = {};
    this.userId = `user-${Math.random().toString(36).substr(2, 9)}`;
  }

  connect(roomId) {
    // Simulate connection
    console.log(`Connected to room: ${roomId}`);
    
    // Simulate other users joining
    setTimeout(() => {
      this.addUser({
        id: 'user-demo-1',
        name: 'Sarah Chen',
        color: '#9c27b0',
        avatar: 'SC'
      });
    }, 2000);
    
    setTimeout(() => {
      this.addUser({
        id: 'user-demo-2',
        name: 'Michael Roberts',
        color: '#ff5722',
        avatar: 'MR'
      });
    }, 4000);
    
    return () => {
      this.disconnect();
    };
  }

  disconnect() {
    this.listeners.clear();
    this.users.clear();
    this.cursors.clear();
    this.selections.clear();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  addUser(user) {
    this.users.set(user.id, user);
    this.emit('userJoined', user);
    this.emit('usersUpdate', Array.from(this.users.values()));
  }

  removeUser(userId) {
    const user = this.users.get(userId);
    if (user) {
      this.users.delete(userId);
      this.cursors.delete(userId);
      this.selections.delete(userId);
      this.emit('userLeft', user);
      this.emit('usersUpdate', Array.from(this.users.values()));
    }
  }

  updateCursor(userId, position) {
    this.cursors.set(userId, position);
    this.emit('cursorUpdate', { userId, position });
  }

  updateSelection(userId, selection) {
    this.selections.set(userId, selection);
    this.emit('selectionUpdate', { userId, selection });
  }

  updateDocument(changes) {
    this.documentState = { ...this.documentState, ...changes };
    this.emit('documentUpdate', changes);
  }

  simulateActivity() {
    // Simulate cursor movements
    const users = ['user-demo-1', 'user-demo-2'];
    
    setInterval(() => {
      const userId = users[Math.floor(Math.random() * users.length)];
      if (this.users.has(userId)) {
        this.updateCursor(userId, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        });
      }
    }, 2000);
    
    // Simulate selections
    setInterval(() => {
      const userId = users[Math.floor(Math.random() * users.length)];
      if (this.users.has(userId)) {
        const fields = ['doctorName', 'location', 'products'];
        const field = fields[Math.floor(Math.random() * fields.length)];
        this.updateSelection(userId, { field, active: Math.random() > 0.5 });
      }
    }, 5000);
  }
}

// Singleton instance
const collaborationService = new CollaborationService();

export const useCollaboration = (roomId, options = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState(new Map());
  const [selections, setSelections] = useState(new Map());
  const [documentState, setDocumentState] = useState({});
  const serviceRef = useRef(collaborationService);

  useEffect(() => {
    if (!roomId) return;

    const service = serviceRef.current;
    const disconnect = service.connect(roomId);
    setIsConnected(true);

    // Set up event listeners
    const handleUsersUpdate = (updatedUsers) => setUsers(updatedUsers);
    const handleCursorUpdate = ({ userId, position }) => {
      setCursors(prev => new Map(prev).set(userId, position));
    };
    const handleSelectionUpdate = ({ userId, selection }) => {
      setSelections(prev => new Map(prev).set(userId, selection));
    };
    const handleDocumentUpdate = (changes) => {
      setDocumentState(prev => ({ ...prev, ...changes }));
    };

    service.on('usersUpdate', handleUsersUpdate);
    service.on('cursorUpdate', handleCursorUpdate);
    service.on('selectionUpdate', handleSelectionUpdate);
    service.on('documentUpdate', handleDocumentUpdate);

    // Simulate activity if enabled
    if (options.simulateActivity !== false) {
      service.simulateActivity();
    }

    return () => {
      service.off('usersUpdate', handleUsersUpdate);
      service.off('cursorUpdate', handleCursorUpdate);
      service.off('selectionUpdate', handleSelectionUpdate);
      service.off('documentUpdate', handleDocumentUpdate);
      disconnect();
      setIsConnected(false);
    };
  }, [roomId, options.simulateActivity]);

  const updateCursor = useCallback((position) => {
    serviceRef.current.updateCursor(serviceRef.current.userId, position);
  }, []);

  const updateSelection = useCallback((selection) => {
    serviceRef.current.updateSelection(serviceRef.current.userId, selection);
  }, []);

  const updateDocument = useCallback((changes) => {
    serviceRef.current.updateDocument(changes);
  }, []);

  const broadcastTyping = useCallback((field, isTyping) => {
    serviceRef.current.emit('typing', {
      userId: serviceRef.current.userId,
      field,
      isTyping
    });
  }, []);

  return {
    isConnected,
    users,
    cursors,
    selections,
    documentState,
    currentUserId: serviceRef.current.userId,
    updateCursor,
    updateSelection,
    updateDocument,
    broadcastTyping
  };
};