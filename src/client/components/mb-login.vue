<template>
  <mb-card title="Login">
    <v-form>
      <v-text-field
        v-model="login"
        :error-messages="errors.collect('login')"
        v-validate="'required|email'"
        data-vv-name="login"
        prepend-icon="person"
        required
        name="login"
        label="Login"
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
    <v-btn slot="actions" color="primary">Login</v-btn>
  </mb-card>
</template>
<script>
import MbCard from './mb-card.vue'

export default {
  components: { MbCard },
  data() {
    return {
      login: '',
      password: ''
    }
  }
}
</script>
