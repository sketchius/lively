import axios from "axios";

const API_URL = "http://127.0.0.1:5001/lively-ai/us-central1/assistant";

export default {
  async getItemFromDescription(description, type) {
    return axios.post(`${API_URL}/text-to-item/description`, {
      data: description,
      type,
    });
  },

  async getAutoStepsForGoal(description) {
    return axios.post(`${API_URL}/text-to-item/steps`, {
      data: description,
    });
  },
};
