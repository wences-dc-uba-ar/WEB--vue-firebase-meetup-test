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
    registerUserForMeetup(state, payload) {
      console.log("state.user", state.user);
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id == id) >= 0
      ) {
        console.log("ya registrado", id);
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
      console.log("state.user", state.user, id, payload.fbKey);
    },
    unregisterUserForMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id == payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload: Object) {
      let ms: Object[] = state.loadedMeetups;
      ms.push(payload);
    },
    updateMeetupData(
      state,
      payload: {
        id: String;
        title?: String;
        description?: String;
        location?: String;
        date?: Date;
      }
    ) {
      let meetup:
        | {
            id: String;
            title?: String;
            description?: String;
            location?: String;
            date?: Date;
          }
        | undefined = state.loadedMeetups.find((meetup: { id: String }) => {
        return meetup.id === payload.id;
      });
      if (meetup) {
        if (payload.title) {
          meetup!.title = payload.title;
        }
        if (payload.description) {
          meetup!.description = payload.description;
        }
        if (payload.location) {
          meetup!.location = payload.location;
        }
        if (payload.date) {
          meetup!.date = payload.date;
        }
      }
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
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;

      firebase
        .database()
        .ref("users/" + user.id)
        .child("/registration/")
        .push(payload)
        .then(data => {
          commit("setLoading", false);
          commit("registerUserForMeetup", { id: payload, fbKey: data.key });
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    unregisterUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref("users/" + user.id + "/registration/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserForMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
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
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj: {
        title?: String;
        description?: String;
        location?: String;
        date?: String;
      } = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.location) {
        updateObj.location = payload.location;
      }
      if (payload.date) {
        updateObj.date = payload.date.toISOString();
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetupData", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
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
          const newUser = {
            id: user && user.uid,
            registeredMeetups: [],
            fbKeys: {}
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
          const newUser = {
            id: user && user.uid,
            registeredMeetups: [],
            fbKeys: {}
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
      commit("setUser", { id: payload.uid, registeredMeetups: [], fbKeys: {} });
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
