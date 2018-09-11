import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-0",
        title: "una meetup",
        date: "2018-10-02",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg",
        id: "meetup-id-1",
        title: "otra meetup",
        date: "2018-10-03",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-5",
        title: "una meetup",
        date: "2018-10-04",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-2",
        title: "una meetup",
        date: "2018-10-05",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-3",
        title: "una meetup",
        date: "2018-10-06",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      },
      {
        imageUrl:
          "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
        id: "meetup-id-4",
        title: "una meetup",
        date: "2018-10-07",
        description:
          "asdasd a dadqd qad  awdkak dakwg akudgaw d asdh qa aw hdad kwd akd bakwd  kawka "
      }
    ],
    user: {
      id: "12341423",
      registeredMeetups: ["qerqweqweqwe"]
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => Date.parse(meetupA.date) - Date.parse(meetupA.date));
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
