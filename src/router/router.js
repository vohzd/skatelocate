import Vue 					          	from "vue";
import VueRouter 			        	from "vue-router";

Vue.use(VueRouter);

import About 				          	from "../components/About/About.vue";
import Add 				          		from "../components/Add/Add.vue";
import Map 				        			from "../components/Map/Map.vue";
import Recent 				        	from "../components/Recent/Recent.vue";
import Search 				          from "../components/Search/Search.vue";
import Skatepark 				        from "../components/Skatepark/Skatepark.vue";
import Top 				        			from "../components/Top/Top.vue";

import store 	from "../vuex/store.js";

// define routes
const routes = [
	{ path: "/", component: About},
	{ path: "/add", component: Add},
	{ path: "/recent", component: Recent},
	{ path: "/search", component: Search},
	{ path: "/skatepark/:id", name: "skatepark", component: Skatepark},
	{ path: "/top", component: Top}
];

const router = new VueRouter({
	base: __dirname + "/",
	routes
});

router.beforeEach((to, from, next) => {
	if (!store.getters.isDetailsShown){
		store.commit("TOGGLE_DETAILS_PANEL_VISIBILITY")
	}

	next()
});

// initialise & export Instance
export default router;
