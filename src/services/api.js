// API Service for Writer Pro

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Generate content for social media platforms
 * @param {string} topic - The topic to generate content about
 * @param {string} samplePosts - Sample posts to analyze writing style
 * @param {string} platform - Target platform ('twitter', 'linkedin', or 'both')
 * @returns {Promise<Object>} - The generated content for specified platform(s)
 */
export const generateContent = async (topic, samplePosts, platform) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        sample_posts: samplePosts,
        platform,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to generate content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

/**
 * Check if the API server is running
 * @returns {Promise<boolean>} - True if the API is available
 */
export const checkApiStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('API server is not available:', error);
    return false;
  }
};

export default {
  generateContent,
  checkApiStatus,
}; 