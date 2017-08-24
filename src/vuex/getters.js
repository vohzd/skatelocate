import state from "./state.js";

export default {
	currentAddSkateparkStep: (state) => state.currentAddSkateparkStep,
	currentCursor: (state) => state.currentCursor,
	isDetailsShown: (state) => state.isDetailsShown,
	isMapDoubleClickAllowed: (state) => state.isMapDoubleClickAllowed,
	pendingNewParkLatLng: (state) => state.pendingNewParkLatLng,
	numberClientsConnected: (state) => state.numberClientsConnected,
	mapInstance: (state) => state.mapInstance,
	skateparks: (state) => state.skateparks,
	skateparkInFocus: (state) => state.skateparkInFocus
}
