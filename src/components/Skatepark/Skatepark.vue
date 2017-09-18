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
        <div class="grey-background">
          <div class="skatepark-description">
            {{ skateparkInFocus.skateparkDesc }}
          </div>
          <votes-section />
          <div class="social-links">
            <a href="#"><i class="fa fa-external-link-square" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
          </div>
        </div>
        <div class="tags">
          <div v-for="tag in skateparkInFocus.skateparkTags" class="tag">
            {{ tag }}
          </div>
        </div>
        <div class="fix-bottom">
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

import instance                                 from "../../config/firebaseConfig.js";
const database                                  = instance.database();

import moment                                   from "moment";
import dragscroll                               from "dragscroll";

import toggleNavPanel                           from "../ToggleNavPanel.vue";
import VotesSection                             from "../Votes/Votes.vue";

export default {
  components: {
    "toggle-nav-panel": toggleNavPanel,
    "votes-section": VotesSection
  },
  computed: {
    ...mapGetters([
      "skateparkInFocus",
      "skateparks"
    ])
  },
  data(){
    return {
      statusMessage: "",
      needsMessage: false,
    }
  },
  filters: {
    dateFilter(timestamp){
      return moment(timestamp).format("YYYY/MM/DD");
    }
  },
  methods: {
    ...mapActions([
      "setSkateparkInFocus",
    ]),
  },
  mounted(){
    dragscroll.reset();
    if (!this.skateparks.length){
      this.needsMessage = true;
      this.statusMessage = "Loading...";
    }
    this.setSkateparkInFocus(this.$route.params.id);
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

  .social-links {
    width: 25%;
    float: left;
    font-size: 22px;
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
    margin-left: 16px;
    padding-top: 8px;
    float: left;
    width: 100%;
  }

  .skatepark-details .tags .tag:hover {
    opacity: 1;
    cursor: auto;
  }

  .grey-background {
    margin: 16px;
    margin-bottom: 0px;
    padding: 16px;
    border: 1px solid #DDDDDD;
    float:left;
    background: rgba(0, 0, 0, 0.06);
  }

  .skatepark-description {
    font-size: 17px;
  }

  .skatepark-images {
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
    float: left;
    height: 400px;
  }

  .skatepark-images img{
    display: block;
    width: auto;
    height: auto;
    width: 100%;
  }

  @media(max-width: 980px){
    .skatepark-images {
      max-height: 300px;
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
