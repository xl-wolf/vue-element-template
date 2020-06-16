<template>
  <div style="color:#fff;cursor:pointer;" @click="handleRequestFullScreen">
    <i
      class="iconfont fs20-important"
      :class="{'xl-icon-full-screen':!screenStatus,'xl-icon-full-screen-cancel':screenStatus}"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'fullScreen',
  computed: {
    ...mapGetters(['screenStatus'])
  },
  data() {
    return {}
  },
  methods: {
    handleRequestFullScreen() {
      console.log('handleRequestFullScreen')
      const full = this.screenStatus ? 0 : 1
      this.$store.dispatch('app/fullScreen', full)
    }
  }
}
</script>

<style>
</style>