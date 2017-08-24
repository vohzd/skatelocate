<template lang="html">
  <section class="add-skatepark-interface">
    <ol class="steps-status">
      <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 1}">
        <div class="step-label">Select Location</div>
      </li>
      <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 2}">
        <div class="step-label">Mandatory Info</div>
      </li>
      <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 3}">
        <div class="step-label">Optional Images</div>
      </li>
      <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 4}">
        <div class="step-label" >Submit</div>
      </li>
    </ol>
    <div class="intro-instructions" v-show="currentAddSkateparkStep == 1">
      <p>To add a skatepark, please locate it on the map, and double-click on its location.</p>
    </div>
    <div class="mandatory-form" v-show="currentAddSkateparkStep == 2">

      <section class="help-text">
        <p>Please begin to fill out the mandatory information below.</p>
        <p>Protip: You can drag the marker if you need to reposition.</p>
        <p v-if="pendingNewParkLatLng">Current Lat/Long: {{ pendingNewParkLatLng.lat }} / {{ pendingNewParkLatLng.lng }}</p>
      </section>

      <input type="text" name="skatepark-name" placeholder="Skatepark Name" />
      <textarea name="name" rows="8" cols="80" placeholder="Skatepark Desc"></textarea>
      <input type="text" name="skatepark-adder" placeholder="Your Name" />
      <div class="available-tags">
        <div class="tag">Indoor</div>
        <div class="tag">Outdoor</div>
        <div class="tag">Concrete</div>
        <div class="tag">Wooden</div>
      </div>
      <input type="file" name="skatepark-images"  />
      <input type="button" value="submit" />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters }   from "vuex";
import moment                       from "moment";

export default {
  computed: {
    ...mapGetters([
      "currentAddSkateparkStep",
      "isMapDoubleClickAllowed",
      "mapInstance",
      "pendingNewParkLatLng"
    ])
  },
  data(){
    return {
    }
  },
  beforeDestroy(){
    this.changeCursorTo("");
    this.setIsMapDoubleClickAllowed(false);
  },
  methods: {
    ...mapActions([
      "changeCursorTo",
      "setCurrentStep",
      "setIsMapDoubleClickAllowed"
    ]),
    createTempMarker(){
        L.marker(this.pendingNewParkLatLng).addTo(this.mapInstance)
    }
  },
  mounted(){
    this.changeCursorTo("marker-cursor");
    this.setIsMapDoubleClickAllowed(true);
  },
  watch: {
    pendingNewParkLatLng(){
      if (this.pendingNewParkLatLng && this.isMapDoubleClickAllowed){
        this.changeCursorTo("");
        this.createTempMarker();
        this.setIsMapDoubleClickAllowed(false);
        this.setCurrentStep(2);
      }
    }
  }
}
</script>

<style lang="css">

  .add-skatepark-interface ol{
     padding: 0;
     margin: 0;
     display: flex;
     flex-wrap: wrap;
  }

  .add-skatepark-interface li{
     list-style-position: inside;
     font-size: 32px;
     padding: 0px;
     margin: 0;
     width: 25%;
  }

  .add-skatepark-interface .step-label{
     font-size: 16px;
     display: inline;
  }

  .help-text {
    margin-top: 32px;
  }

  .help-text p {
    font-size: 14px;
  }

  .step {
    background: rgba(0,0,0,0.05);
    font-size: 14px;
  }

  .step-selected {
    background: rgba(0,0,0,0.1);
  }

  .intro-instructions {
    margin-top: 32px;
  }

  @media(max-width: 1320px){
    .add-skatepark-interface li{
       width: 50%;
    }
  }

  @media(max-width: 768px){
    .add-skatepark-interface li{
       width: 100%;
       font-size: 26px;
    }
    .add-skatepark-interface .step-label{
       font-size: 18px;
    }
  }


</style>
