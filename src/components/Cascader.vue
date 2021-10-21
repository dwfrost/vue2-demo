<template>
    <el-cascader :value="value" :options="options" :show-all-levels="false" @change="onChange"></el-cascader>
</template>

<script>
export default {
    data() {
        return {
            options: [
                {
                    value: '1',
                    label: '资源',
                    children: [
                        {
                            value: '1',
                            label: 'Axure Components',
                        },
                        {
                            value: '2',
                            label: 'Sketch Templates',
                        },
                        {
                            value: '3',
                            label: '组件交互文档',
                        },
                    ],
                },
                // {
                //     value: 'axure',
                //     label: 'Axure Components',
                // },
                // {
                //     value: 'sketch',
                //     label: 'Sketch Templates',
                // },
                // {
                //     value: 'jiaohu',
                //     label: '组件交互文档',
                // },
            ],
            value1: [1, 2],
        }
    },
    computed: {
        value() {
            return this.value1.map(item => item + '')
        },
    },
    methods: {
        onChange(v) {
            console.log(v)
        },
    },
}
</script>
