import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./assets/site/css/style.css"
import index from "./components/index.vue"
import detail from './components/detail.vue'
import shopCart from './components/shopCart.vue'

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

const routes = [
  { path: '/', redirect: 'index' },
  { path: '/index', component: index },
  { path: '/detail/:artID', component:detail },
  { path: '/shopCart', component:shopCart }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

import moment from 'moment';
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  return moment(value).format("YYYY-MM-DD");
});
Vue.filter("longTime",value=>{
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
})

const store = new Vuex.Store({
  state: {
    cartData:JSON.parse(localStorage.getItem("shopCart"))||{
      88:5
    }
  },
  getters:{ totalCount
   (state){
      let num = 0;
      console.log('hello world');
      for (const key in state.cartData) {
        // 循环累加
        num+=state.cartData[key]
      }
      return num;
    }
  },
  mutations: {
    add2Cart(state,obj){
      if(state.cartData[obj.goodId]){
        state.cartData[obj.goodId] += obj.goodNum;
      }else{
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    }
  }
})
window.onbeforeunload = function(){
  window.localStorage.setItem("shopCart",JSON.stringify(store.state.cartData));
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
