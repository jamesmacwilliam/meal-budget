<template>
  <mb-card title="Login">
    <v-form>
      <v-text-field
        v-model="username"
        :error-messages="errors.collect('username')"
        v-validate="'required|email'"
        data-vv-name="username"
        prepend-icon="person"
        required
        name="username"
        label="Email"
        type="text"
        ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="errors.collect('password')"
        v-validate="'required'"
        data-vv-name="password"
        prepend-icon="lock"
        required
        name="password"
        label="Password"
        type="password"
        ></v-text-field>
    </v-form>
    <v-btn @click="login" slot="actions" color="primary">Login</v-btn>
  </mb-card>
</template>
<script>
import MbCard from './mb-card.vue'

export default {
  components: { MbCard },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch("fetchToken", { username: this.username, password: this.password })
      this.$router.push({ name: 'dashboard' })
    }
  },
  mounted() {
    if(this.$store.getters.freshToken) { this.$router.push({ name: 'dashboard' }) }
  }
}
</script>
