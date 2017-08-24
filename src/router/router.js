import Vue 					          	from "vue";
import VueRouter 			        	from "vue-router";

Vue.use(VueRouter);

import About 				          	from "../components/About/About.vue";
import Add 				          		from "../components/Add/Add.vue";
import Map 				        			from "../components/Map/Map.vue";
import Recent 				        	from "../components/Recent/Recent.vue";
import Search 				          from "../components/Search/Search.vue";
import Top 				        			from "../components/Top/Top.vue";

// define routes
const routes = [
	{ path: "/", redirect: "/about"},
	{ path: "/about", component: About},
	{ path: "/add", component: Add},
	{ path: "/recent", component: Recent},
	{ path: "/search", component: Search},
	{ path: "/top", component: Top}
];

// initialise & export Instance
export default new VueRouter({
	base: __dirname + "/",
	mode: 'history',
	routes
});;
