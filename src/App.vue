<template>
  <v-app>

    <v-navigation-drawer 
      v-model="sideNav" 
      absolute 
      clipped >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile 
          v-if="userIsAutenticated" 
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>exit</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar 
      dark 
      class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"/>
      <v-toolbar-title>
        <router-link 
          to="/" 
          style="cursor: pointer" 
          tag="span">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon 
            left 
            dark>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
        <v-btn 
          flat 
          v-if="userIsAutenticated" 
          @click="onLogout">
          <v-icon 
            left 
            dark>exit_to_app</v-icon>logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view/>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAutenticated) {
        menuItems = [
          { icon: "supervisor_account", title: "List", link: "/meetups" },
          { icon: "room", title: "Organize", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAutenticated() {
      return !!this.$store.getters.user;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
