<template>
    <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectChange">
            <!-- <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div> -->
            <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
            <el-table-column label="商品名称" prop="food_name">
                <template slot-scope="scope">{{ scope.row.food_name }}</template>
            </el-table-column>
            <el-table-column prop="spec" label="规格">
                <template slot-scope="scope">{{ scope.row.spec }}</template>
            </el-table-column>
            <el-table-column prop="refund_price" label="实付金额">
                <template slot-scope="scope">￥{{ scope.row.refund_price }}</template>
            </el-table-column>
            <el-table-column prop="sale_count" label="可退数量">
                <template slot-scope="scope">{{ scope.row.sale_count }}</template>
            </el-table-column>
            <el-table-column prop="refund_price" label="申请退款金额">
                <template slot-scope="scope">￥{{ scope.row.refund_price }}</template>
            </el-table-column>
            <el-table-column prop="count" label="退货数量">
                <template slot-scope="scope">
                    <el-input-number
                        :min="0"
                        :max="parseInt(scope.row.sale_count)"
                        controls-position="right"
                        :precision="0"
                        v-model="scope.row.count"
                        width="80"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="refund_price" label="退款金额">
                <template slot-scope="scope">
                    <!-- ￥{{Math.round(scope.row.refund_price * scope.row.count)*100/100      }} -->
                    ￥{{
                        scope.row.count === scope.row.sale_count
                            ? scope.row.surplus_refund_amount
                            : Math.round(scope.row.refund_price * scope.row.count * 100) / 100
                    }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        selectable() {
            return function(row) {
                if (row.count) return true
                return false
            }
        },
    },

    methods: {
        handleSelectChange(val) {
            console.log('handleSelectChange', val)
        },
        // toggleSelection(rows) {
        //     if (rows) {
        //         rows.forEach(row => {
        //             this.$refs.multipleTable.toggleRowSelection(row)
        //         })
        //     } else {
        //         this.$refs.multipleTable.clearSelection()
        //     }
        // },
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // },
    },
}
</script>
