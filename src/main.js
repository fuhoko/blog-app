import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "@/assets/styles/scss/main.scss";

import "bootstrap/dist/js/bootstrap.js";
import httpRequest from "@/utils/httpRequest";
import "@/utils/fontawesome"

Vue.config.productionTip = false;
Vue.prototype.axios = httpRequest;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
