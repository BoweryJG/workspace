// Simple OpenRouter client utilities

export const getAvailableModels = async () => {
  // Return empty array since we're using mock data in AIModelsView
  // This prevents build errors while the component uses fallback data
  return [];
};

export default {
  getAvailableModels
};