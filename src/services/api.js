// api.js - Central API service
// JSON requests with `credentials: "include"` (JWT lives in an httpOnly cookie).

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic request helper. Throws an Error with the backend `msg`
const apiFetch = async (path, { method = 'GET', body } = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response body (unexpected) — fall through to status check
  }

  if (!res.ok) {
    const error = new Error(data?.msg || 'Something went wrong');
    error.status = res.status;
    throw error;
  }

  return data;
};

export const getUsers = ({ page = 1, limit = 10, search = '' } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (search.trim()) params.set('search', search.trim());
  return apiFetch(`/users?${params.toString()}`);
};

export const getUser = (id) => apiFetch(`/users/${id}`);

export const createRequest = ({ receiver, skill, message }) =>
  apiFetch('/requests', { method: 'POST', body: { receiver, skill, message } });

export const getIncomingRequests = () => apiFetch('/requests/incoming');

export const getOutgoingRequests = () => apiFetch('/requests/outgoing');

export const getRequest = (id) => apiFetch(`/requests/${id}`);

export const acceptRequest = (id) =>
  apiFetch(`/requests/${id}/accept`, { method: 'PATCH' });

export const rejectRequest = (id) =>
  apiFetch(`/requests/${id}/reject`, { method: 'PATCH' });

export const sendContactMessage = ({ full_name, email, subject, message }) =>
  apiFetch('/contact', {
    method: 'POST',
    body: { full_name, email, subject, message },
  });
