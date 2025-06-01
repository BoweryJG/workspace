// OpenRouter API client utilities

// Get the API key from environment variables
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/**
 * Generate content using the OpenRouter API
 * @param {string} prompt - The prompt to send to the model
 * @param {string} model - The model to use (default: 'gpt-4o')
 * @param {string} systemPrompt - Optional system prompt to set context
 * @returns {Promise<string>} The generated content
 */
export const generateContent = async (prompt, model = 'openai/gpt-4o', systemPrompt = '') => {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in environment variables.');
    }

    // Default system prompt if none provided
    const defaultSystemPrompt = 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.';
    
    // Use the provided system prompt or the default
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'RepSpheres AI Hub'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: finalSystemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with OpenRouter:', error);
    throw error;
  }
};

/**
 * Get available models from OpenRouter
 * @returns {Promise<Array>} Array of available models
 */
export const getAvailableModels = async () => {
  try {
    if (!OPENROUTER_API_KEY) {
      console.warn('OpenRouter API key not found. Using fallback mock data.');
      return [];
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch models: ${response.statusText}. Using fallback mock data.`);
      return [];
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching available models:', error);
    return [];
  }
};

/**
 * Test a model with a simple prompt
 * @param {string} modelId - The model ID to test
 * @param {string} testPrompt - Optional test prompt
 * @returns {Promise<Object>} Test result with response and metadata
 */
export const testModel = async (modelId, testPrompt = 'Hello! Please introduce yourself and tell me what you can help with.') => {
  try {
    const startTime = Date.now();
    const response = await generateContent(testPrompt, modelId);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      success: true,
      response,
      responseTime,
      modelId,
      prompt: testPrompt,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      modelId,
      prompt: testPrompt,
      timestamp: new Date().toISOString()
    };
  }
};

export default {
  generateContent,
  getAvailableModels,
  testModel
};