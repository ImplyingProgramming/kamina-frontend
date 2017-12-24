import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        threadViewJson: ""
    },
    mutations: {
        changeThreadViewJson(state, newJson) {
            state.threadViewId = newJson;
        }
    }
});