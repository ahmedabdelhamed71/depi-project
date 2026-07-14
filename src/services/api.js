// api.js - Central API service
// JSON requests with `credentials: "include"` (JWT lives in an httpOnly cookie).

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Generic request helper. Throws an Error with the backend `msg`
const apiFetch = async (path, { method = "GET", body } = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;

  try {
    data = await res.json();
  } catch {
    // Non-JSON response body
  }

  if (!res.ok) {
    const error = new Error(data?.msg || "Something went wrong");
    error.status = res.status;
    throw error;
  }

  return data;
};

// Auth API
export const registerUser = (userData) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: userData,
  });

export const loginUser = (credentials) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: credentials,
  });

export const getCurrentUser = () => apiFetch("/auth/me");

export const logoutUser = () =>
  apiFetch("/auth/logout", {
    method: "POST",
  });

// Users API
export const getUsers = ({ page = 1, limit = 10, search = "" } = {}) => {
  const params = new URLSearchParams({ page, limit });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  return apiFetch(`/users?${params.toString()}`);
};

export const getUser = (id) => apiFetch(`/users/${id}`);

export const updateUser = (id, userData) =>
  apiFetch(`/users/${id}`, {
    method: "PUT",
    body: userData,
  });

  // Skills API
export const getSkills = () => apiFetch("/skills");

export const getQuestionsBySkill = (skillId) =>
  apiFetch(`/questions/${skillId}`);

export const submitTestResult = ({ skillId, answers }) =>
  apiFetch("/results", {
    method: "POST",
    body: { skillId, answers },
  });

// Requests API
export const createRequest = ({ receiver, skill, message }) =>
  apiFetch("/requests", {
    method: "POST",
    body: { receiver, skill, message },
  });

export const getIncomingRequests = () => apiFetch("/requests/incoming");

export const getOutgoingRequests = () => apiFetch("/requests/outgoing");

export const getRequest = (id) => apiFetch(`/requests/${id}`);

export const acceptRequest = (id) =>
  apiFetch(`/requests/${id}/accept`, {
    method: "PATCH",
  });

export const rejectRequest = (id) =>
  apiFetch(`/requests/${id}/reject`, {
    method: "PATCH",
  });

// Contact API
export const sendContactMessage = ({
  full_name,
  email,
  subject,
  message,
}) =>
  apiFetch("/contact", {
    method: "POST",
    body: { full_name, email, subject, message },
  });