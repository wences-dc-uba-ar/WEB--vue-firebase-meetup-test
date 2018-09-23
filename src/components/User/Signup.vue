<template>
  <v-container grid-list-xs>
    <v-layout 
      row 
      wrap 
      v-if="error" >
      <v-flex 
        xs12 
        sm6 
        offset-sm3>
        <app-alert 
          @dismissed="onDismissed" 
          :text="error"/>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12 
        sm6 
        offset-sm3>
        <v-card>
          <v-card-text>
            <v-container grid-list-xs>
              <form @submit.prevent="onSignup">
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs12 
                    sm6 
                    offset-sm3>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      autocomplete="email"
                      required/>
                  </v-flex>
                </v-layout>
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs12 
                    sm6 
                    offset-sm3>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      autocomplete="new-password"
                      required/>
                  </v-flex>
                </v-layout>
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs12 
                    sm6 
                    offset-sm3>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      autocomplete="new-password"
                      :rules="[comparePasswords]"
                    />
                  </v-flex>
                </v-layout>
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs12 
                    sm6 
                    offset-sm3>
                    <v-btn
                      color="success"
                      type="submit"
                      :disabled="!formIsValid || loading"
                      :loading="loading"
                    >
                      Sign Up
                      <span 
                        slot="loader" 
                        class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
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
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value != null && value != undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      // Vuex
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-180deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-180deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-180deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-180deg);
  }
}
</style>
