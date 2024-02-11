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
  {
    path: "/item-editor/title",
    component: ItemEditor,
    name: "item-editor-3",
    meta: { editorStep: 3 },
  },
  {
    path: "/item-editor/priority",
    component: ItemEditor,
    name: "item-editor-4",
    meta: { editorStep: 4 },
  },
  {
    path: "/item-editor/timeframe",
    component: ItemEditor,
    name: "item-editor-5",
    meta: { editorStep: 5 },
  },
  {
    path: "/item-editor/summary",
    component: ItemEditor,
    name: "item-editor-6",
    meta: { editorStep: 6 },
  },
  {
    path: "/item-editor/steps",
    component: ItemEditor,
    name: "item-editor-7",
    meta: { editorStep: 7 },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
