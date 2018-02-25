<template>
  <mb-card title="Login">
    <v-form>
      <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
      <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
    </v-form>
    <v-btn slot="actions" color="primary">Login</v-btn>
  </mb-card>
</template>
<script>
import MbCard from './mb-card.vue'

export default {
  components: { MbCard }
}
</script>
