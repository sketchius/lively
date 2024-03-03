import apiClient from "@/services/api";

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

  async sendConversation(messages) {
    let config = {
      headers: {
        "Content-Length": 0,
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };
    return apiClient.post("/chat/conversation", messages, config);
  },

  async classifyMessage(message) {
    let config = {
      headers: {
        "Content-Length": 0,
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };
    return apiClient.post("/chat/classification", message, config);
  },

  async identifyNotes(message) {
    let config = {
      headers: {
        "Content-Length": 0,
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };
    return apiClient.post("/chat/identify-notes", message, config);
  },


  async getConversation() {
    return await apiClient.get("/chat/conversation");
  },
};
