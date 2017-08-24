<template lang="html">
  <section class="details-panel">
    <div  v-if="focused">

      <h4>{{ focused.skateparkName }}</h4>
      <p class="skatepark-desc">{{ focused.skateparkDesc }}</p>
      <span class="added">Added on {{ focused.createdAt | dateFilter }} by {{ focused.skateparkAdder }}</span>
      <div class="tags">
        <div v-for="tag in focused.skateparkTags" class="tag">{{ tag }}</div>
      </div>
      <div class="scrolling">
        <div v-for="imgSrc in focused.skateparkImages" class="side-by-side">
          <img v-bind:src="imgSrc" class="fixed-height"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { mapGetters } from "Vuex";

import moment         from "moment";

export default {
  data(){
    return {
      focused: null
    }
  },
  computed: {
    ...mapGetters([
      "skateparks",
      "skateparkInFocus"
    ])
  },
  filters: {
    dateFilter(timestamp) {
      return moment(timestamp).format("Do MMMM YYYY");
    }
  },
  watch: {
    skateparkInFocus(){
      if (this.skateparks.length){
        this.focused = this.skateparks[this.skateparkInFocus];
      }
    }
  }
}
</script>

<style lang="css">

  .details-panel {
    background: white;
    position: absolute;
    height: 100vh;
    z-index: 6000;
    top: 0;
    right: 0;
    width: 44%;
    padding: 12px;
  }

  .details-panel h4 {
    font-size: 30px;
  }

  .details-panel .skatepark-desc {
    font-size: 16px;
  }

  .details-panel .added {
    font-size: 13px;
  }

  .details-panel .tags {
    float: left;
    margin-top: 32px;
    width: 100%;
  }

  .details-panel .tag {
    font-size: 12px;
    padding: 6px;
    margin-right: 6px;
    margin-bottom: 6px;
    float: left;
    border-radius: 10px;
    background: rgba(0,0,0,0.06);
  }

  .details-panel .scrolling {
    margin-top: 32px;
    width: 100%;
    overflow-y: scroll;
    float: left;
    display: flex;
    bottom: 0;
  }

  .details-panel .side-by-side {
    float: left;
  }

  .fixed-height {
    height: 330px;
  }

</style>
