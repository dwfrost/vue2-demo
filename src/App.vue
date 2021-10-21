<template>
    <div id="app">
        vue-demo
        <!-- <div class="list">
            <div class="item" v-for="(item, index) of list" :key="index">{{ item.name }}: {{ item.age }}岁</div>
        </div> -->
        <Form v-if="false" />
        <Select v-if="false" />
        <Cascader v-if="false" />
        <Table v-if="false" />
        <Table2 v-if="true" />
    </div>
</template>

<script>
import axios from 'axios'
import Form from '@/components/Form.vue'
import Select from '@/components/Select.vue'
import Cascader from '@/components/Cascader.vue'
import Table from '@/components/Table.vue'
import Table2 from '@/components/Table2.vue'
export default {
    name: 'App',
    components: { Form, Select, Cascader, Table, Table2 },
    data() {
        return {
            list: [],
        }
    },
    created() {
        console.log('created')
        // this.init()
    },
    methods: {
        init() {
            axios
                .get('https://www.tencent.com/user?id=12345')
                .then(response => {
                    console.log('response', response.data)
                    this.list = response.data.list
                })
                .catch(error => {
                    console.log(error)
                })
        },
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
