import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import hooks from '@u3u/vue-hooks';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/scss/bootstrap.scss';

Vue.use(hooks);
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
