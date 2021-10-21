<template>
    <div class="wrap">
        <el-checkbox class="check-all" v-model="allChecked" @change="onAllChange($event)"></el-checkbox>
        <el-table
            ref="tableRef"
            :data="tableData"
            row-key="_id"
            default-expand-all
            :select-on-indeterminate="false"
            style="width: 100%"
            :tree-props="{ children: 'child_products', hasChildren: 'hasChildren' }"
        >
            <el-table-column type="selection" width="55">
                <template slot-scope="scope">
                    <el-checkbox
                        :disabled="disabledRow(scope.row)"
                        v-model="scope.row.checked"
                        @change="selectCheckbox(scope.row)"
                    ></el-checkbox>
                </template>
            </el-table-column>
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
                        :disabled="disabledRow(scope.row)"
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
import { listAddId, checkAll, checkParent } from '@/utils/table'
export default {
    name: 'TableChild',
    props: {
        channelType: {
            type: String,
            default: 'awen',
        },
    },
    data() {
        return {
            tableData: listAddId(
                [
                    {
                        app_food_code: 'string',
                        count: 2,
                        child_products: [
                            {
                                app_food_code: 'string',
                                count: 4,
                                food_name: '保健品1',
                                food_price: 0,
                                order_product_id: 0,
                                promotion_type: 0,
                                refund_price: 30.0,
                                sale_count: 4,
                                sku_id: 'string',
                                spec: '500ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 30.0,
                            },
                            {
                                app_food_code: 'string',
                                count: 4,
                                food_name: '保健品2',
                                food_price: 0,
                                order_product_id: 0,
                                promotion_type: 0,
                                refund_price: 20.0,
                                sale_count: 4,
                                sku_id: 'string',
                                spec: '200ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 20.0,
                            },
                        ],
                        food_name: '组合1',
                        food_price: 0,
                        order_product_id: 0,
                        promotion_type: 0,
                        refund_price: 100.0,
                        sale_count: 2,
                        sku_id: 'string',
                        spec: '保健组合',
                        sub_biz_order_id: 'string',
                        surplus_refund_amount: 100.0,
                    },
                    {
                        app_food_code: 'string',
                        count: 2,
                        child_products: [
                            {
                                app_food_code: 'string',
                                count: 2,
                                food_name: '保健品1',
                                food_price: 0,
                                order_product_id: 0,
                                promotion_type: 0,
                                refund_price: 100.0,
                                sale_count: 2,
                                sku_id: 'string',
                                spec: '500ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 100.0,
                            },
                            {
                                app_food_code: 'string',
                                count: 2,
                                food_name: '保健品1',
                                food_price: 0,
                                order_product_id: 0,
                                promotion_type: 0,
                                refund_price: 200.0,
                                sale_count: 2,
                                sku_id: 'string',
                                spec: '500ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 200.0,
                            },
                        ],
                        food_name: '组合2',
                        food_price: 0,
                        order_product_id: 0,
                        promotion_type: 0,
                        refund_price: 300.0,
                        sale_count: 2,
                        sku_id: 'string',
                        spec: '术后组合',
                        sub_biz_order_id: 'string',
                        surplus_refund_amount: 300.0,
                    },
                ],
                { child: 'child_products' }
            ),
            allChecked: false,
        }
    },

    computed: {
        selectable() {
            return function(row) {
                if (row.count) return true
                return false
            }
        },
        disabledRow() {
            return function(row) {
                // 第一级不置灰
                if (row._pid === null) return false
                // 阿闻子商品看随意选择退款
                // 第三方只能以组合形式退款
                return this.channelType !== 'awen'
            }
        },
    },
    methods: {
        // 子选框事件
        selectCheckbox(row) {
            // console.log('selectCheckbox', row)
            // 如果有子项，则子项的选框选择跟当前一致
            if (row.child_products) {
                checkAll(row.child_products, row.checked)
            }

            const shoudCheckAll = checkParent(this.tableData, row.checked, row._id, row._pid, {
                child: 'child_products',
                id: '_id',
                pid: '_pid',
            })
            console.log('shoudCheckAll', shoudCheckAll)
            if (shoudCheckAll) {
                this.allChecked = row.checked
            }
        },
        onAllChange(v) {
            this.checkAll(v)
        },
        checkAll(checked) {
            checkAll(this.tableData, checked, { child: 'child_products' })
        },
    },
}
</script>

<style scoped>
.wrap {
    position: relative;
}
.wrap >>> .check-all {
    position: absolute;
    top: 26px;
    left: 10px;
    z-index: 10;
}
</style>
