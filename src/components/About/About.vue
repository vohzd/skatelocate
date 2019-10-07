<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <h3 class="site-name"><img src="../../assets/img/sllogo.png" class="skate-icon" alt="skateboard icon" width="240px"></h3>
    </header>

    <section class="section-content">
      <h3>Howdy, welcome to SKATELOCATE.</h3>
      <section class="total-items lead-item">
        <div class="circle" id="totalParks"></div> <span>locations currently tracked.</span>
      </section>
      <section class="about">
        <p>When I came to London I had no idea there were so many, so thought it would be good to document them.</p>
        <p>If you've got a spot to share, click 'add' from the right toolbar and double click (or double-tap if you're on a mobile) on the location of the park. You can add in tags and a short description, and also images too!</p>
        <p>Built by Ben Smith <a href="https://vohzd.com" target="_blank">@vohzd</a> - Give me a shout if you've any feedback! Thanks!</p>
        <div class="about-social-links">
          <ul>
            <a href="https://vohzd.com" target="_blank"><li><i class="fa fa-link" aria-hidden="true"></i></i></li></a>
            <a href="https://github.com/vohzd" target="_blank"><li><i class="fab fa-github" aria-hidden="true"></i></li></a>
            <a href="https://www.linkedin.com/in/benjamin-n-smith" target="_blank"><li><i class="fab fa-linkedin" aria-hidden="true"></i></i></li></a>
          </ul>
        </div>
      </section>
    </section>

  </section>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";

import toggleNavPanel                           from "../ToggleNavPanel.vue";

import CountUp                                  from "countup";

export default {
  components: {
    "toggle-nav-panel": toggleNavPanel
  },
  computed: {
    ...mapGetters([
      "skateparks"
    ])
  },
  data(){
    return {
      countAnim: null,
      total: 0
    }
  },
  methods: {
    update(){
      this.countAnim = new CountUp("totalParks", 0, this.skateparks.length);
      this.countAnim.start();
    }
  },
  mounted(){
    this.update();
  },
  watch: {
    skateparks(){
      this.update();
    }
  }
}
</script>

<style lang="css">

  .about-social-links ul {
  }

  .about-social-links li {
    list-style: none;
    display: inline;
    font-size: 24px;
    padding-right: 16px;
  }

  .lead-item {
    background: rgba(0, 0, 0, 0.06);
    width: calc(100% - 32px);
    min-height: 64px;
    border: 1px solid #DDDDDD;
    white-space: pre-line;
    padding: 8px;
    float: left;
  }

  .lead-item .circle {
    padding: 16px;
    font-size: 24px;
    border-radius: 50%;
    background: white;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    float: left;
  }

  .lead-item span {
    float: left;
    line-height: 64px;
    margin-left: 16px;
  }

  .about {
    float: left;
    margin-top: 16px;
    width: calc(100% - 14px);
  }

  @media(max-width: 1320px){
    .lead-item {
      min-height: 32px;
    }
    .lead-item .circle {
      padding: 8px;
      font-size: 16px;
      width: 22px;
      height: 22px;
      line-height: 22px;
    }
    .lead-item span {
      font-size: 12px;
      display: inline;
      margin-left: 8px;
      line-height: 38px;

    }
  }

</style>
