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

/*
 * FIREBASE STUFF
 */
import instance                     from "../../config/firebaseConfig.js";
const database                      = instance.database();

export default {
  computed: {
    ...mapGetters([
      "mapInstance",
      "isMapDoubleClickAllowed",
      "skateparks"
    ])
  },
  data(){
    return {
      markers: [],
      markercluster: null
    }
  },
  methods: {
    ...mapActions([
      "bindFirebase",
      "setMapInstance",
      "setSkateparkInFocus",
      "setIsMapDoubleClickAllowed",
      "setPendingNewParkLatLng"
    ]),
    addMapTiles(){
      L.tileLayer("https://api.mapbox.com/styles/v1/intheon/cippeqrwl003me9nliwhu6mtz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw")
        .addTo(this.mapInstance);
    },
    createMarker(marker){
      return L.marker()
                  .bindTooltip(marker.skateparkName, { permanent: true })
                  .setLatLng([marker.skateparkLocation[0], marker.skateparkLocation[1]])
                  .on("click", () => {
                    this.$router.push({
                      name: "skatepark",
                      params: {
                        id: marker[".key"]
                      }
                    })
                  })
    },
    destroyNewSkateParkListener(){
      this.mapInstance.off("dblclick");
    },
    initMap(){
      this.setMapInstance(L.map("map").setView([51.505, -0.09], 6));
      this.mapInstance.doubleClickZoom.disable();
      this.markercluster = L.markerClusterGroup();
      this.addMapTiles();
      this.retreiveExistingSkateparks();
    },
    placeMarkers(){
      // always start with a fresh set
      this.markercluster.removeLayers(this.markers);
      this.mapInstance.removeLayer(this.markercluster);
      this.markers = [];
      // create, push, and append
      this.skateparks.forEach((marker, i) => {
        this.markers.push(this.createMarker(marker))
      });
      this.markercluster.addLayers(this.markers);
      this.mapInstance.addLayer(this.markercluster);
    },
    registerNewSkateparkListener(){
      this.mapInstance.on("dblclick", (props) => {
        this.setPendingNewParkLatLng(props.latlng);
      });
    },
    retreiveExistingSkateparks(){
      this.bindFirebase({
        name: "skateparks",
        ref: database.ref("skateparks")
      })
    }
  },
  mounted(){
    this.initMap();
  },
  watch: {
    skateparks(){
      this.placeMarkers();
    },
    isMapDoubleClickAllowed(){
      if (this.isMapDoubleClickAllowed){
        this.registerNewSkateparkListener();
      }
      else {
        this.destroyNewSkateParkListener();
      }
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
