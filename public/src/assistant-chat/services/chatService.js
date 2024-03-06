import apiService from "@/services/apiService";

export default {
  async sendMessage(message) {
    return apiService.post("/chat/message", message);
  },

  async sendConversation(messages) {
    return apiService.post("/chat/conversation", messages);
  },

  async classifyMessage(message) {
    return apiService.post("/chat/classification", {message});
  },

  async identifyNotes(message) {
    return apiService.post("/chat/identify-notes", {message});
  },

  async getConversation() {
    return apiService.get("/chat/conversation");
  },
};
