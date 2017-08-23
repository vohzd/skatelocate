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
import leafletMarkerCluster         from "leaflet.markercluster";
import                              "leaflet.markercluster/dist/MarkerCluster.css";
import                              "leaflet.markercluster/dist/MarkerCluster.Default.css";


export default {
  computed: {
    ...mapGetters([
      "skateparks"
    ])
  },
  data(){
    return {
      map: null,
      markercluster: null
    }
  },
  methods: {
    ...mapActions([
      "setSkateparks",
      "setSkateparkInFocus"
    ]),
    addMapTiles(){
      L.tileLayer("https://api.mapbox.com/styles/v1/intheon/cippeqrwl003me9nliwhu6mtz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw")
        .addTo(this.map);
    },
    initMap(){
      this.map = L.map("map").setView([51.505, -0.09], 6);
      this.markercluster = L.markerClusterGroup();
      this.addMapTiles();
      this.retreiveExistingSkateparks();
    },
    placeMarkers(){
      this.skateparks.forEach((v, i) => {
        this.markercluster.addLayer(
          L.marker()
            .bindTooltip(v.skateparkName, { permanent: true })
            .setLatLng([v.skateparkLocation[1], v.skateparkLocation[0]])
            .on("click", () => {
              this.setSkateparkInFocus(i)
            })
        )
      });
      this.map.addLayer(this.markercluster);
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

    console.log(leafletMarkerCluster);
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
    position: relative;
  }

  .leaflet-marker-shadow {
    display: none;
  }
</style>
