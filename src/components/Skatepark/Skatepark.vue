<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3 v-if="!needsMessage">{{ skateparkInFocus.skateparkName }}</h3>
    </header>
    <section class="skatepark-details">
      <div v-if="skateparkInFocus">
        <div class="skatepark-description">{{ skateparkInFocus.skateparkDesc }}</div>
        <div class="tags">
          <div v-for="tag in skateparkInFocus.skateparkTags" class="tag">
            {{ tag }}
          </div>
        </div>
        <div class="fix-bottom">
          <div class="skatepark-images" v-if="skateparkInFocus.skateparkImages">
            <img v-for="skateparkImg in skateparkInFocus.skateparkImages" v-bind:src="skateparkImg" height="100%" />
          </div>
          <div class="skatepark-adder">Added by <span class="skatepark-adder-name">{{ skateparkInFocus.skateparkAdder }}</span> on {{ skateparkInFocus.timeAdded | dateFilter }}</div>
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

import moment                                   from "moment";

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
  filters: {
    dateFilter(timestamp){
      return moment(timestamp).format("YYYY/MM/DD");
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

  .fix-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .skatepark-adder {
    font-size: 12px;
    width: 100%;
    padding-left: 4px;
    background: rgba(0, 0, 0, 0.05);
    border-top: 1px solid #D1D1D1;
  }

  .skatepark-adder-name {
    border-left: 1px solid #D1D1D1;
    border-right: 1px solid #D1D1D1;
    background: rgba(0, 0, 0, 0.03);
    padding-left: 4px;
    padding-right: 4px;

  }

  .skatepark-details {

  }

  .skatepark-details .tags {

    margin: 0px;
    padding-left: 8px;
    padding-top: 4px;

  }

  .skatepark-description {
    padding: 16px;
    font-size: 24px;
    min-height: 70px;
    white-space: pre-line;
    background: rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid #DDDDDD;

  }


  .skatepark-images {
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    margin: 0;
    padding: 0;
    height: 250px;
    margin-top: 48px;
    position: relative;
  }



</style>
