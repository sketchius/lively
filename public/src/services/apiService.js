import axios from "axios";
import store from "@/store";

const apiClient = axios.create({
  baseURL: `/`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = async () => {
  const uid = store.state.user.demoUID;
  const token = store.state.user.accessToken;
  if (uid) {
    console.log("returning UID");
    return { "x-demo-uid": uid, Authorization: `BEARER ${token}` };
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
