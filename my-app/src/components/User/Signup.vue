<template>
<v-container grid-list-xs>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-text>
                    <v-container grid-list-xs>
                        <form @submit.prevent="onSignup">
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        autocomplete="email"
                                        required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        autocomplete="new-password"
                                        required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        autocomplete="new-password"
                                        :rules="[comparePasswords]"
                                        ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-btn color="success" type="submit" :disabled="!formIsValid">Sign Up</v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    formIsValid() {
      return this.password == this.confirmPassword && this.email != "";
    },
    comparePasswords() {
      return this.password === this.confirmPassword || "Passwords do not Match";
    }
  },
  methods: {
    onSignup() {
      // Vuex
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
