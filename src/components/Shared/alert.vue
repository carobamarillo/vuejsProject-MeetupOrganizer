<template>
  <v-alert color="error" icon="priority_high" dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template>
<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dissmissed')
      }
    }
  }
</script>