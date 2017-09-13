<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3 v-if="!needsMessage">{{ skateparkInFocus.skateparkName }}</h3>
    </header>
    <section class="skatepark-details">
      <div v-if="skateparkInFocus">
        <div class="skatepark-images dragscroll" v-if="skateparkInFocus.skateparkImages">
          <img v-for="skateparkImg in skateparkInFocus.skateparkImages" v-bind:src="skateparkImg" height="100%" />
        </div>
        <div class="skatepark-description">{{ skateparkInFocus.skateparkDesc }}</div>
        <div class="skatepark-links">
          <a href="#"><i class="fa fa-external-link-square" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
        </div>
        <div class="tags">
          <div v-for="tag in skateparkInFocus.skateparkTags" class="tag">
            {{ tag }}
          </div>
        </div>
        <div class="fix-bottom">
          <div class="skatepark-adder">Added by <span class="skatepark-adder-name">{{ skateparkInFocus.skateparkAdder }}</span> on {{ skateparkInFocus.timeAdded | dateFilter }}</div>
        </div>
        <div class="upvote-button">
          <button>Upvote! (2)</button>
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
import dragscroll                               from "dragscroll";

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
    dragscroll.reset();
    if (!this.skateparks.length){
      this.needsMessage = true;
      this.statusMessage = "Loading...";
    }
    this.setSkateparkInFocus(this.$route.params.id)
  },
  watch: {
    $route(to, from) {
      dragscroll.reset();
      this.setSkateparkInFocus(to.params.id);
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
    font-size: 17px;
    white-space: pre-line;
  }

  .skatepark-images {
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    display: inline;
    float: left;
    height: 400px;
  }

  .skatepark-images img{
    display: block;
    width: auto;
    height: auto;
    width: 100%;
  }

  .skatepark-links {
    margin-left: 16px;
  }

  .upvote-button {
    margin: 8px;
  }

  .upvote-button button {
    outline: none;
    border: none;
    background: rgba(0,0,0,0.1);
    padding: 8px;
    margin: 0px;
    font-family: "kalam";
    width: 25%;
    border-radius: 8px;
  }

  @media(max-width: 980px){
    .skatepark-images {
    }
  }

  @media(max-width: 780px){
    .skatepark-images {
    }
  }

	@media(max-width: 580px){
    .skatepark-images {
    }
  }


</style>
