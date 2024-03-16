import { createRouter, createWebHistory } from "vue-router";

// import Home from "../views/HomeView.vue";
import Tasks from "../task-list/view/TaskList.vue";
import Notes from "../note-list/view/NoteList.vue";
import Goals from "../goal-list/view/GoalList.vue";
import ItemEditor from "../item-editor/view/ItemEditor.vue";
import LoginPage from '@/login/view/LoginPage.vue';
import UserGuide from '@/user-guide/view/UserGuide.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Goals,
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
    name: "Goal Editor",
    meta: {itemType: 'Goal'}
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
    meta: {component: "Login", interfaceHidden: true}
  },
  {
    path: "/demo-terms",
    component: LoginPage,
    name: "demo-terms",
    meta: {component: "DemoTerms", interfaceHidden: true}
  },
  {
    path: "/create-account",
    component: LoginPage,
    name: "create-account",
    meta: {component: "CreateAccount", interfaceHidden: true}
  },

  
  {
    path: "/user-guide/capabilities",
    component: UserGuide,
    meta: {component: "Capabilities"}
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
