<template>
	<div v-bind:class="currentCursor">
		<!--<router-view />-->
		<!-- main persistent map -->
		<leaflet-map />
		<!-- actually the details panel -->
		<router-view class="details-panel" v-bind:class="{ 'hide-panel' : !isDetailsShown }"/>
		<!-- persistent right-hand nav -->
		<navigation-panel />
		<!-- notifications that pop up every now and again -->
		<notification-popup v-bind:class="{ 'hide-popup' : !isNotificationPopUpShown }"/>
	</div>
</template>

<script>
import { mapGetters }					from "vuex";
import NavigationPanel				from "./NavigationPanel.vue";
import LeafletMap 						from "./Map/Map.vue";
import NotificationPopup			from "./Notification.vue";


export default {
	components: {
		"navigation-panel": NavigationPanel,
		"notification-popup": NotificationPopup,
		"leaflet-map": LeafletMap
	},
	computed: {
		...mapGetters([
			"currentCursor",
			"isDetailsShown",
			"isNotificationPopUpShown"
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
		font-family: 'Kalam', sans-serif;
		color: #45414a;
		background: #ffffff;
		font-size: 18px;
		overflow: hidden;
	}

	input, textarea {
		font-family: 'Kalam', sans-serif;
	}

	.leaflet-grab {
		cursor: inherit;
	}

	.marker-cursor {
		cursor: url("../assets/img/marker.png") 0 50, auto !important;
	}

	h1, h2, h3, h4, h5, h6, p, ul, li {
		margin: 0;
		padding: 0;
		font-weight: normal;
		margin-bottom: 16px;
	}

	a {
		color: #037fcb;
		text-decoration: none;
	}

	a:hover{
		color: #82718e;
	}

	p {
		font-size: 15px;
		font-weight: 100;
	}

	.block-header {
		height: 64px;
		font-size: 32px;
		background: #251f28;
    color: #cfcfcf;
	}



	.block-header h3 {
		line-height: 64px;
		font-size: 32px;
		text-align: center;
	}

	.details-panel {
		background: rgba(255,255,255,0.9);
		position: absolute;
		height: 100vh;
		z-index: 6000;
		top: 0;
		right: 0;
		width: 900px;
		margin-right: 48px;
		transition: 0.5s all;
		border-left: 1px solid #DDDDDD;
	}

	.details-panel:hover {
		cursor: auto;
	}
	.hide-panel {
		margin-right:-852px;
		transition: 0.5s all;
	}

	.section-content {
		padding: 16px;
	}

	.toggle-nav-element {
		position: absolute;
		top: 0;
		left: -72px;
		width: 72px;
		height: 64px;
		line-height: 64px;
		background: #251f28;
		color: #565158;
		text-align: center;
	}


	.hide-popup {
		margin-bottom: -150px;
	}

	.toggle-nav-element:hover {
		cursor: pointer;
		color: #746b78;
	}


	  .tags {
	    display: flex;
	    flex-wrap: wrap;
	  }

	  .tag {
	    font-size: 12px;
	    margin-right: 4px;
	    margin-bottom: 4px;
	    background: rgba(0,0,0,0.1);
	    padding: 8px;
	    border-radius: 16px;
	  }

	  .tag:hover {
	    cursor: pointer;
	    opacity: 0.8;
	  }


	@media(max-width: 1320px){
		.details-panel{
			width: 500px;
		}

		.hide-panel {
			margin-right:-452px;
		}
	}

	@media(max-width: 1020px){
		.details-panel{
			width: 400px;
		}
		.hide-panel {
			margin-right:-352px;
		}
	}

	@media(max-width: 720px){
		.details-panel{
			width: 250px;
		}

		.hide-panel {
			margin-right:-202px;
		}
	}


</style>
