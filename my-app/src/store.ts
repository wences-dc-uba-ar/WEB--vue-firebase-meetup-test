import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-0",
        title: "Big Apple Meetup",
        location: "New York",
        date: new Date(),
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg",
        id: "meetup-id-1",
        title: "Oh Lala Meetup!",
        location: "Paris",
        date: new Date(),
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://www.seetorontonow.com/wp-content/uploads/2018/05/toronto-skyline-summer-evening.jpg",
        id: "meetup-id-5",
        title: "Maple Meetup",
        location: "Toronto",
        date: new Date(),
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      }
    ],
    user: {
      id: "12341423",
      registeredMeetups: ["qerqweqweqwe"]
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id:
          "id_" +
          Math.random()
            .toString(36)
            .substr(2, 6)
      };
      // store it remote
      commit("createMeetup", meetup);
    },
    signUserUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log("user", user);
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort(
        (meetupA, meetupB) => meetupA.date.getTime() - meetupB.date.getTime()
      );
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId: string) => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    }
  }
});
