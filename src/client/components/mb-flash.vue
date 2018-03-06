<template>
  <div>
    <v-alert type="success" dismissible transition="fade-transition" v-model="success">{{ successMessage }}</v-alert>
    <v-alert type="error" dismissible transition="fade-transition" v-model="error">{{ errorMessage }}</v-alert>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      success: false,
      error: false
   }
  },
  methods: mapMutations(['flashError', 'flashSuccess']),
  watch: {
    success(val) {
      if(!val) { this.flashSuccess(null) }
    },
    error(val) {
      if(!val) { this.flashError(null) }
    },
    errorMessage(val) {
      this.error = !!val
    },
    successMessage(val) {
      this.success = !!val
    }
  },
  computed: mapState({
    errorMessage: state => state.flashError,
    successMessage: state => state.successError
  })
}
</script>
