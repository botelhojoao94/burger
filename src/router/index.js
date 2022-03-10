import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Orders from "../views/Orders.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
