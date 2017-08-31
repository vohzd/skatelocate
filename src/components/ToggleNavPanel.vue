<template lang="html">
  <div class="toggle-nav-element" v-on:click="toggleDetailsPanelVisibility">
    <i class="fa fa-times" aria-hidden="true" v-if="isDetailsShown"></i>
    <i class="fa fa-angle-left" aria-hidden="true" v-if="!isDetailsShown"></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "isDetailsShown"
    ])
  },
  methods: {
    ...mapActions([
      "toggleDetailsPanelVisibility"
    ])
  }
}
</script>

<style lang="css">
</style>
