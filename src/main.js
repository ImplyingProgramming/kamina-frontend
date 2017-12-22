import Vue from "vue"
import VueResource from "vue-resource"
import VueRouter from "vue-router"

// Components
import App from "./App"
// Views
import ThreadSingleView from "./Views/SingleThread"
import Heading from "./Views/Heading"

import Store from "./store"

Vue.use(VueResource);
Vue.use(VueRouter);

const Router = new VueRouter({
    routes: [
        {
            path: "/",
            components: {
                default: App,
                heading: Heading
            }
        },
        {
            path: "/thread/:id",
            components: {
                default: ThreadSingleView,
                heading: Heading,
            }
        }
    ]
});

const app = new Vue({
    store: Store,
    router: Router
}).$mount("#app");

