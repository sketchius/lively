import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/lively-ai/us-central1/user';

export default {
  getDemoUID() {
    return localStorage.getItem('demoUID');
  },

  async createDemoUser() {
    try {
      const response = await axios.post(`${API_URL}/demo`);
      const { data } = response;

      localStorage.setItem('demoUID', data.uid);
      

      console.log('created uid:', data.uid);
      return data.uid;
    } catch (error) {
      console.error('Error creating demo user:', error);
      throw error;
    }
  },

  async fetchDemoUID() {
    let uid = this.getDemoUID();
    console.log('Got uid: ', uid);
    if (!uid) {
      
    console.log('Didnt get uid');
      return await this.createDemoUser(); 
    }
    return uid; 
  },

  async convertToPermanentUser(userDetails) {
    try {
      await axios.post(`${API_URL}/convertUser`, {
        uid: this.getDemoUID(),
        ...userDetails
      });

      localStorage.removeItem('demoUID');
    } catch (error) {
      console.error('Error converting user:', error);
      throw error;
    }
  },

  async deleteDemoUser() {
    try {
      await axios.delete(`${API_URL}/deleteDemoUser`, {
        data: { uid: this.getDemoUID() }
      });

      localStorage.removeItem('demoUID');
    } catch (error) {
      console.error('Error deleting demo user:', error);
      throw error;
    }
  },
};
