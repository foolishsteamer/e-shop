import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./assets/site/css/style.css"
import index from "./components/index.vue"
import detail from './components/detail.vue'
import shopCart from './components/shopCart.vue'
import order from './components/order.vue'
import login from './components/login.vue'

import VueRouter from 'vue-router'
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ProductZoomer from 'vue-product-zoomer'
import Vuex from 'vuex'


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(ProductZoomer);
Vue.use(Vuex);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://111.230.232.110:8899/";
axios.defaults.withCredentials = true; //让ajax携带cookie

const routes = [
  { path: '/', redirect: 'index' },
  { path: '/index', component: index },
  { path: '/detail/:artID', component: detail },
  { path: '/shopCart', component: shopCart },
  { path: '/order/:ids', component: order },
  { path: '/login', component: login }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/order') != -1) {
    // 正要去订单页
    // 必须先判断登录
    axios.get("site/account/islogin").then(result => {
      console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      } else {
        next();
      }
    });
  } else {
    // next 如果不执行 就不会路由跳转
    next();
  }
})

import moment from 'moment';
Vue.filter("shortTime", value => {
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  return moment(value).format("YYYY-MM-DD");
});
Vue.filter("longTime", value => {
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
})

const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(localStorage.getItem("shopCart")) || {
      88: 5
    },
    isLogin: false
  },
  getters: {
    totalCount(state) {
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num += state.cartData[key]
      }
      return num;
    }
  },
  mutations: {
    add2Cart(state, obj) {
      if (state.cartData[obj.goodId]) {
        state.cartData[obj.goodId] += obj.goodNum;
      } else {
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    },
    updateCartData(state, obj) {
      state.cartData = obj;
    },
    changeLogin(state) {
      state.isLogin = !state.isLogin;
    }
  }
})
window.onbeforeunload = function () {
  window.localStorage.setItem("shopCart", JSON.stringify(store.state.cartData));
}

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    axios.get("site/account/islogin").then(result => {
      if (result.data.code == "nologin") {

      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
      }
    });
  },
}).$mount('#app')
