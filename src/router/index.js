import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Board from "@/components/Board";
import NewBoard from "@/components/NewBoard";

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
    },
    {
      path: "/board/new",
      name: "Create a New Puzzle",
      component: NewBoard
    }
  ]
});
