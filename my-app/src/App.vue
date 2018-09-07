<template>
  <v-app>

    <v-toolbar dark class="purple darken-1">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
        ></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat @click.native.stop="sideNav = !sideNav">
          <v-icon left dark>supervisor_account</v-icon>
          View Meetups</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action><v-icon>supervisor_account</v-icon></v-list-tile-action>
          <v-list-tile-content>View Meetps</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon>fingerprint</v-icon></v-list-tile-action>
          <v-list-tile-content>Fingerprint</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <main>

    </main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      sideNav: false
    }
  }
};
</script>
