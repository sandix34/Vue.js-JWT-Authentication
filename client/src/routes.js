import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./components/Home";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/profile', component: Profile }
  ]
});

export default router;