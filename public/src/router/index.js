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
    path: "/goal-editor",
    name: "Goals Editor",
    component: GoalsEditor,
    meta: { level: 1 }
  },
  {
    path: "/goal-editor/objective-editor",
    name: "Goal Editor > Objectives Editor",
    component: ObjectivesEditor,
    meta: { level: 2 }
  },
  {
    path: "/goal-editor/objective-editor/task-editor",
    name: "Goal Editor > Objectives Editor > Tasks Editor",
    component: TasksEditor,
    meta: { level: 3 }
  },

  {
    path: "/objective-editor",
    name: "Objectives Editor",
    component: ObjectivesEditor,
    meta: { level: 1 }
  },
  {
    path: "/objective-editor/task-editor",
    name: "Objectives Editor > Tasks Editor",
    component: TasksEditor,
    meta: { level: 2 }
  },

  {
    path: "/task-editor",
    name: "Tasks Editor",
    component: TasksEditor,
    meta: { level: 1 }
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
