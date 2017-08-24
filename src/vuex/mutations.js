import state from "./state.js";

export default {
  CHANGE_CURSOR_TO(state, cursor){
    state.currentCursor = cursor;
  },
  SET_CURRENT_STEP(state, step){
    state.currentAddSkateparkStep = step;
  },
  SET_PENDING_NEW_PARK_LAT_LNG(state, latlng){
    state.pendingNewParkLatLng = latlng;
  },
  SET_IS_MAP_DOUBLE_CLICK_ALLOWED(state, bool){
    state.isMapDoubleClickAllowed = bool;
  },
  SET_MAP_INSTANCE(state, instance){
    state.mapInstance = instance;
  },
  SET_SKATEPARKS(state, skateparks){
    state.skateparks = skateparks;
  },
  SET_SKATEPARK_IN_FOCUS(state, position){
    state.skateparkInFocus = position;
  }
};
