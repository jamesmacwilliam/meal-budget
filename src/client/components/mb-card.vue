<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    props: ['title']
  }
</script>
