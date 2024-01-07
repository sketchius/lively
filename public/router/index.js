// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks.vue";
import Goals from "../views/Goals.vue";
import Habits from "../views/Habits.vue";
import Routines from "../views/Routines.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasks", component: Tasks },
  { path: "/goals", component: Goals },
  { path: "/habits", component: Habits },
  { path: "/routines", component: Routines },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
