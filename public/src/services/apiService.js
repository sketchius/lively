import axios from "axios";
import userService from './userService';

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:5001/lively-ai/us-central1`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = async () => {
  const uid = await userService.fetchDemoUID();
  console.log(`getAuthHeaders: uid = ${uid}`);
  if (uid) {
    console.log('returning UID');
    return { "x-demo-uid": uid };
  }
  return {};
};

const apiService = {
  async get(path) {
    const headers = await getAuthHeaders();
    const response = await apiClient.get(path, { headers });
    return response;
  },

  async post(path, data) {
    const headers = await getAuthHeaders();
    const response = await apiClient.post(path, data, { headers });
    return response;
  },

  async put(path, data) {
    const headers = await getAuthHeaders();
    const response = await apiClient.put(path, data, { headers });
    return response;
  },

  async delete(path) {
    const headers = await getAuthHeaders();
    const response = await apiClient.delete(path, { headers });
    return response;
  },
};

export default apiService;
