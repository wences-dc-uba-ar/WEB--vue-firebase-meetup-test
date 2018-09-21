import store from "./store";
import { Route } from "vue-router";

export default (to: Route, from: Route, next: any) => {
  if (store.getters.user) {
    next();
  } else {
    next("/signin");
  }
};
