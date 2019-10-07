<template lang="html">
  <div class="toggle-nav-element" v-on:click="toggleDetailsPanelVisibility">
    <span v-show="isDetailsShown"><i class="fa fa-times" aria-hidden="true"></i></span>
    <span v-show="!isDetailsShown"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
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
