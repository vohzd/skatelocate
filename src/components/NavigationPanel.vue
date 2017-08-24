<template lang="html">
  <nav class="right-hand-vertical">
  	<router-link class="router-link" to="/about" tag="div">
      <div class="vertical-button">
        <div class="label">About</div>
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/search" tag="div">
      <div class="vertical-button">
        <div class="label">Search</div>
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </router-link>
    <router-link class="router-link" to="/add" tag="div">
      <div class="vertical-button">
        <div class="label">Add</div>
        <i class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/top" tag="div">
      <div class="vertical-button">
        <div class="label">Top</div>
        <i class="fa fa-line-chart" aria-hidden="true"></i>
      </div>
    </router-link>
  	<router-link class="router-link" to="/recent" tag="div">
      <div class="vertical-button">
        <div class="label">Recent</div>
        <i class="fa fa-star-o" aria-hidden="true"></i>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css">

  .right-hand-vertical {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 48px;
    background: rgba(0,0,0,0.2);
    z-index: 9000;
  }

  .vertical-button {
    width: 48px;
    height: 48px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
    line-height: 48px;
  }

  .vertical-button:hover {
    background: rgba(0,0,0,0.05);
  }

  .vertical-button .label {
    position: absolute;
    margin-left: -64px;
    display:none;
    font-size: 16px;
    background: rgba(0,0,0,0.1);
    width: 64px;
    z-index: 4;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

  }

  .vertical-button:hover .label {
    display:block;
  }


</style>
