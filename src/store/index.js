import Vue from "vue";
import Vuex from "vuex";

import blog from "./blog";
import loading from "./loading";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blog,
    loading,
  },
});
