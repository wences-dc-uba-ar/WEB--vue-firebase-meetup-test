import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";
import firebase_config from "../firebase_config";
import AlertCmp from "./components/Shared/Alert.vue";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebase_config);

    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
