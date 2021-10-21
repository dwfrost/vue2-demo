<template>
    <div>
        <el-checkbox class="check-page-all" v-model="checkPageAll" @change="checkPageAllEv($event)"></el-checkbox>
        <el-table
            ref="tableRef"
            :data="tableData"
            row-key="_id"
            default-expand-all
            select-on-indeterminate
            style="width: 100%"
            :tree-props="{ children: 'child_products', hasChildren: 'hasChildren' }"
            @selection-change="handleSelectChange"
        >
            <!-- <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column> -->
            <el-table-column type="selection" width="55">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked" @change="pageCheckEv(scope.row)"></el-checkbox>
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
    name: 'TableChild',
    data() {
        return {
            tableData: [
                {
                    _id: 1,
                    app_food_code: 'string',
                    count: 2,
                    child_products: [
                        {
                            _id: 11,
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
                            _id: 12,
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
                    _id: 2,
                    app_food_code: 'string',
                    count: 2,
                    child_products: [
                        {
                            _id: 21,
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
                            _id: 22,
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
            checkPageAll: false,
        }
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
            console.log('tableChild-handleSelectChange', val)
        },
        // 查找父级函数
        getParent(data2, nodeId2) {
            var arrRes = []
            if (data2.length === 0) {
                if (nodeId2) {
                    arrRes.push(data2)
                }
                return arrRes
            }
            let rev = (data, nodeId) => {
                for (var i = 0, length = data.length; i < length; i++) {
                    let node = data[i]
                    if (node.id === nodeId) {
                        arrRes.push(node)
                        rev(data2, node.p_id)
                        break
                    } else {
                        if (node.childList) {
                            rev(node.childList, nodeId)
                        }
                    }
                }
                return arrRes
            }
            arrRes = rev(data2, nodeId2)
            return arrRes
        },
        // 遍历json数据
        isCheckAllEv(data) {
            let isCheckAll = true
            let fn = data => {
                for (let x of data) {
                    if (x.pageCheck === false) {
                        isCheckAll = false
                        return isCheckAll
                    }
                    if (x.childList) {
                        fn(x.childList)
                    }
                }
            }
            fn(data)
            console.log(isCheckAll)
            return isCheckAll
        },
        // 子选框事件
        pageCheckEv(row) {
            console.log('pageCheckEv', row)
        },
        handleCheckAll(row, checked) {
            row.pageCheck = checked
            if (row.childList) {
                let that = this
                row.childList.forEach((element, i) => {
                    that.handleCheckAll(row.childList[i], checked)
                })
            }
        },
    },
}
</script>

<style></style>
