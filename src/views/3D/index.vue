<template>
<!-- 全局定义两个动画 1.fade 2.fade-transform-->
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: 'three',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style>
</style>