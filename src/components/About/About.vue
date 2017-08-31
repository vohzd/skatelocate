<template lang="html">
  <section>

    <header class="block-header">
      <toggle-nav-panel />
      <h3 class="site-name">Skatelocate <img src="../../assets/img/skate-icon.png" class="skate-icon" alt="skateboard icon" width="30px"></h3>
    </header>

    <section class="section-content">
      <p>Howdy, thanks for trying out skateLocate - Made for skaters to help locate locate spots easily.</p>
      <p>When I came to London I had no idea there were so many, so thought it would be good to document them.</p>
      <p>If you've got a spot to share, click 'add' in the top left and left click (or tap if you're on a mobile) on the location to begin adding. You'll need to add in your name and the park name. But if you wanna write a short description or have an image then please do add it too!</p>
      <p>Hoping on getting an offline mode developed, so when you're on your way out skating and wanna check quickly you can do!</p>

      <p>Built by Ben Smith <a href="https://vohzd.github.io" target="_blank">(vohzd)</a> - Give me a shout if you've any feedback! Thanks!</p>
      <div class="image-grid">
        <div class="one-column one">
          <a href="https://github.com/vohzd"target="_blank"><div class="row gh"><img src="../../assets/img/github.png" class="social-img"></div></a>
          <a href="https://uk.linkedin.com/in/ben-smith-493678a2"target="_blank"><div class="row li"><img src="../../assets/img/linkedin.png" class="social-img"></div></a>
          <a href="https://twitter.com/intheon"target="_blank"><div class="row tw"><img src="../../assets/img/twitter.png" class="social-img"></div></a>
        </div>
        <div class="one-column three">
          <a href="https://vohzd.github.io" target="_blank">
            <img src="../../assets/img/jump.jpg" width="100%" />
          </a>
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
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="css">

  .site-name {
  }

  .image-grid {
    display:flex;
    flex-direction: row;
  }

  .row {
    flex-grow: 3;
  }

  .jump {

  }

  .social {
    display: flex;
    flex-direction: column;
    width: 25%;
  }

  .social-img{
    width: 50%;
    max-width: 64px;
  }

  .li {
    background: #0b2b5c;
  }

  .tw {
    background: #39a0ce;
  }

  .gh {
    background: white;
  }



  .one {
    width: 25%;
  }

  .two {
    width: 50%;
  }

  .three {
    width: 75%;
  }


</style>
