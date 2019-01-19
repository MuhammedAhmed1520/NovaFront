import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import VueParticles from 'vue-particles'
import UploadButton from 'vuetify-upload-button';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueParticles)
Vue.use(UploadButton)
Vue.use(VueSweetalert2, options)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
