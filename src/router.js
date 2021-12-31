import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
const about = () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
const trans = () => import(/* webpackChunkName: "trans" */ '@/views/trans/index.vue')

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL, // 对应到vue.config.js中的publicPath
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '首页',
                pageType: 'tab'
            },
            component: home
        },
        {
            path: '/about',
            name: 'about',
            meta: {
                title: '关于',
                pageType: 'tab'
            },
            component: about
        },
        {
            path: '/trans/index',
            name: 'trans',
            meta: {
                title: '中间页'
            },
            component: trans
        }
    ]
})
