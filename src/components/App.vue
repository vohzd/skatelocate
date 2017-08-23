<template>
	<div>
		<router-view />
		<details-panel v-if="isDetailsShown"/>
	</div>
</template>

<script>
	import { mapGetters }					from "vuex";
	import DetailsPanel						from "./DetailsPanel.vue";

	export default {
		components: {
			"details-panel": DetailsPanel
		},
		computed: {
			...mapGetters([
				"isDetailsShown"
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

</style>
