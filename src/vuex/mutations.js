import state from "./state.js";

export default {
  SET_SKATEPARKS(state, skateparks){
    state.skateparks = skateparks;
  },
  SET_SKATEPARK_IN_FOCUS(state, position){
    state.skateparkInFocus = position;
  }
};
