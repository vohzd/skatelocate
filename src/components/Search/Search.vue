<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>SEARCH</h3>
    </header>
    <section class="section-content">
      <div class="text-search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search by phrase..." v-model="searchString"/>
      </div>
      <div class="tag-search">
        <i class="fa fa-tags" aria-hidden="true"></i>
        <div class="tags">
          <div v-for="tag in availableSkateparkTags" class="tag" v-on:click="toggleThisTagAndSearch(tag)" v-bind:class=" { 'tag-selected': isTagInArray(tag) } ">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="results">
        <div class="status-text" v-if="isPending">
          <i class="fa fa-spinner rotate" aria-hidden="true"></i>
          Searching...
        </div>
        <div class="results" v-if="!isPending">
          <div class="result-item" v-for="skatepark in matchingSkateparks">{{ skatepark.skateparkName }}</div>
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
      "availableSkateparkTags",
      "skateparks"
    ])
  },
  data(){
    return {
      isPending: false,
      searchString: "",
      selectedTags: [],
      matchingSkateparks: []
    }
  },
  methods: {
    isTagInArray(tag){
      let index = this.selectedTags.indexOf(tag);
      if (index === -1){
        return false;
      }
      else {
        return true;
      }
    },
    filterResultsByChosenTags(){
      this.isPending = true;
      if (this.searchString.length === 0 && this.selectedTags.length === 0){
        this.reset();
      }
      else {
        if (this.selectedTags.length === 0){
          this.filterResultsBySearchString();
        }
        else {
          let searchPool = [];
          if (!this.searchString){
            this.matchingSkateparks = [];
            searchPool = this.skateparks;
          }
          else {
            searchPool = this.matchingSkateparks;
            this.matchingSkateparks = [];
          }
          searchPool.forEach((skatepark, i) => {
            let match = skatepark.skateparkTags.filter((current) => {
              return this.selectedTags.indexOf(current) > -1;
            }).length == this.selectedTags.length;
            if (match){
              this.matchingSkateparks.push(skatepark);
            }
          });
          this.isPending = false;
        }
      }
    },
    filterResultsBySearchString(){
      this.isPending = true;
      if (this.searchString.length === 0 && this.selectedTags.length === 0){
        this.reset();
      }
      else {
        if (this.searchString.length === 0){
          this.filterResultsByChosenTags();
        }
        else {
          let searchPool = [];
          if (!this.selectedTags.length){
            this.matchingSkateparks = [];
            searchPool = this.skateparks;
          }
          else {
            searchPool = this.matchingSkateparks;
            this.matchingSkateparks = [];
          }
          searchPool.forEach((skatepark, i) => {
            const lower = skatepark.skateparkName.toLowerCase();
            const search = this.searchString.toLowerCase();
            if (lower.indexOf(search) > -1){
              this.matchingSkateparks.push(skatepark);
            }
          });
          this.isPending = false;
        }
      }
    },
    reset(){
      this.isPending = false;
      this.matchingSkateparks = [];
    },
    toggleThisTag(tag){
      let test = this.isTagInArray(tag);
      if (!test){
        this.selectedTags.push(tag);
      }
      else {
        let pos = this.selectedTags.indexOf(tag);
        this.selectedTags.splice(pos, 1);
      }
    },
    toggleThisTagAndSearch(tag){
      this.toggleThisTag(tag);
      this.filterResultsByChosenTags();
    }
  },
  mounted(){
    this.reset();
  },
  watch: {
    searchString(){
      this.filterResultsBySearchString();
    }
  }
}
</script>

<style lang="css">

  .rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
      from {transform: rotate(0deg);}
      to   {transform: rotate(359deg);}
  }

  .status-text {
    text-align: center;
  }

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

  .tag-selected {
    background: rgba(107, 175, 126, 0.4);
  }

  .text-search input  {
    margin-left: 16px;
    padding: 8px;
    font-size: 22px;
    line-height: 22px;
    width: calc(100% - 66px);
    float: left;
    border: 0;
    outline: 0;
    background: rgba(0,0,0,0.06);
    border: 1px solid #DDDDDD;
    font-family: "kalam";
  }

  .text-search input:active  {
    background: rgba(107, 175, 126, 0.1);
  }

  .text-search input:focus  {
    background: rgba(107, 175, 126, 0.1);
  }

  .result-item {
    padding: 8px;
    width: calc(100% - 16px);
    margin-top: 16px;
    background: rgba(0,0,0,0.06);
    color: #444;
    font-size: 18px;
    border: 1px solid #DDDDDD;
    float: left;
  }

</style>
