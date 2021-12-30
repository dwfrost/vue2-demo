import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    console.log(to, from)
    next()
    // if (to.meta.requiresAuth && !store.state.isLogin) {
    //     const { redirect_url } = from.query
    //     // console.log('redirect_url', redirect_url)
    //     const query = to.query
    //     next({
    //       path: '/login',
    //       query: {
    //         ...query,
    //         redirect_url: redirect_url || to.fullPath
    //       }
    //     })
    //     return
    //   }
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
