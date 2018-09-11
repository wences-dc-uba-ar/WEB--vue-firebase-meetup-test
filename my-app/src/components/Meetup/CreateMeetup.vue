<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Create a new Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 >
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="imageUrl"
                                label="image URL"
                                id="image-url"
                                v-model="imageUrl"
                                required
                            ></v-text-field>
                            <img :src="imageUrl" alt="" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                required
                                outline
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                color="primary"
                                :disabled="!formIsValid"
                                type="submit"
                                >Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: ""
    };
  },
  computed: {
    formIsValid() {
      return this.title !== "" && this.location != "" && this.description != "";
    }
  },
  methods: {
    onCreateMeetup() {
        console.log('onCreateMeetup()')
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>
