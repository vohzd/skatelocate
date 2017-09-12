<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>RECENTLY ADDED</h3>
    </header>
    <section class="section-content">
      <ul class="recent-skateparks">
        <li v-for="skatepark in mostRecentParks" v-if="mostRecentParks.length" v-on:click="jumpToThisSkatepark(skatepark)">
          <h3>{{ skatepark.skateparkName }}</h3>
          <time>{{ skatepark.timeAdded  | dateFilter }}</time>
        </li>
      </ul>
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
      "mapInstance",
      "skateparks"
    ])
  },
  data(){
    return {
      mostRecentParks: []
    }
  },
  filters: {
    dateFilter(timestamp) {
      return moment(timestamp).format("Do MMMM YYYY");
    },
    reverse(array) {
      return array.reverse()
    }
  },
  methods: {
    jumpToThisSkatepark(skatepark){
      this.$router.push({
        name: "skatepark",
        params: {
          id: skatepark[".key"]
        }
      });
      let slightlyOffset = [
        skatepark.skateparkLocation[0],
        (skatepark.skateparkLocation[1] + 0.033)
      ];
      this.mapInstance.flyTo(slightlyOffset, 14, {
        duration: 1
      });
    },
    pullMostRecent(){
      if (this.skateparks.length <= 10){
        this.mostRecentParks = this.skateparks.slice().reverse();
      }
      else {
        this.mostRecentParks = this.skateparks.slice(this.skateparks.length - 10, this.skateparks.length).reverse();
      }
    }
  },
  mounted(){
    this.pullMostRecent();
  },
  watch: {
    skateparks(){
      this.pullMostRecent();
    }
  }
}
</script>

<style lang="css">

  .recent-skateparks {
    margin: 0;
    padding: 0;
    height: calc(100vh - 100px);
    float: left;
    width: 100%;
    overflow-y: scroll;
  }

  .recent-skateparks li {
    list-style: none;
    background: rgba(0, 0, 0, 0.06);
    margin: 0;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px solid #DDDDDD;
  }

  .recent-skateparks li:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  .recent-skateparks h3 {
    font-size: 24px;
    padding: 0px;
    margin: 0px;
  }

  .recent-skateparks time {
    font-size: 14px;
  }



</style>
