import Vue from "vue"
import App from "./App.vue"
import ThreadView from "./Threads/View"

import VueResource from "vue-resource"
import VueRouter from "vue-router"

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", component: App },
        { path: "/thread/:id", component: ThreadView }
    ]
});

const app = new Vue({
    router
}).$mount("#app");

