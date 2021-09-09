<template>
    <div class="bg-changer" @click="$emit('click')">{{label}}</div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            require: false,
            default: '点击切换背景'
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-changer {
    font-size: 18px;
    padding: 20px 30px;
    background: transparent;
    cursor: pointer;
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    color: #fff6a9;
    text-align: center;
    animation: blink 12s infinite;
    @keyframes blink {
        20%,
        24%,
        55% {
            color: #333;
            text-shadow: none;
        }
        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        100% {
            text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00,
                0 0 98px #ff0000;
            color: #fff6a9;
        }
    }
}
</style>