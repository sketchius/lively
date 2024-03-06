import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import Tasks from "../task-list/view/TaskList.vue";
import Notes from "../note-list/view/NoteList.vue";
import Goals from "../goal-list/view/GoalList.vue";
import ItemEditor from "../item-editor/view/ItemEditor.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/goals",
    name: "Goals",
    component: Goals,
  },
  {
    path: "/item-editor",
    component: ItemEditor,
    name: "item-editor-task",
    meta: {itemType: 'Task'}
  },
  {
    path: "/item-editor/task",
    component: ItemEditor,
    name: "item-editor-task",
    meta: {itemType: 'Task'}
  },
  {
    path: "/item-editor/goal",
    component: ItemEditor,
    name: "item-editor-goal",
    meta: {itemType: 'Goal'}
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
