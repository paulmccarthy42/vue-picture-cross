import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Board from "@/components/Board";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/boards/:id",
      name: "Board",
      component: Board
    }
  ]
});
