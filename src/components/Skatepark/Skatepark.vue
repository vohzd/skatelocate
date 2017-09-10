<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3 v-if="!needsMessage">{{ skateparkInFocus.skateparkName }}</h3>
    </header>
    <section class="section-content">
      <div v-if="!needsMessage">
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
      </div>
      <div class="help-messages" v-if="needsMessage">
        {{ statusMessage }}
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
      "skateparkInFocus",
      "skateparks"
    ])
  },
  data(){
    return {
      needsMessage: false,
      statusMessage: ""
    }
  },
  methods: {
    ...mapActions([
      "setSkateparkInFocus"
    ])
  },
  mounted(){
    if (!this.skateparks.length){
      this.needsMessage = true;
      this.statusMessage = "Loading...";
    }
    this.setSkateparkInFocus(this.$route.params.id)
  },
  watch: {
    $route(to, from) {
      this.setSkateparkInFocus(to.params.id)
    },
    skateparks(){
      if (!this.skateparks.length){
        this.needsMessage = true;
        this.statusMessage = "No skateparks present!";
      }
      else {
        this.setSkateparkInFocus(this.$route.params.id).then(() => {
            this.needsMessage = false;
            this.statusMessage = "";
          })
      }
    }
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
