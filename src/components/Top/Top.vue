<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />

      <h3>TOP VOTED</h3>
    </header>
    <section class="section-content">
      <p>Content here</p>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";
import toggleNavPanel                           from "../ToggleNavPanel.vue";

export default {
  components: {
    "toggle-nav-panel": toggleNavPanel
  },
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="css">

</style>
