import apiService from "./apiService";

export default {
  getDemoUID() {
    return localStorage.getItem("demoUID");
  },

  async createDemoUser() {
    try {
      const response = await apiService.post("/user/demo");
      const { data } = response;

      localStorage.setItem("demoUID", data.uid);

      console.log("created uid:", data.uid);
      return data.uid;
    } catch (error) {
      console.error("Error creating demo user:", error);
      throw error;
    }
  },

  removeDemoUser() {
    localStorage.removeItem("demoUID");
    localStorage.removeItem("demoTermsAgreed");
  },

  async fetchDemoUID() {
    let uid = this.getDemoUID();
    if (!uid || uid == null || uid == "undefined") {
      console.log("Didnt get uid");
      return await this.createDemoUser();
    }
    console.log("Got uid: ", uid);
    return uid;
  },

  getAgreed() {
    return localStorage.getItem("demoTermsAgreed");
  },

  setAgreed(value) {
    localStorage.setItem("demoTermsAgreed", value);
  },

  async createUser(uid) {
    try {
      console.log(uid);
      await apiService.post("/user/free", { uid });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
