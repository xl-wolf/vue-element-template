<template>
  <div ref="appLayOut" class="h100p">
    <el-container class="h100p">
      <el-aside class="h100p" :width="menuStatus?'auto':sideBarWidth">
        <sidebar class="h100p" />
      </el-aside>
      <el-container>
        <el-header>
          <headerNav />
        </el-header>
        <el-main>
          <appMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from './components/sidebar'
import headerNav from './components/headerNav'
import appMain from './components/appMain'
import { mapGetters } from 'vuex'
import { sideBarWidth } from '@/styles/variables.scss'
export default {
  components: { sidebar, headerNav, appMain },
  computed: {
    ...mapGetters(['menuStatus', 'screenStatus']),
    sideBarWidth() {
      return sideBarWidth
    }
  },
  watch: {
    screenStatus: {
      deep: true,
      immediate: false,
      handler: function(val, oldVal) {
        this.setFullScreenStatus()
      }
    }
  },
  methods: {
    setFullScreenStatus() {
      if (this.screenStatus) {
        this.fullScreen(this.$refs.appLayOut)
      } else {
        this.exitFullscreen()
      }
    },

    fullScreen(dom) {
      if (dom.requestFullscreen) {
        dom.requestFullscreen()
      } else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen()
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen()
      } else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen()
      }
    },

    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
}
</script>

<style lang="scss">
.el-header {
  background: #545c64;
}
.el-aside {
  overflow: hidden;
  // chrome 和Safari
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  // IE 10+
  & {
    -ms-overflow-style: none;
  }
  // Firefox
  & {
    overflow: -moz-scrollbars-none;
  }
}
.el-main {
  padding: 0 !important;
}
</style>