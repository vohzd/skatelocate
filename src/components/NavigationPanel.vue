<template lang="html">
  <nav class="right-hand-vertical">
  	<router-link class="router-link" to="/" tag="div">
      <div class="vertical-button">
        <div class="label">ABOUT</div>
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/search" tag="div">
      <div class="vertical-button">
        <div class="label">SEARCH</div>
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </router-link>
    <router-link class="router-link" to="/add" tag="div">
      <div class="vertical-button">
        <div class="label">ADD</div>
        <i class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/top" tag="div">
      <div class="vertical-button">
        <div class="label">TOP</div>
        <i class="fa fa-line-chart" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/recent" tag="div">
      <div class="vertical-button">
        <div class="label">RECENT</div>
        <i class="fa fa-star-o" aria-hidden="true"></i>
      </div>
    </router-link>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
  }
}
</script>

<style lang="css">

  .right-hand-vertical {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 48px;
    background: #251f28;
    z-index: 9000;
  }

  .router-link-exact-active {
    background: #251f28;
  }

  .vertical-button {
    width: 48px;
    height: 64px;
    font-size: 24px;
    text-align: center;
    line-height: 64px;
    color: #565158;
  }

  .vertical-button:hover {
    background: #251f28;
    color: #746b78;
    cursor: pointer;
  }

  .vertical-button .label {
    position: absolute;
    margin-left: -72px;
    text-align: center;
    display:none;
    font-size: 14px;
    background: #251f28;
    width: 72px;
    height: 64px;
    z-index: 4;
    color: #908694;
    font-weight: 500;
  }

  .vertical-button:hover .label {
    display:block;
  }


</style>
