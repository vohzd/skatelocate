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
      "matchingSkateparks",
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
                  .on("click", (event) => {
                    let offset = this.getZoomOffsetLong(event.latlng.lng);
                    this.mapInstance.setView([event.latlng.lat, (event.latlng.lng + offset)]);
                    // let the router handle the retreival of skatepark metadata
                    this.$router.push({
                      name: "skatepark",
                      params: {
                        id: marker[".key"]
                      }
                    })
                  });
    },
    destroyNewSkateParkListener(){
      this.mapInstance.off("dblclick");
    },
    filterMarkersByMatches(){
      if (this.matchingSkateparks.length === 0){
        this.placeMarkers("all")
      }
      else {
        this.placeMarkers("filtered")
      }
    },
    getZoomOffsetLong(long){
      // TO DO REFACTOR THE SHIT OUT OF THIS
      // returns a value to offset based on the current zoom level (as higher values go into finer detail)
      let zoomLevel = this.mapInstance.getZoom();
      let offset = 0;
      if (zoomLevel == 18){
        offset = 0.0022
      }
      if (zoomLevel == 17){
        offset = 0.005
      }
      if (zoomLevel == 16){
        offset = 0.01
      }
      if (zoomLevel == 15){
        offset = 0.02
      }
      if (zoomLevel == 14){
        offset = 0.05
      }
      if (zoomLevel == 13){
        offset = 0.1
      }
      if (zoomLevel == 12){
        offset = 0.2
      }
      if (zoomLevel == 11){
        offset = 0.45
      }
      if (zoomLevel == 10){
        offset = 0.65
      }
      if (zoomLevel == 9){
        offset = 1.2
      }
      if (zoomLevel == 8){
        offset = 2.6
      }
      if (zoomLevel == 7){
        offset = 4.6
      }
      return offset;
    },
    initMap(){
      this.setMapInstance(L.map("map").setView([0, 180], 2));
      this.mapInstance.doubleClickZoom.disable();
      this.markercluster = L.markerClusterGroup({
        animateAddingMarkers: true
      });
      this.addMapTiles();
      this.retreiveExistingSkateparks();
    },
    placeMarkers(which){
      // always start with a fresh set
      this.markercluster.removeLayers(this.markers);
      this.mapInstance.removeLayer(this.markercluster);
      this.markers = [];
      // create, push, and append
      if (which == "all"){
        this.skateparks.forEach((marker, i) => {
          this.markers.push(this.createMarker(marker))
        });
      }
      else {
        this.matchingSkateparks.forEach((marker, i) => {
          this.markers.push(this.createMarker(marker))
        });
      }
      this.markercluster.addLayers(this.markers);
      this.mapInstance.addLayer(this.markercluster);
      // because i need to slightly offset where the default zoom goes to
      // (the side pane obscures the center zoom)
      this.markercluster.on("clusterclick", (event) => {
        setTimeout(() => {
          let offset = this.getZoomOffsetLong(event.latlng.lng);
          this.mapInstance.setView([event.latlng.lat, (event.latlng.lng + offset)]);
        }, 500)
      })
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
    matchingSkateparks(){
      this.filterMarkersByMatches();
    },
    skateparks(){
      this.placeMarkers("all");
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
