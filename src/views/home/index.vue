<template>
    <div class="app">
        <div>home page</div>
        <div>页面路径/home</div>
        <div>
            <el-button @click="jump2About">to about</el-button>
            <el-button @click="jump2Trans">to trans</el-button>
        </div>
        <el-tabs class="tabs-wrap" v-model="activeName">
            <el-tab-pane label="Transition" name="6">
                <Transition />
            </el-tab-pane>
            <el-tab-pane label="Form" name="5">
                <Form />
            </el-tab-pane>
            <el-tab-pane label="Select" name="4">
                <Select />
            </el-tab-pane>
            <el-tab-pane label="Cascader" name="3">
                <Cascader />
            </el-tab-pane>
            <el-tab-pane label="Table2" name="2">
                <Table2 />
            </el-tab-pane>
            <el-tab-pane label="TableChild" name="1">
                <TableChild />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import Form from '@/components/Form.vue'
import Select from '@/components/Select.vue'
import Cascader from '@/components/Cascader.vue'
import TableChild from '@/components/TableChild.vue'
import Table2 from '@/components/Table2.vue'
import Transition from '@/components/Transition.vue'

export default {
    name: 'App',
    components: {
        Form,
        Select,
        Cascader,
        Table2,
        TableChild,
        Transition
    },
    data() {
        return {
            activeName: '6',
            num: 2
        }
    },
    created() {
        console.log('created')

        this.init()
    },
    methods: {
        init() {
            this.generateUid()
        },
        generateUid() {
            console.log(uuidv4())
        },
        jump2About() {
            this.$router.push({ path: `/about?num=${this.num}` })
            // this.$router.push({
            //     path: `/about`,
            //     query: {
            //         num: this.num
            //     }
            // })
        },
        jump2Trans() {
            this.$router.push({ path: '/trans/index' })
        }
    }
}
</script>
<style>
@import '~@/assets/css/base.css';
.app {
    text-align: center;
}
.tabs-wrap {
}
</style>
