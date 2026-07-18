const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to send message');
  return data;
};
