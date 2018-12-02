// import Vue from 'vue'

// Vue.config.productionTip = false

import "./assets/site/css/style.css"

import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer);

import router from './lib/router'
import store from './lib/store'
import './lib/filter'
import './lib/plugins'

import App from './App.vue'

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    this.$axios.get("site/account/islogin").then(result => {
      if (result.data.code == "nologin") {

      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
      }
    });
  },
}).$mount('#app')
