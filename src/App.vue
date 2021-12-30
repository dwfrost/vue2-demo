<template>
    <div class="App-wrap">
        <transition :name="transitionName" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
            transitionName: 'slide-right'
        }
    },
    watch: {
        $route(to, from) {
            console.log(to, from)
            // @todo
            // 维护本地路由栈
            // const toDepth = to.path.split('/').length
            // const fromDepth = from.path.split('/').length
            // this.transitionName = toDepth < fromDepth ? 'slide-right' : toDepth > fromDepth ? 'slide-left' : ''
        }
    },

    methods: {}
}
</script>
<style lang="scss" scoped>
.App-wrap {
    .slide-left-enter {
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: transform 0.4s ease;
    }

    .slide-right-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition: transform 0.4s ease;
    }
}
</style>
