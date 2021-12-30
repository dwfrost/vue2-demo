<template>
    <div id="app">
        vue-demo
  <el-tabs v-model="activeName">
    <el-tab-pane label="Form" name="1">
        <Form  />
        
    </el-tab-pane>
    <el-tab-pane label="Select" name="2">
        <Select  />
        
    </el-tab-pane>
    <el-tab-pane label="Cascader" name="3">
        <Cascader  />
        
    </el-tab-pane>
   
    <el-tab-pane label="Table2" name="5">
        <Table2  />
    </el-tab-pane>
    <el-tab-pane label="TableChild" name="6">
                <TableChild  />
    </el-tab-pane>
    <el-tab-pane label="TableChild2" name="7">
                <TableChild2  />
    </el-tab-pane>
    <el-tab-pane label="AddDel" name="8">
                <AddDel />
        
    </el-tab-pane>
  </el-tabs>
       
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import Form from '@/components/Form.vue'
import Select from '@/components/Select.vue'
import Cascader from '@/components/Cascader.vue'
import TableChild2 from '@/components/TableChild2.vue'
import TableChild from '@/components/TableChild.vue'
import Table2 from '@/components/Table2.vue'
import AddDel from '@/components/AddDel.vue'

import Obj from '@/utils/module'

export default {
    name: 'App',
    components: { Form, Select, Cascader, TableChild2, Table2, TableChild, AddDel },
    data() {
        return {
            activeName:'1'
        }
    },
    created() {
        console.log('created')
        const obj = new Obj()
        obj.a = 10
        console.log(obj)
        this.init()
    },
    methods: {
        init() {
            this.generateUid()
        },
        generateUid() {
            console.log(uuidv4())
        }
    }
}
</script>
<style>
@import './assets/css/base.css';
#app {
    text-align: center;
}
.list {
    padding-top: 20px;
}
</style>
