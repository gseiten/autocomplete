import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.use(Buefy);

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')