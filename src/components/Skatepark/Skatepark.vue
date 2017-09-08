<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>{{ skateparkInFocus.skateparkName }}</h3>
    </header>
    <section class="section-content">
      <p class="skatepark-description">{{ skateparkInFocus.skateparkDesc }}</p>
      <div class="skatepark-adder">Added by {{ skateparkInFocus.skateparkAdder }} at {{ skateparkInFocus.timeAdded }}</div>
      <div class="skatepark-images">
        <img v-for="skateparkImg in skateparkInFocus.skateparkImages" v-bind:src="skateparkImg" height="100%" />
      </div>
      <div class="tags">
        <div v-for="tag in skateparkInFocus.skateparkTags" class="tag">
          {{ tag }}
        </div>
      </div>
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
  computed: {
    ...mapGetters([
      "skateparkInFocus"
    ])
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


  .skatepark-images {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    float: left;
    width: 10000px;
  }

  .skatepark-images img {
    float: left;
  }

</style>
