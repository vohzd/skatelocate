<template>
	<div v-bind:class="currentCursor">
		<!--<router-view />-->
		<!-- main persistent map -->
		<leaflet-map />
		<!-- actually the details panel -->
		<router-view class="details-panel"/>
		<!-- persistent right-hand nav -->
		<navigation-panel />
	</div>
</template>

<script>
import { mapGetters }					from "vuex";
import NavigationPanel				from "./NavigationPanel.vue";
import LeafletMap 						from "./Map/Map.vue";

export default {
	components: {
		"navigation-panel": NavigationPanel,
		"leaflet-map": LeafletMap
	},
	computed: {
		...mapGetters([
			"currentCursor"
		])
	}
}
</script>

<style lang="css">


	body {
		margin: 0;
		padding: 0;
		width: 100%;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: 'Titillium Web', sans-serif;
		color: #8c829b;
		background: #ffffff;
		font-size: 18px;
	}

	.leaflet-grab {
		cursor: inherit;
	}

	.marker-cursor {
		cursor: url("../assets/marker.png") 0 50, auto !important;
	}
	
	h1, h2, h3, h4, h5, h6, p, ul, li {
		margin: 0;
		padding: 0;
		font-weight: normal;
		margin-bottom: 16px;
	}

	a {
		color: #9d7660;
		text-decoration: none;
	}

	a:hover{
		color: #82718e;
	}

	.details-panel {
		background: white;
		position: absolute;
		height: 100vh;
		z-index: 6000;
		top: 0;
		right: 0;
		width: 44%;
		padding: 12px;
		padding-right: 56px;
	}

	.details-panel h4 {
		font-size: 30px;
	}
</style>
