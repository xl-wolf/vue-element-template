<template>
    <svg class="admin-title-svg-text">
        <text :x="x" :y="y">{{title}}</text>
    </svg>
</template>

<script>
export default {
    props: {
        x: {
            type: String,
            require: false,
            default: '50%'
        },
        y: {
            type: String,
            require: false,
            default: '75%'
        },
        title: {
            type: String,
            require: false,
            default: 'vue-element-template'
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-title-svg-text {
    width: 100%;
    font-size: 36px;
    text {
        text-anchor: middle;
        stroke: rgb(120, 243, 243);
        stroke-width: 1;
        animation: textAnimate 5s infinite;
    }
    @keyframes textAnimate {
        0% {
            stroke-dasharray: 0 50%;
            stroke-dashoffset: 20%;
            fill: hsl(189, 68%, 75%);
        }
        100% {
            stroke-dasharray: 50% 0;
            stroke-dashoffstet: -20%;
            fill: rgba(255, 255, 255, 0.1);
        }
    }
}
</style>