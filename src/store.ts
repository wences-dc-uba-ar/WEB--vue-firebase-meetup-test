import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import { strict } from "assert";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload: Object) {
      let ms: Object[] = state.loadedMeetups;
      ms.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              ...obj[key],
              id: key,
              date: new Date(obj[key].date)
            });
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      let meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        creatorId: getters.user.id,
        date: payload.date
      };
      const key = firebase
        .database()
        .ref("meetups")
        .push({
          ...meetup,
          date: meetup.date.toISOString()
        }).key;

      const filename = payload.image.name;
      const ext = filename.slice(filename.lastIndexOf("."));
      let downloadURL: String | null = "nada";

      firebase
        .storage()
        .ref("meetups/" + key + "." + ext)
        .put(payload.image)
        .then(result => {
          result.ref.getDownloadURL().then(downloadURL => {
            firebase
              .database()
              .ref("meetups/" + key)
              .update({
                imageUrl: downloadURL
              })
              .then(data => {
                commit("createMeetup", {
                  ...meetup,
                  id: key,
                  imageUrl: downloadURL
                });
              })
              .catch(error => {
                console.log(error);
              });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          commit("setLoading", false);
          // console.log("result.user", result.user);
          const newUser = {
            id: user && user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(
          payload.email,
          payload.password
        )
        .then(({ user }) => {
          commit("setLoading", false);
          // console.log("result", result);
          const newUser = {
            id: user && user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort(
        (meetupA: { date: Date }, meetupB: { date: Date }) =>
          meetupA.date.getTime() - meetupB.date.getTime()
      );
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId: string) => {
        return state.loadedMeetups.find((meetup: { id: string }) => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});
