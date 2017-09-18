<template lang="html">
  <section>
    <div class="votes">
      <button class="vote-button" v-on:click="upvote" v-bind:class="{ 'is-disabled' : hasUpvote}">
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
      <button class="vote-button" v-on:click="downvote" v-bind:class="{ 'is-disabled' : hasDownVote}">
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
      hasDownVote: false,
      hasUpvote: false,
      votes: null
    }
  },
  methods: {
    increment(int){
      let newVotes = this.skateparkInFocus.skateparkVotes + int;

      database.ref(`skateparks/${this.skateparkInFocus['.key']}/skateparkVotes`).set(
        newVotes
      );
    },
    decrement(int){
      let newVotes = this.skateparkInFocus.skateparkVotes - int;
      database.ref(`skateparks/${this.skateparkInFocus['.key']}/skateparkVotes`).set(
        newVotes
      );
    },
    downvote(){
      if (this.hasAlreadyVoted()){
        if (this.hasDownVote){
          console.log("remove downvote");
          this.increment(1);
          this.removeVoteFrom("downvotes");
          this.hasDownVote = false;
        }
        else {
          // at this point it has an upvote
          this.removeVoteFrom("upvotes");
          this.decrement(2);
          this.votes.downvotes.push(this.skateparkInFocus['.key']);
          this.saveVotesToLS();
          this.hasDownVote = true;
          this.hasUpvote = false;
          console.log("toggle to downvote");
        }
      }
      else {
        console.log("add downvote");
        this.decrement(1);
        this.votes.downvotes.push(this.skateparkInFocus['.key']);
        this.saveVotesToLS();
        this.hasDownVote = true;
      }
    },
    upvote(){
      if (this.hasAlreadyVoted()){
        if (this.hasUpvote){
          console.log("remove upvote");
          this.decrement(1);
          this.removeVoteFrom("upvotes");
          this.hasUpvote = false;
        }
        else {
          // at this point it has an downvote
          this.removeVoteFrom("downvotes");
          this.increment(2);
          this.votes.upvotes.push(this.skateparkInFocus['.key']);
          this.saveVotesToLS();
          this.hasDownVote = false;
          this.hasUpvote = true;
          console.log("toggle to upvote");
        }
      }
      else {
        this.increment(1);
        this.votes.upvotes.push(this.skateparkInFocus['.key']);
        this.saveVotesToLS();
        this.hasUpvote = true;
      }
    },
    hasAlreadyVoted(){
      this.retreiveVotesOrInit();
      this.votes.upvotes.forEach((up, i) => {
        if (this.skateparkInFocus['.key'] == up){
          this.hasUpvote = true;
        }
      });
      this.votes.downvotes.forEach((down, i) => {
        if (this.skateparkInFocus['.key'] == down){
          this.hasDownVote = true;
        }
      });
      return this.hasDownVote || this.hasUpvote;
    },
    removeVoteFrom(direction){
      let index = this.votes[direction].indexOf(this.skateparkInFocus['.key']);
      this.votes[direction].splice(index, 1);
      this.saveVotesToLS();
    },
    retreiveVotesOrInit(){
      let check = localStorage.getItem("skatelocate_votes");
      if (!check){
        this.votes = {
          downvotes: [],
          upvotes: []
        };
        this.saveVotesToLS();
      }
      this.votes = JSON.parse(localStorage.getItem("skatelocate_votes"));
    },
    saveVotesToLS(){
      localStorage.setItem("skatelocate_votes", JSON.stringify(this.votes));
    }
  },
  mounted(){
    setTimeout(() => {
      console.log(`TIMEOUT reporting on ${this.skateparkInFocus.skateparkName} with ${this.skateparkInFocus.skateparkVotes} votes & id of ${this.skateparkInFocus['.key']}`);
      this.hasUpvote = false;
      this.hasDownVote = false;
      this.hasAlreadyVoted();
    }, 400)
  }
}
</script>

<style lang="css">

.votes {
  width: 75%;
  float: left;
}

.vote-button {
  outline: none;
  border: none;
  background: rgba(0,0,0,0.1);
  padding: 4px;
  margin: 0px;
  font-family: "kalam";
  border-radius: 4px;
  font-size: 10px;
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
