import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ins as axios} from "@/utils/axios";
import VueAxios from "vue-axios";
import vuetify from './plugins/vuetify';
import VeeValidate from "vee-validate";

Vue.config.productionTip = false
Vue.use(VueAxios, axios, VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')