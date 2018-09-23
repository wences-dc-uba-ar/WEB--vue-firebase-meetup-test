<template>
  <v-dialog
    scrollable
    max-width="350px"
    transition="dialog-transition"
    v-model="showDialog"
  >
    <v-btn
      fab
      accent
      slot="activator"
      color="success">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              Edit Meetup
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              />
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                rows="3"
                required
                outline
              />
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              />
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider/>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                color="red"
                @click="onClose">close</v-btn>
              <v-spacer/>
              <v-btn
                flat
                color="blue"
                @click="onSave">save</v-btn>
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
    meetup: {
      type: Object,
      default() {
        return {
          title: "title",
          description: "description",
          location: "location"
        };
      }
    }
  },
  data() {
    return {
      showDialog: false,
      title: this.meetup.title,
      description: this.meetup.description,
      location: this.meetup.location
    };
  },
  computed: {
    formIsValid() {
      return !!this.title && !!this.location && !!this.description;
    }
  },
  methods: {
    onSave() {
      if (!this.formIsValid) {
        return null;
      }
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.title,
        description: this.description,
        location: this.location
      });
      this.showDialog = false;
    },
    onClose() {
      this.showDialog = false;
    }
  }
};
</script>
