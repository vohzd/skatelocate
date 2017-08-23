import getters 				  						from "./getters.js";
import state 				    					  from "./state.js";

export default {
  setSkateparks({commit}, payload){
    commit("SET_SKATEPARKS", payload);
  },
  setSkateparkInFocus({commit}, position){
    commit("SET_SKATEPARK_IN_FOCUS", position);
  }
};
