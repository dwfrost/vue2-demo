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
            <el-table-column prop="refund_price" label="实付总金额">
                <template slot-scope="scope">￥{{ scope.row.surplus_refund_amount }}</template>
            </el-table-column>
            <el-table-column prop="sale_count" label="可退数量">
                <template slot-scope="scope">{{ scope.row.sale_count }}</template>
            </el-table-column>
            <el-table-column prop="refund_price" label="申请退款金额（单价）">
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
                        @input="onCountInput(scope.row)"
                        @change="onCountChange(scope.row)"
                        width="80"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="refund_price" label="退款金额">
                <template slot-scope="scope">
                    <!-- ￥{{Math.round(scope.row.refund_price * scope.row.count)*100/100      }} -->
                    {{ realRefundAmount(scope.row) }}
                </template>
            </el-table-column>
        </el-table>
        <button @click="confirm">submit</button>
    </div>
</template>

<script>
import { listAddId, checkAll, checkParent, findNode } from '@/utils/table'
export default {
    name: 'TableChild',
    props: {
        channelType: {
            type: String,
            default: 'awen',
            // default: 'mt',
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
                                refund_price: 15.0,
                                sale_count: 4,
                                sku_id: 'string',
                                spec: '500ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 60.0,
                            },
                            {
                                app_food_code: 'string',
                                count: 4,
                                food_name: '保健品2',
                                food_price: 0,
                                order_product_id: 0,
                                promotion_type: 0,
                                refund_price: 10.0,
                                sale_count: 4,
                                sku_id: 'string',
                                spec: '200ML',
                                sub_biz_order_id: 'string',
                                surplus_refund_amount: 40.0,
                            },
                        ],
                        food_name: '组合1',
                        food_price: 0,
                        order_product_id: 0,
                        promotion_type: 0,
                        refund_price: 50.0,
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
                                refund_price: 50.0,
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
                                refund_price: 100.0,
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
                        refund_price: 150.0,
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
        realRefundAmount() {
            return function(row) {
                // if (row._pid === null) return
                let amount = row.count === row.sale_count ? row.surplus_refund_amount : Math.round(row.refund_price * row.count * 100) / 100
                return `￥${amount}`
            }
        },
    },
    created() {
        this.initCount()
    },
    methods: {
        initCount() {
            const dfs = list => {
                if (list && list.length) {
                    for (let item of list) {
                        item.count = 0
                        dfs(item.child_products)
                    }
                }
            }
            dfs(this.tableData)
        },
        // 子选框事件
        selectCheckbox(row) {
            console.log('selectCheckbox', row)
            // 勾选与否影响退货数量
            if (row.checked) {
                row.count = row.count > 0 ? row.count : 1
            } else {
                // if (this.channelType === 'awen' && row._pid === null) {
                //     console.log('here')
                // } else {
                row.count = 0
                // }
            }

            // 阿闻渠道，商品数量有改动时组合取消勾选，所以存在组合不勾选但商品都勾选的情况
            if (this.channelType === 'awen') {
                if (row.checked && row.child_products) {
                    checkAll(row.child_products, row.checked)
                }
            } else {
                // 如果有子项，则子项的选框选择跟当前一致
                if (row.child_products) {
                    checkAll(row.child_products, row.checked)
                }

                // 检查父级是否也要同步勾选
                const shoudCheckAll = checkParent(this.tableData, row.checked, row._id, row._pid, {
                    child: 'child_products',
                    id: '_id',
                    pid: '_pid',
                })
                // console.log('shoudCheckAll', shoudCheckAll)
                if (shoudCheckAll) {
                    this.allChecked = row.checked
                }
            }
        },
        onAllChange(checked) {
            checkAll(this.tableData, checked, { child: 'child_products' })
        },
        onCountInput(row) {
            console.log('onCountInput', row)

            row.checked = row.count > 0
            this.selectCheckbox(row)

            // 组合带动明细
            if (row._pid === null) {
                for (let item of row.child_products) {
                    const ratio = item.sale_count / row.sale_count
                    item.count = ratio * row.count
                }
            }
        },
        onCountChange(row) {
            console.log('onCountChange', row)

            // 阿闻商品，数量修改后，取消勾选父级checkbox
            if (this.channelType === 'awen') {
                const parent = findNode(this.tableData, row._pid, { child: 'child_products', id: '_id' })
                console.log('parentparent', parent)
                parent && (parent.checked = false)
                console.log('parentparent1', parent)
            }
        },
        confirm() {
            console.log(this.tableData)
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
    top: 14px;
    left: 10px;
    z-index: 10;
}
</style>
