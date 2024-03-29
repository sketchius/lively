import apiService from "@/services/apiService";

export default {
  async sendMessage(message) {
    return apiService.post("/chat/message", { message });
  },

  async sendConversation(messages) {
    return apiService.post("/chat/conversation", { messages });
  },

  async classifyMessage(message, operation) {
    return apiService.post("/chat/classification", { message, operation });
  },

  async identifyNotes(message) {
    return apiService.post("/chat/identify-notes", { message });
  },

  async parseTask(message) {
    return apiService.post("/chat/parse-task", { message });
  },

  async parseTaskModification(message, taskData) {
    return apiService.post("/chat/parse-task-modification", { message, taskData });
  },

  async parseGoal(message) {
    return apiService.post("/chat/parse-goal", { message });
  },

  async getConversation() {
    return apiService.get("/chat/conversation");
  },
};
