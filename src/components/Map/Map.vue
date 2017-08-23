<template lang="html">
  <section>
    <div class="skate-map" id="map"></div>
  </section>
</template>

<script>
/*
 * VUEX HELPERS
 */
import { mapActions, mapGetters }   from "vuex";

/*
 * OTHER LIBS
 */
import moment                       from "moment";

/*
 * LEAFLET STUFF
 */
import L                            from "leaflet";
import                              "leaflet/dist/leaflet.css";

export default {
  computed: {
    ...mapGetters([
      "skateparks"
    ])
  },
  data(){
    return {
      map: null
    }
  },
  methods: {
    ...mapActions([
      "setSkateparks"
    ]),
    addMapTiles(){
      L.tileLayer("https://api.mapbox.com/styles/v1/intheon/cippeqrwl003me9nliwhu6mtz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw")
        .addTo(this.map);
    },
    initMap(){
      this.map = L.map("map").setView([51.505, -0.09], 6);
      this.addMapTiles();
      this.retreiveExistingSkateparks();
    },
    placeMarkers(){
      this.skateparks.forEach((v, i) => {
        L.marker([v.skateparkLocation[1], v.skateparkLocation[0]]).addTo(this.map);
      });
    },
    retreiveExistingSkateparks(){
      this.$http.get("http://localhost:1337/skateparks")
        .then((res) => {
          this.setSkateparks(res.body);
        });
    }
  },
  mounted(){
    this.initMap();
  },
  watch: {
    skateparks(){
      this.placeMarkers();
    }
  }
}
</script>

<style lang="scss">
  .skate-map {
    height: 100vh;
  }
</style>
