import { useState, useCallback, useEffect } from 'react';

// Webhook configuration types
const WEBHOOK_EVENTS = {
  REPORT_GENERATED: 'report.generated',
  DOCTOR_SEARCHED: 'doctor.searched',
  FAVORITE_ADDED: 'favorite.added',
  FAVORITE_REMOVED: 'favorite.removed',
  EXPORT_COMPLETED: 'export.completed',
  COLLABORATION_STARTED: 'collaboration.started',
  USER_ACTIVITY: 'user.activity'
};

// Mock webhook registry
class WebhookRegistry {
  constructor() {
    this.webhooks = new Map();
    this.eventLog = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('repSpheres-webhooks');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.webhooks = new Map(parsed.webhooks);
        this.eventLog = parsed.eventLog || [];
      }
    } catch (error) {
      console.error('Failed to load webhooks:', error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('repSpheres-webhooks', JSON.stringify({
        webhooks: Array.from(this.webhooks.entries()),
        eventLog: this.eventLog.slice(-100) // Keep last 100 events
      }));
    } catch (error) {
      console.error('Failed to save webhooks:', error);
    }
  }

  register(webhook) {
    const id = `webhook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newWebhook = {
      id,
      ...webhook,
      createdAt: new Date().toISOString(),
      status: 'active',
      deliveryCount: 0,
      lastDelivery: null
    };
    
    this.webhooks.set(id, newWebhook);
    this.saveToStorage();
    return newWebhook;
  }

  unregister(id) {
    const deleted = this.webhooks.delete(id);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  update(id, updates) {
    const webhook = this.webhooks.get(id);
    if (webhook) {
      const updated = { ...webhook, ...updates };
      this.webhooks.set(id, updated);
      this.saveToStorage();
      return updated;
    }
    return null;
  }

  getAll() {
    return Array.from(this.webhooks.values());
  }

  getByEvent(event) {
    return Array.from(this.webhooks.values()).filter(
      webhook => webhook.events.includes(event) && webhook.status === 'active'
    );
  }

  async trigger(event, payload) {
    const webhooks = this.getByEvent(event);
    const results = [];
    
    for (const webhook of webhooks) {
      try {
        const result = await this.deliver(webhook, event, payload);
        results.push(result);
      } catch (error) {
        console.error(`Failed to deliver webhook ${webhook.id}:`, error);
        results.push({
          webhookId: webhook.id,
          success: false,
          error: error.message
        });
      }
    }
    
    // Log event
    this.eventLog.push({
      id: `event-${Date.now()}`,
      event,
      payload,
      timestamp: new Date().toISOString(),
      webhooksTriggered: webhooks.length,
      results
    });
    
    this.saveToStorage();
    return results;
  }

  async deliver(webhook, event, payload) {
    // Simulate webhook delivery
    const deliveryAttempt = {
      timestamp: new Date().toISOString(),
      event,
      payload
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    
    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;
    
    // Update webhook stats
    this.update(webhook.id, {
      deliveryCount: webhook.deliveryCount + 1,
      lastDelivery: {
        ...deliveryAttempt,
        success,
        statusCode: success ? 200 : 500,
        responseTime: Math.random() * 500 + 100
      }
    });
    
    if (!success) {
      throw new Error('Simulated delivery failure');
    }
    
    return {
      webhookId: webhook.id,
      success: true,
      statusCode: 200,
      responseTime: Math.random() * 500 + 100
    };
  }

  testWebhook(webhook) {
    const testPayload = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'This is a test webhook delivery'
    };
    
    return this.deliver(webhook, 'test.webhook', testPayload);
  }
}

// Singleton instance
const registry = new WebhookRegistry();

export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState(() => registry.getAll());
  const [eventLog, setEventLog] = useState(() => registry.eventLog);
  const [isLoading, setIsLoading] = useState(false);

  const refreshWebhooks = useCallback(() => {
    setWebhooks(registry.getAll());
    setEventLog([...registry.eventLog]);
  }, []);

  const registerWebhook = useCallback(async (webhookData) => {
    setIsLoading(true);
    try {
      const webhook = registry.register(webhookData);
      refreshWebhooks();
      return { success: true, webhook };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [refreshWebhooks]);

  const unregisterWebhook = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const success = registry.unregister(id);
      refreshWebhooks();
      return { success };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [refreshWebhooks]);

  const updateWebhook = useCallback(async (id, updates) => {
    setIsLoading(true);
    try {
      const webhook = registry.update(id, updates);
      refreshWebhooks();
      return { success: true, webhook };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [refreshWebhooks]);

  const testWebhook = useCallback(async (webhookId) => {
    setIsLoading(true);
    try {
      const webhook = webhooks.find(w => w.id === webhookId);
      if (!webhook) throw new Error('Webhook not found');
      
      const result = await registry.testWebhook(webhook);
      refreshWebhooks();
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [webhooks, refreshWebhooks]);

  const triggerEvent = useCallback(async (event, payload) => {
    try {
      const results = await registry.trigger(event, payload);
      refreshWebhooks();
      return { success: true, results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [refreshWebhooks]);

  // Auto-refresh event log
  useEffect(() => {
    const interval = setInterval(refreshWebhooks, 5000);
    return () => clearInterval(interval);
  }, [refreshWebhooks]);

  return {
    webhooks,
    eventLog,
    isLoading,
    registerWebhook,
    unregisterWebhook,
    updateWebhook,
    testWebhook,
    triggerEvent,
    WEBHOOK_EVENTS
  };
};