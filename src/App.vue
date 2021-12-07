<template>
    <div id="app">
        vue-demo
        <!-- <div class="list">
            <div class="item" v-for="(item, index) of list" :key="index">{{ item.name }}: {{ item.age }}岁</div>
        </div> -->
        <Form v-if="false" />
        <Select v-if="false" />
        <Cascader v-if="false" />
        <Table2 v-if="false" />
        <!-- <Table v-if="true" /> -->
        <TableChild2 v-if="false" />
        <TableChild />
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import Form from '@/components/Form.vue'
import Select from '@/components/Select.vue'
import Cascader from '@/components/Cascader.vue'
import TableChild2 from '@/components/TableChild2.vue'
import TableChild from '@/components/TableChild.vue'
import Table2 from '@/components/Table2.vue'
export default {
    name: 'App',
    components: { Form, Select, Cascader, TableChild2, Table2, TableChild },
    data() {
        return {
            list: [],
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
        generateUid(){
            console.log(uuidv4())
        }
    },
}
</script>

<style>
#app {
    text-align: center;
}
.list {
    padding-top: 20px;
}
</style>
