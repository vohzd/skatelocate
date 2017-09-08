import firebase 			  						from "firebase";
import instance 			  						from "../config/firebaseConfig.js";

import getters 				  						from "./getters.js";
import state 				    					  from "./state.js";

import { firebaseAction } 					from "vuexfire";

const database 				  						= instance.database();

export default {
  bindFirebase: firebaseAction(({ bindFirebaseRef }, payload) => {
    bindFirebaseRef(payload.name , payload.ref);
  }),
  changeCursorTo({commit}, which){
    commit("CHANGE_CURSOR_TO", which);
  },
  createNotification({commit}, notificationText){
    commit("SET_NOTIFICATION_TEXT", notificationText);
    commit("SET_IS_NOTIFICATION_SHOWN", true);
    setTimeout(() => {
      commit("SET_IS_NOTIFICATION_SHOWN", false);
      setTimeout(() => {
        commit("SET_NOTIFICATION_TEXT", "");
      }, 2000)
    }, 2000);
  },
  setCurrentStep({commit}, step){
    commit("SET_CURRENT_STEP", step);
  },
  setIsMapDoubleClickAllowed({commit}, bool){
    commit("SET_IS_MAP_DOUBLE_CLICK_ALLOWED", bool);
  },
  setPendingNewParkLatLng({commit}, latlng){
    commit("SET_PENDING_NEW_PARK_LAT_LNG", latlng);
  },
  setMapInstance({commit}, instance){
    commit("SET_MAP_INSTANCE", instance);
  },
  setSkateparkInFocus({commit}, skatepark){
    commit("SET_SKATEPARK_IN_FOCUS", skatepark);
  },
  toggleDetailsPanelVisibility({commit}){
    commit("TOGGLE_DETAILS_PANEL_VISIBILITY");
  }
};
