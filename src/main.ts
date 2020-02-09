import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowUp);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faArrowDown);

Vue.component("fa", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
