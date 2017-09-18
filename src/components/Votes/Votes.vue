<template lang="html">
  <section>
    <div class="votes">
      <button class="vote-button" v-bind:class="{ 'is-disabled' : hasUpvote}">
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
      <button class="vote-button" v-bind:class="{ 'is-disabled' : hasDownVote}">
        <i class="fa fa-chevron-down" aria-hidden="true" ></i>
      </button>
      <span class="upvotes-quantity">{{ skateparkInFocus.skateparkVotes }}</span>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";

import instance                                 from "../../config/firebaseConfig.js";
const database                                  = instance.database();

export default {
  computed: {
    ...mapGetters([
      "skateparkInFocus",
      "skateparks"
    ])
  },
  data(){
    return {
      amountOfVotes: 0,
      hasDownVote: false,
      hasUpvote: false,
      votes: []
    }
  }
}
</script>

<style lang="css">

.votes {
  margin: 8px;
  float: left;

}

.vote-button {
  outline: none;
  border: none;
  background: rgba(0,0,0,0.1);
  padding: 8px;
  margin: 0px;
  font-family: "kalam";
  border-radius: 8px;
}

.vote-button:hover {
  cursor: pointer;
  opacity:0.8;
}

.votes-quantity {
  font-size: 12px;
  color: rgba(0,0,0,0.5);
}

.is-disabled {
  cursor: pointer;
  opacity: 0.5;
  background: #DDDDDD;
}

.is-disabled:hover {
  cursor: auto;
  opacity: 0.5;
  background: #DDDDDD;
}

</style>
