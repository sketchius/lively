import { createRouter, createWebHistory } from "vue-router";

// Import your view components
import Home from "../views/HomeView.vue";
import Tasks from "../views/TaskView.vue";
import Goals from "../views/GoalView.vue";
import Objectives from "../views/ObjectiveView.vue";
import Habits from "../views/HabitsView.vue";
import Routines from "../views/RoutinesView.vue";
import GoalsEditor from "../views/GoalEditor.vue";
import ObjectivesEditor from "../views/ObjectiveEditor.vue";
import TasksEditor from "../views/TaskEditor.vue";

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
    component: Goals,
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
    path: "/goals/editor",
    name: "Goals Editor",
    component: GoalsEditor,
  },

  {
    path: "/objectives/editor",
    name: "Objectives Editor",
    component: ObjectivesEditor,
  },

  {
    path: "/tasks/editor",
    name: "Tasks Editor",
    component: TasksEditor,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
