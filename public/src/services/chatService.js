import apiClient from "./api";

export default {
  async sendMessage(message) {
    let config = {
      headers: {
        "Content-Length": 0,
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };
    return apiClient.post("/chat/message", message, config);
  },

  async getConversation() {
    return await apiClient.get("/chat/conversation");
  },
};
