<template lang="html">
  <div>
    <header class="block-header">
      <toggle-nav-panel />
      <h3>ADD NEW</h3>
    </header>
    <section class="add-skatepark-interface section-content">
      <ol class="steps-status">
        <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 1, 'step-completed': isStepGreaterThan(1)}">
          <div class="step-label">
            Select Location
            <i class="fa fa-check" aria-hidden="true" v-if="isStepGreaterThan(1)"></i>
          </div>
        </li>
        <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 2, 'step-completed': isStepGreaterThan(2)}" v-on:click="goToStep(2)">
          <div class="step-label">
            Mandatory Info
            <i class="fa fa-check" aria-hidden="true" v-if="isStepGreaterThan(2)"></i>
          </div>
        </li>
        <li class="step" v-bind:class="{ 'step-selected': currentAddSkateparkStep == 3, 'step-completed': isStepGreaterThan(3)}" v-on:click="goToStep(3)">
          <div class="step-label">
            Optional Images
            <i class="fa fa-check" aria-hidden="true" v-if="isStepGreaterThan(3)"></i>
          </div>
        </li>
      </ol>
      <div class="intro-instructions" v-show="currentAddSkateparkStep == 1">
        <p>To add a skatepark, please locate it on the map, and double-click on its location.</p>
      </div>
      <div class="mandatory-form" v-show="currentAddSkateparkStep == 2">
        <div class="mandatory-form-fields">
          <div class="field">
            <input type="text" name="skatepark-name" placeholder="Skatepark Name" v-model="mandatoryInfo.skateparkName" />
          </div>
          <div class="field">
            <input type="text" name="skatepark-adder" placeholder="Your Name" v-model="mandatoryInfo.skateparkAdder"/>
          </div>
          <div class="field">
            <textarea name="name" placeholder="Skatepark Description" v-model="mandatoryInfo.skateparkDesc" resizeable="false"></textarea>
          </div>
          <div class="field">
            <div class="tags">
              <div v-for="tag in availableSkateparkTags" class="tag" v-bind:class=" { 'tag-selected': isTagInArray(tag) } " v-on:click="toggleThisTag(tag)">
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
        <section class="help-text">
          <div v-if="pendingNewParkLatLng">
            Protip: You can drag the marker to change the lat/long.
            <div>
              Lat: {{ pendingNewParkLatLng.lat }}
            </div>
            <div>
              Lng: {{ pendingNewParkLatLng.lng }}
            </div>
          </div>
        </section>
        <div class="side-by-side">
          <div class="col">
            <input type="button" value="SUBMIT" v-on:click="addPark" v-bind:disabled="!canProceed" />
          </div>
          <div class="col">
            <input type="button" value="NEXT" v-on:click="goToStep(3)" v-bind:disabled="!canProceed"/>
          </div>
        </div>

      </div>

      <div class="optional-form" id="cloudinary-interface"  v-show="currentAddSkateparkStep == 3">
      </div>

      <div class="status-results" v-show="currentAddSkateparkStep == 4">
        Uploading...
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
      "availableSkateparkTags",
      "currentAddSkateparkStep",
      "isMapDoubleClickAllowed",
      "mapInstance",
      "pendingNewParkLatLng"
    ])
  },
  data(){
    return {
      canProceed: false,
      imagesToUpload: null,
      mandatoryInfo: {
        skateparkAdder: "",
        skateparkDesc: "",
        skateparkName: "",
        selectedTags: []
      },
      cloudinaryImageURLs: [],
      tempMarker: null,
      unparsedURLs: ""
    }
  },
  beforeDestroy(){
    this.changeCursorTo("");
    this.setIsMapDoubleClickAllowed(false);
  },
  methods: {
    ...mapActions([
      "changeCursorTo",
      "createNotification",
      "setCurrentStep",
      "setIsMapDoubleClickAllowed",
      "setPendingNewParkLatLng"
    ]),
    addPark(){
      if (this.mandatoryInfo.skateparkAdder && this.mandatoryInfo.skateparkDesc && this.mandatoryInfo.skateparkName){
        database.ref("skateparks").push({
          skateparkAdder: this.mandatoryInfo.skateparkAdder,
          skateparkDesc: this.mandatoryInfo.skateparkDesc,
          skateparkLocation: [this.pendingNewParkLatLng.lat, this.pendingNewParkLatLng.lng],
          skateparkImages: this.cloudinaryImageURLs,
          skateparkName: this.mandatoryInfo.skateparkName,
          skateparkTags: this.mandatoryInfo.selectedTags,
          timeAdded: Date.now()
        });
        this.clearForm();
        this.createNotification("Thank you, that's now been added!");
      }
    },
    clearForm(){
      this.mandatoryInfo.skateparkAdder = "";
      this.mandatoryInfo.skateparkDesc = "";
      this.mandatoryInfo.skateparkName = "";
      this.mandatoryInfo.selectedTags = [];
      this.cloudinaryImageURLs = [];
      this.setPendingNewParkLatLng(null);
      this.setCurrentStep(1);
      this.changeCursorTo("marker-cursor");
      this.setIsMapDoubleClickAllowed(true);
      this.tempMarker.remove();
    },
    createTempMarker(){
      this.tempMarker = L.marker(this.pendingNewParkLatLng, {draggable: true}).addTo(this.mapInstance);
      this.tempMarker.on("move", (props) => {
        this.setPendingNewParkLatLng(props.latlng);
      })
    },
    determineIfAllFieldsCompleted(){
      if (this.mandatoryInfo.skateparkAdder && this.mandatoryInfo.skateparkDesc && this.mandatoryInfo.skateparkName && this.mandatoryInfo.selectedTags.length != 0){
        this.canProceed = true;
      }
      else {
        this.canProceed = false;
      }
    },
    goToStep(step){
      this.setCurrentStep(step)
    },
    isTagInArray(tag){
      let index = this.mandatoryInfo.selectedTags.indexOf(tag);
      if (index === -1){
        return false;
      }
      else {
        return true;
      }
    },
    isStepGreaterThan(step){
      return this.currentAddSkateparkStep > step;
    },
    initCloudinaryUploadWidget(){
      let cloudinaryOptions = {
        cloud_name: "lgycbktyo",
        upload_preset: "p0cxg2v9",
        inline_container: document.getElementById("cloudinary-interface"),
        theme: "white",
        show_powered_by: false
      };
      cloudinary.openUploadWidget(cloudinaryOptions, (err, res) => {
          this.setImageUrls(res)
            .then(() => {
              this.addPark();
            })
        });
    },
    setImageUrls(arr){
      return new Promise((resolve, reject) => {
        arr.forEach((v, i) => {
          this.cloudinaryImageURLs.push(v.secure_url)
        });
        resolve()
      });
    },
    toggleThisTag(tag){
      let test = this.isTagInArray(tag);
      if (!test){
        this.mandatoryInfo.selectedTags.push(tag);
      }
      else {
        let pos = this.mandatoryInfo.selectedTags.indexOf(tag);
        this.mandatoryInfo.selectedTags.splice(pos, 1);
      }
    }
  },
  mounted(){
    this.changeCursorTo("marker-cursor");
    this.setIsMapDoubleClickAllowed(true);
    this.initCloudinaryUploadWidget();
  },
  watch: {
    pendingNewParkLatLng(){
      if (this.pendingNewParkLatLng && this.isMapDoubleClickAllowed){
        this.changeCursorTo("");
        this.createTempMarker();
        this.setIsMapDoubleClickAllowed(false);
        this.setCurrentStep(2);
      }
    },
    mandatoryInfo: {
      deep: true,
      handler(){
        this.determineIfAllFieldsCompleted();
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
     width: calc(33% - 8px);
     padding-left: 8px;
  }

  .step {
    background: rgba(0,0,0,0.05);
    font-size: 12px;
  }
  .step-label {
    letter-spacing: 1px;
  }

  .step i {
    font-size: 20px;
    margin: 8px;
    opacity: 0.5;
    float: right;
  }

  .step-selected {
    background: rgba(107, 175, 126, 0.4);
  }

  .step-completed {
    opacity: 0.4;
  }

  .mandatory-form-fields {
    margin: 0;
    padding: 0;
    margin-top: 64px;
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
    margin-top: 16px;
    font-size: 11px;
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
    background: rgba(107, 175, 126, 0.3);

  }

  .side-by-side .col input:hover{
    cursor: pointer;
    opacity: 0.8;
    background: rgba(107, 175, 126, 0.25);
  }

  .side-by-side .col input:disabled{
    cursor: not-allowed;
    background: rgba(236, 210, 209, 0.4);
  }

  .side-by-side .col input:disabled:hover{
    cursor: not-allowed;
  }

  .intro-instructions {
    margin-top: 32px;
  }


  .tag-selected {
    background: rgba(107, 175, 126, 0.4);
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
