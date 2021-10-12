<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-card
        class="mx-auto pa-6"
        max-width="344"
      >
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-row justify="end" class="pb-3 pt-3">
              <v-btn
                class="mr-4 primary"
                @click="login"
                to="/"
              >
                Login
              </v-btn>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show1: false
      }
    },
  }
</script>