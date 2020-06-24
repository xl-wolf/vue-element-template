<template>
  <div style="color:#fff;cursor:pointer;" @click="handleRequestFullScreen">
    <i
      class="iconfont fs20-important"
      :class="{'xl-icon-full-screen':!screenStatus,'xl-icon-full-screen-cancel':screenStatus}"
    />
  </div>
</template>

<script>
import screenfullModule from '@/utils/screenfull.js'
import { mapGetters } from 'vuex'
export default {
  name: 'fullScreen',
  computed: {
    ...mapGetters(['screenStatus'])
  },
  data() {
    return {
      screenfullEnabled: false
    }
  },
  mounted() {
    screenfullModule.on('change', this.change)
  },
  destroyed() {
    if (screenfullModule.isEnabled) {
      screenfullModule.off('change', this.change)
    }
  },
  methods: {
    change() {
      const full = !screenfullModule.isFullscreen ? 0 : 1
      this.$store.dispatch('app/fullScreen', full)
    },
    handleRequestFullScreen() {
      screenfullModule.toggle()
      const full = !screenfullModule.isFullscreen ? 0 : 1
      this.$store.dispatch('app/fullScreen', full)
    }
  }
}
</script>

<style>
</style>