<template>
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
</template>

<script>
import sidebar from './components/sidebar'
import headerNav from './components/headerNav'
import appMain from './components/appMain'
import { mapGetters } from 'vuex'
import {sideBarWidth} from '@/styles/variables.scss'
export default {
  components: { sidebar, headerNav, appMain },
  computed: { ...mapGetters(['menuStatus']),sideBarWidth(){return sideBarWidth} }
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