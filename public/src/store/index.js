// store.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      currentRightPanelComponent: 'CreateGoal',
      editingGoal: null,
    };
  },
  mutations: {
    setRightPanelComponent(state, component) {
      state.currentRightPanelComponent = component;
    },
    setEditingGoal(state, goal) {
      state.editingGoal = goal;
    },
  },
  actions: {
    changeRightPanelComponent({ commit }, component) {
      commit('setRightPanelComponent', component);
    },
    editGoal({ commit }, goal) {
      commit('setEditingGoal', goal);
      commit('setRightPanelComponent', 'EditGoal');
    },
  },
});
