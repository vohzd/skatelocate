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

	.leaflet-tooltip {
		position: absolute;
		padding: 4px;
		background-color: rgba(255,255,255,1);
		border: 1px solid #DDDDDD;
		border-radius: 5px;
		color: #000000;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none;
		box-shadow: 0 1px 3px rgba(157, 154, 183, 0.4);
		text-transform: uppercase;
		font-family: kalam;
		font-size: 10px;
		line-height: 19px;
		margin-top: 7px;
	}

	.leaflet-tooltip-right::before {
    left: 0;
    margin-left: -12px;
    border-right-color: #DDDDDD;
	}

	.leaflet-tooltip-left::before {
		border-left-color: #DDDDDD;
	}

	.marker-cursor {
		cursor: url("../assets/img/marker.png") 0 50, auto !important;
	}

	.marker-cluster div {
		font-family: "kalam";
	}

	.marker-cluster-small {
		background: #ABE6CB;
	}

	.marker-cluster-small div {
		background: #76CCA5;
	}

	.marker-cluster-medium {
		background: #FFB89D;
	}

	.marker-cluster-medium div {
		background: #FF956E;
	}

	.marker-cluster-large {
		background: #CD5366;
	}

	.marker-cluster-large div {
		background: #B32E43;
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
		margin-bottom: 0px;
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
		float: left;
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


	  .side-by-side {
	    width: 100%;
	    position: absolute;
	    bottom: 0;
	    border-top: 1px solid #DDDDDD;
	  }

	  .side-by-side .col {
	    float: left;
	    width: 50%;
	  }

	  .side-by-side .col input{
	    width: 100%;
	    height: 64px;
	    border: none;
	    background: rgba(107, 175, 126, 0.3);

	  }

	  .side-by-side .col input:hover{
	    cursor: pointer;
	    opacity: 0.8;
	    background: rgba(107, 175, 126, 0.25);
	  }

	  .side-by-side .col input:disabled{
	    cursor: not-allowed;
	    background: rgba(236, 210, 209, 0.4);
	  }

	  .side-by-side .col input:disabled:hover{
	    cursor: not-allowed;
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
