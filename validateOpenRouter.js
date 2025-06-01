// Simple validation script to test OpenRouter API connection
import { generateContent, getAvailableModels } from './utils/openRouterClient.js';

async function validateOpenRouterConnection() {
  console.log('🧪 Testing OpenRouter API connection...');
  
  try {
    // Test 1: Check if we can get available models
    console.log('📋 Fetching available models...');
    const models = await getAvailableModels();
    console.log(`✅ Found ${models.length} available models`);
    
    // Test 2: Test simple content generation
    console.log('🤖 Testing content generation...');
    const testPrompt = 'Say "Hello from OpenRouter!" if this API connection is working.';
    const response = await generateContent(testPrompt, 'anthropic/claude-3-haiku');
    
    console.log('✅ Content generation successful!');
    console.log('📝 Response:', response.substring(0, 100) + '...');
    
    // Test 3: Test with a research-like prompt
    console.log('🔬 Testing research prompt...');
    const researchPrompt = `
    Generate a brief professional analysis for:
    Doctor: Dr. Sarah Johnson
    Location: Beverly Hills, CA
    Specialty: Aesthetic Medicine
    
    Provide a short summary of their likely practice focus and market position.
    `;
    
    const researchResponse = await generateContent(researchPrompt, 'anthropic/claude-3-haiku');
    console.log('✅ Research generation successful!');
    console.log('📊 Research response length:', researchResponse.length, 'characters');
    
    return {
      success: true,
      modelsAvailable: models.length,
      testResponse: response,
      researchResponse: researchResponse
    };
    
  } catch (error) {
    console.error('❌ OpenRouter validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for use in other modules
export { validateOpenRouterConnection };

// If run directly (for testing)
if (import.meta.url === `file://${process.argv[1]}`) {
  validateOpenRouterConnection().then(result => {
    console.log('🏁 Validation complete:', result);
  });
}