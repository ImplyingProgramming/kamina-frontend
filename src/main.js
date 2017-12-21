import Vue from "vue"
import App from "./App.vue"
import ThreadSingleView from "./Threads/ThreadSingleView"
import Store from "./store"

import VueResource from "vue-resource"
import VueRouter from "vue-router"

Vue.use(VueResource);
Vue.use(VueRouter);

const Router = new VueRouter({
    routes: [
        { path: "/", component: App },
        { path: "/thread/:id", component: ThreadSingleView }
    ]
});

const app = new Vue({
    store: Store,
    router: Router
}).$mount("#app");

