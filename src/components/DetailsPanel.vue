<template lang="html">
  <section class="details-panel">
    <div  v-if="focused">
      <h4>{{ focused.skateparkName }}</h4>
      <p>{{ focused.skateparkDesc }}</p>
      <time>{{ focused.createdAt }}</time>
      <p>{{ focused.skateparkAdder }}</p>
      <ul>
        <li v-for="tag in focused.skateparkTags">
          {{ tag }}
        </li>
      </ul>
      <div v-for="imgSrc in focused.skateparkImages">
        {{ imgSrc }}
      </div>
    </div>
  </section>
</template>

<script>

import { mapGetters } from "Vuex";

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
    width: 35%;
  }

</style>
