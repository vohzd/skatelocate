<template lang="html">
  <div>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>ADD NEW</h3>
    </header>
    <section class="add-skatepark-interface section-content">
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

        <div class="mandatory-form-fields">
          <div class="field">
            <input type="text" name="skatepark-name" placeholder="Skatepark Name" v-model="skateparkName" />
          </div>
          <div class="field">
            <input type="text" name="skatepark-adder" placeholder="Your Name" v-model="skateparkAdder"/>
          </div>
          <div class="field">
            <textarea name="name" placeholder="Skatepark Description" v-model="skateparkDesc" resizeable="false"></textarea>
          </div>
          <div class="field">
            <div class="available-tags">
              <div class="tag">Indoor</div>
              <div class="tag">Outdoor</div>
              <div class="tag">Concrete</div>
              <div class="tag">Wooden</div>
            </div>
          </div>
        </div>

        <div class="side-by-side">
          <div class="col">
            <input type="button" value="SUBMIT" v-on:click="addPark"/>
          </div>
          <div class="col">
            <input type="button" value="NEXT" v-on:click="goToStep(3)"/>
          </div>
        </div>

      </div>

      <div class="mandatory-form" v-show="currentAddSkateparkStep == 3">
        <input type="file" name="skatepark-images"  />

        <div class="side-by-side">
          <div class="col">
            <input type="button" value="BACK" v-on:click="goToStep(2)"/>
          </div>
          <div class="col">
            <input type="button" value="SUBMIT" v-on:click="addPark"/>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";

import toggleNavPanel                           from "../ToggleNavPanel.vue";

import instance                                 from "../../config/firebaseConfig.js";
const database                                  = instance.database();

export default {
  components: {
    "toggle-nav-panel": toggleNavPanel
  },
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
      skateparkAdder: "",
      skateparkDesc: "",
      skateparkName: "",
      tempMarker: null
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
      "setIsMapDoubleClickAllowed",
      "setPendingNewParkLatLng"
    ]),
    addPark(){
      if (this.skateparkAdder && this.skateparkDesc && this.skateparkName){
        database.ref("skateparks").push({
          skateparkAdder: this.skateparkAdder,
          skateparkDesc: this.skateparkDesc,
          skateparkLocation: [this.pendingNewParkLatLng.lat, this.pendingNewParkLatLng.lng],
          skateparkName: this.skateparkName,
          timeAdded: Date.now()
        });
        this.clearForm();
      }
    },
    clearForm(){
      this.skateparkAdder = "";
      this.skateparkDesc = "";
      this.skateparkName = "";
      this.setPendingNewParkLatLng(null);
      this.setCurrentStep(1);
      this.changeCursorTo("marker-cursor");
      this.setIsMapDoubleClickAllowed(true);
      this.tempMarker.remove();
    },
    createTempMarker(){
      this.tempMarker = L.marker(this.pendingNewParkLatLng).addTo(this.mapInstance);
    },
    goToStep(step){
      this.setCurrentStep(step)
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

  .steps-status{
     padding: 0;
     margin: 0;
     display: flex;
     flex-wrap: wrap;
  }

   .steps-status li{
     list-style-position: inside;
     font-size: 32px;
     padding: 0px;
     margin: 0;
     width: 33%;
  }



  .mandatory-form-fields {
    margin: 0;
    padding: 0;
  }

  .mandatory-form-fields .field{
    margin-bottom: 8px;
  }


  .add-skatepark-interface .step-label{
     font-size: 16px;
     display: inline;
  }

  .mandatory-form input[type="text"], textarea{
    width: calc(100% - 8px);
    line-height: 32px;
    outline: none;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 16px;
    margin:0px;
  }

  .mandatory-form input[type="text"]:active, textarea:active{
    background: rgba(107, 175, 126, 0.4);
  }

  .mandatory-form input[type="text"]:focus, textarea:focus{
    background: rgba(107, 175, 126, 0.4);
  }

  .mandatory-form textarea {
    resize: none;
  }

  .help-text {
    margin-top: 32px;
  }

  .help-text p {
    font-size: 14px;
  }

  .step {
    background: rgba(0,0,0,0.05);
    font-size: 12px;
    text-align: center;
  }

  .step-selected {
    background: rgba(107, 175, 126, 0.4);
  }

  .side-by-side {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .side-by-side .col {
    float: left;
    width: 50%;
  }

  .side-by-side .col input{
    width: calc(100% - 16px);
    height: 64px;
    border: none;
  }

  .side-by-side .col input:hover{
    cursor: pointer;
    opacity: 0.8;
    background: rgba(107, 175, 126, 0.4);

  }

  .intro-instructions {
    margin-top: 32px;
  }

  .tag {
    display: inline;
    font-size: 12px;
    background: rgba(0,0,0,0.1);
    padding: 8px;
    border-radius: 16px;
    line-height: 12px;
  }

  .tag:hover {
    cursor: pointer;
    opacity: 0.8;
  }


  @media(max-width: 1320px){
    .steps-status li{
       width: 100%;
       font-size: 26px;
    }
  }

  @media(max-width: 768px){
    .steps-status li{
       font-size: 16px;
    }
  }


</style>
