<template>
    <div class="index-wrap">
        <div>transition页</div>
        <div>页面路径/trans/index</div>
        <div>
            <el-button type="primary" @click="$router.go(-1)">back</el-button>
            <!-- <el-button type="primary" @click="jump">to about</el-button> -->
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
