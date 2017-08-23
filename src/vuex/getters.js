import state from "./state.js";

export default {
	isDetailsShown: (state) => state.isDetailsShown,
	numberClientsConnected: (state) => state.numberClientsConnected,
	skateparks: (state) => state.skateparks,
	skateparkInFocus: (state) => state.skateparkInFocus
}
