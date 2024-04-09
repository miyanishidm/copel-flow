import Vue from "vue";
import App from "./App.vue";

import VueNumberFormat from 'vue-number-format'
Vue.use(VueNumberFormat, {decimal: ',', thousand: '.'})

new Vue({
  render: (h) => h(App),
}).$mount("#app");
