<template lang="html">
  <section>
    <header class="block-header">
      <toggle-nav-panel />
      <div v-if="!needsMessage" class="header-content">
        <h3>{{ skateparkInFocus.skateparkName }}</h3>
      </div>
    </header>
    <section class="edit-skatepark-details">
      <div v-if="skateparkInFocus">
        <div class="grey-background">
          <textarea class="edit-skatepark-description" v-model="newDescription">
          </textarea>
          <div class="urls">
            <div class="field">
              <i class="fa fa-external-link-square" aria-hidden="true"></i>
              <input type="text" placeholder="Website URL" v-model="websiteURL"/>
            </div>
            <div class="field">
              <i class="fa fa-facebook-square" aria-hidden="true"></i>
              <input type="text" placeholder="Facebook" v-model="facebookURL"/>
            </div>
            <div class="field">
              <i class="fa fa-youtube-play" aria-hidden="true"></i>
              <input type="text" placeholder="Youtube / videos" v-model="youtubeURL" />
            </div>
          </div>
          <div class="tags">
            <div v-for="tag in availableSkateparkTags"  class="tag" v-bind:class=" { 'tag-selected': isTagInArray(tag) } " v-on:click="toggleThisTag(tag)">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="grey-background" id="cloudinary-edit-interface"></div>

        <div class="side-by-side">
          <div class="col">
            <input type="button" v-on:click="backToSummary" value="BACK">
          </div>
          <div class="col">
            <input type="button" v-on:click="submitUpdate" value="SUBMIT">
          </div>
        </div>
      </div>
      <div class="help-messages" v-if="needsMessage">
        {{ statusMessage }}
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters }               from "vuex";

import instance                                 from "../../config/firebaseConfig.js";
const database                                  = instance.database();

import toggleNavPanel                           from "../ToggleNavPanel.vue";

export default {
  components: {
    "toggle-nav-panel": toggleNavPanel,
  },
  computed: {
    ...mapGetters([
      "availableSkateparkTags",
      "skateparkInFocus",
      "skateparks"
    ])
  },
  data(){
    return {
      statusMessage: "",
      needsMessage: false,
      newDescription: "",
      websiteURL: "",
      facebookURL: "",
      youtubeURL: "",
      extraImages: []
    }
  },
  filters: {
    dateFilter(timestamp){
      return moment(timestamp).format("YYYY/MM/DD");
    }
  },
  methods: {
    ...mapActions([
      "setSkateparkInFocus",
    ]),
    backToSummary(){
      this.$router.push({
        name: "skatepark",
        params: {
          id: this.skateparkInFocus[".key"]
        }
      });
    },
    initCloudinaryUploadWidget(){
      let cloudinaryOptions = {
        cloud_name: "lgycbktyo",
        upload_preset: "p0cxg2v9",
        inline_container: document.getElementById("cloudinary-edit-interface"),
        theme: "white",
        show_powered_by: false
      };
      cloudinary.openUploadWidget(cloudinaryOptions, (err, res) => {
        this.updateImages(res);
      });
    },
    isTagInArray(tag){
      let index = this.skateparkInFocus.skateparkTags.indexOf(tag);
      if (index === -1){
        return false;
      }
      else {
        return true;
      }
    },
    toggleThisTag(tag){
      let test = this.isTagInArray(tag);
      if (!test){
        this.skateparkInFocus.skateparkTags.push(tag);
      }
      else {
        let pos = this.skateparkInFocus.skateparkTags.indexOf(tag);
        this.skateparkInFocus.skateparkTags.splice(pos, 1);
      }
    },
    submitUpdate(){
      /* DO VALIDATION */
      database.ref(`skateparks/${this.skateparkInFocus['.key']}`).update({
        skateparkDesc: this.newDescription,
        websiteURL: this.websiteURL,
        facebookURL: this.facebookURL,
        youtubeURL: this.youtubeURL,
        skateparkTags: this.skateparkInFocus.skateparkTags,
        skateparkImages: this.extraImages
      });
      this.backToSummary();
    },
    updateImages(newImages){
      newImages.forEach((img, i) => {
        this.extraImages.push(img.secure_url);
      });
    }
  },
  mounted(){
    this.initCloudinaryUploadWidget();
    this.newDescription = this.skateparkInFocus.skateparkDesc;
    this.websiteURL = this.skateparkInFocus.websiteURL ? this.skateparkInFocus.websiteURL : "";
    this.facebookURL = this.skateparkInFocus.facebookURL ? this.skateparkInFocus.facebookURL : "";
    this.youtubeURL = this.skateparkInFocus.youtubeURL ? this.skateparkInFocus.youtubeURL : "";
    this.extraImages = this.skateparkInFocus.skateparkImages ? this.skateparkInFocus.skateparkImages : [];

  }
}
</script>

<style lang="css">

  #cloudinary-edit-interface {
    margin-top: 8px;
  }

  .edit-skatepark-description {
    resize: none;
    background: rgba(0, 0, 0, 0.06);
    border: none;
    outline: none;
    text-align: left;
    width: calc(100% - 16px);
    min-height: 220px;
    border: 1px solid #DDDDDD;
    white-space: pre-line;
    padding: 8px;
  }

  .urls {
    margin-top: 8px;
    margin-bottom: 8px;
    float: left;
    width: 100%;
  }

  .edit-skatepark-details {
    height: calc(100vh - 128px);
    overflow-x: scroll;
  }

  .edit-skatepark-details .field{
    float: left;
    width: 100%;
  }

  .edit-skatepark-details .field i{
    width: 28px;
    font-size: 24px;
    line-height: 28px;
    float: left;
  }

  .edit-skatepark-details .field input {
    float: left;
    width: calc(100% - 30px);
    border: none;
    background: none;
    outline: none;
    line-height: 28px;
  }

  .edit-skatepark-details .field input:active {
    background: rgba(107, 175, 126, 0.12);
  }

  .edit-skatepark-details .field input:focus {
    background: rgba(107, 175, 126, 0.12);
  }

  .tag-selected {
    background: rgba(107, 175, 126, 0.4);
  }


</style>
