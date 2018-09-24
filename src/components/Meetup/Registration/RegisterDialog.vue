<template>
  <v-dialog v-model="showDialog">
    <v-btn
      accent
      color="primary"
      slot="activator"> {{ userIsRegistred ? "Unregister" : "Register" }}
    </v-btn>

    <v-card>
      <v-container>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-title primary-title>{{ userIsRegistred ? "Unregister" : "Register" }} from Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                color="red"
                flat
                @click="showDialog = false">Cancel</v-btn>
              <v-btn
                color="success"
                flat
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: {
    meetupId: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    userIsRegistred() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(
          anId => anId == this.meetupId
        ) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistred) {
        this.$store.dispatch("unregisterUserForMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
      this.showDialog = false;
    }
  }
};
</script>
