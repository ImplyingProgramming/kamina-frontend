import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        threadViewId: ""
    },
    mutations: {
        changeThreadViewId(state, newId) {
            state.threadViewId = newId;
        }
    }
});