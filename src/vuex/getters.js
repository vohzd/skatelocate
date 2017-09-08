import state from "./state.js";

export default {
	availableSkateparkTags: (state) => state.availableSkateparkTags,
	currentAddSkateparkStep: (state) => state.currentAddSkateparkStep,
	currentCursor: (state) => state.currentCursor,
	isDetailsShown: (state) => state.isDetailsShown,
	isMapDoubleClickAllowed: (state) => state.isMapDoubleClickAllowed,
	isNotificationPopUpShown: (state) => state.isNotificationPopUpShown,
	pendingNewParkLatLng: (state) => state.pendingNewParkLatLng,
	notificationText: (state) => state.notificationText,
	numberClientsConnected: (state) => state.numberClientsConnected,
	mapInstance: (state) => state.mapInstance,
	skateparks: (state) => state.skateparks,
	skateparkInFocus: (state) => state.skateparkInFocus
}
