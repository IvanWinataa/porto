export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Check backend and database health status
 */
export const fetchHealth = async () => {
  const response = await fetch(`${BASE_URL}/api/health`);
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
};

/**
 * Fetch all projects from the backend API
 * @param {Object} options - Optional filters: { category, featured }
 */
export const fetchProjects = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.category) params.append('category', options.category);
  if (options.featured) params.append('featured', 'true');

  const url = `${BASE_URL}/api/projects${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

/**
 * Send a contact message to the backend API
 * @param {{ name: string, email: string, message: string }} payload
 */
export const sendContactMessage = async (payload) => {
  const response = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(response.ok
      ? 'The server returned an invalid response. Please try again later.'
      : 'Unable to send your message right now. Please try again later.');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('The server returned an invalid response. Please try again later.');
  }

  if (!response.ok) throw new Error(data.message || 'Failed to send message');
  return data;
};

