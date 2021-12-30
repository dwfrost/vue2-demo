<template>
    <div class="index-wrap">
        <div>transition 中间页</div>
        <div>
            <el-button type="primary" @click="$router.go(-1)">back home</el-button>
            <el-button type="primary" @click="jump">to about</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    components: {},
    data() {
        return {}
    },
    methods: {
        jump() {
            this.$router.push({ path: '/about' })
        }
    }
}
</script>
<style lang="scss" scoped>
.index-wrap {
    text-align: center;
}
</style>
