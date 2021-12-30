<template>
    <div class="StakingRules-wrap">
        <div v-for="(item, index) of list" :key="item.key || item.id">
            <div class="item">
                <span>日收益率</span>
                <el-input v-model="item.dailyRate"></el-input>
            </div>
            <div class="item">
                <span>份额</span>
                <el-input v-model="item.lowerLimit"></el-input>
                <span>-</span>
                <el-input v-model="item.upperLimit"></el-input>
            </div>
            <div class="item" @click="del(item, index)">删除</div>
            <div v-if="index === list.length - 1" class="item" @click="add">新增收益率</div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'

import Obj from '@/utils/module'

const defaultItem = {
    id: '0',
    stakingId: '0',
    lowerLimit: '',
    upperLimit: '',
    dailyRate: ''
}

export default {
    name: 'StakingRules',
    components: {},
    data() {
        return {
            list: [],
            obj:{
                a:'hello'
            }
        }
    },
    created() {
        this.init()
        console.log(new Obj())
    },
    methods: {
        init() {
            setTimeout(() => {
                this.list = [
                    {
                        id: '1',
                        stakingId: '11',
                        lowerLimit: '1',
                        upperLimit: '12',
                        dailyRate: '0.1'
                    },
                    {
                        id: '2',
                        stakingId: '22',
                        lowerLimit: '13',
                        upperLimit: '45',
                        dailyRate: '2'
                    }
                ]
            }, 1000)
        },
        del(item, index) {
            if (index === 0) return
            if (item.key) {
                this.list.splice(index, 1)
            } else {
                console.log('调接口删除')
            }
        },
        add() {
            const item = cloneDeep(defaultItem)
            item.key = Date.now()
            this.list.push(item)
        },
       
    }
}
</script>
<style lang="scss" scoped>
.StakingRules-wrap {
    .item {
        display: inline-block;
        margin-left: 10px;
    }
    /deep/ .el-input {
        width: 100px;
    }
}
</style>
