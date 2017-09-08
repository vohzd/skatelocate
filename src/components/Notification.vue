<template lang="html">
  <section class="notification">
    {{ notificationText }}
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "notificationText"
    ])
  }
}
</script>

<style lang="css">

  .notification {
    background: #251f28;
    color: #746b78;
    font-size: 24px;
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 48px;
    z-index: 9001;
    transition: 0.8s all;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    border-top-left-radius: 8px;
  }

</style>
