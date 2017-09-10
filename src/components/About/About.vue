<template lang="html">
  <section>

    <header class="block-header">
      <toggle-nav-panel />
      <h3 class="site-name"><img src="../../assets/img/sllogo.png" class="skate-icon" alt="skateboard icon" width="240px"></h3>
    </header>

    <section class="section-content">
      <p>Howdy, thanks for trying out SKATELOCATE - Made for skaters to help locate locate spots easily.</p>
      <p>When I came to London I had no idea there were so many, so thought it would be good to document them.</p>
      <p>If you've got a spot to share, click 'add' from the right toolbar and double click (or double-tap if you're on a mobile) on the location of the park. You can add in tags and a short description, and also images too!</p>
      <p>Built by Ben Smith <a href="https://vohzd.github.io" target="_blank">@vohzd</a> - Give me a shout if you've any feedback! Thanks!</p>
      <div class="social-links">
        <ul>
          <a href="https://vohzd.github.io/#/home" target="_blank"><li><i class="fa fa-home" aria-hidden="true"></i></i></li></a>
          <a href="https://github.com/vohzd" target="_blank"><li><i class="fa fa-github" aria-hidden="true"></i></li></a>
          <a href="https://angel.co/vohzd" target="_blank"><li><i class="fa fa-angellist" aria-hidden="true"></i></i></li></a>
          <a href="https://www.linkedin.com/in/benjamin-n-smith" target="_blank"><li><i class="fa fa-linkedin" aria-hidden="true"></i></i></li></a>
          <a href="https://stackoverflow.com/users/3609943/vohzd" target="_blank"><li><i class="fa fa-stack-overflow" aria-hidden="true"></i></li></a>
          <a href="https://twitter.com/vohzd" target="_blank"><li><i class="fa fa-twitter" aria-hidden="true"></i></i></li></a>
        </ul>

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

  .social-links ul {
  }

  .social-links li {
    list-style: none;
    display: inline;
    font-size: 24px;
    padding-right: 16px;

  }

</style>
