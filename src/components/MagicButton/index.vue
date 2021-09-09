<template>
    <div class="magic-btn" @click="$emit('click')">
        <slot name="label">登录</slot>
        <span />
        <span />
        <span />
        <span />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.magic-btn {
    width: 100%;
    text-align: center;
    background: $primary-color;
    border-radius: 4px;
    height: 47px;
    line-height: 47px;
    margin-bottom: 40px;
    border-style: none;
    color: #fff;
    font-size: 18px;
    outline: none;
    cursor: pointer;
    position: relative;
    padding: 0px;
    overflow: hidden;
    transition: all 0.5s;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    span {
        position: absolute;
        display: block;
        &:nth-child(1) {
            height: 3px;
            width: 200px;
            top: 0px;
            left: -200px;
            background: linear-gradient(to right, rgba(0, 0, 0, 0), #8d94f6);
            border-top-right-radius: 1px;
            border-bottom-right-radius: 1px;
            animation: span1 2s linear infinite;
            animation-delay: 1s;
        }
        &:nth-child(2) {
            height: 70px;
            width: 3px;
            top: -70px;
            right: 0px;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #8d94f6);
            border-bottom-left-radius: 1px;
            border-bottom-right-radius: 1px;
            animation: span2 2s linear infinite;
            animation-delay: 2s;
        }
        &:nth-child(3) {
            height: 3px;
            width: 200px;
            right: -200px;
            bottom: 0px;
            background: linear-gradient(to left, rgba(0, 0, 0, 0), #8d94f6);
            border-top-left-radius: 1px;
            border-bottom-left-radius: 1px;
            animation: span3 2s linear infinite;
            animation-delay: 3s;
        }
        &:nth-child(4) {
            height: 70px;
            width: 3px;
            bottom: -70px;
            left: 0px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0), #8d94f6);
            border-top-right-radius: 1px;
            border-top-left-radius: 1px;
            animation: span4 2s linear infinite;
            animation-delay: 4s;
        }
    }
    &:hover {
        transition: all 0.5s;
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
        & span {
            animation-play-state: paused;
        }
    }
    @keyframes span1 {
        0% {
            left: -200px;
        }
        100% {
            left: 200px;
        }
    }
    @keyframes span2 {
        0% {
            top: -70px;
        }
        100% {
            top: 70px;
        }
    }
    @keyframes span3 {
        0% {
            right: -200px;
        }
        100% {
            right: 200px;
        }
    }
    @keyframes span4 {
        0% {
            bottom: -70px;
        }
        100% {
            bottom: 70px;
        }
    }
}
</style>
