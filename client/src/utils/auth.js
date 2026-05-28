export const ADMIN_TOKEN_KEY = "paft_admin_token";

export const saveAdminToken = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const removeAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const isAdminAuthenticated = () => Boolean(getAdminToken());

export const getAuthHeaders = () => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
