<template>
    <div id="app">
        vue-demo
        <div class="list">
            <div class="item" v-for="(item, index) of list" :key="index">{{ item.name }}: {{ item.age }}岁</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    components: {},
    data() {
        return {
            list: [],
        };
    },
    created() {
        console.log('created');
        this.init();
    },
    methods: {
        init() {
            axios
                .get('https://www.tencent.com/user?id=12345')
                .then(response => {
                    console.log('response', response.data);
                    this.list = response.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
#app {
    text-align: center;
}
.list {
    padding-top: 20px;
}
</style>
