<template>
  <!-- <v-container> -->
  <v-container grid-list-xs>

    <v-layout
      row
      wrap>
      <v-flex
        xs12
        class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="red"
          :width="7"
          :size="100"
          v-if="loading"
        />
      </v-flex>
    </v-layout>

    <v-layout
      v-if="!loading"
      row
      wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h4 class="primary--text">{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer/>
              <app-edit-meetup-details-dialog :meetup="meetup" />
              <app-edit-meetup-date-dialog :meetup="meetup" />
              <app-edit-meetup-time-dialog :meetup="meetup" />
            </template>
          </v-card-title>

          <v-img
            :src="meetup.imageUrl"
            height="400px"
          />

          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>

          <v-card-actions>
            <app-register-dialog :meetup-id="id"/>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return !!this.$store.getters.user;
    },
    userIsCreator() {
      return (
        this.$store.getters.user &&
        this.$store.getters.user.id === this.meetup.creatorId
      );
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
