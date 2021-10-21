<template>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            ]"
        >
            <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <!-- <el-form-item
            v-for="(domain, index) in dynamicValidateForm1.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
                required: true,
                message: '域名不能为空',
                trigger: 'blur',
            }"
        >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item> -->
        <el-form-item
            label="域名"
            prop="domains.value"
            :rules="{
                required: true,
                message: '域名不能为空',
                trigger: 'blur',
            }"
        >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
            <!-- <el-input v-model="email"></el-input> -->
            <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value + '1'"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            dynamicValidateForm: {
                domains: [
                    {
                        value: '',
                    },
                ],
                email: '',
            },
            domain: {
                value: '',
            },
            email: 'haha',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕',
                },
                {
                    value: '选项2',
                    label: '双皮奶',
                },
                {
                    value: '选项3',
                    label: '蚵仔煎',
                },
                {
                    value: '选项4',
                    label: '龙须面',
                },
                {
                    value: '选项5',
                    label: '北京烤鸭',
                },
            ],
            value1: '选项51',
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now(),
            })
        },
    },
}
</script>

<style></style>
