<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />

      <h3>TOP VOTED</h3>
    </header>
    <section class="section-content">
      <ul class="top-skateparks">
        <li v-for="skatepark in topSkateparks" v-if="topSkateparks.length" v-on:click="jumpToThisSkatepark(skatepark)">
          <h3>{{ skatepark.skateparkName }}</h3>
          <span>{{ skatepark.skateparkVotes }}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";

import moment                                   from "moment";
import sortBy                                   from "lodash.sortby";

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
      topSkateparks: []
    }
  },
  filters: {
    dateFilter(timestamp) {
      return moment(timestamp).format("Do MMMM YYYY");
    }
  },
  watch: {
    skateparks(){
      this.doSort();
    }
  },
  mounted(){
    this.doSort();
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
    doSort(){
      this.topSkateparks = sortBy(this.skateparks, (o) => {
        return o.skateparkVotes;
      });
      this.topSkateparks.reverse();
    }
  }
}
</script>

<style lang="css">


.top-skateparks {
  margin: 0;
  padding: 0;
  height: calc(100vh - 100px);
  float: left;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

}

.top-skateparks li {
  list-style: none;
  background: rgba(0, 0, 0, 0.06);
  margin: 0;
  padding: 16px;
  margin-bottom: 8px;
  border: 1px solid #DDDDDD;
  float: left;
  width: calc(100% - 48px);
  position: relative;
  height: 32px;
}

.top-skateparks li:hover {
  cursor: pointer;
  opacity: 0.7;
}

.top-skateparks h3 {
  font-size: 22px;
  padding: 0px;
  margin: 0px;
  float: left;
  width: 70%;
}

.top-skateparks span {
  font-size: 25px;
  right: 0;
  top: 0;
  position: absolute;
  margin-right: 6px;
  margin-top: 6px;
  line-height: 32px;
  background: white;
  border-radius: 50%;
  text-align: center;
  padding: 8px;
  width: 32px;
}

@media(max-width: 980px){
  .top-skateparks h3 {
    font-size: 12px;
  }
}

</style>
