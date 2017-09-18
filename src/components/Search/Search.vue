<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>SEARCH</h3>
    </header>
    <section class="section-content">
      <div class="text-search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search by phrase..." />
      </div>
      <div class="tag-search">
        <i class="fa fa-tags" aria-hidden="true"></i>
        <div class="tags">
          <div v-for="tag in availableSkateparkTags" class="tag">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="results">
        searching...
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
      "availableSkateparkTags"
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

  .text-search {
    float: left;
    width: 100%;
    margin-bottom: 16px;
  }

  .tag-search {
    width: 100%;
    float: left;
  }

  .tag-search .tags{
    float: left;
    width: calc(100% - 64px);
    margin-left: 16px;
  }
  .text-search i, .tag-search i{
    width: 32px;
    font-size: 32px;
    float: left;
  }
  .text-search input  {
    margin-left: 16px;
    padding: 8px;
    font-size: 22px;
    line-height: 22px;
    width: calc(100% - 64px);
    float: left;
    border: 0;
    outline: 0;
    background: white;
    font-family: "kalam";
  }

  .results {
    padding: 8px;
    width: calc(100% - 16px);
    margin-top: 32px;
    background: rgba(0,0,0,0.06);
    color: #444;
    font-size: 18px;
    border: 1px solid #DDDDDD;
    float: left;
  }

</style>
