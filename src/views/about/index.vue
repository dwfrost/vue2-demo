<template>
    <div class="index-wrap">
        <div>about page</div>
        <el-button type="primary" @click="$router.go(-1)">back</el-button>
        <!-- <el-button type="primary" @click="logRoute">logRoute</el-button> -->
    </div>
</template>
<script>
import { logRoute } from '@/common/route'
export default {
    name: 'index',
    components: {},
    data() {
        return {}
    },
    created() {
        const { query } = this.$route
        console.log('query', query)

        console.log('router', this.$router)
        console.log('route', this.$route)
    },
    methods: {
        logRoute() {
            logRoute()
        }
    }
}
</script>
<style lang="scss" scoped>
.index-wrap {
    text-align: center;
}
</style>
