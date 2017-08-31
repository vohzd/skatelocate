<template lang="html">
  <section>
    <h4>Search</h4>
    <input type="text" ng-model="searchString" id="search-parks"></input>
    <label for="search-parks">Search</label>
  </section>
</template>

<script>
import { mapGetters }               from "vuex";
import moment                       from "moment";

export default {
  data(){
    return {
    }
  }
}
</script>

<style lang="css">

</style>
