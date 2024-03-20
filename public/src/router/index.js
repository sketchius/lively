import { createRouter, createWebHistory } from "vue-router";

// import Home from "../views/HomeView.vue";
import Tasks from "@/views/task-list/TaskList.vue";
import Notes from "@/views/note-list/NoteList.vue";
import Goals from "@/views/goal-list/GoalList.vue";
import ToDoList from "@/views//to-do-list/ToDoList.vue";
import ItemEditor from "@/views/item-editor/ItemEditor.vue";
import LoginPage from '@/views/login/LoginPage.vue';
import UserGuide from '@/views/user-guide/UserGuide.vue';

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
    path: "/to-do-list",
    name: "To Do List",
    component: ToDoList,
  },
  {
    path: "/item-editor/task",
    component: ItemEditor,
    name: "Task Editor",
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
