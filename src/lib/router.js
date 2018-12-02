import index from "../components/index.vue"
import detail from '../components/detail.vue'
import shopCart from '../components/shopCart.vue'
import order from '../components/order.vue'
import login from '../components/login.vue'
import payMoney from '../components/payMoney.vue'
import paySuccess from '../components/paySuccess.vue'
import vipCenter from '../components/vipCenter.vue'
import vipCenterIndex from '../components/vipCenterIndex.vue'
import vipCenterList from '../components/vipCenterList.vue'
import vipCenterDetail from '../components/vipCenterDetail.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// const index = () => import("../components/index.vue")
// const detail = () => import('../components/detail.vue')
// const shopCart = () => import('../components/shopCart.vue')
// const order = () => import('../components/order.vue')
// const login = () => import('../components/login.vue')
// const payMoney = () => import('../components/payMoney.vue')
// const paySuccess = () => import('../components/paySuccess.vue')
// const vipCenter = () => import('../components/vipCenter.vue')
// const vipCenterIndex = () => import('../components/vipCenterIndex.vue')
// const vipCenterList = () => import('../components/vipCenterList.vue')
// const vipCenterDetail = () => import('../components/vipCenterDetail.vue')

const routes = [
    { path: '/', redirect: 'index' },
    { path: '/index', component: index },
    {
        path: '/detail/:artID',
        component: detail
    },
    {
        path: '/shopCart',
        component: shopCart
    },
    {
        path: '/order/:ids',
        component: order,
        meta: {
            checkLogin: true
        }
    },
    { path: '/login', component: login },
    {
        path: '/payMoney/:orderId',
        component: payMoney,
        meta: {
            checkLogin: true
        }
    },
    {
        path: '/paySuccess',
        component: paySuccess,
        meta: {
            checkLogin: true
        }
    },
    {
        path: '/vipCenter',
        component: vipCenter,
        meta: {
            checkLogin: true
        },
        children: [
            {
                path: '',
                redirect: 'index',
                meta: {
                    checkLogin: true
                }
            },
            {
                path: 'index',
                component: vipCenterIndex,
                meta: {
                    checkLogin: true,
                    currentName: '中心首页'
                }
            },
            {
                path: 'vipCenterList',
                component: vipCenterList,
                meta: {
                    checkLogin: true,
                    currentName: '订单列表'
                }
            },
            {
                path: 'vipCenterDetail/:orderId',
                component: vipCenterDetail,
                meta: {
                    checkLogin: true,
                    currentName: '订单详情'
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    },
    routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.checkLogin == true) {
        // 正要去订单页
        // 必须先判断登录
        Vue.prototype.$axios.get("site/account/islogin").then(result => {
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
export default router