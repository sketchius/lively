import apiService from './apiService';

export default {
  
  // Goals
  createGoal(goalData) {
    return apiService.post('/data/goals', goalData);
  },
  getGoal(goalId) {
    return apiService.get(`/data/goals/${goalId}`);
  },
  listGoals() {
    return apiService.get('/data/goals/top');
  },
  updateGoal(goalId, goalData) {
    return apiService.put(`/data/goals/${goalId}`, goalData);
  },
  deleteGoal(goalId) {
    return apiService.delete(`/data/goals/${goalId}`);
  },

  // Tasks
  createTask(taskData) {
    return apiService.post('/data/tasks', taskData);
  },
  getTask(taskId) {
    return apiService.get(`/data/tasks/${taskId}`);
  },
  listTasks() {
    return apiService.get('/data/tasks');
  },
  updateTask(taskId, taskData) {
    return apiService.put(`/data/tasks/${taskId}`, taskData);
  },
  deleteTask(taskId) {
    return apiService.delete(`/data/tasks/${taskId}`);
  },

  // Notes
  createNote(noteData) {
    return apiService.post('/data/notes', noteData);
  },
  getNote(noteId) {
    return apiService.get(`/data/notes/${noteId}`);
  },
  listNotes() {
    return apiService.get('/data/notes');
  },
  updateNote(noteId, noteData) {
    return apiService.put(`/data/notes/${noteId}`, noteData);
  },
  deleteNote(noteId) {
    return apiService.delete(`/data/notes/${noteId}`);
  },
};
