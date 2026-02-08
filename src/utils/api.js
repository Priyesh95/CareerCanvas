/**
 * API Client for CareerCanvas Cloudflare Worker
 *
 * This module handles all communication with the backend worker
 * for resume parsing and content enhancement.
 */

// Cloudflare Worker URL - Update this with your deployed worker URL
const WORKER_URL = 'https://proud-rain-b29c.priyesh-nagar08.workers.dev';

/**
 * Parse resume text using the Cloudflare Worker
 * @param {string} resumeText - The full text content of the resume
 * @returns {Promise<Object>} Parsed resume data with structure
 */
export async function parseResume(resumeText) {
  try {
    const response = await fetch(`${WORKER_URL}/api/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to parse resume');
    }

    if (!data.success) {
      throw new Error(data.error || 'Resume parsing failed');
    }

    return data.data;
  } catch (error) {
    console.error('Parse resume error:', error);
    throw error;
  }
}

/**
 * Enhance content using AI
 * @param {string} type - Type of enhancement: 'bio', 'bullet-point', 'project-description'
 * @param {string} content - Original content to enhance
 * @param {Object} context - Additional context for enhancement
 * @returns {Promise<Object>} Enhanced content with original
 */
export async function enhanceContent(type, content, context = {}) {
  try {
    const response = await fetch(`${WORKER_URL}/api/enhance-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, content, context }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to enhance content');
    }

    if (!data.success) {
      throw new Error(data.error || 'Content enhancement failed');
    }

    return data.data;
  } catch (error) {
    console.error('Enhance content error:', error);
    throw error;
  }
}

/**
 * Check if the worker is online and accessible
 * @returns {Promise<boolean>} Worker health status
 */
export async function checkWorkerHealth() {
  try {
    const response = await fetch(`${WORKER_URL}/`, {
      method: 'GET',
    });

    const data = await response.json();
    return response.ok && data.status === 'online';
  } catch (error) {
    console.error('Worker health check failed:', error);
    return false;
  }
}
