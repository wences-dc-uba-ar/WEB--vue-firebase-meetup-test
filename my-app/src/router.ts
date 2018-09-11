import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Meetups from "@/components/Meetup/Meetups.vue";
import CreateMeetup from "@/components/Meetup/CreateMeetup.vue";
import Meetup from "@/components/Meetup/Meetup.vue";
import Profile from "@/components/User/Profile.vue";
import Signup from "@/components/User/Signup.vue";
import Signin from "@/components/User/Signin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About")
    // },
    {
      path: "/meetups",
      name: "Meetups",
      component: () =>
        import(/* webpackChunkName: "meetups" */ "@/components/Meetup/Meetups.vue")
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup
    },
    {
      path: "/meetup/:id",
      name: "Meetup",
      props: true,
      component: Meetup
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ]
});
