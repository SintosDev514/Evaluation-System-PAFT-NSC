import api from "./api";
import { getAuthHeaders } from "../utils/auth";

export const loginAdmin = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const fetchEvaluations = async () => {
  const response = await api.get("/evaluations", { headers: getAuthHeaders() });
  return response.data;
};

export const submitEvaluation = async (evaluation) => {
  const response = await api.post("/evaluations", evaluation);
  return response.data;
};

export const fetchAnalytics = async () => {
  const response = await api.get("/analytics", { headers: getAuthHeaders() });
  return response.data;
};

export const fetchMeanAnalytics = async () => {
  const response = await api.get("/analytics/means", {
    headers: getAuthHeaders(),
  });
  return response.data;
};
