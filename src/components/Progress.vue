<template>
    <div class="Progress-wrap" :class="{ 'sold-out': isSoldOut }">
        <div class="progress-titles">
            <span>总份数</span>
            <span>剩余</span>
        </div>
        <div class="progress-bar">
            <div class="progress-bar-child" :style="{ width: widthPercent }"></div>
        </div>
        <div class="progress-data">
            <span>{{ startTime }}</span>
            <span v-if="isEnd" class="remains">已售罄</span>
            <span v-else>{{ endTime }}</span>
        </div>
    </div>
</template>
<script>
import { formatDate } from '@/utils/tools'
export default {
    name: 'Progress',
    components: {},
    props: {},
    data() {
        return {
            startTime: '2021-05-12',
            endTime: '2022-10-05',
            currentTime: formatDate(Date.now(), 'YYYY-MM-DD')
        }
    },
    computed: {
        widthPercent() {
            start = +new Date(start)
            end = +new Date(end)
            let current = +new Date()

            console.log(start, end, current)
            let ratio = (current - start) / (end - start)
            console.log('ratio', ratio)
            return ratio * 100 + '%'
        },
        isEnd() {
            return this.currentTime === this.endTime
        }
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.Progress-wrap {
    &.sold-out {
        .progress-bar-child {
            background: #f2473f;
        }
        .remains {
            color: #f2473f;
        }
    }
    .progress-titles {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #f9f9f9;
    }
    .progress-bar {
        margin-top: 9px;
        position: relative;
        height: 13px;
        background: #aeaeae;
        border-radius: 7px;
        overflow: hidden;
        &-child {
            position: absolute;
            top: 0;
            left: 0;
            width: 80%;
            height: 100%;
            background: linear-gradient(270deg, #03ad92 0%, #1db29b 100%);
        }
    }
    .progress-data {
        margin-top: 9px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #f9f9f9;
    }
}
</style>
