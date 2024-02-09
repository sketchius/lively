import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import Tasks from "../views/TaskView.vue";
import Goals from "../views/GoalView.vue";
import ItemEditor from "../item-editor/view/ItemEditor.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    name: "item-editor-undefined",
    meta: { editorStep: -1 },
  },
  {
    path: "/item-editor/type",
    component: ItemEditor,
    name: "item-editor-1",
    meta: { editorStep: 1 },
  },
  {
    path: "/item-editor/describe",
    component: ItemEditor,
    name: "item-editor-2",
    meta: { editorStep: 2 },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
