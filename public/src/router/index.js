import { createRouter, createWebHistory } from "vue-router";

// Import your view components
import Home from "../views/HomeView.vue";
import Tasks from "../views/TaskView.vue";
// import Goals from "../views/GoalView.vue";
import Objectives from "../views/ObjectiveView.vue";
import Habits from "../views/HabitsView.vue";
import Routines from "../views/RoutinesView.vue";
import ItemEditor from "../item-editor/view/ItemEditor.vue";

// Define your routes
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
    component: ItemEditor,
  },
  {
    path: "/objectives",
    name: "Objectives",
    component: Objectives,
  },
  {
    path: "/habits",
    name: "Habits",
    component: Habits,
  },
  {
    path: "/routines",
    name: "Routines",
    component: Routines,
  },

  {
    path: "/goal-editor",
    name: "Goals Editor",
    component: ItemEditor,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
